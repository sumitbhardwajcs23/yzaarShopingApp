# Yzaaar — Haute Couture & Bespoke Luxury Fashion

> *"Fashion Lives Online"* — An ultra-premium Haute Couture and luxury fashion e-commerce ecosystem built with Next.js 15, React 19, and TypeScript.

---

## ✨ Overview

**Yzaaar** is a luxury fashion e-commerce storefront and boutique management suite engineered with an obsidian and polished gold aesthetic (`#D4AF37`). Built for discerning fashion houses and luxury ateliers, it features a complete customer storefront experience and an integrated back-office admin management portal.

---

## 💎 Features

### 🛍️ Client-Facing Storefront
- **Bespoke Luxury Design System:** Deep obsidian black palettes, polished gold foil accents, refined serif typography, and glassmorphic elevations crafted in pure Vanilla CSS.
- **Curated Catalog & Lookbook:** Explore haute couture collections, evening gowns, bespoke tuxedos, silk accessories, and handcrafted leather goods.
- **Interactive Product Details:** Multi-angle high-resolution image galleries, real-time variant selections (size, finish, color), craftsmanship notes, and live inventory badges.
- **Instant Search & Refinement:** Filter by luxury category, price tier, and instant search queries.
- **Privilege Bag (Cart) & Wishlist:** Persistent shopping bag and wishlist with subtotal calculations, packaging options, and promotional voucher privileges (`YZAAR10`, `ROYAL2000`, `FREESHIP`).
- **Seamless Checkout Simulation:** White-glove delivery selection, payment method simulation, and celebratory canvas confetti.
- **Private Client Dashboard:** Client profile, order history with detailed milestones, and address management.

### 🛡️ Atelier Admin Portal (`/admin`)
- **Executive Analytics:** High-level metrics for revenue, gross orders, active clients, and inventory health.
- **Product Atelier (`/admin/products`):** View, edit, and create luxury products with multiple variants, SKU codes, and pricing.
- **Inventory Matrix (`/admin/inventory`):** Real-time stock levels, low-stock warnings, and quick batch stock adjustments.
- **Bespoke Orders (`/admin/orders`):** Order status management (`placed`, `confirmed`, `packed`, `shipped`, `delivered`), customer addresses, and tracking timeline logs.
- **Staff Roles & Privileges (`/admin/roles`):** Role-based access governance for Directors, Head Buyers, Curators, and Operations staff.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 15+](https://nextjs.org/) (App Router)
- **UI Library:** [React 19](https://react.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/) (Strict typing)
- **Styling:** Custom Vanilla CSS & CSS Modules (Zero external utility frameworks)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Delight Effects:** Canvas Confetti
- **Data Layer:** Resilient JSON-based persistence engine (`src/lib/db.ts`) with automatic seeding

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.18+ or 20+
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/sumitbhardwajcs23/yzaarShopingApp.git
   cd yzaarShopingApp
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the storefront, or [http://localhost:3000/admin](http://localhost:3000/admin) to explore the Atelier Admin Portal.

---

## 📁 Project Architecture

```
Yzaaar/
├── docs/                   # Implementation blueprints & architectural plans
├── src/
│   ├── app/
│   │   ├── (storefront)    # Client pages: Home, Shop, Product, Cart, Wishlist, Account
│   │   ├── admin/          # Atelier admin management portal (Dashboard, Inventory, Orders, Roles)
│   │   ├── api/            # Next.js API route handlers (Products, Orders, Categories)
│   │   ├── globals.css     # Luxury design tokens, typography, and global animations
│   │   └── layout.tsx      # Root application layout with navigation & footer
│   ├── components/         # Modular UI components (Navigation, ProductCard, Modals, Logo, etc.)
│   ├── data/               # Seed catalog (products, categories)
│   └── lib/                # Database engine, data models, and utility helpers
├── package.json
└── tsconfig.json
```

---

## 📜 License

Private & Proprietary. All rights reserved by **Yzaaar Haute Couture**.
