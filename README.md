# Ghuro - Travel Booking Platform 🌍✈️

A modern, comprehensive travel booking application built with React, TypeScript, and Vite. Ghuro offers an immersive travel experience with stunning visuals, smooth animations, and intuitive user interface designed to inspire wanderlust and simplify travel planning.

## 🚀 Live Demo

**Production Site**: [https://ghuro.vercel.app/](https://ghuro.vercel.app/)

## ✨ Key Features

### 🎨 Modern Design & UX

- **Yellow Theme**: Warm, inviting color scheme that evokes sunshine and adventure
- **Full-Screen Layouts**: Immersive hero sections and full-width components
- **Smooth Animations**: Framer Motion powered transitions and micro-interactions
- **Responsive Design**: Pixel-perfect across desktop, tablet, and mobile devices

### 🔍 Smart Search & Discovery

- **Intelligent Search**: Advanced search with recent searches and suggestions
- **Dynamic Filtering**: Filter by price, rating, location, duration, and activities
- **Bangladesh Destinations**: Curated collection of beautiful Bangladesh locations
- **Destination Details**: Rich destination pages with YouTube video integration

### 📱 Core Functionality

- **User Authentication**: Secure login/signup with persistent sessions
- **Booking System**: Streamlined booking flow with confirmation emails
- **Wishlist Management**: Save and organize favorite destinations
- **User Dashboard**: Personal dashboard with statistics and booking history
- **Notifications Center**: Real-time updates and travel tips

### 🎥 Media & Content

- **YouTube Integration**: Embedded destination videos in modal dialogs
- **High-Quality Images**: Curated photography showcasing destinations
- **Interactive Elements**: Hover effects, animations, and smooth transitions
- **About Page**: Comprehensive company information and team details

### 🌟 Enhanced User Experience

- **404 Page**: Creative, travel-themed error page with floating animations
- **Loading States**: Smooth loading animations and skeleton screens
- **Toast Notifications**: User-friendly feedback for all actions
- **Local Storage**: Persistent user preferences and recent searches

## 🛠️ Technology Stack

- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS 4.x with custom yellow theme
- **Animations**: Framer Motion for smooth transitions
- **Icons**: Lucide React for consistent iconography
- **Routing**: React Router DOM 7 with nested routes
- **State Management**: React Context + TanStack Query for server state
- **Video**: YouTube embed integration
- **Build Tool**: Vite 7 for fast development and building
- **Deployment**: Vercel with automatic deployments

## 🏃‍♂️ Quick Start

### Prerequisites

- Node.js 18+ (Latest LTS recommended)
- npm or yarn package manager

### Installation

1. **Clone the repository:**

```bash
git clone https://github.com/salsadsid/ghuro.git
cd ghuro
```

2. **Install dependencies:**

```bash
npm install
# or
yarn install
```

3. **Start the development server:**

```bash
npm run dev
# or
yarn dev
```

4. **Open your browser:**
   Navigate to [http://localhost:5173](http://localhost:5173)

## 📦 Build & Deployment

### Development Build

```bash
npm run build
npm run preview
```

### Production Deployment

#### Vercel (Recommended)

```bash
npx vercel --prod
```

## 📁 Project Architecture

```
src/
├── components/
│   ├── ui/                 # Base UI components (shadcn/ui)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   └── ...
│   ├── shared/             # Shared components
│   │   └── Navbar.tsx
│   ├── SearchBox.tsx       # Smart search component
│   ├── HomeExtraSection.tsx # Home page sections
│   ├── Footer.tsx          # Site footer
│   └── Wishlist.tsx        # Wishlist functionality
├── pages/
│   ├── Home.tsx            # Landing page with hero & destinations
│   ├── About.tsx           # Company information
│   ├── Dashboard.tsx       # User dashboard
│   ├── Notifications.tsx   # Notifications center
│   ├── DestinationDetails.tsx # Destination detail pages
│   ├── NotFound.tsx        # Creative 404 page
│   └── Auth.tsx            # Authentication
├── contexts/
│   └── AuthContext.tsx     # Authentication state management
├── layouts/
│   └── MainLayout.tsx      # Main application layout
├── lib/
│   ├── utils.ts            # Utility functions
│   └── toast/              # Toast notification system
├── types/
│   └── index.ts            # TypeScript type definitions
└── assets/                 # Static assets
```

## 🎨 Design System

### Color Palette

- **Primary**: Yellow (#EAB308) - Sunshine and adventure
- **Secondary**: Orange (#F97316) - Energy and enthusiasm
- **Neutral**: Gray scales for text and backgrounds
- **Accent**: Red (#DC2626) for call-to-action elements

### Components

- **Consistent Spacing**: 4px grid system with Tailwind utilities
- **Typography**: Hierarchical text scales with proper contrast
- **Interactive Elements**: Hover states and smooth transitions
- **Responsive Breakpoints**: Mobile-first design approach

## 🌟 Featured Destinations

The app showcases a curated collection of destinations including:

### International Destinations

- **Paris, France** - City of Light and romance
- **Santorini, Greece** - Stunning island paradise
- **Tokyo, Japan** - Modern metropolis meets tradition
- **Banff, Canada** - Majestic mountain landscapes

### Bangladesh Highlights

- **Cox's Bazar** - World's longest sea beach
- **Sundarbans** - UNESCO World Heritage mangrove forest
- **Sylhet** - Tea gardens and natural beauty
- **Bandarban** - Hill tracts and indigenous culture
- **Saint Martin's Island** - Pristine coral island
- **Rangamati** - Lake city in the hills

## 🔧 Development Guidelines

### Code Standards

- **TypeScript**: Strict type checking enabled
- **ESLint**: Code linting and formatting
- **Component Patterns**: Consistent functional components with hooks
- **File Organization**: Feature-based folder structure

### Best Practices

- **Performance**: Lazy loading and code splitting
- **Accessibility**: ARIA labels and semantic HTML
- **SEO**: Meta tags and proper document structure
- **Mobile-First**: Responsive design from the ground up

## 🚀 Performance Features

- **Vite HMR**: Hot module replacement for fast development
- **Code Splitting**: Automatic route-based code splitting
- **Image Optimization**: Responsive images with proper lazy loading
- **Animation Optimization**: Hardware-accelerated CSS animations
- **Bundle Analysis**: Optimized build output with tree shaking

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes**: Follow the coding standards
4. **Test thoroughly**: Ensure all features work as expected
5. **Commit with clear messages**: `git commit -m 'Add amazing feature'`
6. **Push to your branch**: `git push origin feature/amazing-feature`
7. **Open a Pull Request**: Describe your changes clearly

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📧 Contact & Support

- **Developer**: Salman Sadik Siddiquee
- **Email**: [salman.dnj@gmail.com](mailto:salman.dnj@gmail.com)
- **GitHub**: [@salsadsid](https://github.com/salsadsid)

For bug reports, feature requests, or general questions, please open an issue on GitHub.

---

**Built with ❤️ and wanderlust** | © 2025 Ghuro Travel
