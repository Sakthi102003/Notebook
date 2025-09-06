# 📓 Digital Notebook Portfolio - Sakthi Murugan

A beautiful, responsive single-page portfolio website designed to look like a digital notebook with handwritten notes aesthetic.

## ✨ Features

- **📖 Notebook Theme**: Digital journal styling with paper textures and ruled lines
- **🎨 Typography**: Beautiful font combinations (Kalam, Shadows Into Light, Inter)
- **🌙 Dark/Light Mode**: Smooth transitions with blue/yellow highlight themes
- **📱 Responsive Design**: Optimized for mobile and desktop
- **⚡ Smooth Animations**: Framer Motion powered scroll and hover effects
- **🤖 AI Chat Assistant (optional)**: Chat widget powered by OpenAI to answer portfolio questions
- **🎯 Interactive Elements**: 
  - Ink highlighting effects
  - Sticky note skills section
  - Polaroid-style photo frames
  - Notebook page layouts

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Fonts**: Google Fonts (Kalam, Shadows Into Light, Inter)

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd notebook-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

## 🔐 Environment Setup (for contact form and chat)

Create a `.env` file in the project root and add the following variables:

```bash
# EmailJS (Contact form)
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key

# OpenAI (Chat widget)
VITE_OPENAI_API_KEY=your_openai_api_key
```

Notes:
- EmailJS: Create a service and template at https://www.emailjs.com/ and put the IDs/keys above.
- OpenAI: Create an API key at https://platform.openai.com/ and paste it above.
- Security: API keys are exposed in the browser in this demo setup. For production, proxy requests via a backend.

## 📁 Project Structure

```
src/
├── App.tsx          # Main application component
├── main.tsx         # Application entry point
├── index.css        # Global styles with Tailwind
├── App.css          # Component-specific styles
└── assets/          # Static assets
```

## 🎨 Design Features

### Sections
1. **Cover Page** - Animated notebook opening with name and tagline
2. **About Me** - Personal introduction with Polaroid-style photo
3. **Skills** - Interactive sticky notes grid
4. **Projects** - Notebook entries with project details
5. **Contact** - Contact form styled as torn notebook page

### Styling Elements
- Paper texture backgrounds
- Ruled line patterns
- Red margin lines (like notebook paper)
- Handwriting fonts for decorative elements
- Smooth color transitions for theme switching

## 🔧 Customization

### Colors
The color scheme is defined in `tailwind.config.js`:
- **Light Mode**: Blue highlights (`#3b82f6`)
- **Dark Mode**: Yellow highlights (`#fbbf24`)
- **Paper Colors**: Various shades of off-white and cream

### Fonts
- **Headings**: Kalam (notebook-style)
- **Handwriting**: Shadows Into Light
- **Body**: Inter (clean sans-serif)

### Animations
Powered by Framer Motion with custom keyframes:
- `notebook-open`: 3D notebook opening effect
- `ink-highlight`: Hover highlighting simulation
- `fade-in` & `slide-up`: Section reveal animations

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Breakpoints**: Tailwind's default responsive breakpoints
- **Navigation**: Collapsible mobile menu
- **Grid Layouts**: Responsive grid systems for different sections

## 🌙 Theme System

The app supports light and dark modes with:
- CSS custom properties for color switching
- Local state management for theme persistence
- Smooth transitions between themes
- Different highlight colors for each mode

## 📞 Contact Integration

The contact form is ready for integration with:
- Email services (EmailJS, Netlify Forms, etc.)
- Telegram bot integration
- Custom backend APIs

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Deploy to Netlify/Vercel
The built files in the `dist` folder can be deployed to any static hosting service.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 👨‍💻 Author

**Sakthi Murugan**
- Portfolio: [sakthimurugan.dev](https://sakthimurugan.dev)
- GitHub: [@Sakthi102003](https://github.com/Sakthi102003)
- LinkedIn: [linkedin.com/in/sakthimurugan-s](https://www.linkedin.com/in/sakthimurugan-s/)

---


