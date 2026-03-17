# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Brushella** is a Gatsby 5 + TypeScript e-commerce site for an art and home decor store, powered by Shopify's Storefront API. It uses Chakra UI for components and supports a full shopping cart flow.

## Commands

```bash
# Development
gatsby develop           # Start dev server at localhost:8000
gatsby build             # Production build
gatsby clean             # Clear cache (run when seeing stale build issues)

# Testing
npm run test:unit                                    # Run all Jest unit tests
npm run test:unit -- src/components/__tests__/Foo.spec.tsx   # Run single test file
npm run test:unit:watch                              # Watch mode

npm run test:e2e         # Start dev server + open Cypress GUI
npm run test:e2e:ci      # Start dev server + run Cypress headless (CI)

# Linting
npm run lint             # ESLint check
npm run lint:fix         # Auto-fix lint issues
```

## Architecture

### Data Flow: Build-Time vs Runtime

**Build-time (static):** Gatsby's GraphQL layer (via `gatsby-source-shopify` and `gatsby-source-graphql`) fetches product/collection data from Shopify and bakes it into static pages. Templates receive this via `pageContext` and Gatsby's `useStaticQuery`.

**Runtime (dynamic):** Cart operations hit the Shopify Storefront API directly at runtime via `@shopify/storefront-api-client`. The client is initialized in `src/context/StoreContext.tsx` and shared via React Context. Cart ID is persisted in `localStorage` under key `shopify_checkout_id`.

### Routing

- **Static pages:** `src/pages/` maps directly to URL paths (file-based Gatsby routing)
- **Dynamic pages:** `gatsby-node.ts` generates pages at build time for:
  - `/collections/{handle}` → `src/templates/Collection.tsx`
  - `/collections/{collectionHandle}/{productHandle}` → `src/templates/SingleProduct.tsx`
  - `/legal-content/{handle}` → `src/templates/LegalContent.tsx`
  - `/product-categories/{handle}` → `src/templates/ProductCategories.tsx`

### Context Providers

Two providers are registered in `gatsby-browser.tsx` and wrap the entire app:

- **`LayoutDataProvider`** (`src/context/LayoutContext.tsx`): Global layout data — navigation, collections, legal links. Populated from `useStaticQueryLayoutData` hook.
- **`StoreApp`** (`src/context/StoreContext.tsx`): Cart state + Shopify API client. Exposes hooks: `useAddItemToCart()`, `useCheckoutLineItems()`, `useCartTotals()`, `useRemoveItemFromCart()`, `useUpdateItemsFromCart()`.

### Cart Flow

The cart data flow is defined in `src/context/StoreContext.tsx`. Reference it first for any cart-related work (add to cart, update quantities, checkout, basket page, ProductCard).

### Shopify Integration

- Two Shopify GraphQL sources in `gatsby-config.ts`: Admin API (for metaobjects) and Storefront API (for public product data)
- Runtime cart mutations use `cartCreate`, `cartLinesAdd`, `cartLinesUpdate`, `cartLinesRemove`
- Shopify types come from `@shopify/hydrogen-react/storefront-api-types`
- Auto-generated Gatsby GraphQL types live in `src/gatsby-types.d.ts` (do not edit manually)
- Required env vars: `GATSBY_SHOPIFY_ADMIN_PASSWORD`, `GATSBY_SHOPIFY_STOREFRONT_PASSWORD`, `GATSBY_SHOPIFY_APP_ID`

### Testing Patterns

- **Unit tests:** `src/components/__tests__/*.spec.tsx` using Jest + React Testing Library. Setup in `setup-test-env.js` mocks `window.location` and `gatsby-plugin-image`. The `@shopify/storefront-api-client` module is mocked in `__mocks__/`.
- **E2E tests:** `cypress/e2e/*.cy.js` using Cypress. API calls are intercepted via `cy.intercept()` pointing to fixture JSON files in `cypress/fixtures/`. Accessibility is tested with `cypress-axe`. Responsive viewports (mobile/tablet/desktop) are tested explicitly.
- E2E tests mock global layout data via `window.__mockLayoutGlobalData`.

### Styling Approach

Hybrid: **Chakra UI** for semantic UI components + **Styled Components** for custom styled wrappers. **Tailwind CSS** is also configured but used minimally. Do not mix all three — follow the pattern in the file you're editing.

### Comments

Use comments sparingly — only when logic is genuinely non-obvious.

### ESLint

- Console statements are blocked by lint rules
- GraphQL operations must follow naming conventions (see `.eslintrc.js`)
- Run lint before committing
