# 📓 Digital Notebook Portfolio - Sakthi Murugan

A beautiful, responsive single-page portfolio website designed to look like a digital notebook with handwritten notes aesthetic.

## ✨ Features

- **📖 Notebook Theme**: Digital journal styling with paper textures and ruled lines
- **🎨 Typography**: Beautiful font combinations (Kalam, Shadows Into Light, Inter)
- **🌈 Time-Based Color Themes**: Automatic color schemes that change throughout the day
  - 🌅 **Dawn** (5-8 AM): Soft pink and purple sunrise gradients
  - ☀️ **Morning** (8 AM-12 PM): Bright cream to light blue gradients
  - 🌤️ **Afternoon** (12-5 PM): Warm yellow to peach gradients
  - 🌆 **Evening** (5-8 PM): Golden hour orange to pink gradients
  - 🌙 **Night** (8 PM-5 AM): Deep blue to purple dark theme
- **👁️ Live Visitor Counter**: Real-time view count powered by Firebase Realtime Database with animated gradient display
- **📱 Responsive Design**: Optimized for mobile and desktop
- **⚡ Smooth Animations**: Framer Motion powered scroll and hover effects
- **🤖 AI Chat Assistant**: Intelligent chat widget powered by Google Gemini to answer portfolio questions
- **📬 Contact Form**: EmailJS integration for seamless message delivery
- **📝 Medium Blog Integration**: Flowing blog posts display from Medium RSS feed
- **🎯 Interactive Elements**: 
  - Ink highlighting effects
  - Sticky note skills section
  - Polaroid-style photo frames
  - Notebook page layouts
  - Time-of-day emoji indicator
  - Animated visitor counter with gradient effects and live status

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React & React Icons
- **Build Tool**: Vite
- **Backend Services**:
  - Firebase Realtime Database (Visitor Counter)
  - EmailJS (Contact Form)
  - Google Gemini AI (Chat Assistant)
- **Fonts**: Google Fonts (Kalam, Shadows Into Light, Inter)

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

For detailed Firebase setup instructions, see [FIREBASE-SETUP.md](FIREBASE-SETUP.md)

#### Google Gemini Setup (Chat Assistant)
1. Get API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Add to your environment variables
3. Configure in chat widget component

**Security Note**: For production, proxy API requests through a backend server to protect your API keys.

## 📁 Project Structure

```
src/
├── App.tsx              # Main application with time-based theme logic
├── main.tsx             # Application entry point
├── index.css            # Global styles with time-based theme definitions
├── App.css              # Component-specific styles
├── components/
│   ├── ChatWidget.tsx         # AI chat assistant
│   ├── ContactForm.tsx        # Email contact form
│   ├── FlowingBlogRiver.tsx   # Medium blog integration
│   ├── QuotesSection.tsx      # Animated quotes display
│   ├── VisitorCounter.tsx     # Firebase visitor counter
│   └── PixelDog.tsx           # Fun pixel art animation
├── services/
│   ├── firebase.ts            # Firebase Realtime Database service
│   └── openai.ts              # OpenAI/Gemini integration
└── assets/                    # Static assets
```

## 🎨 Design Features

### Sections
1. **Cover Page** - Animated notebook opening with name and tagline
2. **Quotes Section** - Rotating inspirational quotes
3. **About Me** - Personal introduction with Polaroid-style photo
4. **Skills** - Interactive grid with tech stack icons
5. **Projects** - Enhanced cards with hover effects and live demos
6. **Contact** - Contact form with EmailJS integration
7. **Blog River** - Flowing Medium blog posts
8. **Footer** - Live visitor counter with animated display

### Styling Elements
- Paper texture backgrounds
- Ruled line patterns
- Red margin lines (like notebook paper)
- Handwriting fonts for decorative elements
- Smooth color transitions for theme switching
- Gradient effects and glass morphism
- Animated counter badges

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
- **Headings**: Kalam (notebook-style)
- **Handwriting**: Shadows Into Light
- **Body**: Inter (clean sans-serif)

### Animations
Powered by Framer Motion with custom keyframes:
- `notebook-open`: 3D notebook opening effect
- `ink-highlight`: Hover highlighting simulation
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

- Design inspiration from physical notebooks and journals
- Color palette inspired by natural daylight cycles
- Icons from Lucide React and React Icons
- Animations powered by Framer Motion
- Backend services: Firebase, EmailJS, Google Gemini

---

Made with ❤️ and lots of ☕ by Sakthimurugan

