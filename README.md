# GijutsuKnight Portfolio

A modern, responsive portfolio website showcasing the technical capabilities of GijutsuKnight - a tech professional with expertise across frontend, backend, and infrastructure domains.

## 🎯 About GijutsuKnight

GijutsuKnight is a versatile technology professional who embodies the role of a "knight of gijutsu (tech)" with multiple specialized roles across the technology stack:

### Frontend Development

- **Web Developer** - React
- **Android Developer** - React Native, Kotlin, Java
- **iOS Developer** - React Native, Swift, Objective-C
- **Cross-Platform Mobile Developer** - React Native

### Backend Development

- **Java Backend Developer** - Spring Boot, Hibernate
- **Python Backend Developer** - FastAPI, Flask, Django
- **Node.js Backend Developer** - Express.js, NestJS
- **Full Stack Developer** - React + (Spring Boot / Node.js / Python)

### Infrastructure & Operations

- **DevOps Engineer** - Docker, Kubernetes, CI/CD
- **Containerization** - Docker
- **Orchestration** - Kubernetes
- **CI/CD** - Jenkins, GitLab CI/CD, GitHub Actions

## 📁 Project Structure

```
MyTestHtml/
├── index.html                  # Main HTML file
├── assets/                     # Modular assets directory
│   ├── css/                    # CSS files
│   │   ├── main.css           # Main CSS file (imports all partials)
│   │   └── partials/          # CSS partials
│   │       ├── variables.css   # CSS custom properties & design system
│   │       ├── reset.css      # CSS reset & base styles
│   │       ├── base.css       # Base section styles
│   │       ├── components.css # Reusable component styles
│   │       ├── sections.css   # Section-specific styles (includes Roles)
│   │       ├── animations.css # Animation keyframes & effects
│   │       ├── responsive.css # Responsive design & media queries
│   │       └── utilities.css  # Utility classes
│   ├── js/                     # JavaScript files
│   │   ├── main.js            # Main JavaScript file (ES6 modules)
│   │   └── modules/           # JavaScript modules
│   │       ├── theme.js       # Theme management
│   │       ├── navigation.js  # Navigation & scrolling
│   │       ├── animations.js  # Animation management
│   │       ├── projects.js    # Project filtering
│   │       ├── forms.js       # Form validation & submission
│   │       └── skills.js      # Skills progress bars
│   └── images/                # Image assets (placeholder)
├── components/                 # Reusable HTML components
├── sections/                  # HTML section partials
├── CNAME                      # GitHub Pages custom domain
└── README.md                  # This file
```

## 🚀 Benefits of Modular Structure

### **CSS Benefits:**

- **Maintainability**: Each partial handles a specific concern
- **Reusability**: Components can be easily reused across projects
- **Performance**: Only load necessary CSS partials
- **Team Collaboration**: Multiple developers can work on different partials
- **Design System**: Centralized variables for consistent theming

### **JavaScript Benefits:**

- **Modularity**: Each module handles specific functionality
- **ES6 Modules**: Modern JavaScript with import/export
- **Maintainability**: Easier to debug and update individual features
- **Scalability**: Easy to add new modules without affecting existing code
- **Testing**: Individual modules can be tested in isolation

### **HTML Benefits:**

- **Clean Structure**: Semantic HTML with proper organization
- **Accessibility**: Better screen reader support
- **SEO**: Improved search engine optimization
- **Performance**: Faster loading with modular assets

## 🛠️ Usage

### **Development:**

1. Use `index-modular.html` for the modular version
2. Edit CSS partials in `assets/css/partials/`
3. Modify JavaScript modules in `assets/js/modules/`
4. Update the main files to import new partials/modules

### **Production:**

1. Bundle CSS partials into a single file
2. Bundle JavaScript modules for better performance
3. Minify and optimize assets
4. Use a build tool like Webpack, Vite, or Parcel

## 📋 Features

- **Responsive Design**: Mobile-first approach with modern CSS Grid and Flexbox
- **Dark/Light Theme**: Toggle between themes with smooth transitions
- **Smooth Animations**: CSS animations and transitions for enhanced UX
- **Interactive Elements**: Hover effects and micro-interactions
- **Form Validation**: Client-side validation with real-time feedback
- **Project Filtering**: Filter projects by category (Web Apps, Mobile, Design)
- **Skill Progress Bars**: Animated progress indicators with percentage display
- **Mobile Navigation**: Collapsible mobile menu with smooth transitions
- **Roles Showcase**: Comprehensive display of technical capabilities across domains
- **Modern Architecture**: ES6 modules and modular CSS for maintainability

## 🔧 Customization

### **Colors & Theming:**

Edit `assets/css/partials/variables.css` to customize:

- Color palette
- Spacing system
- Typography scale
- Border radius values
- Shadow definitions

### **Adding New Sections:**

1. Create HTML structure in `index.html`
2. Add styles to `assets/css/partials/sections.css`
3. Create JavaScript module in `assets/js/modules/`
4. Import module in `assets/js/main.js`
5. Update navigation links in header and footer

### **Adding New Components:**

1. Add HTML structure
2. Style in `assets/css/partials/components.css`
3. Add functionality in appropriate module

## 🌐 Browser Support

- **Modern Browsers**: Chrome 60+, Firefox 60+, Safari 12+, Edge 79+
- **ES6 Modules**: Supported in all modern browsers
- **CSS Custom Properties**: Supported in all modern browsers
- **Fallbacks**: Graceful degradation for older browsers

## 📱 Responsive Breakpoints

- **Mobile**: < 480px
- **Tablet**: 480px - 768px
- **Desktop**: 768px - 1024px
- **Large Desktop**: > 1024px

## 🎨 Design System

The project uses a comprehensive design system with:

- **Consistent Spacing**: 8px grid system
- **Typography Scale**: Harmonious font sizes
- **Color Palette**: Semantic color naming
- **Component Library**: Reusable UI components
- **Animation System**: Consistent timing and easing

## 🔄 Recent Updates

The portfolio has been updated with:

1. **Roles Section**: Added comprehensive technical roles showcase
2. **Modular Structure**: Migrated from single files to modular architecture
3. **Enhanced Navigation**: Updated header and footer with Roles link
4. **Improved Styling**: Enhanced visual design with better typography and spacing
5. **Code Cleanup**: Removed obsolete files and consolidated structure

## 📈 Performance Optimizations

- **CSS**: Modular loading reduces unused CSS
- **JavaScript**: Tree-shaking eliminates dead code
- **Images**: Optimized and lazy-loaded
- **Fonts**: Preloaded for better performance
- **Caching**: Proper cache headers for assets

## 🧪 Testing

Test the portfolio by:

1. Opening `index.html` in a browser
2. Verifying all features work correctly
3. Testing responsive design across different screen sizes
4. Checking theme toggle functionality
5. Validating form submission
6. Testing navigation between sections
7. Verifying Roles section displays correctly

## 🚀 Getting Started

1. **Clone the repository**
2. **Open `index.html`** in a modern browser
3. **For development**: Use a local server (e.g., `python -m http.server` or Live Server extension)
4. **Customize**: Edit CSS variables and content as needed

## 📝 Notes

- The modular structure provides better maintainability and scalability
- ES6 modules require a local server for development (not file:// protocol)
- All assets are optimized for performance
- The portfolio is ready for deployment to GitHub Pages or any static hosting service
