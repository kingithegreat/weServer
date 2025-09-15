# Vote Your GOAT - Figma Design Specifications

## 🎨 Complete Design System for Figma Recreation

### **Color Palette (Copy to Figma Styles)**
```
Primary Colors (Hex Values):
#0f1724 - Background Dark Navy (RGB: 15, 23, 36)
#0b1220 - Card Background (RGB: 11, 18, 32)
#ffb703 - Accent Golden Yellow (RGB: 255, 183, 3)
#9aa4b2 - Text Muted Gray (RGB: 154, 164, 178)
#e6eef6 - Text Primary Off-White (RGB: 230, 238, 246)
#10b981 - Success Green (RGB: 16, 185, 129)

Glass/Effects (RGBA Values):
rgba(255,255,255,0.04) - Glass Overlay (4% white opacity)
rgba(255,183,3,0.3) - Golden Glow (30% accent opacity)
rgba(255,183,3,0.12) - Light Golden Tint (12% accent opacity)
```

### **Typography System**
```
Font Family: Inter (Download from Google Fonts)

Heading 1 (Hero Title):
- Size: 33.6px (2.1rem)
- Weight: Regular
- Letter Spacing: 0.6px
- Effect: Gradient from #e6eef6 to #ffb703

Card Titles:
- Size: 16px
- Weight: Medium
- Color: #e6eef6 (hover: #ffb703)

Body Text:
- Size: 14.72px (0.92rem)
- Weight: Regular
- Color: #9aa4b2
```

### **Layout Grid**
```
Container:
- Max Width: 1100px
- Margins: 32px top/bottom, auto left/right
- Padding: 24px

Grid System:
- Columns: Auto-fit, minimum 220px
- Gap: 18px
- Responsive breakpoints

Card Dimensions:
- Min Width: 220px
- Padding: 12px
- Border Radius: 12px
- Image Height: 140px
- Image Border Radius: 8px
```

### **Effects & Shadows**
```
Background Gradient:
- Type: Linear
- Angle: 180°
- Stops: #071024 (0%) → #071824 (60%) → #021019 (100%)

Card Shadows:
Normal State: 0px 6px 30px rgba(2,6,23,0.6)
Hover State: 0px 20px 40px rgba(2,6,23,0.8)
Selected State: 0px 25px 50px rgba(2,6,23,0.9) + 0px 0px 30px rgba(255,183,3,0.3)

Glass Effect:
- Backdrop Blur: 10px
- Border: 1px solid rgba(255,255,255,0.05)
- Overlay: rgba(255,255,255,0.04)
```

### **Component States**
```
Card States:
1. Default: #0b1220 background, transparent border
2. Hover: translateY(-8px), scale(1.02), accent border glow
3. Selected: #ffb703 border, translateY(-10px), scale(1.03), checkmark

Button States:
1. Default: #ffb703 background, #041122 text
2. Hover: Slight scale increase, enhanced glow
3. Loading: Animated dots or spinner
```

### **Assets Needed in Figma**
```
Player Images (140px height, maintain aspect ratio):
- Kareem Abdul-jabbar.webp
- lebron.webp  
- Magic Johnson.webp
- MJ.webp
- stephenCurry.jpg

Logo:
- nbaLogo.jpg (72px × 72px, 10px border radius)
```

## 📐 **Step-by-Step Figma Recreation**

### **1. Setup Canvas**
- Create 1440px × 1024px frame
- Apply background gradient
- Name: "Vote Your GOAT - Desktop"

### **2. Create Components**
- Hero Section Component
- Player Card Component (with variants)
- Button Component (with states)

### **3. Build Hero Section**
- Rectangle with glass effect
- NBA logo + title text with gradient
- Subtitle text

### **4. Create Player Card**
- Base card rectangle
- Image placeholder
- Text elements
- Add component variants for states

### **5. Apply Auto Layout**
- Grid container with auto layout
- Responsive spacing
- Proper constraints
