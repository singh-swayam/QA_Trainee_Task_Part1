# Day 2 — Debugging Note

---

## Bug #1

## Failed Test
**TC_009 – Cart page should show selected products**

---

## Reason for Failure
`page.getByText('Sauce Labs Bolt T-Shirt')` resolved to **2 elements** on the cart page:
1. The product name div: `<div class="inventory_item_name">`
2. The product description div which also contains the product name text

Playwright's strict mode does not allow assertions on a locator that matches multiple elements — it throws a `strict mode violation` error immediately.

---

## How I Investigated
1. Ran the test and got: `strict mode violation: getByText('Sauce Labs Bolt T-Shirt') resolved to 2 elements`
2. Error clearly listed both matching elements with their selectors in the call log
3. Identified that `getByText()` does a partial/full text match across the **entire page DOM**, not just visible labels
4. Inspected the cart page structure and confirmed both the name div and description div contain the product name text

---

## Tool Used
- Playwright HTML Report (`npx playwright show-report`)
- Error call log in the terminal output (listed both matching elements clearly)

---

## Fix Applied
Scoped the locator to the specific `data-test="inventory-item-name"` attribute instead of using a broad `getByText()`:

```typescript
// before (broader view as it matched name div as well as description div)
await expect(page.getByText(product.name)).toBeVisible();

// after (this is item name element only)
await expect(
  page.locator('[data-test="inventory-item-name"]', { hasText: product.name })
).toBeVisible();
```

---

## Learning
`getByText()` matches **any element** in the DOM containing that text — including descriptions, labels, and tooltips. Always prefer scoping with a `data-test` attribute combined with `{ hasText }` when a product name could appear in multiple places on the same page. This is especially important on cart and checkout pages where both the name and description of a product are rendered together.

---
---

## Bug #2

## Failed Test
**TC_008 – Add multiple products to cart**

---

## Reason for Failure
The `Add to cart` button locator was matching all buttons on the page instead of the one belonging to a specific product. When looping through multiple products, the wrong button was being clicked, causing the cart count to not update as expected.

---

## How I Investigated
1. Ran the test in headed mode using `npx playwright test --headed` to watch the browser live.
2. Noticed the click was landing on an incorrect product's button.
3. Opened the HTML report and saw the assertion `toHaveText('3')` was failing — cart only showed `1`.
4. Opened Playwright Trace Viewer to inspect the exact DOM state at the time of each click.
5. Identified that `page.getByRole('button', { name: 'Add to cart' })` was resolving to the **first matching button** on the entire page, ignoring the product filter.

---

## Tool Used
- Playwright HTML Report (`npx playwright show-report`)
- Playwright Trace Viewer (opened from HTML report → click on failed test → View Trace)
- Headed mode (`--headed`) for live visual inspection

---

## Fix Applied
Scoped the button locator inside a `.inventory_item` container filtered by product name:

```typescript
// before (fragile, as it matches first button on page)
await page.getByRole('button', { name: 'Add to cart' }).click();

// after (specific, as it scoped to the correct product card)
await page
  .locator('.inventory_item')
  .filter({ hasText: product.name })
  .getByRole('button', { name: 'Add to cart' })
  .click();
```

---

## Learning
Locators must always be scoped to their context. A role-based locator like `getByRole('button')` is only stable when it uniquely identifies one element. When a page has multiple buttons with the same label, chain it inside a parent `.filter()` to make it product-specific. This is a core Playwright best practice — user-facing locators are strong, but they must still be unique.
