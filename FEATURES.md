# 🎮 Features Overview

## 1. Landing Page (Unlock Gate)
- **Gaming-themed UI** with gradient text and neon glow effects
- **Lightning Background**: Animated WebGL lightning effect that creates an electric atmosphere
- **Unlock phrase input**: Users must enter "smash karts" to proceed
- **Error feedback**: Shake animation when wrong phrase is entered
- **Hint provided** for easy access
- **Fully responsive**: Adapts to all screen sizes

## 2. Main Team Assignment Page

### Background Effect
- **FaultyTerminal Animation**: Retro terminal-style WebGL effect with glitch and scanline effects
- **Mouse Interaction**: Background reacts to cursor movement with ripple effects
- **Page Load Animation**: Smooth fade-in animation when entering the page
- **Purple Tint**: Matches the gaming theme with customizable color

### Team Display
- **Two teams side-by-side**: Team A (cyan theme) and Team B (pink theme)
- **Glowing card effects**: Each team has its own neon glow
- **Member count**: Shows how many members are on each team
- **Avatar display**: Uses Dicebear API for unique avatars
- **Responsive layout**: Stacks vertically on mobile, side-by-side on desktop

### Member Management
- **Edit names inline**: Click the edit button next to any member
- **Quick save/cancel**: Use Enter to save, Escape to cancel
- **Hover effects**: Cards scale up on hover for better interactivity

### Actions
- **Shuffle Teams**: Randomly redistributes all members between teams
- **Add Member**: Opens a modal to add new players
- **Auto-balancing**: New members are automatically distributed evenly

## 3. Design Elements

### Color Scheme
- **Background**: Dark gradient from slate to purple
- **Team A**: Cyan/blue neon accents
- **Team B**: Pink/rose neon accents
- **Buttons**: Purple-to-pink gradients with hover effects

### Animations
- **Hover scale**: Cards and buttons grow slightly on hover
- **Glow effects**: Neon box shadows on cards and text
- **Shake animation**: Error feedback on wrong password
- **Smooth transitions**: All interactions have 300ms transitions

### Typography
- **Large headings**: Bold, gradient text with glow effects
- **Gaming aesthetic**: Modern, clean fonts with high contrast
- **Uppercase team names**: Bold and prominent

## 4. Technical Features

### State Management
- React hooks (useState, useEffect)
- Local state only (no backend required)
- Automatic re-shuffling when members change

### Responsive Design
- Grid layout for teams (stacks on mobile, side-by-side on large screens)
- Flexible card sizing with responsive padding
- Mobile-friendly buttons and inputs with touch-optimized sizes
- Responsive typography that scales with screen size
- Optimized spacing for different breakpoints (sm, md, lg)

### Component Architecture
- Modular components for reusability
- TypeScript for type safety
- shadcn/ui for consistent UI components
