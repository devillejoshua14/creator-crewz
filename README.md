# Creator Crewz

A platform for content creators to find, hire, and manage talent for their teams. Connect with talented professionals for video editing, graphic design, writing, and more.

## 🚀 Features

### For Content Creators
- **Job Posting**: Create detailed job postings with budget and requirements
- **Talent Discovery**: Advanced filtering by skills, location, and rate
- **Secure Payments**: Escrow system for one-off projects (15% platform fee)
- **Team Management**: Dashboard to manage your creative team
- **Reviews**: Rate and review completed projects

### For Talent
- **Profile Creation**: Showcase your skills, portfolio, and rates
- **Job Applications**: Apply to relevant opportunities
- **Portfolio Display**: Upload work samples and links
- **Secure Payments**: Get paid through escrow system
- **Invite-Only**: Curated talent pool for quality assurance

## 🛠 Tech Stack

- **Frontend**: Next.js 14 + TypeScript + Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth + Real-time)
- **Authentication**: NextAuth.js + Supabase Auth
- **Payments**: Stripe Connect
- **Search**: PostgreSQL full-text search
- **Deployment**: Vercel

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account
- Stripe account (for payments)

## 🚀 Quick Start

### 1. Clone the repository
```bash
git clone <repository-url>
cd creator-crewz
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
Create a `.env.local` file in the root directory:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret

# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
```

### 4. Set up the database
1. Create a new Supabase project
2. Run the SQL schema from `database/schema.sql` in your Supabase SQL editor
3. Configure Row Level Security (RLS) policies as defined in the schema

### 5. Start the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # User dashboard
│   ├── jobs/             # Job posting pages
│   └── talent/           # Talent discovery pages
├── components/            # Reusable UI components
├── lib/                   # Utility functions and configurations
├── types/                 # TypeScript type definitions
└── hooks/                 # Custom React hooks
```

## 🔧 Development

### Database Schema
The database schema is defined in `database/schema.sql` and includes:
- User management with role-based access
- Creator and talent profiles
- Job postings and applications
- Projects with escrow payments
- Reviews and messaging system

### Key Features Implementation

#### Authentication Flow
- Separate signup flows for creators and talent
- Invite-only system for talent (MVP)
- Role-based access control

#### Payment System
- **One-off projects**: 15% platform fee, escrow system
- **Long-term roles**: External payments, no platform fee
- Stripe Connect integration for secure payments

#### Job Posting System
- Advanced filtering (skills, location, budget, job type)
- Application management
- Status tracking (open, in progress, completed)

## 🚀 Deployment

### Vercel Deployment
1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Environment Variables for Production
Make sure to set all required environment variables in your production environment.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, email support@creatorcrewz.com or create an issue in this repository.

## 🔮 Roadmap

- [ ] Real-time messaging system
- [ ] Advanced search with Algolia
- [ ] Mobile app development
- [ ] Milestone payments for large projects
- [ ] Team collaboration tools
- [ ] Analytics dashboard
- [ ] API for third-party integrations
