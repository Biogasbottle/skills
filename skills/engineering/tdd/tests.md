# Test Examples

Tests must follow the priority hierarchy: **E2E > CF > Unit**. See SKILL.md for the full selection rules.

## E2E — Happy Path (highest priority)

Test the full system from the outermost entry point. Always write at least one.

```typescript
// GOOD: E2E happy path — full stack from HTTP to DB
test("user can checkout with valid cart", async () => {
  const cart = await api.createCart();
  await api.addToCart(cart.id, product.id);
  const result = await api.checkout(cart.id, paymentMethodId);
  expect(result.status).toBe("confirmed");
  const order = await api.getOrder(result.orderId);
  expect(order.items).toHaveLength(1);
});

// GOOD: E2E happy path for frontend via browser
test("user can sign up and see dashboard", async ({ page }) => {
  await page.goto("/signup");
  await page.fill('[name="email"]', "alice@example.com");
  await page.fill('[name="password"]', "secret123");
  await page.click("button[type=submit]");
  await expect(page.locator("h1")).toHaveText("Dashboard");
});
```

## CF — Chain-Functional (fallback when E2E is too costly)

When E2E is impractical, test the longest feasible chain. Call the API layer for frontend code, hit the real database for backend code.

```typescript
// GOOD: CF test for frontend — calls API layer, checks response + side effects
// Avoids browser automation cost while still validating the integration
test("checkout returns confirmed order and reduces inventory", async () => {
  const cart = await db.seedCart({ userId, items: [product] });
  const response = await fetch("/api/checkout", {
    method: "POST",
    body: JSON.stringify({ cartId: cart.id, paymentMethodId }),
    headers: { Authorization: `Bearer ${token}` },
  });
  expect(response.status).toBe(200);
  const body = await response.json();
  expect(body.status).toBe("confirmed");
  const product_after = await db.products.findById(product.id);
  expect(product_after.stock).toBe(product.stock - 1);
});

// GOOD: CF test for backend — HTTP endpoint through to database
// Skips external payment provider (mocked at boundary) but tests everything else
test("POST /orders creates an order and returns it", async () => {
  const res = await request(app)
    .post("/orders")
    .send({ cartId: cart.id, paymentMethodId });
  expect(res.status).toBe(201);
  expect(res.body.status).toBe("confirmed");
  const order = await db.orders.findById(res.body.id);
  expect(order.userId).toBe(user.id);
});
```

## Unit — Only for Complex Algorithms

Unit tests are NOT the default. Only write them when an algorithm has enough branching that E2E/CF cannot exhaustively cover it.

```typescript
// GOOD: Unit test for a parser with many branch combinations
// An E2E test would hit this indirectly, but 20+ syntax variants need focused coverage
test("parser handles nested expressions with mixed operators", () => {
  const ast = parse("(a + b) * (c - d) / 2");
  expect(ast.type).toBe("BinaryOp");
  expect(ast.operator).toBe("/");
  expect(ast.left.operator).toBe("*");
  expect(ast.right.type).toBe("NumberLiteral");
});

test("parser rejects unclosed parentheses", () => {
  expect(() => parse("(a + b")).toThrow("Unclosed parenthesis at position 5");
});

// GOOD: Unit test for a state machine with many transitions
test("order state machine: confirmed → shipped → delivered", () => {
  let state = createStateMachine("confirmed");
  state = transition(state, "ship");
  expect(state).toBe("shipped");
  state = transition(state, "deliver");
  expect(state).toBe("delivered");
});

test("order state machine: cancelled orders cannot be shipped", () => {
  let state = createStateMachine("cancelled");
  expect(() => transition(state, "ship")).toThrow("Invalid transition");
});
```

```typescript
// BAD: Unit test for a simple CRUD handler — E2E/CF covers this already
test("getUser calls userService.findById", async () => {
  const mockService = { findById: jest.fn().mockResolvedValue({ id: 1 }) };
  const handler = new UserController(mockService);
  const result = await handler.getUser(1);
  expect(mockService.findById).toHaveBeenCalledWith(1);
  expect(result).toEqual({ id: 1 });
});

// BAD: Unit test for simple glue code — zero branching
test("formatName returns trimmed full name", () => {
  expect(formatName(" Alice ", "Smith")).toBe("Alice Smith");
});
```

## Bad Test Patterns (regardless of level)

```typescript
// BAD: Mocking internal collaborators
test("checkout calls paymentService.process", async () => {
  const mockPayment = jest.mock(paymentService);
  await checkout(cart, payment);
  expect(mockPayment.process).toHaveBeenCalledWith(cart.total);
});
```

```typescript
// BAD: Bypasses interface to verify
test("createUser saves to database", async () => {
  await createUser({ name: "Alice" });
  const row = await db.query("SELECT * FROM users WHERE name = ?", ["Alice"]);
  expect(row).toBeDefined();
});

// GOOD: Verifies through interface (CF or E2E)
test("createUser makes user retrievable", async () => {
  const user = await createUser({ name: "Alice" });
  const retrieved = await getUser(user.id);
  expect(retrieved.name).toBe("Alice");
});
```

Red flags:

- Mocking internal collaborators
- Testing private methods
- Asserting on call counts/order
- Test breaks when refactoring without behavior change
- Test name describes HOW not WHAT
- Verifying through external means instead of interface
- Unit test for simple CRUD, glue code, or trivial functions
