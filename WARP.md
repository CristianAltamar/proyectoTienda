# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Development Commands

- **Start development server**: `pnpm vite`
- **Build for production**: `pnpm vite build`
- **Preview production build**: `pnpm vite preview`
- **Lint code**: `pnpm eslint .`

## Project Structure

This is a React 19 + Vite e-commerce store application using the Fake Store API. The project uses React Router 7 for routing and TailwindCSS 4 for styling.

### Key Architecture Patterns

- **Context-based state management**: Uses React Context (`ProductsContext`) for global state management of products and filters
- **Custom hooks for data fetching**: `useFetch` handles all API calls with error handling and authorization headers
- **Filter system**: `useFilters` hook with utility functions for product filtering by name, category, price, and ordering
- **Responsive sidebar/drawer pattern**: Components use responsive designs with desktop sidebars and mobile drawers

### API Integration

- Base API: `https://fakestoreapi.com`
- Centralized endpoint definitions in `src/api/enpoints.js`
- All API calls go through the `useFetch` hook which handles GET/POST/PUT/DELETE methods
- Authorization uses Bearer tokens from localStorage

### Routing Structure

- `/` - HomePage with hero section and featured products (first 6)
- `/products` - ProductsPage with filtering, sidebar, and full product grid
- `/product/:id` - Individual product detail page

### Component Organization

- `components/layout/` - Header, Footer, Nav components
- `components/store/` - Product listing and card components
- `components/Products/` - Filter controls, sidebar, and product-specific UI
- `components/home/` - Homepage-specific components
- `contexts/` - React Context providers
- `hooks/` - Custom React hooks
- `utils/` - Pure utility functions for filtering and URL management
- `pages/` - Top-level page components

### State Management Flow

1. `ProductsContext` provides global state for products and filters
2. Filters are managed as objects with `{category, orderBy, name}` structure
3. `useFilters` hook processes products based on current filter state
4. Components trigger filter changes through context setters
5. URL state synchronization handled by `getFilters.js` utilities

## Notes for Warp

- Run commands from the `proyectStore/` directory. Example: `cd proyectStore && pnpm install`.
- Tests are not configured in this project (no Jest/Vitest/Cypress and no `test` script in `package.json`). Running a single test is not applicable until a test framework is added.
- TailwindCSS v4 is integrated via the Vite plugin (`@tailwindcss/vite`); `src/index.css` imports `tailwindcss`. The `build:styles` script exists but is typically unnecessary during dev since Vite processes Tailwind.
- ESLint is configured via flat config (`eslint.config.js`) with `@eslint/js`, `eslint-plugin-react-hooks`, and `eslint-plugin-react-refresh`.
- The app uses `BrowserRouter`; for deep links in production ensure the host serves `index.html` as a fallback (Vite preview already handles this).

## Notable gaps

- `src/contexts/contextCart.jsx` is currently empty.
- No test infrastructure or CI is present.
- `tailwind.config.js` is empty; Tailwind v4 works without it but you can add config if needed.
