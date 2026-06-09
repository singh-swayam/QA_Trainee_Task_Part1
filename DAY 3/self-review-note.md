# Self Review Note - Swayam Singh

## Overall Reflection

This 3-day training task helped me build a complete automation framework from scratch using Playwright and TypeScript on the SauceDemo application. Below is my honest self-assessment of what I did well, what I learned, and what I would improve.

---

## What I Did Well

**Test Independence**
Every test starts from scratch — login is called fresh in each test through the `loginAsStandardUser()` helper. No test depends on the state left by a previous one.

**Stable Locators**
I used `data-test` attributes throughout, combined with `.filter({ hasText })` to scope locators to specific product cards. I avoided fragile selectors like `div:nth-child(2) > button`.

**TypeScript Usage**
- Used `interface` for `UserCredentials` and `Product`
- Used `type` alias for `UserType`
- Used `class`, `constructor`, `readonly` fields, and `Promise<void>` return types in all Page Objects
- Never used `any` anywhere

**Page Object Model**
All 4 pages are cleanly separated — `LoginPage`, `ProductsPage`, `CartPage`, `CheckoutPage`. Test files import and use these classes, with no raw locators in spec files.

**No Hard-Coded Waits**
`page.waitForTimeout()` is not used anywhere. Playwright's built-in auto-waiting handles all synchronization.

**Debugging**
Identified and fixed 2 real bugs during Day 2:
1. `getByText()` strict mode violation — fixed by scoping to `[data-test="inventory-item-name"]`
2. Button locator matching all cart buttons — fixed by chaining inside `.inventory_item.filter()`

---

## What I Would Improve With More Time

**Fixtures**
I would replace the `loginAsStandardUser()` utility function with a proper Playwright fixture that injects a pre-logged-in page into each test. This would make tests even cleaner and is the production-standard approach.

**More Negative Coverage**
I would add edge cases like empty username + password, SQL injection attempts in the login field, and navigating directly to the inventory URL without logging in.

**Data-Driven Tests**
I would use Playwright's `test.each()` to run checkout validation tests across all missing field combinations in a single parameterized test block rather than writing separate tests for each.

**Environment Config**
I would move the base URL and credentials out of the code entirely and into a `.env` file loaded via `dotenv`, so the framework can run against different environments without code changes.

---

## Test Coverage Summary

| Area | Tests Written | Types Covered |
|---|---|---|
| Login | 4 | Smoke, Negative |
| Products | 3 | Smoke, Regression |
| Cart | 2 | Regression |
| Checkout | 3 | Regression, Negative |
| **Total** | **12** | |

---

## Key Learnings

- POM makes tests significantly easier to read and maintain — when a locator changes, it changes in one place only
- TypeScript's `readonly` on locators prevents accidental reassignment inside methods
- Playwright's strict mode is a feature, not a bug — it forces you to write precise locators
- Debugging with the trace viewer is far more effective than adding console logs
