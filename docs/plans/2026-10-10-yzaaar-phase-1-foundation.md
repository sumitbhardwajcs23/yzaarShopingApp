# Yzaaar E-Commerce Platform — Phase 1: Foundation Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build Phase 1 (Foundation) of the Yzaaar luxury fashion e-commerce ecosystem, featuring an ultra-premium black-and-gold responsive storefront, product catalog with variants and image galleries, instant search & filters, persistent cart & wishlist, customer authentication & account dashboard, and a dedicated admin management portal for products, categories, stock, and staff roles.

**Architecture:** Next.js 15+ App Router application with TypeScript and a custom Vanilla CSS luxury design system tokenized for Haute Couture aesthetics (deep obsidian blacks, polished gold `#D4AF37`, champagne accents, refined serif & sans-serif typography). Backed by Next.js API routes with a reliable local JSON file persistence engine (`src/lib/db.ts`) simulating a scalable database for products, categories, inventory, customer accounts, carts, and admin activity logs.

**Tech Stack:** Next.js 15+, React 19, TypeScript, Vanilla CSS (CSS Modules & Global Tokens), Lucide Icons, Canvas Confetti.

---

### Task 1: Project Scaffolding & Configuration Setup

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.mjs`
- Create: `.gitignore`
- Create: `src/lib/utils.ts`

**Step 1: Write `package.json` with dependencies and scripts**
Create `package.json` with `name: "yzaaar"`, `next`, `react`, `react-dom`, `lucide-react`, `canvas-confetti`, and TypeScript devDependencies.

**Step 2: Run npm install**
Run: `npm install`
Expected: Successful package installation with `package-lock.json` generated.

**Step 3: Write `tsconfig.json` and `next.config.mjs`**
Configure path aliases (`@/*` mapping to `./src/*`), strict TypeScript checking, and Next.js configuration.

**Step 4: Verify Next.js build setup**
Run: `npx next --version`
Expected: Next.js CLI reports installed version.

---

### Task 2: Brand Identity, Design System Tokens & Global CSS

**Files:**
- Create: `src/app/globals.css`
- Create: `src/components/layout/YzaaarLogo.tsx`
- Create: `src/app/layout.tsx`

**Step 1: Create `src/app/globals.css`**
Implement the luxury black & gold design system:
- CSS Variables for color palette: Obsidian (`#0D0D0D`, `#161616`, `#222222`), Polished Gold (`#D4AF37`, `#E5C158`, `#AA820A`), Champagne (`#F9F5EC`, `#EFE8D8`), Silk Ivory (`#FDFBF7`), Pure White (`#FFFFFF`), Muted Slate (`#8A8A8E`), Borders (`#2A2A2A` / `#E8E2D2`), Success/Warning/Danger states.
- Luxury typography setup: Google Fonts (Cormorant Garamond / Playfair Display for headings and serif elegance, Montserrat / Outfit / Inter for clean legible modern UI).
- Glassmorphism, golden foil gradients (`linear-gradient(135deg, #BF953F 0%, #FCF6BA 25%, #B38728 50%, #FBF5B7 75%, #AA771C 100%)`), smooth micro-transitions, button styles, form controls, responsive resets.

**Step 2: Create `src/components/layout/YzaaarLogo.tsx`**
Create an authentic SVG vector logo reflecting the brand:
- Stylized golden ribbon 'Y' with metallic gradient.
- Bold serif typography 'ZAAR' featuring the coat hanger motif in the 'A' crossbars.
- Subtitle: "FASHION LIVES ONLINE" flanked by gold horizontal rules.
- Support for `light`, `dark`, and `monochrome` variations and custom sizing.

**Step 3: Create `src/app/layout.tsx`**
Root layout with Google Fonts imports, SEO meta tags, title template (`Yzaaar — Fashion Lives Online`), viewport settings, favicon link, and Providers wrapping.

---

### Task 3: Data Layer & Persistence Engine (`db.ts`)

**Files:**
- Create: `src/data/categories.json`
- Create: `src/data/initial-products.json`
- Create: `src/lib/types.ts`
- Create: `src/lib/db.ts`
- Create: `src/app/api/products/route.ts`
- Create: `src/app/api/categories/route.ts`

**Step 1: Define TypeScript interfaces in `src/lib/types.ts`**
- `Product`, `ProductVariant` (size, color, sku, stock, price, image), `ProductImage`, `ProductReview`.
- `Category`, `SubCategory`.
- `CartItem`, `WishlistItem`.
- `User`, `Address`, `Order`, `OrderStatus`.
- `AdminUser`, `AdminRole` (Super Admin, Manager, Inventory Staff, Support Staff, Content Editor), `ActivityLog`.

**Step 2: Prepare initial catalog data**
Write rich, realistic luxury fashion items in `initial-products.json` (Tailored Royal Tuxedo, Velvet Evening Gown, Cashmere Trench Coat, Silk Jacquard Blazer, Italian Leather Oxford Shoes, Handcrafted Leather Tote Bag, etc.) with multiple high-definition Unsplash fashion images, variants (Sizes XS–XXL, Colors Gold/Black/Champagne/Emerald/Navy), stock counts, ratings, and tags.

**Step 3: Implement file persistence in `src/lib/db.ts`**
Read/write helper that automatically stores products, categories, users, orders, and reviews in `.data/store.json`, falling back to `initial-products.json` on first boot. Thread-safe JSON write with atomic updates.

**Step 4: Create API route handlers**
- `GET /api/products` (supports search, category, sort, min/max price filters)
- `POST /api/products` (admin create)
- `GET /api/categories`

---

### Task 4: Storefront Navigation, Header & Luxury Footer

**Files:**
- Create: `src/components/layout/Header.tsx`
- Create: `src/components/layout/Footer.tsx`
- Create: `src/components/layout/MobileNav.tsx`
- Create: `src/components/layout/AnnouncementBar.tsx`
- Create: `src/components/storefront/WhatsAppButton.tsx`

**Step 1: Implement `AnnouncementBar.tsx`**
Top gold-accented strip: "Complimentary Express Delivery on Orders Above ₹5,000 | Curated Haute Couture 2026 Collection".

**Step 2: Implement `Header.tsx`**
- Brand logo linking to `/`.
- Main navigation menu (New Arrivals, Haute Couture, Men's Luxury, Women's Atelier, Accessories, Collections).
- Instant search input bar with animated dropdown suggestions.
- Action icons: Account, Wishlist (with counter badge), Cart (with item count & preview drawer trigger).
- Mobile hamburger menu toggle.

**Step 3: Implement `Footer.tsx`**
- Brand story & logo, newsletter subscription box with instant discount offer ("Subscribe for 10% off your first atelier purchase").
- Links: Customer Care, Track Order, Return & Exchange Policy, Size Guide, About Yzaaar, Terms & Conditions.
- Trust badges (100% Authentic, Secure Razorpay Payments, Express Delivery, GST Invoicing).
- Copyright and social links.

**Step 4: Implement `WhatsAppButton.tsx`**
Floating luxury gold & green WhatsApp support badge with quick inquiry link and "Order via WhatsApp" integration.

---

### Task 5: State Management (Cart, Wishlist & Auth Contexts)

**Files:**
- Create: `src/context/CartContext.tsx`
- Create: `src/context/WishlistContext.tsx`
- Create: `src/context/AuthContext.tsx`
- Create: `src/components/providers/AppProviders.tsx`

**Step 1: Implement `CartContext.tsx`**
- Persistent cart in `localStorage` & synchronized across tabs.
- `addToCart(product, variant, quantity)`, `updateQuantity(cartItemId, quantity)`, `removeFromCart(cartItemId)`, `clearCart()`.
- Computed values: `subtotal`, `tax` (GST calculation), `shippingFee` (free over ₹5,000), `discount`, `appliedCoupon`, `total`.
- Coupon engine supporting percentage, flat, and free-shipping discounts.

**Step 2: Implement `WishlistContext.tsx`**
- Persistent wishlist in `localStorage`.
- `toggleWishlist(productId)`, `isInWishlist(productId)`, `moveToCart(productId, variant)`.

**Step 3: Implement `AuthContext.tsx`**
- Customer session management (login, signup, logout, update profile, manage saved addresses).
- Admin session management with role-based checks (`isSuperAdmin`, `canManageProducts`, `canManageOrders`).

---

### Task 6: Homepage — Luxury Storefront Experience

**Files:**
- Create: `src/app/page.tsx`
- Create: `src/components/storefront/HeroBanner.tsx`
- Create: `src/components/storefront/CategoryGrid.tsx`
- Create: `src/components/storefront/ProductCard.tsx`
- Create: `src/components/storefront/FeaturedCollection.tsx`
- Create: `src/components/storefront/PromotionalStrip.tsx`
- Create: `src/components/storefront/ReviewsCarousel.tsx`

**Step 1: Implement `HeroBanner.tsx`**
High-fashion hero slider/showcase with opulent photography, bold editorial headline "The Art of Sartorial Elegance", gold call-to-action buttons ("Explore New Arrivals", "View Atelier"), and elegant micro-animations.

**Step 2: Implement `CategoryGrid.tsx`**
Visual luxury category cards with hover zoom transitions: Evening Wear, Bespoke Suits, Handcrafted Leather, Silk & Cashmere.

**Step 3: Implement `ProductCard.tsx`**
- Product primary & hover secondary image.
- Wishlist heart icon with smooth animation.
- Brand / category label, title, star rating, price & discounted price.
- Color swatches & size indicators.
- Quick "Add to Bag" button.

**Step 4: Implement `FeaturedCollection.tsx` & `PromotionalStrip.tsx`**
- Best Sellers tab and New Arrivals tab.
- Limited time luxury offer banner ("Exclusive Festive Edit — 20% Privilege on Handcrafted Tailoring").

**Step 5: Assemble `src/app/page.tsx`**
Combine sections with seamless luxury spacing and responsive layouts.

---

### Task 7: Product Catalog & Advanced Search/Filter Page (`/shop`)

**Files:**
- Create: `src/app/shop/page.tsx`
- Create: `src/components/storefront/ProductFilters.tsx`
- Create: `src/components/storefront/SortDropdown.tsx`

**Step 1: Implement `ProductFilters.tsx`**
- Category filter with hierarchy.
- Price range dual slider / selector.
- Size selector (XS, S, M, L, XL, XXL).
- Color selector with visual color pills.
- Availability toggle (In Stock only).
- Rating filter (4 stars and above).
- Reset filters button.

**Step 2: Implement `SortDropdown.tsx`**
- Sort options: Popularity, Price: Low to High, Price: High to Low, Customer Rating, Newest Arrivals.

**Step 3: Implement `src/app/shop/page.tsx`**
- Dynamic URL search params synchronization (`?category=...&sort=...&minPrice=...`).
- Active filter pill badges with individual remove chips.
- Grid layout adapting from 1 column on mobile to 3-4 columns on desktop.
- Empty state with suggestion to clear filters.

---

### Task 8: Product Detail Page with Variants, Gallery & Delivery Checker (`/shop/[slug]`)

**Files:**
- Create: `src/app/shop/[slug]/page.tsx`
- Create: `src/components/storefront/ProductGallery.tsx`
- Create: `src/components/storefront/VariantSelector.tsx`
- Create: `src/components/storefront/PincodeChecker.tsx`
- Create: `src/components/storefront/ProductReviews.tsx`

**Step 1: Implement `ProductGallery.tsx`**
- Main featured image with interactive hover zoom magnification.
- Thumbnails carousel with active indicator.
- Fullscreen lightbox modal option.

**Step 2: Implement `VariantSelector.tsx`**
- Color selection updating the active variant images and SKU.
- Size selection buttons showing stock availability (e.g., "Only 2 left" warning).
- Size guide modal ("View Size Chart" with measurements in inches/cm).

**Step 3: Implement `PincodeChecker.tsx`**
- Real-time Indian pincode serviceability check.
- Shows estimated delivery date (e.g. "Order in next 3 hrs for delivery by Thursday").
- Cash on Delivery availability indicator.

**Step 4: Implement "Order on WhatsApp" and Add to Bag buttons**
- Primary "Add to Bag" gold button with quantity counter.
- Secondary "Buy Now" button.
- "Order on WhatsApp" button that opens WhatsApp prefilled with product title, selected size/color, price, and URL.

**Step 5: Implement `ProductReviews.tsx`**
- Verified customer reviews, star breakdown bar chart.
- "Write a Review" form with star selector and review text submission.

---

### Task 9: Shopping Cart & Wishlist Pages (`/cart`, `/wishlist`)

**Files:**
- Create: `src/app/cart/page.tsx`
- Create: `src/app/wishlist/page.tsx`
- Create: `src/components/cart/CartItemRow.tsx`
- Create: `src/components/cart/OrderSummary.tsx`
- Create: `src/components/cart/CouponInput.tsx`

**Step 1: Implement `src/app/cart/page.tsx`**
- Cart items list with thumbnail, title, selected size/color, unit price, quantity increment/decrement, and remove button.
- Free shipping progress bar (e.g. "Add ₹1,200 more for Complimentary Express Shipping").
- Order summary with Subtotal, GST (18%), Shipping, Discount, Total.
- Coupon apply input with working coupon codes: `YZAAR10` (10% off), `ROYAL500` (₹500 flat off), `FREESHIP` (Free shipping).
- "Proceed to Checkout" button leading to the checkout experience.

**Step 2: Implement `src/app/wishlist/page.tsx`**
- Grid of saved products with "Move to Bag" button and remove icon.
- Empty state with "Explore The Collection" link.

---

### Task 10: Customer Authentication & Account Portal (`/account`)

**Files:**
- Create: `src/app/account/login/page.tsx`
- Create: `src/app/account/register/page.tsx`
- Create: `src/app/account/page.tsx`
- Create: `src/components/account/AddressBook.tsx`
- Create: `src/components/account/OrderHistory.tsx`
- Create: `src/components/account/SupportTickets.tsx`

**Step 1: Implement Login & Registration**
- Clean luxury gold-accented auth forms.
- Demo quick-fill accounts ("Demo Customer", "Demo Admin") for instant testing.
- Form validation and feedback alerts.

**Step 2: Implement Customer Dashboard (`/account`)**
- Tabbed interface:
  1. Profile & Password settings.
  2. Order History with tracking status timeline (Placed -> Confirmed -> Packed -> Shipped -> Out for Delivery -> Delivered).
  3. Saved Delivery Addresses (Add, edit, set default shipping address).
  4. Wishlist shortcuts.
  5. Customer Support Tickets (Create ticket, view resolution status).

---

### Task 11: Admin Management Portal (`/admin`)

**Files:**
- Create: `src/app/admin/layout.tsx`
- Create: `src/app/admin/login/page.tsx`
- Create: `src/app/admin/page.tsx` (Dashboard Overview & KPIs)
- Create: `src/app/admin/products/page.tsx` (Product Catalog Manager)
- Create: `src/app/admin/products/new/page.tsx` (Create & Edit Product)
- Create: `src/app/admin/categories/page.tsx` (Category Tree Manager)
- Create: `src/app/admin/inventory/page.tsx` (Stock & Low-Stock Alerts)
- Create: `src/app/admin/roles/page.tsx` (Admin Team Roles & Activity Logs)

**Step 1: Implement Admin Auth & Layout**
- Role-based sidebar: Super Admin, Store Manager, Inventory Staff, Support Staff.
- Navigation links with badge counters (e.g., Low Stock count).
- Top bar with admin profile, quick storefront link, and logout.

**Step 2: Implement Admin Dashboard (`/admin`)**
- Key metrics: Total Revenue (₹), Total Orders, Average Order Value (AOV), Active Customers, Low-Stock items.
- Recent Orders table with status chips and action buttons.
- Quick action shortcuts (Add Product, View Inventory, Export CSV).

**Step 3: Implement Product Manager (`/admin/products` & `/new`)**
- Product table with thumbnail, title, category, price, stock, status (Active/Draft), and actions (Edit, Duplicate, Delete).
- Full product creation form:
  - Title, slug, description, category.
  - Price, compare-at price, cost per item.
  - Variant manager: Add sizes and colors with individual SKU, stock, and price.
  - Image URLs manager with preview.
  - SEO title and meta description.

**Step 4: Implement Category & Inventory Managers**
- Category manager: Add and reorganize categories.
- Inventory manager: Real-time stock counts, adjust stock levels (+/-), low-stock warning threshold.

**Step 5: Implement Team Roles & Activity Log**
- Staff users list with assigned roles.
- Audit trail showing recent administrative actions (e.g. "Super Admin updated stock for Velvet Evening Gown").

---

### Task 12: End-to-End Verification, Performance & Visual Polish

**Step 1: Verify TypeScript & Build**
Run: `npm run build`
Expected: Zero build errors, all routes statically/dynamically generated.

**Step 2: Launch Dev Server & Verify Storefront in Browser**
Run: `npm run dev`
Verify:
- Homepage hero, category cards, product grids, animations.
- Shop catalog with interactive filters and sorting.
- Product detail page with gallery zoom, variant selector, and WhatsApp order link.
- Cart with coupon codes and tax calculation.
- Account dashboard and addresses.
- Admin dashboard, product creation, and inventory management.

**Step 3: Record Browser Demo & Visual Validation**
Capture browser interactions to verify responsive styling, gold metallic accents, and smooth workflows.
