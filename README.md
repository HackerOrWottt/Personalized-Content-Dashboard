# Personalized Content Dashboard

A modern, responsive dashboard application built with Next.js, TypeScript, and Redux Toolkit that provides personalized content from multiple sources including news, movies, and social media.

## 🚀 Features

### Core Features
- **Personalized Content Feed**: Curated content based on user preferences
- **Multi-Source Integration**: News API, TMDB (movies), and mock social media API
- **Interactive Content Cards**: Rich content cards with images, descriptions, and actions
- **Advanced Search**: Debounced search across all content types
- **Favorites System**: Save and manage favorite content
- **Drag & Drop**: Reorder content cards with smooth animations

### UI/UX Features
- **Dark Red Theme**: Attractive dark theme with red accent colors
- **Responsive Design**: Mobile-first design that works on all devices
- **Dark/Light Mode**: Toggle between themes with CSS custom properties
- **Smooth Animations**: Framer Motion animations throughout the app
- **Real-time Notifications**: Toast notifications for user actions

### Technical Features
- **Next.js 14**: Latest Next.js with App Router
- **TypeScript**: Full type safety throughout the application
- **Redux Toolkit**: State management with RTK Query for API calls
- **Tailwind CSS**: Utility-first CSS framework
- **Redux Persist**: Persistent state across browser sessions
- **Responsive Layout**: Sidebar navigation with mobile-friendly design

## 🛠 Tech Stack

- **Framework**: Next.js 14 with TypeScript
- **State Management**: Redux Toolkit with RTK Query
- **Styling**: Tailwind CSS with custom theme
- **Animations**: Framer Motion
- **Drag & Drop**: @hello-pangea/dnd
- **Testing**: Jest + React Testing Library
- **Persistence**: Redux Persist

## 📦 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd personalized-content-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables** (Optional)
   Create a `.env.local` file for API keys:
   ```env
   NEWS_API_KEY=your_news_api_key
   TMDB_API_KEY=your_tmdb_api_key
   ```
   
   *Note: The app includes mock data and will work without API keys for demonstration purposes.*

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Usage Guide

### Getting Started
1. **Dashboard Overview**: The main dashboard shows your personalized feed
2. **Preferences**: Click the settings icon to configure your preferences
3. **Navigation**: Use the sidebar to switch between different sections
4. **Search**: Use the search bar to find specific content

### Key Features

#### Personalized Feed
- Content is curated based on your selected categories
- Mix of news, movies, and social media posts
- Infinite scrolling for continuous content discovery

#### Search Functionality
- Real-time search with debouncing
- Search across all content types
- Filter results by type (news, movies, social)

#### Favorites Management
- Click the heart icon on any content card to save it
- View all favorites in the dedicated Favorites section
- Persistent across browser sessions

#### Drag & Drop Organization
- Enable drag & drop mode in the personalized feed
- Reorder content cards by dragging
- Changes are saved automatically

#### Theme Customization
- Toggle between light and dark modes
- Consistent dark red accent color throughout
- Responsive design for all screen sizes

## 🧪 Testing

Run the test suite:
```bash
# Unit tests
npm test

# Watch mode
npm run test:watch

# E2E tests (if configured)
npm run test:e2e
```

## 🏗 Project Structure

```
src/
├── app/                    # Next.js App Router
├── components/
│   ├── dashboard/          # Dashboard-specific components
│   │   ├── sections/       # Content sections
│   │   └── ...
│   ├── ui/                 # Reusable UI components
│   └���─ theme-provider.tsx  # Theme management
├── store/                  # Redux store configuration
│   ├── api/               # RTK Query API slices
│   ├── slices/            # Redux slices
│   └── hooks.ts           # Typed Redux hooks
├── types/                 # TypeScript type definitions
├── utils/                 # Utility functions
└── __tests__/             # Test files
```

## 🎨 Design System

### Color Palette
- **Primary Red**: #dc2626 (Accent color)
- **Dark Background**: #0f0f0f
- **Dark Surface**: #1a1a1a
- **Dark Border**: #333333
- **Text Colors**: White/Gray variants

### Typography
- **Font**: Inter (Google Fonts)
- **Headings**: Bold weights with proper hierarchy
- **Body**: Regular weight with good contrast

### Components
- **Cards**: Consistent spacing and hover effects
- **Buttons**: Multiple variants with loading states
- **Inputs**: Focus states with red accent
- **Animations**: Smooth transitions and micro-interactions

## 🚀 Deployment

### Build for Production
```bash
npm run build
npm start
```

### Deployment Options
- **Vercel**: Recommended for Next.js applications
- **Netlify**: Static site deployment
- **AWS/Google Cloud**: Custom deployment solutions

## 🔧 Configuration

### API Integration
The app integrates with multiple APIs:
- **News API**: For latest news content
- **TMDB API**: For movie recommendations
- **Mock Social API**: Simulated social media posts

### User Preferences
Configurable options include:
- Content categories
- Country/region
- Language
- Items per page
- Notification settings

## 📱 Browser Support

- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- **Next.js Team**: For the amazing framework
- **Redux Toolkit**: For simplified state management
- **Tailwind CSS**: For utility-first styling
- **Framer Motion**: For smooth animations
- **API Providers**: News API, TMDB for content sources

## 📞 Support

For support or questions, please open an issue in the repository.

---

**Built with ❤️ by Abhishek Varma**
