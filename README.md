# Full-Stack Portfolio Website

A modern, responsive full-stack portfolio website built with HTML5, CSS3, JavaScript frontend and Node.js/Express backend with MongoDB database. Features a beautiful UI with smooth animations, mobile-first design, interactive elements, and comprehensive backend functionality.

## Features

### 🎨 Frontend Design & UI
- **Modern Design**: Clean, professional layout with gradient backgrounds and smooth transitions
- **Responsive Layout**: Fully responsive design that works on all devices (desktop, tablet, mobile)
- **Beautiful Animations**: Smooth scroll animations and hover interactions
- **Custom Icons**: Font Awesome icons for social links and contact information

### 📱 Frontend Sections
- **Hero Section**: Eye-catching introduction with profile image and call-to-action buttons
- **About Section**: Personal information with animated statistics counters
- **Skills Section**: Organized skill categories with modern pill-style tags
- **Projects Section**: Dynamic portfolio showcase with database integration
- **Contact Section**: Full-stack contact form with backend processing

### ⚡ Interactive Features
- **Mobile Navigation**: Hamburger menu with smooth animations
- **Smooth Scrolling**: Seamless navigation between sections
- **Active Link Highlighting**: Navigation links highlight based on current section
- **Real-time Form Processing**: Contact form with backend validation and email notifications
- **Visitor Analytics**: Track page views, device types, and user engagement
- **Dynamic Project Loading**: Projects loaded from database with view tracking

### 🚀 Backend Features
- **RESTful API**: Complete REST API for all portfolio functionality
- **Database Integration**: MongoDB for storing contacts, projects, and analytics
- **Contact Management**: Store and manage contact form submissions
- **Project Management**: CRUD operations for portfolio projects
- **Analytics Dashboard**: Track visitors, popular projects, and engagement metrics
- **Email Notifications**: Automated email alerts for new contact submissions
- **Data Validation**: Server-side validation with Joi schema validation
- **Security**: Helmet.js security headers, rate limiting, and CORS protection

### 🛠 Technical Features
- **Full-Stack Architecture**: Node.js/Express backend with MongoDB database
- **Performance Optimized**: Debounced scroll events and efficient database queries
- **Accessibility**: Semantic HTML and keyboard navigation support
- **Cross-Browser Compatible**: Works across all modern browsers
- **SEO Friendly**: Proper meta tags and semantic structure
- **Environment Configuration**: Flexible configuration with environment variables

## File Structure

```
Portfolio/
├── frontend/
│   ├── index.html          # Main HTML file
│   ├── styles.css          # CSS styles and animations
│   └── script.js           # Frontend JavaScript
├── backend/
│   ├── server.js           # Express server
│   ├── models/             # Database models
│   │   ├── Contact.js      # Contact form model
│   │   ├── Project.js      # Project model
│   │   └── Visitor.js      # Analytics model
│   ├── routes/             # API routes
│   │   ├── contact.js      # Contact endpoints
│   │   ├── projects.js     # Project endpoints
│   │   └── analytics.js    # Analytics endpoints
│   └── seeders/            # Database seeders
│       └── projects.js     # Project data seeder
├── package.json            # Dependencies and scripts
├── .env.example           # Environment variables template
└── README.md              # Documentation
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- Git

### Installation

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd Portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` file with your configuration:
   ```env
   MONGODB_URI=mongodb://localhost:27017/portfolio
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   PORT=5000
   ```

4. **Start MongoDB** (if using local installation):
   ```bash
   mongod
   ```

5. **Seed the database** (optional):
   ```bash
   node seeders/projects.js
   ```

6. **Start the application**:
   ```bash
   # Development mode with auto-restart
   npm run dev
   
   # Production mode
   npm start
   ```

7. **Access the application**:
   - Frontend: http://localhost:5000
   - API: http://localhost:5000/api
   - Health Check: http://localhost:5000/api/health

## Customization

### Personal Information
Update the following in `index.html`:
- Replace "Your Name" with your actual name
- Update the hero subtitle with your title/role
- Modify the about section with your personal information
- Update contact details (email, phone, location)
- Replace social media links with your profiles

### Profile Images
- Replace the hero avatar image URL with your photo
- Update the about section image with a relevant workspace/personal image

### Projects
Customize the projects section:
- Replace project images with screenshots of your work
- Update project titles, descriptions, and technologies used
- Add links to live demos and GitHub repositories

### Skills
Update the skills section with your technologies:
- Modify skill categories (Frontend, Backend, Tools)
- Add or remove skill items as needed
- Update the skill tags with your expertise

### Colors & Branding
Customize the color scheme in `styles.css`:
- Primary colors: `#2563eb` (blue) and `#7c3aed` (purple)
- Accent color: `#ffd700` (gold)
- Background gradients and hover effects

## Browser Support

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Tips

- Images are lazy-loaded for better performance
- Scroll events are debounced to prevent performance issues
- CSS animations use GPU acceleration with `transform` properties
- Minimal external dependencies (only Google Fonts and Font Awesome)

## Deployment

### GitHub Pages
1. Create a GitHub repository
2. Upload your files
3. Enable GitHub Pages in repository settings

### Netlify
1. Drag and drop the portfolio folder to Netlify
2. Your site will be live instantly with a custom URL

### Vercel
1. Connect your GitHub repository to Vercel
2. Deploy with zero configuration

## License

This project is open source and available under the [MIT License](LICENSE).

## Credits

- **Fonts**: Inter font family from Google Fonts
- **Icons**: Font Awesome for icons
- **Images**: Unsplash for placeholder images (replace with your own)

---

**Need help customizing?** Feel free to reach out or check the comments in the code files for guidance on making modifications.
