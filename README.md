# Presspoint Laundry

A modern, responsive laundry service website built with React, Tailwind CSS, and Framer Motion.

## Features

- **Modern UI**: Clean, professional design with teal/blue color scheme
- **Responsive**: Mobile-first design that works on all screen sizes
- **Animated**: Smooth scroll-triggered animations using Framer Motion
- **Interactive**: Hero image carousel, hover effects, and glassmorphism navbar
- **Contact Form**: Form validation with loading states

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animations
- **Lucide React** - Icons

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn

### Installation

```bash
# Navigate to the React app directory
cd laundry-app

# Install dependencies
npm install
```

### Development

```bash
# Start the development server
npm run dev
```

The site will be available at `http://localhost:5173`

### Production Build

```bash
# Create optimized production build
npm run build

# Preview the production build locally
npm run preview
```

## Project Structure

```
laundry-app/
├── index.html              # HTML entry point
├── package.json            # Dependencies and scripts
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── postcss.config.js       # PostCSS configuration
├── public/
│   └── images/             # Static images (banners, services)
└── src/
    ├── main.jsx            # React entry point
    ├── App.jsx             # Main app component
    ├── index.css           # Global styles and Tailwind imports
    └── components/
        ├── Navbar.jsx      # Sticky navigation with glass effect
        ├── Hero.jsx        # Full-screen hero with image carousel
        ├── Services.jsx    # Service cards with animations
        ├── About.jsx       # Company info and stats
        ├── Contact.jsx     # Contact form with validation
        └── Footer.jsx      # Footer with links and social icons
```

## Sections

| Section | Description |
|---------|-------------|
| **Hero** | Full-screen with animated background carousel, stats, and CTA buttons |
| **Services** | Three service cards (Door to Door, Contract, Retail) with hover effects |
| **About** | Company tagline, key stats, and feature highlights |
| **Contact** | Order form with validation, contact info, and social links |
| **Footer** | Quick links, social media icons, and back-to-top button |

## Color Scheme

| Color | Hex | Usage |
|-------|-----|-------|
| Primary (Teal) | `#0891b2` | Buttons, links, accents |
| Secondary (Blue) | `#0f172a` | Dark backgrounds, text |
| Accent (Green) | `#10b981` | CTA buttons, success states |

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

## Legacy Files

The original static HTML/CSS site is preserved in the root directory:
- `Index.html` - Original HTML file
- `css/` - Original stylesheets
- `images/` - Original images (copied to `laundry-app/public/images/`)

## License

MIT
