# CKAI Portfolio Website

A modern, minimalist portfolio website inspired by the KPRKR design aesthetic. Built with React, Vite, and Tailwind CSS.

## Features

- **Modern Design**: Clean, minimalist design with a dark theme and monospace typography
- **Responsive Layout**: Two-column layout with navigation and main content areas
- **Interactive Elements**: Hover effects, smooth transitions, and focus states
- **Settings Panel**: Theme switching, font size adjustment, and focus mode
- **Real-time Clock**: Live time display in the navigation
- **Contact Form**: Functional contact form with validation
- **Blog Section**: Thoughts and articles section with newsletter signup

## Design Inspiration

This website is inspired by the [KPRKR website](https://www.kprkr.co/), featuring:
- Monospace font (JetBrains Mono)
- Dark theme with high contrast
- Minimalist navigation with numbered items
- Clean typography and spacing
- Professional, developer-focused aesthetic

## Pages

1. **Info** (Home) - Personal introduction and selected clients
2. **Work** (About) - Work experience, skills, and education
3. **Ventures** (Projects) - Portfolio of projects and ventures
4. **Playground** (Contact) - Contact information and form
5. **Thoughts** - Blog posts and articles

## Technologies Used

- **React 19** - Frontend framework
- **Vite** - Build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **JetBrains Mono** - Monospace font

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:5173](http://localhost:5173) in your browser

## Customization

### Personal Information
Update the following files with your information:
- `src/pages/Home.jsx` - Personal bio and selected clients
- `src/pages/About.jsx` - Work experience and skills
- `src/pages/Project.jsx` - Project portfolio
- `src/components/Navbar.jsx` - Location, social links, and contact info

### Styling
- Modify `src/index.css` for global styles and typography
- Update Tailwind classes in components for layout and spacing
- Customize the color scheme by modifying the CSS variables

### Content
- Add your own projects to the Projects page
- Write blog posts for the Thoughts page
- Update contact information and social links

## Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## License

MIT License - feel free to use this template for your own portfolio!
