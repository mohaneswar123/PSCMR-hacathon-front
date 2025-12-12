# 🌟 ShareGo Frontend

**Tagline:** *Share More. Waste Less.*

A premium, modern web platform enabling users to share fields, vehicles, food offers, and tickets with a warm, friendly, and aesthetic UI.

---

## 🎯 Platform Features

### 🏞️ Field Sharing
Share unused land and spaces with the community

### 🚗 Vehicle Sharing
Rent out cars, bikes, or any vehicle when idle

### 🛒 Food Offers ✨ NEW!
Shops can list nearly expiring items (groceries, electronics, cosmetics) at huge discounts to reduce waste

### 🎟️ Ticket Selling
Sell extra event tickets to fellow enthusiasts

---

## 🎨 Design System

### Brand Color Palette

```css
--primary: #5D688A        /* Deep bluish gray — trust, stability */
--accent-warm: #F7A5A5    /* Soft warm red — friendliness */
--accent-peach: #FFDBB6   /* Peach cream — comfort */
--bg-light: #FFF2EF       /* Light rose — calm minimal background */
```

### Design Principles

- **Glassmorphism**: Frosted glass cards with blur effects
- **Smooth Animations**: Hover lifts, glow effects, shine sweeps
- **Gradient Overlays**: Warm gradients using brand palette
- **Micro-interactions**: Button ripples, tile transforms, page transitions
- **Typography**: Inter font family with gradient text for headings
- **Rounded Corners**: 16px radius for premium feel
- **Soft Shadows**: Layered shadows with brand color tints

---

## ✨ Key Features

### UI Components

- **Glassmorphic Navbar**: Sticky, blurred background with gradient brand logo
- **Hero Section**: Animated tagline with gradient text
- **Premium Tiles**: Hover lift + glow + shine sweep effects
- **Form Inputs**: Focus states with soft glow rings
- **CTA Buttons**: Gradient backgrounds with shadow elevation on hover
- **Card Lists**: Glassmorphic cards with animated borders

### Animations

- Page fade-in transitions (0.4s ease-out)
- Tile hover transforms (translateY + scale)
- Shine sweep effects on cards
- Smooth color transitions
- Float-in animations for forms

---

## 🚀 Setup

1. Configure backend API:

```env
VITE_API_BASE_URL=http://localhost:8080
```

2. Install and run:

```bash
npm install
npm run dev
```

---

## 📂 Architecture

- **Single API Layer**: `src/api/api.js` (centralized axios calls)
- **Global Context**: `src/context/AppContext.jsx` (auth + actions)
- **Protected Routes**: Login-gated pages via `ProtectedRoute`
- **Shared Styles**: Modular CSS with design tokens

### Pages

- **Dashboard**: Fullscreen hero with scroll sections and feature cards
- **Login / Register**: Glassmorphic authentication forms
- **Add Forms**: Field, Vehicle, Food Offer, Ticket (structured with sections)
- **List Views**: Glassmorphic cards with "I'm interested" buttons
- **Requests**: Accept/Reject interface with phone display

---

## 🎯 User Flow

1. **Browse**: Public access to fullscreen dashboard with scroll sections
2. **Login**: Glassmorphic auth forms with warm gradients
3. **Add Items**: Protected forms with organized sections and validation
4. **Express Interest**: Click "I'm interested" on any listing (sends request)
5. **Manage Requests**: Accept/Reject incoming requests, cancel your requests
6. **Contact**: Phone numbers displayed for accepted requests

---

## 🌈 Theme Highlights

### Navbar
- Gradient logo text
- Frosted glass background
- Hover animations on links

### Dashboard
- Warm gradient hero section
- Animated action tiles with icons
- Shine sweep effect on hover

### Forms
- Soft focus glow rings
- Gradient submit buttons
- Success/error states with brand colors

### Cards
- Glassmorphic backdrop blur
- Border glow on hover
- Smooth lift animations

---

## 🔧 Tech Stack

- React 19
- React Router DOM
- Axios
- Context API
- CSS Variables + Animations
- Vite

---

## 📱 Responsive Design

- Mobile-first approach
- Adaptive grid layouts
- Touch-friendly buttons
- Collapsible navigation

---

## 🎨 CSS Utilities

```css
/* Gradient Text */
background: linear-gradient(135deg, var(--primary), var(--accent-warm));
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;

/* Glass Card */
background: rgba(255, 255, 255, 0.8);
backdrop-filter: blur(20px);
border: 1px solid rgba(255, 255, 255, 0.6);

/* Hover Lift */
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
transform: translateY(-8px);
box-shadow: var(--shadow-glow);
```

---

**Built with ❤️ for the ShareGo community**
