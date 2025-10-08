# NEAR Infrastructure Committee Website

A comprehensive website showcasing the NEAR Infrastructure Committee's work, team, case studies, and focus areas for the NEAR Protocol ecosystem.

## 🚀 Features

### Core Sections
- **Hero Section** - Main landing with action cards for funding applications, RFPs, and feedback
- **Focus Areas** - Categorized infrastructure components with examples and resources
- **Case Studies** - Funded projects with status tracking and company information
- **Team Section** - Infrastructure Committee and Working Group members with company affiliations
- **Blog Section** - Latest updates and announcements from the committee
- **Newsletter** - Email subscription for infrastructure updates

### Interactive Features
- **Search & Filter** - Find team members and case studies quickly
- **Responsive Design** - Optimized for desktop, tablet, and mobile
- **Company Logos** - Visual branding for all infrastructure providers
- **Status Tracking** - Real-time project status (Maintenance, In Development, Completed)
- **Social Links** - Direct connections to team member profiles

## 📁 Project Structure

```
near-infrastructure/
├── public/
│   ├── data/                    # JSON data files
│   │   ├── blog-posts.json      # Blog articles with images
│   │   ├── case-studies.json    # Funded projects and companies
│   │   ├── focus-areas.json     # Infrastructure categories
│   │   └── team.json           # Team members and companies
│   ├── companies/              # Company logos and branding
│   ├── team/                   # Team member photos
│   ├── blog/                   # Blog post images
│   └── [other assets]
├── src/
│   ├── components/
│   │   ├── near/               # NEAR-specific components
│   │   │   ├── BlogSection.tsx
│   │   │   ├── CaseStudies.tsx
│   │   │   ├── FocusAreas.tsx
│   │   │   ├── TeamSection.tsx
│   │   │   └── [other components]
│   │   └── ui/                 # Reusable UI components
│   └── [other source files]
└── [config files]
```

## 📊 Data Organization

### `/public/data/` - JSON Data Files

#### `blog-posts.json`
```json
{
  "title": "Blog Post Title",
  "date": "January 15, 2025",
  "url": "https://www.near.org/blog/...",
  "excerpt": "Blog post description",
  "image": "/blog/blog-image.webp"
}
```

#### `case-studies.json`
```json
{
  "name": "Project Name",
  "description": "Project description",
  "status": "Maintenance|In Development|Completed",
  "fundingDate": "2024-Q1",
  "logo": "/companies/company-logo.jpg",
  "productUrl": "https://project-url.com",
  "tags": ["Category1", "Category2"]
}
```

#### `focus-areas.json`
```json
{
  "id": "category-id",
  "title": "Category Title",
  "description": "Category description",
  "examples": [
    {
      "name": "Example Name",
      "url": "https://example.com",
      "description": "Example description",
      "logo": "/companies/logo.jpg"
    }
  ]
}
```

#### `team.json`
```json
{
  "name": "Team Member Name",
  "title": "Job Title",
  "bio": "Member bio",
  "image": "/team/member-photo.jpg",
  "company": {
    "name": "Company Name",
    "logo": "/companies/company-logo.png",
    "url": "https://company.com"
  }
}
```

### `/public/companies/` - Company Assets
- Company logos in various formats (PNG, JPG, SVG)
- Consistent naming convention for easy reference
- Used across case studies, focus areas, and team sections

### `/public/team/` - Team Assets
- Individual team member photos
- Consistent sizing and format
- Fallback to placeholder images if missing

## 🛠️ Technologies Used

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and building
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: shadcn/ui component library
- **Icons**: Lucide React icons
- **Carousel**: Embla Carousel for blog and hero sections
- **Deployment**: Static site generation

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ ([install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating))
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/near-infrastructure.git
   cd near-infrastructure
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the website

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality

## 📝 Content Management

### Adding New Blog Posts
1. Add blog post data to `/public/data/blog-posts.json`
2. Add corresponding image to `/public/blog/`
3. Update image path in JSON data

### Adding New Case Studies
1. Add case study data to `/public/data/case-studies.json`
2. Add company logo to `/public/companies/`
3. Update logo path in JSON data

### Adding Team Members
1. Add team member data to `/public/data/team.json`
2. Add member photo to `/public/team/`
3. Add company logo if new company

### Adding Focus Areas
1. Add focus area data to `/public/data/focus-areas.json`
2. Add company logos for examples
3. Update component to display new category

## 🎨 Design System

### Color Palette
- **Primary**: NEAR brand colors
- **Background**: Light/dark theme support
- **Accent**: Infrastructure-focused color scheme

### Typography
- **Headings**: Custom Grotesk font family
- **Body**: System font stack
- **Code**: Monospace for technical content

### Components
- **Cards**: Consistent styling across all sections
- **Buttons**: Primary, secondary, and ghost variants
- **Navigation**: Responsive tabs and search functionality

## 🌐 Deployment

### Production Build
```bash
npm run build
```

### Deployment Options
- **Netlify**: Connect repository for automatic deployments
- **Vercel**: Import project for serverless deployment
- **GitHub Pages**: Use GitHub Actions for static hosting
- **Custom Domain**: Configure DNS for your domain

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use consistent naming conventions
- Add proper error handling
- Test responsive design
- Update documentation for new features

## 📞 Support

For questions about the NEAR Infrastructure Committee:
- **Infra Committee activity**: [NEARN](https://nearn.io/infra-committee/)
- **Website**: [near.org](https://near.org)
- **Documentation**: [docs.near.org](https://docs.near.org)
- **Community**: [Discord](https://discord.gg/near)
                 [Telegram](@neardev)

## 📄 License

This project is part of the NEAR Protocol ecosystem and follows the NEAR Foundation's open source guidelines.
