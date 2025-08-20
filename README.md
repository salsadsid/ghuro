# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Ghuro - Travel Booking Platform

A modern, feature-rich travel booking application built with React, TypeScript, and Vite.

## 🚀 Live Demo

**Production Site**: [https://ghuro-v2n43gux5-salsadsids-projects.vercel.app](https://ghuro-v2n43gux5-salsadsids-projects.vercel.app)

## ✨ Features

- **Modern UI/UX**: Clean, responsive design with enhanced typography and spacing
- **Advanced Filtering**: Filter destinations by price, rating, location, duration, and activities
- **User Dashboard**: Personal dashboard with booking history and statistics
- **Wishlist System**: Save and manage favorite destinations
- **Review & Rating**: Rate and review destinations with star ratings
- **Notifications Center**: Stay updated with booking confirmations and travel tips
- **Authentication**: Secure user authentication system
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices

## 🛠️ Technology Stack

- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS 4.x
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Routing**: React Router DOM 7
- **State Management**: React Context + TanStack Query
- **Build Tool**: Vite 7
- **Deployment**: Vercel

## 🏃‍♂️ Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/salsadsid/ghuro.git
cd ghuro
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## 📦 Build for Production

```bash
npm run build
```

## 🚀 Deployment Options

### Vercel (Recommended)

```bash
npx vercel --prod
```

### Netlify

1. Install Netlify CLI: `npm install -g netlify-cli`
2. Build the project: `npm run build`
3. Deploy: `netlify deploy --prod --dir=dist`

### Firebase Hosting

1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Initialize: `firebase init hosting`
4. Build: `npm run build`
5. Deploy: `firebase deploy`

### GitHub Pages

The repository includes a GitHub Actions workflow that automatically deploys to GitHub Pages on push to main/master branch.

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (Button, Card, etc.)
│   ├── shared/         # Shared components (Navbar, etc.)
│   ├── FilterPanel.tsx # Advanced filtering component
│   ├── Wishlist.tsx    # Wishlist functionality
│   └── ReviewSection.tsx # Review and rating system
├── pages/              # Page components
│   ├── Home.tsx        # Landing page with destinations
│   ├── Dashboard.tsx   # User dashboard
│   └── Notifications.tsx # Notifications center
├── contexts/           # React Context providers
├── layouts/            # Layout components
├── lib/               # Utility functions
└── types/             # TypeScript type definitions
```

## 🎨 Features in Detail

### Advanced Filtering

- **Price Range**: Custom slider component for price filtering
- **Star Ratings**: Filter by destination ratings (1-5 stars)
- **Location-based**: Filter by specific locations
- **Duration**: Filter trips by length (1-14+ days)
- **Activities**: Toggle filters for different activity types

### User Dashboard

- **Statistics Overview**: Total bookings, spending, upcoming trips
- **Booking History**: Complete history with status tracking
- **Quick Actions**: Easy navigation to key features

### Wishlist System

- **Easy Saving**: One-click heart button to save destinations
- **Management**: Dedicated wishlist page with sorting options
- **Smart Sorting**: Sort by date added, price, or rating

### Review System

- **Star Ratings**: Interactive 5-star rating input
- **Text Reviews**: Detailed review submission
- **Helpful Voting**: Community-driven review quality
- **Statistics**: Average ratings and review counts

## 🔧 Development

### Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Style

This project uses:

- ESLint for code linting
- TypeScript for type safety
- Tailwind CSS for styling
- Consistent component patterns

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📧 Contact

For questions or support, please contact [salman.dnj@gmail.com](mailto:salman.dnj@gmail.com)

---

Built with ❤️ using React + TypeScript + Vite

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```
