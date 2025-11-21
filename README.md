# 🌌 Sakthi's Space - Digital Portfolio

A beautiful, responsive single-page portfolio website featuring a modern "Glassmorphism" aesthetic with a space-themed narrative.

## ✨ Features

- **🪐 Space Theme**: Immersive glassmorphism design with animated background orbs and deep space aesthetics
- **🎨 Typography**: Modern font combinations (Poppins, Quicksand, Inter)
- **🌈 Time-Based Color Themes**: Automatic color schemes that change throughout the day
  - 🌅 **Dawn** (5-8 AM): Soft pink and purple sunrise gradients
  - ☀️ **Morning** (8 AM-12 PM): Bright cream to light blue gradients
  - 🌤️ **Afternoon** (12-5 PM): Warm yellow to peach gradients
  - 🌆 **Evening** (5-8 PM): Golden hour orange to pink gradients
  - 🌙 **Night** (8 PM-5 AM): Deep blue to purple dark theme
- **🔦 Spotlight Effects**: Interactive hover effects on project cards that track cursor movement
- **🇮🇳 Multilingual Loading Screen**: Animated slideshow greeting in multiple Indian languages
- **👁️ Live Visitor Counter**: Real-time view count powered by Firebase Realtime Database with animated gradient display
- **📱 Responsive Design**: Optimized for mobile and desktop with custom glass scrollbars
- **⚡ Smooth Animations**: Framer Motion powered scroll, hover, and page transitions
- **🤖 AI Chat Assistant**: Intelligent chat widget powered by Google Gemini to answer portfolio questions
- **📬 Contact Form**: EmailJS integration for seamless message delivery
- **📝 Medium Blog Integration**: Flowing blog posts display from Medium RSS feed
- **🐱 Oneko Pixel Pet**: Interactive pixel companion that follows your cursor
- **🎯 Interactive Elements**: 
  - Spotlight hover cards
  - Glassmorphism UI components
  - Animated background blobs
  - Custom "Space" terminology (Mission Brief, Tech Stack, Transmission)

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS (Glassmorphism & Animations)
- **Animations**: Framer Motion
- **Icons**: Lucide React & React Icons
- **Build Tool**: Vite
- **Backend Services**:
  - Firebase Realtime Database (Visitor Counter)
  - EmailJS (Contact Form)
  - Google Gemini AI (Chat Assistant)
- **Fonts**: Google Fonts (Poppins, Quicksand, Inter)

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Firebase account (for visitor counter)
- EmailJS account (for contact form)
- Google Gemini API key (for chat assistant)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Sakthi102003/Notebook.git
cd Notebook
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables (see Environment Setup section below)

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and visit `http://localhost:5173`

## 🔐 Environment Setup

Create a `.env.local` file in the project root and add the following variables:

```bash
# EmailJS (Contact form)
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id

# Firebase Configuration (Visitor Counter)
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://your_project-rtdb.firebaseio.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### Service Setup Guides:

#### EmailJS Setup
1. Create account at [https://www.emailjs.com/](https://www.emailjs.com/)
2. Add email service (Gmail, Outlook, etc.)
3. Create email template
4. Copy Service ID, Template ID, and Public Key to `.env.local`

#### Firebase Setup (Visitor Counter)
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use existing one
3. Enable **Realtime Database**
4. Set database rules (see `FIREBASE-SETUP.md` for detailed instructions)
5. Get configuration from Project Settings
6. Add credentials to `.env.local`

For detailed Firebase setup instructions, see [docs/FIREBASE-SETUP.md](docs/FIREBASE-SETUP.md)

#### Google Gemini Setup (Chat Assistant)
1. Get API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Add to your environment variables
3. Configure in chat widget component

**Security Note**: For production, proxy API requests through a backend server to protect your API keys.

## 📁 Project Structure

```
Notebook/
├── src/                      # Source code
│   ├── components/           # React components
│   │   ├── ChatWidget.tsx
│   │   ├── ContactForm.tsx
│   │   ├── FlowingBlogRiver.tsx
│   │   ├── SpotlightCard.tsx # New: Hover effect card
│   │   ├── QuotesSection.tsx
│   │   └── VisitorCounter.tsx
│   ├── services/             # Backend integrations
│   │   ├── firebase.ts
│   │   └── openai.ts
│   ├── utils/                # Utility functions
│   ├── assets/               # Static assets
│   ├── App.tsx               # Main app component
│   ├── main.tsx              # Entry point
│   └── index.css             # Global styles & Tailwind
│
├── public/                   # Public assets
│   ├── images/               # Image files
│   └── oneko/                # Oneko pixel pet files
│
├── api/                      # API routes (Vercel)
│   ├── chat.js               # Chat API
│   └── medium.js             # Medium blog API
│
├── docs/                     # Documentation
│   ├── FIREBASE-SETUP.md
│   ├── MEDIUM-BLOG-SYNC-GUIDE.md
│   ├── TIME-BASED-THEME-GUIDE.md
│   ├── ONEKO-GUIDE.md
│   └── CHANGES-LOG.md
│
├── scripts/                  # Build/dev scripts
│   └── dev-server.js
│
├── tests/                    # Test files
│   └── TEST-BLOG-API.html
│
├── index.html                # HTML entry
├── package.json              # Dependencies
├── vite.config.ts            # Vite configuration
├── tailwind.config.js        # Tailwind configuration
├── tsconfig.json             # TypeScript configuration
└── README.md                 # This file
```

## 🎨 Design Features

### Sections (Space Terminology)
1. **Home** - "Explore My Universe" with animated background orbs
2. **Mission Brief** (About) - Personal introduction with glassmorphism cards
3. **Tech Stack** (Skills) - Interactive grid with tech stack icons
4. **Projects** - Spotlight cards with hover glow effects
5. **Transmission** (Contact) - Contact form with EmailJS integration
6. **Blog River** - Flowing Medium blog posts
7. **Footer** - Live visitor counter with animated display

### Styling Elements
- **Glassmorphism**: `backdrop-blur`, semi-transparent backgrounds, and subtle borders
- **Spotlight Effects**: Cards that track mouse movement for a flashlight effect
- **Animated Backgrounds**: Floating blobs (`BackgroundOrbs`) for depth
- **Custom Scrollbar**: Slim, transparent scrollbar matching the glass theme
- **Typography**: Poppins (Headings), Quicksand (Accents), Inter (Body)

## 🌈 Time-Based Theme System

The portfolio features an innovative **automatic color theme system** that changes based on the time of day:

### How It Works
- **Automatic Detection**: Checks your local time on page load and every minute
- **5 Unique Themes**: Dawn, Morning, Afternoon, Evening, Night
- **Smooth Transitions**: 1-second fade transitions between color schemes
- **Visual Indicator**: Emoji icon (🌅☀️🌤️🌆🌙) shows current time period in navbar

### Theme Schedule
| Time Period | Hours | Theme Colors | Mood |
|-------------|-------|-------------|------|
| 🌅 Dawn | 5-8 AM | Pink & Purple gradients | Peaceful sunrise |
| ☀️ Morning | 8 AM-12 PM | Cream & Blue gradients | Energetic & bright |
| 🌤️ Afternoon | 12-5 PM | Yellow & Peach gradients | Warm & productive |
| 🌆 Evening | 5-8 PM | Orange & Pink gradients | Golden hour vibes |
| 🌙 Night | 8 PM-5 AM | Deep Blue & Purple | Dark mode comfort |

### Implementation Details
- CSS custom properties in `src/index.css` define each theme
- React state in `App.tsx` manages current time period
- All `dark:` Tailwind classes activate during night theme
- Background gradients applied to `<body>` element
- Navigation and UI elements adapt to each theme

For more details, see [TIME-BASED-THEME-GUIDE.md](TIME-BASED-THEME-GUIDE.md)

## 👁️ Visitor Counter

The portfolio includes a beautiful, real-time visitor counter powered by Firebase:

### Features
- **Real-Time Updates**: Count updates live across all visitors
- **Persistent Storage**: Firebase Realtime Database stores the count
- **Animated Display**: Gradient effects, pulse animations, and smooth transitions
- **Compact Design**: Beautiful badge that doesn't overwhelm the layout
- **Live Indicator**: Pulsing dot shows real-time status

### How It Works
1. When someone visits your portfolio, Firebase increments the count
2. The counter displays in the footer with animated digits
3. All visitors see the same count in real-time
4. Count persists across deployments and refreshes

See [FIREBASE-SETUP.md](FIREBASE-SETUP.md) for setup instructions.

## 🔧 Customization

### Colors
The color scheme automatically changes based on the time of day (see `src/index.css`):
- Each time period has custom background gradients
- Adaptive navigation and text colors
- Unique primary/secondary color schemes
- Smooth 1-second transitions between themes

### Fonts
- **Headings**: Poppins (Modern Sans-Serif)
- **Accents**: Quicksand (Rounded Sans-Serif)
- **Body**: Inter (Clean Sans-Serif)

### Animations
Powered by Framer Motion with custom keyframes:
- `animate-blob`: Floating background orbs
- `spotlight`: Mouse-tracking glow effect
- `fade-in` & `slide-up`: Section reveal animations
- Theme transitions with 1000ms duration for smooth color changes
- Visitor counter digit animations

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Breakpoints**: Tailwind's default responsive breakpoints (sm, md, lg, xl)
- **Navigation**: Collapsible mobile menu with smooth animations
- **Grid Layouts**: Responsive grid systems for all sections
- **Touch Friendly**: Large tap targets and smooth scrolling

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Deploy to Firebase Hosting (Recommended)
```bash
firebase deploy
```

### Deploy to Netlify/Vercel
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables in hosting dashboard

**Important**: Remember to add your environment variables to the hosting platform!

## 📊 Performance

- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices, SEO)
- **Bundle Size**: Optimized with Vite code splitting
- **Images**: Lazy loading and optimized formats
- **Animations**: GPU-accelerated transforms
- **Firebase**: Efficient real-time database queries

## 🐛 Troubleshooting

### Visitor Counter Not Working
- Verify Firebase credentials in `.env.local`
- Check Firebase Realtime Database rules
- Ensure database URL is correct
- See [FIREBASE-SETUP.md](FIREBASE-SETUP.md) for detailed troubleshooting

### Contact Form Not Sending
- Verify EmailJS credentials
- Check EmailJS template configuration
- Test from EmailJS dashboard first

### Chat Widget Errors
- Check API key validity
- Verify API quotas and billing
- Check browser console for specific errors

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/Sakthi102003/Notebook/issues).

## 👨‍💻 Author

**Sakthi Murugan**
- Portfolio: [Your Portfolio URL]
- GitHub: [@Sakthi102003](https://github.com/Sakthi102003)
- LinkedIn: [linkedin.com/in/sakthimurugan-s](https://www.linkedin.com/in/sakthimurugan-s/)
- Email: sakthimurugan102003@gmail.com

## 🙏 Acknowledgments

- Design inspiration from modern glassmorphism trends
- Color palette inspired by natural daylight cycles
- Icons from Lucide React and React Icons
- Animations powered by Framer Motion
- Backend services: Firebase, EmailJS, Google Gemini

---

Made with ❤️ and lots of ☕ by Sakthimurugan

