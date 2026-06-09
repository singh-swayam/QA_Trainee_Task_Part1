# QA Trainee Task 

Structured QA training repository.

---

## Trainee Info

| Field | Details |
|---|---|
| **Name** | Swayam Singh |
| **Role** | QA |
| **Tool** | Playwright + TypeScript |
| **App Under Test** | [SauceDemo](https://www.saucedemo.com/) |

---

## Repository Structure

```
QA_Trainee_Task/
├── Day-1/
│   ├── test-data/
│   │   └── user.ts
│   ├── tests/
│   │   └── login.spec.ts
│   ├── output screenshots/
│   ├── test-results/
│   ├── Manual Test scenarios for SauceDemo.xlsx
│   ├── playwright.config.ts
│   ├── package.json
│   └── package-lock.json
├── Day-2/
│   ├── test-data/
│   │   ├── user.ts
│   │   └── products.ts
│   ├── tests/
│   │   ├── login.spec.ts
│   │   ├── products.spec.ts
│   │   └── checkout.spec.ts
│   ├── output screenshots/
│   ├── test-results/
│   ├── debugging-note.md
│   ├── playwright.config.ts
│   ├── package.json
│   └── package-lock.json
├── Day-3/
│   ├── pages/
│   │   ├── LoginPage.ts
│   │   ├── ProductsPage.ts
│   │   ├── CartPage.ts
│   │   └── CheckoutPage.ts
│   ├── tests/
│   │   ├── login.spec.ts
│   │   ├── products.spec.ts
│   │   ├── cart.spec.ts
│   │   └── checkout.spec.ts
│   ├── test-data/
│   │   ├── user.ts
│   │   └── products.ts
│   ├── utils/
│   │   └── testHelpers.ts
│   ├── output screenshots/
│   ├── self-review-note.md
│   ├── playwright.config.ts
│   ├── package.json
│   └── package-lock.json
└── README.md
```

---

## Day 1 — Manual Testing + Playwright Setup + Login Automation

### Tasks Completed

- Manual test scenario identification for SauceDemo
- Playwright project setup with TypeScript
- Automated 4 login test cases

---

### Manual Test Scenarios

Documented in `Day-1/Manual Test cases for SauceDemo.xlsx`.

Covers the following modules:
- Login (positive, negative, edge cases)
- Product listing & sorting
- Cart management
- Checkout flow
- Session & navigation

---

### Setup — Day 1

**Prerequisites**
- Node.js v18 or above
- npm

**Install dependencies**
```bash
cd Day 1
npm init playwright@latest
```

---

### Running Tests — Day 1

**Run all tests**
```bash
npx playwright test
```

**Run only login tests**
```bash
npx playwright test tests/login.spec.ts
```

**Run tests in headed mode (see browser)**
```bash
npx playwright test --headed
```

**View HTML report**
```bash
npx playwright show-report
```

---

### Test Cases Automated — Day 1

| TC ID | Test Name | Type | Status |
|---|---|---|---|
| TC_001 | Login page should load | Smoke | Pass |
| TC_002 | Valid user should be able to login | Smoke | Pass |
| TC_003 | Invalid password should show error | Negative | Pass |
| TC_004 | Locked user should not be able to login | Negative | Pass |

---

### Test Data

All credentials are managed in `Day-1/test-data/users.ts`.

| Username | Type | Notes |
|---|---|---|
| `standard_user` | standard | Default user, full access |
| `locked_out_user` | locked | Cannot login |
| `problem_user` | problem | Broken UI elements |
| `performance_glitch_user` | performance_glitch | Simulates slow network |
| `error_user` | error | Triggers errors on interactions |
| `visual_user` | visual | Used for visual regression |

> Password for all users: `secret_sauce`

---

## 📅 Day 2 — Functional Automation + Assertions + Debugging

### ✅ Tasks Completed

- Product and cart automation (TC_005 – TC_009)
- Checkout validation automation (TC_010 – TC_012)
- `products.ts` typed test data file created
- Debugging note submitted with trace analysis

---

### ⚙️ Setup — Day 2

```bash
cd Day-2
npm install
npx playwright install
```

---

### ▶️ Running Tests — Day 2

**Run all tests**
```bash
npx playwright test
```

**Run a specific spec file**
```bash
npx playwright test tests/products.spec.ts
npx playwright test tests/checkout.spec.ts
```

**Run by tag**
```bash
npx playwright test --grep @smoke
npx playwright test --grep @negative
npx playwright test --grep @regression
```

**Run in headed mode**
```bash
npx playwright test --headed
```

**View HTML report**
```bash
npx playwright show-report
```

---

### 🗂️ Test Cases Automated — Day 2

| TC ID | Test Name | File | Type | Status |
|---|---|---|---|---|
| TC_001 | Login page should load | login.spec.ts | Smoke | ✅ Pass |
| TC_002 | Valid user should be able to login | login.spec.ts | Smoke | ✅ Pass |
| TC_003 | Invalid password should show error | login.spec.ts | Negative | ✅ Pass |
| TC_004 | Locked user should not be able to login | login.spec.ts | Negative | ✅ Pass |
| TC_005 | Product list should be visible after login | products.spec.ts | Smoke | ✅ Pass |
| TC_006 | Add one product to cart | products.spec.ts | Regression | ✅ Pass |
| TC_007 | Remove product from cart | products.spec.ts | Regression | ✅ Pass |
| TC_008 | Add multiple products to cart | products.spec.ts | Regression | ✅ Pass |
| TC_009 | Cart page should show selected products | products.spec.ts | Regression | ✅ Pass |
| TC_010 | Checkout with valid details | checkout.spec.ts | Regression | ✅ Pass |
| TC_011 | Checkout with missing first name | checkout.spec.ts | Negative | ✅ Pass |
| TC_012 | Checkout with missing postal code | checkout.spec.ts | Negative | ✅ Pass |

---

### 🧾 Test Data — Day 2

**Users** → `Day-2/test-data/users.ts`
**Products** → `Day-2/test-data/products.ts`

| Product Name | Price |
|---|---|
| Sauce Labs Backpack | $29.99 |
| Sauce Labs Bike Light | $9.99 |
| Sauce Labs Bolt T-Shirt | $15.99 |

---

### 🐛 Debugging Notes

Full debugging notes in `Day-2/debugging-note.md`.

| # | Failed Test | Root Cause | Fix |
|---|---|---|---|
| Bug 1 | TC_009 – Cart page shows selected products | `getByText()` matched both the product name div and description div — strict mode violation | Scoped to `[data-test="inventory-item-name"]` with `{ hasText }` |
| Bug 2 | TC_008 – Add multiple products to cart | `getByRole('button', { name: 'Add to cart' })` matched all cart buttons on page | Scoped button inside `.inventory_item.filter({ hasText: product.name })` |

---

## Day 3 — Coming Soon

---

## 🔗 Links

- **App Under Test:** https://www.saucedemo.com/
- **Repository:** https://github.com/singh-swayam/QA_Trainee_Task
