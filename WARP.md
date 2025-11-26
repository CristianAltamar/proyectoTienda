# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Repository layout

- The main application lives in `proyectStore/`, which is a React + Vite SPA styled with Tailwind CSS.
- All React source code is under `proyectStore/src/` (pages, components, hooks, context providers, and small utilities).
- API endpoint definitions and low-level fetch helpers live in `proyectStore/src/api/` and `proyectStore/src/hooks/`.
- Application-wide state is handled with React Contexts under `proyectStore/src/contexts/`.

Unless otherwise noted, assume all commands are run from `proyectStore/`.

## Tooling and common commands

The project uses Vite, React 19, and pnpm (a `pnpm-lock.yaml` is present).

### Install dependencies

```sh
cd proyectStore
pnpm install
```

### Run the dev server

```sh
cd proyectStore
pnpm dev
```

This starts the Vite dev server.

### Build for production

```sh
cd proyectStore
pnpm build
```

Output is emitted to `proyectStore/dist/` (Vite default).

### Preview the production build

```sh
cd proyectStore
pnpm preview
```

This runs Vite’s preview server against the built assets.

### Linting

ESLint is configured via `eslint.config.js` with React hooks and React Refresh plugins.

```sh
cd proyectStore
pnpm lint
```

### Tailwind CSS build (standalone styles watcher)

Tailwind 4 is integrated via the Vite plugin and a simple CSS entrypoint at `src/index.css` (`@import "tailwindcss";`). There is also a dedicated script that builds styles with the Tailwind CLI in watch mode:

```sh
cd proyectStore
pnpm build:styles
```

This watches `src/index.css` and outputs to `src/assets/output.css`. Use this only if you explicitly rely on the generated CSS file; for standard Vite + Tailwind usage the Vite plugin is usually sufficient.

### Tests

There is currently **no test runner or `test` script** defined in `package.json`. Before asking Warp to run or write tests, add a test framework (e.g. Vitest, Jest) and a corresponding `test` script.

## High-level architecture

### Entry point and shell

- `src/main.jsx`
  - Imports global styles from `src/index.css`.
  - Renders `<App />` into `#root` using `createRoot` from `react-dom/client`.
- `src/App.jsx`
  - Wraps the entire app in three React Context providers:
    - `ProfileProviden` from `contexts/contexProfile.jsx` (user profile/auth data).
    - `CartProvider` from `contexts/contextCart.jsx` (shopping cart state).
    - `ProductsProvider` from `contexts/contextProducts.jsx` (product catalog and filters).
  - Inside these providers, it sets up a `BrowserRouter` with routes rendered inside a `Layout` component.
- `src/components/Layout.jsx`
  - Defines the page chrome: `Header`, `Footer`, and a `<main>` area where the routed page content is injected.

### Routing

Routing is handled by `react-router-dom` (though some components import from `react-router`). Key routes in `App.jsx`:

- `/` → `HomePage` (hero + featured products).
- `/products` → `ProductsPage` (full product listing with filters and category sidebar).
- `/product/:id` → `ProductPage` (product detail view with related products).
- `/about` → `AboutUsPage`.
- `/contact` → `ContatPage` (contact form).
- `/login` → `LogingPage` (login form, sets JWT token and profile state).
- `/cart` → `CartPage` (cart contents and order totals).
- `/profile` → `Profile` (user profile view).
- `/orders-history` → `OrdersHistoryPage` (combined order history from API and localStorage).
- `/success` → `Success` (order confirmation page).
- Fallback `*` → `NotFound` (404 page).

All the above are rendered inside `Layout`, so they share header, navbar, cart summary widget, and footer.

### Data layer and API access

All remote data comes from the Fake Store API (`https://fakestoreapi.com`).

- `src/api/enpoints.js`
  - Centralizes base URLs and path builders: `getProducts`, `getProductsCategory`, `getCarts`, `getUsers`, `login`, etc.
  - All higher-level data fetching utilities and contexts import these endpoint builders.

- `src/hooks/useFetch.jsx`
  - Despite the name, this is **an async helper function**, not a React hook (it doesn’t call other hooks and is invoked directly).
  - Signature: `useFetch(endpoint, method = 'GET', body = null, login = false)`.
  - For `GET`/`DELETE`:
    - Performs a simple `fetch(endpoint, { method })` and returns `response.json()` or `null` on error.
  - For other methods (`POST`, `PUT`, etc.):
    - Adds `Content-Type: application/json` and an `Authorization: Bearer <token>` header (token from `localStorage.getItem('token')`).
    - Serializes `body` if provided.
    - Returns `response.json()` on success or the error object on failure.

Because many modules use `useFetch` (products, carts, profile, login), when changing its behavior (e.g. error handling, auth headers) keep in mind that it affects all API interactions.

### State management with React Context

There are three primary context providers in `src/contexts/`:

#### ProductsContext (`contextProducts.jsx`)

- Holds:
  - `products`: the current array of products displayed.
  - `filters`: an object with fields like `name`, `category`, `priceRange`, `orderBy`, and optionally `limit`.
  - `isCharging`: loading state while fetching products.
- Integrations:
  - Uses `endpoints.getProducts()` and `endpoints.getProductsCategory(category)` to load data from the Fake Store API.
  - Uses `useFilters` to apply client-side filters and ordering to the fetched products.
  - Uses `getUrlFilters` / `setUrlFilters` to sync the `filters` state with URL query parameters when on `/products`.
  - Reads the current route via `useLocation` to decide when to write filters to the URL.
- Lifecycle:
  - On mount, it initializes `filters` from the URL query (if any).
  - Whenever `filters` changes, it refetches products and re-applies filters.

This context is consumed across pages (`HomePage`, `ProductsPage`, `CartPage`, `ProductPage`) and UI components (`Filters`, `Sidebar`, etc.). Any change to the filters schema or semantics must be reflected here, in `useFilters`, and in the URL helpers.

#### CartContext (`contextCart.jsx`)

- Holds:
  - `cartProducts`: array of items with `{ productId, quantity, price, image, subtotal, title }`.
  - `cartSubtotal`: derived from cartProducts.
  - `cartCount`: total quantity across the cart.
- Persistence:
  - On mount, initializes `cartProducts` from `localStorage.getItem('cartData')`.
  - On any cart change, recomputes `cartSubtotal` and `cartCount` and re-saves `cartData` to localStorage.
- Usage:
  - Product cards (`CardProduct`) add/update/remove items.
  - Cart views (`CartProducts`, `CartTable`, `MobileTable`, `Subtotals`) display and mutate quantities.
  - `Subtotals` posts the cart as an order via `useFetch(endpoints.createCart(), 'POST', cartData)` and then clears cart and moves the created order into `localStorage.orderHistory`.

When modifying cart item structure, adjust all dependent components and the serialization logic in `Subtotals` and order history.

#### ProfileContext (`contexProfile.jsx`)

- Holds:
  - `profileData`: user profile object fetched from the Fake Store API.
  - `getProfileData`: function to re-fetch profile info based on the JWT token.
- Behavior:
  - On mount, reads `localStorage.token`, decodes it as a JWT, and uses its `sub` field to fetch user data via `endpoints.getUsers(user.sub)`.
  - `LogingPage` sets the token in localStorage via the `validation` utility, then calls `getProfileData()`.
- Consumption:
  - Header (to greet the user, show logout control).
  - Profile page and order details (to show user name and address).

### Filtering, URL search params, and sorting

Several small utilities and hooks coordinate product filtering:

- `src/utils/getFilters.js`
  - Defines a simple `schema` for valid filter keys: `name`, `category`, `priceRange`, `orderBy`.
  - `getUrlFilters()` reads `window.location.search` via `URLSearchParams` and returns only recognized keys.
  - `setUrlFilters(filters)` builds a new query string from the current filters (skipping empty/"all" values) and calls `window.history.replaceState` to update the URL in place.

- `src/hooks/useFilters.jsx`
  - Pure function-like helper, not a React stateful hook.
  - Accepts `products` and a filters object `{ name, category, priceRange, orderBy, limit }`.
  - If `limit` is set, it simply returns the first `limit` products.
  - Otherwise, it filters by case-insensitive `name` and `priceRange`, then applies ordering via `orderByProducts`.

- `src/utils/filterOrderBy.js`
  - Implements `orderByProducts(data, criteria)` to sort by price (asc/desc) or title (A–Z / Z–A).

UI components for filters (`Filters`, `Sidebar`, `Path`) update `ProductsContext.filters` and rely on these utilities to keep the URL and data in sync. Any change to supported filter values requires coordinated updates across these pieces.

### Cart and order flows

The checkout and order history logic is spread across a few components and utilities:

- `Subtotals` (cart totals card)
  - Computes a flat delivery fee (60 when subtotal > 0).
  - On “finalizar compra”, ensures a token exists, builds a `cartData` payload `{ date, userId, products }`, and posts it to `endpoints.createCart()`.
  - On success, it clears `cartData` from localStorage, empties the cart context, appends the new order to `localStorage.orderHistory`, and navigates to `/success`.

- `OrdersHistoryPage`
  - On mount, reads and decodes `localStorage.token`. If missing, redirects to `/login`.
  - Fetches all carts via `endpoints.getCarts()` and filters them by the current user.
  - Fetches all products once via `endpoints.getProducts()` and joins product details into each cart’s `products` array.
  - Merges API carts with any locally stored `orderHistory` and hands them to the `OrderHistory` component.

This means order history is effectively a combination of server-side and client-side (localStorage) records.

### Layout, navigation, and conditional UI

- `Header` combines the main logo, navigation (`Navbar`), login/profile link, and cart summary.
  - Uses the current `window.location.pathname` to hide nav and cart controls on login/create-account pages.
  - Taps `CartContext` for `cartSubtotal` and `cartCount` and renders a cart icon with total price and item count.
  - Taps `ProfileContext` for `profileData` to show the current username and a logout action that clears token, `cartData`, and `orderHistory` and redirects to `/login`.

- `Navbar` provides the primary navigation links and a mobile drawer version.
  - When clicking “Productos”, it clears product filters via `setFilters({})` to reset the product list.

- `Sidebar` and `Filters` constitute the products filter UI (category selection, search, ordering).

- `PurchaseRoute` is a simple visual indicator of the checkout steps (cart vs order).

When modifying navigation or auth flows, keep in mind the use of `window.location.*` calls (full-page reloads/redirects) in several components (`Header`, `Success`, `OrdersHistoryPage`, `Subtotals`, `LogingPage`). These bypass React Router navigation and will reinitialize context state.

## How to work effectively with this codebase in Warp

- For any change involving data fetching or auth, locate the relevant endpoint in `src/api/enpoints.js` and the corresponding `useFetch` call in hooks/contexts/components.
- For product-related UX (listing, filters, detail, related products), start from `ProductsContext` and the `ProductsPage`/`ProductPage` components, then drill into `Filters`, `Sidebar`, and `Path`.
- For cart-related features, work within `CartContext`, `CardProduct`, `CartProducts`, `CartTable`/`MobileTable`, and `Subtotals`.
- For profile or order-history changes, work within `ProfileContext`, `Profile`, `OrdersHistoryPage`, and the `OrderHistory`/`OrderHistoryItem` components.
- Before running or adding tests, introduce a test runner and `test` script in `package.json`, then ask Warp to generate or execute tests using that script.
