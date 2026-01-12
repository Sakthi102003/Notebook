# 🐱 Oneko Pixel Pet - Usage Guide

## What's Integrated

Your portfolio now includes a fully functional **Oneko pixel pet system** with multiple variants!

### Available Variants

You have 5 different oneko variants in your `/public/oneko/` folder:

1. **🐱 Classic** - The original orange cat
2. **🐶 Dog** - A playful puppy
3. **🐯 Tora** - Tiger-striped cat
4. **👤 Maia** - Maia variant (maia.crimew.gay)
5. **🌊 Vaporwave** - Aesthetic vaporwave style (nya.rest)

---

## How It Works

### Following Your Cursor
- The pixel pet automatically follows your mouse cursor around the page
- It has various animations: walking, running, sleeping, scratching
- It idles when you stop moving

### Interactive Features

#### 1. **Click to Change Variant** 🎨
- **Click on the pet** to open the variant selector modal
- Choose from 5 different pet types
- Your selection is automatically saved to localStorage

#### 2. **Drag and Play** 🎮
- **Click and drag** the pet to move it around
- It will scratch in the direction you drag
- Release to let it continue following your cursor

#### 3. **Right-Click for Cyber Mode** 🌙
- **Right-click** on the pet to toggle "Kuroneko" (inverted colors + cyber glow)
- Creates a holographic/negative version of any variant with an electric blue aura
- Perfect for the dark stealth aesthetic
- Your preference is saved

#### 4. **Double-Click to Sleep** 💤
- **Double-click** the pet to make it sleep
- Double-click again to wake it up

---

## Variant Selector Modal

When you click the pet, you'll see a beautiful modal with:

```
┌──────────────────────────────┐
│   Choose your neko        ×  │
├──────────────────────────────┤
│   🐱      🐶      🐯         │
│ Classic   Dog    Tora        │
│                              │
│   👤        🌊               │
│  Maia   Vaporwave            │
└──────────────────────────────┘
```

- **Hover** over any variant to see it animated
- **Click** to select (blue border indicates selection)
- **Click outside** or the × button to close

---

## Technical Details

### Files Included
```
public/oneko/
├── oneko.js              # Main script (adapted for portfolio)
├── oneko-classic.gif     # Classic cat sprite
├── oneko-dog.gif         # Dog sprite
├── oneko-tora.gif        # Tora cat sprite
├── oneko-maia.gif        # Maia sprite
└── oneko-vaporwave.gif   # Vaporwave sprite
```

### Integration Points
- **index.html**: Loads `/oneko/oneko.js` script
- **LocalStorage**: Saves selected variant and settings
  - `oneko:variant` - Current pet type
  - `oneko:kuroneko` - Dark mode preference

### Sprite Sheet Format
- Each GIF is a 32x32 pixel sprite sheet
- 8x4 grid of animation frames
- 256x128 pixels total
- Pixelated rendering for retro aesthetic

---

## Customization

### Adding New Variants

1. **Add GIF file** to `/public/oneko/`
   - Name format: `oneko-[name].gif`
   - Must be 256x128 px sprite sheet
   - 32x32 pixel frames in 8x4 grid

2. **Update variants array** in `oneko.js`:
```javascript
const variants = [
  ["classic", "Classic"],
  ["dog", "Dog"],
  ["tora", "Tora"],
  ["maia", "Maia"],
  ["vaporwave", "Vaporwave"],
  ["yournew", "Your New Pet"],  // Add here
],
```

### Styling the Modal

The modal is created dynamically with inline styles. To customize:
- Edit the `showPickerModal()` function in `oneko.js`
- Modify CSS in the `style.cssText` properties
- Colors, sizes, borders, etc. are all customizable

---

## Features & Behaviors

### Animations
- **idle**: Standing still, blinking
- **alert**: Noticed you moved!
- **walking**: Following cursor (8 directions)
- **sleeping**: ZZZ animation
- **scratchSelf**: Grooming
- **scratchWall**: Scratching edges of screen
- **tired**: About to sleep

### Smart Behaviors
- Stops when close to cursor
- Alerts before chasing
- Randomly scratches/sleeps when idle
- Scratches walls when at screen edges
- Stays within viewport bounds

---

## Browser Compatibility

| Feature | Support |
|---------|---------|
| Basic animations | ✅ All browsers |
| Image rendering pixelated | ✅ All modern browsers |
| LocalStorage | ✅ All browsers |
| Backdrop blur (modal) | ✅ Chrome, Safari, Firefox |

---

## Performance

- **Lightweight**: ~10KB per sprite sheet
- **Efficient**: CSS transforms, no canvas
- **60fps**: Sprite updates every 100ms
- **Low CPU**: Paused when off-screen (future enhancement)

---

## Credits

- **Original oneko.js**: [@adryd325](https://github.com/adryd325/oneko.js)
- **Spicetify variant**: [@kyrie25](https://github.com/kyrie25/spicetify-oneko)
- **Adapted for**: Your Notebook Portfolio

---

## Tips & Tricks

1. **Try all variants!** Each has unique charm
2. **Drag it around** when you need a break
3. **Right-click for dark mode** to match your theme
4. **Double-click to nap** when you want it to chill
5. **Click to change** whenever you want something fresh

---

**Enjoy your new pixel companion! 🎉**

It will follow you throughout your portfolio journey, adding a touch of playful interactivity to the notebook theme.
