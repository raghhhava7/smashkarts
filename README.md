# 🎮 Team Assigner - Gaming Edition

A modern, gaming-themed team assignment app built with Next.js 14, TypeScript, and shadcn/ui.

## ✨ Features

- **Unlock Phrase Landing Page**: Enter the phrase "smash karts" to access the app with animated Lightning background (WebGL)
- **Animated Terminal Background**: Teams page features a retro FaultyTerminal effect with mouse interaction (WebGL)
- **Random Team Assignment**: Automatically splits members into 2 balanced teams
- **Editable Member Names**: Click edit to change any member's display name
- **Add New Members**: Dynamically add members with automatic team balancing
- **Shuffle Teams**: Randomize team assignments with one click
- **Gaming UI**: Dark theme with neon accents, glowing effects, and smooth animations
- **Fully Responsive**: Optimized for mobile, tablet, and desktop screens
- **Interactive Effects**: Mouse-reactive backgrounds that respond to cursor movement

## 🚀 Getting Started

1. **Install dependencies**:
```bash
npm install
```

2. **Run the development server**:
```bash
npm run dev
```

3. **Open your browser**:
Navigate to [http://localhost:3000](http://localhost:3000)

4. **Enter the unlock phrase**: Type "smash karts" to access the team assigner

## 🎨 Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **shadcn/ui** components
- **Tailwind CSS** for styling
- **React Hooks** for state management

## 📁 Project Structure

```
team-assigner/
├── app/
│   ├── page.tsx              # Landing page (password gate)
│   ├── teams/
│   │   └── page.tsx          # Main team assignment page
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles with gaming theme
├── components/
│   ├── TeamCard.tsx          # Team display component
│   ├── MemberItem.tsx        # Individual member component
│   ├── AddMemberDialog.tsx   # Add member modal
│   └── ui/                   # shadcn/ui components
├── types/
│   └── index.ts              # TypeScript interfaces
└── tailwind.config.ts        # Tailwind configuration
```

## 🎯 Usage

1. **Landing Page**: Enter "smash karts" to proceed
2. **Shuffle Teams**: Click the "Shuffle Teams" button to randomize assignments
3. **Edit Names**: Click "Edit" next to any member to change their name
4. **Add Members**: Click "Add Member" to add new players

## 🎨 Customization

- Modify `DEFAULT_MEMBERS` in `app/teams/page.tsx` to change initial members
- Update colors in `app/globals.css` for different neon effects
- Change the unlock phrase in `app/page.tsx`
- Adjust Lightning component props (hue, speed, intensity) in `app/page.tsx` for different landing page effects
- Customize FaultyTerminal props in `app/teams/page.tsx` (tint, glitchAmount, scanlineIntensity, etc.) for different terminal effects

## 📝 License

MIT
