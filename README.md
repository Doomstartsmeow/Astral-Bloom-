# Astral Bloom

**Celestial bouquets for Warsaw nights.**

Astral Bloom is a React storefront demo for a Warsaw-inspired flower delivery brand. It brings together bouquet discovery, customisation, a shopping cart, simulated checkout, and an order dashboard in a responsive interface with light and dark themes.

Built around weddings, corporate events, and evening gatherings, the project explores a complete shopping journey with prices in PLN and a same-day delivery concept.

> This is a frontend demo. Authentication, payments, and delivery tracking are simulated. No backend, database, or payment gateway connection is included.

## Features

- **Bouquet catalogue:** four sample arrangements with photography, descriptions, prices, and event tags.
- **Search and filters:** search names, descriptions, tags, and sizes; filter by category, default size, or eco availability; sort by price or name.
- **Bouquet customisation:** choose a size, select recyclable packaging, and enter a florist note before adding an item to the cart.
- **Shopping cart:** adjust quantities, remove items, clear the cart, and review the subtotal.
- **Simulated checkout:** enter delivery details, choose a delivery window, and create a demo order with required-field validation and submission feedback.
- **Order dashboard:** inspect sample and newly created orders, delivery stages, item summaries, and update timelines. Cancel orders while they are preparing.
- **Demo account screens:** sign in, register, and edit contact details used to prefill checkout.
- **Theme preferences:** switch between light and dark themes, with an initial system preference and locally saved selection.
- **Interface feedback:** toast notifications, loading and error states for orders, a not-found page, and a root error boundary.
- **Keyboard support:** a skip link, labelled form controls, and focus trapping with Escape-to-close in the bouquet customisation dialog.

## Technology

| Tool | Role |
| --- | --- |
| React 19 | Components and application state |
| Vite 7 | Development server and production bundling |
| React Router 7 | Client-side page routing |
| TanStack Query 5 | Order queries and checkout/cancellation mutations |
| React Context | Cart, demo user, and toast state |
| Zustand 5 | Theme and UI state |
| React Icons 5 | Interface icons |
| CSS | Responsive layouts and theme styling |
| ESLint 9 | Static code checks |

The project uses JavaScript and JSX.

## Getting started

### Requirements

- Node.js matching the locked Vite requirement: `^20.19.0 || >=22.12.0`.
- npm.

Download or clone the repository, then open a terminal in the directory containing `package.json`. In the supplied folder layout, this is the inner `astral-bloom` directory.

```bash
npm ci
npm run dev
```

Open the local address printed by Vite. No environment variables, API keys, or backend setup are required. Product photographs load from external Pexels URLs and require internet access.

### Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Generate the production bundle in `dist/` |
| `npm run preview` | Preview the production bundle locally |
| `npm run lint` | Run ESLint checks |

To preview a build:

```bash
npm run build
npm run preview
```

## Try the demo

1. Browse the catalogue and combine search, category, size, and eco filters.
2. Open **Customise & add to cart**, choose options, and add a bouquet.
3. Open **Cart**, adjust the quantity, and continue to checkout.
4. Enter a sample name and address, choose a delivery window, and select **Place order**.
5. Open the new order in **My Orders** and inspect its details or cancel it while it is preparing.
6. Switch themes and reload: the theme and order history remain, while the cart and demo user reset.

Checkout and order history can be accessed without signing in. The sign-in form accepts a valid email address and a non-empty password field, but does not verify credentials or require a previously registered account. Use sample details when exploring the demo.

## Pages

| Route | Page |
| --- | --- |
| `/` | Catalogue and bouquet customisation |
| `/checkout` | Delivery form and order summary |
| `/orders` | Order history and simulated delivery status |
| `/login` | Demo sign-in |
| `/register` | Demo registration |
| `/profile` | Demo profile settings |
| Any unmatched path | Not-found page |

## Project structure

```text
astral-bloom/
├── public/
├── src/
│   ├── api/              # Mock catalogue, checkout, and order helpers
│   ├── components/       # Focus trap, error boundary, and skeleton component
│   ├── context/          # Auth, cart, and toast providers
│   ├── pages/            # Catalogue, checkout, orders, and account screens
│   ├── store/            # Zustand UI store
│   ├── App.jsx           # Navigation, routes, cart dialog, and toast host
│   ├── main.jsx          # Application entry point and providers
│   └── index.css         # Layouts, components, and theme styles
├── index.html
├── package.json
├── package-lock.json
├── eslint.config.js
└── vite.config.js
```

The active catalogue reads an inline sample dataset in `CatalogPage.jsx`; the separate `api/catalog.js` mock helper is not currently connected to that page. Orders use TanStack Query with asynchronous mock helpers and browser storage.

## Data and persistence

| Data | Storage | Survives reload? |
| --- | --- | --- |
| Cart and bouquet selections | React Context | No |
| Demo user and profile | React Context | No |
| Orders | `localStorage`: `astral_bloom_orders_v1` | Yes |
| Theme | `localStorage`: `astral-bloom-theme` | Yes |

The order list is seeded with three sample orders when no stored list exists. New orders and cancellations update the local list. Orders are shared within the same browser origin and are not separated by user account.

To restore the initial order samples, remove `astral_bloom_orders_v1` from the site's local storage and reload the orders page.

## Current limitations

- PayU references are display text and mock timeline entries; no real payment is processed.
- Delivery stages do not advance automatically. Availability, delivery zones, and the advertised same-day cutoff are not enforced.
- Bouquet size and packaging choices do not change the price.
- Cart items are merged by product ID. Adding the same bouquet with different options increases the existing quantity and retains the original options.
- Saved order items contain names and quantities; bouquet sizes, individual florist notes, and checkout phone numbers are not retained in order history.
- Authentication is an in-memory simulation, with no server-side sessions or account verification.
- ESLint currently reports issues, including conditional Hooks in the registration and profile pages. These need attention before treating the demo as production-ready.
- No automated test suite is configured.

## Hosting considerations

The production output is a static bundle in `dist/`. The application uses `BrowserRouter`, so the hosting environment must serve `index.html` for application routes such as `/orders` and `/profile` when opened directly.

The current configuration assumes hosting at the domain root. Hosting under a repository subpath requires adapting Vite's base path and the router's basename; the current setup is not preconfigured for GitHub Pages.

## Images

Bouquet and hero photographs are loaded from Pexels image URLs referenced in the catalogue data and stylesheet.
