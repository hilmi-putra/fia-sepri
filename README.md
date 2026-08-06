# Fia & Sepri — Wedding Invitation

Modern wedding invitation web application built with **Next.js 16 (App Router + TypeScript)** and **Supabase**.

## Features

### Landing Page
- 🎊 Hero section with couple names and wedding date
- 💑 Story section (bride & groom profiles)
- 📅 Event section (akad & resepsi)
- ⏰ Countdown timer
- 🖼️ Photo gallery
- 📋 RSVP form with Supabase integration
- 💌 Guest wishes with real-time updates
- 🎁 Digital gift/amplop section
- 🔗 Personalized invitation via `/invitation/[guest-name]`

### Admin Dashboard
- 🔐 Login with Supabase Auth (email/password)
- 📊 Dashboard overview with stats
- 📋 RSVP management (CRUD)
- 💌 Wishes management (CRUD)
- 🖼️ Gallery management (CRUD)
- ⚙️ Settings (couple info, events, music, theme color)
- 🛡️ Middleware-protected admin routes

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Vanilla CSS + CSS Custom Properties |
| Backend | Supabase (PostgreSQL, Auth, Storage) |
| Deployment | Vercel (recommended) |

## Getting Started

### Prerequisites
- Node.js 20+
- npm
- Supabase account

### Installation

```bash
# Clone the repository
git clone https://github.com/hilmi-putra/fia-sepri.git
cd fia-sepri

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Fill in your Supabase credentials
```

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### Database Setup

1. Go to your Supabase Dashboard → SQL Editor
2. Run the SQL migration file: `supabase/migrations/001_initial_schema.sql`
3. This creates 6 tables: `couples`, `events`, `rsvps`, `wishes`, `galleries`, `settings`
4. RLS policies are included — public can read all data and insert RSVPs/wishes
5. Go to Authentication → Settings → Enable Email authentication
6. Create an admin user via Authentication → Users → Add User
7. Go to Storage → Create bucket `wedding-gallery` (public)

### Development

```bash
npm run dev
```

Visit:
- Landing page: http://localhost:3000
- Admin login: http://localhost:3000/admin/login
- Personalized invitation: http://localhost:3000/invitation/John-Doe

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Landing page
│   ├── invitation/[slug]/ # Personalized invitation
│   └── admin/             # Admin dashboard routes
├── components/
│   ├── landing/           # Landing page components
│   ├── dashboard/         # Admin UI components
│   └── forms/             # Admin form components
├── lib/                   # Supabase clients & utilities
├── services/              # Database CRUD operations
├── hooks/                 # Custom React hooks
├── types/                 # TypeScript interfaces
├── supabase/              # Database migrations
└── middleware.ts          # Auth protection
```

## License

Private — Fia & Sepri Wedding Invitation
