# Nandini Decoration - Premium Event Decoration Services

A beautiful, modern website for Nandini Decoration showcasing premium event decoration services including weddings, birthdays, engagements, and more.

## 🚀 Deployment Ready for Vercel

This project is fully optimized and ready for deployment on Vercel.

### Features

- ✨ Modern, responsive design
- 🎨 Beautiful floral-themed UI
- 📱 Mobile-first approach
- ⚡ Optimized performance
- 🖼️ Image gallery with lightbox
- 📊 Smooth animations
- 🎯 SEO optimized

### Tech Stack

- **Framework**: Next.js 15.3.5
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React

### Getting Started

#### Prerequisites

- Node.js 18+ 
- npm or yarn

#### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Deployment to Vercel

1. **Push to GitHub/GitLab/Bitbucket**

2. **Import to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your repository
   - Vercel will auto-detect Next.js settings

3. **Deploy**:
   - Vercel will automatically build and deploy
   - Your site will be live at `your-project.vercel.app`

### Project Structure

```
├── public/
│   └── assets/          # All images and static assets
│       ├── slideshow/   # Hero section slideshow images
│       ├── wedding/     # Wedding portfolio images
│       └── ...          # Other service category images
├── src/
│   ├── app/             # Next.js app directory
│   │   ├── page.tsx     # Main page component
│   │   ├── layout.tsx   # Root layout
│   │   └── globals.css  # Global styles
│   ├── components/      # React components
│   │   ├── Navbar.tsx   # Navigation bar
│   │   └── ...          # Other components
│   └── lib/             # Utility functions
└── next.config.ts       # Next.js configuration
```

### Important Notes

- All images are in `public/assets/` folder
- Images use `/assets/` path (public folder is root)
- Case-sensitive file paths are handled correctly for Linux/Vercel
- Build is optimized for production

### Environment Variables

No environment variables required for basic deployment.

### Build Configuration

- ✅ All TypeScript errors fixed and type checking enabled
- ✅ ESLint enabled for code quality
- Images are unoptimized (due to large number of images)
- Output mode: standalone (optimized for Vercel)

### Support

For issues or questions, please contact the development team.

---

Built with ❤️ for Nandini Decoration
