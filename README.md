# Donate

A modern, anonymous donation platform built with SvelteKit that enables well-wishers to contribute to various social projects using M-Pesa payments. The platform features a clean user interface for donors and a comprehensive administrative dashboard for project managers.

## Features

### For Donors
- **Anonymous Donations**: No signup required - donate instantly
- **Project Discovery**: Browse various social projects with detailed descriptions
- **M-Pesa Integration**: Secure payments through lipa na M-Pesa  

### For Administrators
- **Project Management**: Create, edit, and manage social projects
- **Donation Tracking**: Real-time dashboard showing donations per project
- **Analytics**: Comprehensive reports and donation statistics
- **Payment Monitoring**: Track M-Pesa transaction statuses
- **Impact Metrics**: Monitor project funding goals and achievements

## Tech Stack

- **Frontend**: SvelteKit + TypeScript
- **Styling**: Tailwind CSS
- **Database**: SQLite (development) / PostgreSQL (production)
- **ORM**: Prisma
- **Payment Gateway**: M-Pesa Daraja API
- **Authentication**: JWT (admin only)
- **Deployment**: Vercel/Netlify compatible

## Project Structure

```
src/
├── lib/
│   ├── components/
│   │   ├── ui/           # Reusable UI components
│   │   ├── forms/        # Form components
│   │   └── layout/       # Layout components
│   ├── server/
│   │   ├── mpesa/        # M-Pesa API integration
│   │   ├── database/     # Database utilities
│   │   └── auth/         # Authentication utilities
│   ├── stores/           # Svelte stores
│   └── utils/            # Utility functions
├── routes/
│   ├── +layout.svelte
│   ├── +page.svelte      # Home page
│   ├── projects/         # Project pages
│   ├── donate/           # Donation flow
│   ├── admin/            # Admin dashboard
│   └── api/              # API endpoints
├── app.html
└── app.css
```

## Prerequisites

- Node.js 18+ and npm
- M-Pesa Daraja API credentials (Consumer Key & Secret)
- Database (SQLite for development, PostgreSQL for production)

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/joseowino/donate.git
   cd donate
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   # Database
   DATABASE_URL="file:./dev.db"
   
   # M-Pesa Daraja API
   MPESA_CONSUMER_KEY="your_consumer_key"
   MPESA_CONSUMER_SECRET="your_consumer_secret"
   MPESA_SHORTCODE="your_business_shortcode"
   MPESA_PASSKEY="your_passkey"
   MPESA_ENVIRONMENT="sandbox" # or "production"
   
   # Admin Authentication
   JWT_SECRET="your_jwt_secret"
   ADMIN_USERNAME="admin"
   ADMIN_PASSWORD="your_secure_password"
   
   # App Configuration
   PUBLIC_APP_URL="http://localhost:5173"
   ```

4. **Database Setup**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Run database migrations
   npx prisma db push
   
   # Seed database with sample projects (optional)
   npm run db:seed
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```

## M-Pesa Integration Setup

### 1. Register on Safaricom Developer Portal
- Visit [Safaricom Developer Portal](https://developer.safaricom.co.ke/)
- Create an account and register your application
- Get Consumer Key and Consumer Secret

### 2. Configure M-Pesa Settings
- Set up STK Push for payments
- Configure callback URLs:
  - Success: `https://yourdomain.com/api/mpesa/callback`
  - Timeout: `https://yourdomain.com/api/mpesa/timeout`

### 3. Test Integration
```bash
# Test M-Pesa connection
npm run test:mpesa
```

## API Endpoints

### Public Endpoints
- `GET /api/projects` - List all active projects
- `GET /api/projects/[id]` - Get project details
- `POST /api/donate` - Initialize donation
- `POST /api/mpesa/callback` - M-Pesa callback handler

### Admin Endpoints (Authentication Required)
- `POST /api/admin/login` - Admin login
- `GET /api/admin/dashboard` - Dashboard data
- `POST /api/admin/projects` - Create new project
- `PUT /api/admin/projects/[id]` - Update project
- `DELETE /api/admin/projects/[id]` - Delete project
- `GET /api/admin/donations` - List all donations

## Database Schema

### Projects Table
```sql
- id: Primary key
- title: Project title
- description: Project description
- target_amount: Funding goal
- current_amount: Current donations
- image_url: Project image
- category: Project category
- status: active/completed/paused
- created_at: Creation timestamp
- updated_at: Last update
```

### Donations Table
```sql
- id: Primary key
- project_id: Foreign key to projects
- amount: Donation amount
- phone_number: Donor phone (hashed)
- mpesa_receipt: M-Pesa receipt number
- status: pending/completed/failed
- created_at: Donation timestamp
```

## Deployment

### Vercel Deployment
1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel --prod
   ```

3. **Environment Variables**
   Set all environment variables in Vercel dashboard

### Railway/PlanetScale (Database)
For production, consider using:
- **Railway**: PostgreSQL hosting
- **PlanetScale**: MySQL hosting
- **Supabase**: PostgreSQL with additional features

## Security Considerations

1. **M-Pesa Security**
   - Never expose API credentials in client-side code
   - Use HTTPS for all M-Pesa callbacks
   - Validate all incoming webhook signatures

2. **Data Protection**
   - Hash phone numbers for privacy
   - Implement rate limiting on donation endpoints
   - Use CSRF protection

3. **Admin Security**
   - Strong password requirements
   - JWT token expiration
   - Role-based access control

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## Development Guidelines

### Code Style
- Use TypeScript for type safety
- Follow ESLint configuration
- Use Prettier for code formatting
- Write meaningful commit messages

### Testing
```bash
# Run unit tests
npm run test

# Run E2E tests
npm run test:e2e

# Test M-Pesa integration
npm run test:mpesa
```

## Troubleshooting

### Common Issues

1. **M-Pesa Integration Errors**
   - Verify credentials in `.env` file
   - Check if shortcode is registered
   - Ensure callback URLs are accessible

2. **Database Connection Issues**
   - Check DATABASE_URL format
   - Ensure database is running
   - Run `npx prisma db push` to sync schema

3. **Build Errors**
   - Clear `.svelte-kit` directory
   - Reinstall dependencies: `rm -rf node_modules && npm install`

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Support

- Create an issue for bugs or feature requests
- Join our [Discord community](https://discord.gg/your-server)
- Email: support@yourplatform.com

## Acknowledgments

- Safaricom for M-Pesa API
- SvelteKit team for the amazing framework
- Open source contributors

---

**Made with ❤️ for social impact**