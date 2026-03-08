# Sheabutter Museum Wellness Spa — React Project

A full React conversion of the Sheabutter Museum Wellness Spa Webflow template, with all animations, sections, and functionality preserved.

## Project Structure

```
zen-spa/
├── public/
│   └── index.html
├── src/
│   ├── assets/
│   │   ├── styles.css          # All global styles (replaces Webflow CSS)
│   │   └── images/             # Local image assets (see setup below)
│   ├── components/
│   │   ├── Header.jsx          # Sticky header with transparent/scrolled states
│   │   ├── Hero.jsx            # Full-screen hero with Ken Burns animation
│   │   ├── ServicesSlider.jsx  # Draggable services carousel
│   │   ├── About.jsx           # About section with scroll reveal
│   │   ├── Booking.jsx         # Tabbed booking packages (Silver/Gold/Diamond)
│   │   ├── SpaProducts.jsx     # Product showcase with hover effects
│   │   ├── Testimonials.jsx    # Client testimonials grid
│   │   ├── SocialFollow.jsx    # Social media follow section
│   │   ├── BlogSection.jsx     # Articles & news grid
│   │   ├── Footer.jsx          # Full footer with newsletter & links
│   │   ├── CartModal.jsx       # Slide-in cart drawer
│   │   └── LoadingScreen.jsx   # Page load animation
│   ├── App.jsx                 # Root component
│   └── index.js                # Entry point
├── download-images.js          # Script to download all images locally
└── package.json
```

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Download Images Locally
This downloads all images from the original Webflow CDN to your local `src/assets/images/` folder:
```bash
node download-images.js
```

### 3. Start Development Server
```bash
npm start
```

### 4. Build for Production
```bash
npm run build
```

## Features Preserved

- ✅ Loading screen animation
- ✅ Transparent header → scrolled header transition
- ✅ Mobile hamburger menu
- ✅ Hero with Ken Burns image animation + staggered text reveal
- ✅ Draggable services slider with arrow navigation
- ✅ Scroll-triggered reveal animations (all sections)
- ✅ About section with background decoration
- ✅ Tabbed booking packages with tab switching
- ✅ Product hover overlay effects
- ✅ Testimonials grid
- ✅ Social follow section
- ✅ Blog articles grid
- ✅ Footer with newsletter subscription form
- ✅ Cart drawer (slide-in modal)
- ✅ Fully responsive (mobile/tablet/desktop)

## Fonts
The project uses Google Fonts (loaded via CDN in index.html):
- **Lora** — serif display font (replaces Webflow's Lora)
- **Inter** — sans-serif body font

## Image Fallbacks
All image components include `onError` fallbacks with gradient backgrounds, so the site looks good even before downloading images.

## Notes
- The original Webflow animations use Webflow's proprietary JS. These have been recreated using IntersectionObserver for scroll reveals and CSS animations.
- Cart functionality is wired up but not connected to a backend — add your preferred e-commerce solution.
- Form submissions currently show a success state but don't send data — connect to your preferred backend/service (Mailchimp, ConvertKit, etc.)
