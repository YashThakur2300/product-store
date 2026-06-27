# Product Store

A responsive product listing page built with **Next.js**, **React**, and **Bootstrap 5**, fetching live data from the [Fake Store API](https://fakestoreapi.com).

---

## Features

- **Server-Side Rendering (SSR)** via `getServerSideProps` for fast initial load and SEO
- **Product listing** with image, title, price, category badge, and star rating
- **Search bar** — client-side filtering by product title (debounced loading spinner)
- **Category filter** — filter by product category with pill buttons
- **Pagination** — 8 products per page with smart page number display
- **Product detail page** — dynamic route `/product/[id]` with full description, rating, and image
- **Responsive layout** — Bootstrap grid + custom CSS, mobile-first down to 320px
- **404 page** — custom friendly not-found screen

---

## Tech Stack

| Tool | Version |
|------|---------|
| Next.js | 14.x |
| React | 18.x |
| Bootstrap | 5.3.x |
| Bootstrap Icons | 1.11.x |

---

## Setup Instructions

### Prerequisites

- Node.js 18 or higher
- npm (or yarn / pnpm)

### Install & Run

```bash
# 1. Clone the repo
git clone https://github.com/your-username/product-store.git
cd product-store

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

---

## Project Structure

```
product-store/
├── components/
│   ├── Navbar.js          # Sticky nav with integrated search bar
│   ├── ProductCard.js     # Card with image, title, price, rating
│   └── Pagination.js      # Smart page navigation
├── pages/
│   ├── _app.js            # Global CSS + Bootstrap imports
│   ├── _document.js       # Font preconnect
│   ├── index.js           # Home page — SSR product listing
│   ├── 404.js             # Custom not-found page
│   └── product/
│       └── [id].js        # Dynamic product detail page (SSR)
├── styles/
│   └── globals.css        # Design system + all custom styles
├── next.config.js
└── package.json
```

---

## Assumptions

- All filtering (search + category) is done client-side after SSR fetch, matching the assignment spec.
- The "loading spinner" is shown during a brief debounce period (300ms) when the user is actively typing/filtering — since actual data is already available via SSR, a true network spinner is not needed.
- Pagination is client-side (8 items per page) to avoid additional API calls.
- The "Add to cart" button on the detail page is UI-only; no cart state is implemented (out of scope).
- Bootstrap is used for the reset/base layer and responsive grid utilities; most visual styling is via custom CSS variables for a distinctive design.

---

## Design Decisions

- **Color palette**: off-white background (`#f7f6f3`), white cards, terracotta accent (`#c84b31`) — warm and trustworthy for an e-commerce context
- **Typography**: Playfair Display for brand/headings, DM Sans for body — contrast between editorial serif and clean geometric sans
- **Sticky search**: integrated into the navbar so it's always accessible without scrolling
- **SSR first**: product data is rendered on the server — good for SEO and removes loading flash

---

## Live Demo

_Deploy to Vercel in one command:_

```bash
npx vercel
```

Or connect your GitHub repo at [vercel.com](https://vercel.com) for automatic deploys.
