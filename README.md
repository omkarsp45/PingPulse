# PingPulse 📊

A comprehensive website monitoring platform that helps you track your websites' uptime, performance, and availability 24/7. Get instant notifications when your sites go down and detailed analytics to optimize your infrastructure.

## ✨ Features

- **Real-time Monitoring**: Monitor your websites 24/7 with customizable check intervals
- **Instant Alerts**: Get notified immediately when your websites go down or experience issues
- **Performance Tracking**: Track response times and performance metrics across all your sites
- **Global Monitoring**: Check your websites from multiple regions around the world
- **Detailed Analytics**: Comprehensive reports and analytics with historical data
- **User Management**: Multi-user support with authentication and authorization
- **Modern UI**: Beautiful, responsive dashboard built with Next.js and Tailwind CSS
- **Scalable Architecture**: Built on Redis streams for high-performance message processing

## 🏗️ Architecture

PingPulse is built as a modern monorepo using Turborepo with the following architecture:

### Core Applications

- **Web App** (`apps/web`): Next.js frontend with authentication, dashboard, and monitoring interface
- **API Server** (`apps/api`): Express.js backend handling user management and website operations  
- **Redis Producer** (`apps/redis-producer`): Service that queues websites for monitoring checks
- **Redis Worker** (`apps/redis-worker`): Background workers that perform actual website monitoring

### Shared Packages

- **Store** (`packages/store`): Prisma-based database layer with PostgreSQL
- **Redis Stream** (`packages/redisstream`): Redis client utilities for stream processing
- **UI Components** (`packages/ui`): Shared React components
- **TypeScript Config** (`packages/typescript-config`): Shared TypeScript configurations
- **ESLint Config** (`packages/eslint-config`): Shared linting configurations

## 🚀 Quick Start

### Prerequisites

- Node.js 18 or higher
- PostgreSQL database
- Redis server
- npm/yarn/pnpm

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/omkarsp45/PingPulse.git
cd PingPulse
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create `.env` files in the required apps/packages:

**packages/store/.env**
```env
DATABASE_URL="postgresql://username:password@localhost:5432/pingpulse"
```

**packages/redisstream/.env**
```env
REDIS_URL="redis://localhost:6379"
```

4. **Set up the database**
```bash
cd packages/store
npx prisma migrate dev
npx prisma generate
```

5. **Start the development servers**
```bash
# Start all services
npm run dev

# Or start individual services
npm run dev --filter=web      # Frontend only
npm run dev --filter=api      # API only
npm run dev --filter=redis-producer  # Producer only
npm run dev --filter=redis-worker    # Worker only
```

## 📦 Project Structure

```
pingpulse/
├── apps/
│   ├── api/                 # Express.js API server
│   │   ├── routes/          # API routes (user, website)
│   │   ├── middleware.ts    # Authentication middleware
│   │   └── prisma/          # Database migrations
│   ├── redis-producer/      # Website queue producer
│   ├── redis-worker/        # Website monitoring worker
│   └── web/                 # Next.js frontend
│       ├── app/             # App router pages
│       ├── components/      # React components
│       ├── contexts/        # React contexts
│       └── lib/             # Utilities
├── packages/
│   ├── store/               # Database layer (Prisma)
│   ├── redisstream/         # Redis utilities
│   ├── ui/                  # Shared UI components
│   ├── typescript-config/   # TypeScript configurations
│   └── eslint-config/       # ESLint configurations
└── scripts/                 # Build and deployment scripts
```

## 🔧 Development

### Building the project
```bash
npm run build
```

### Running linting
```bash
npm run lint
```

### Type checking
```bash
npm run check-types
```

### Code formatting
```bash
npm run format
```

## 🗄️ Database Schema

The application uses PostgreSQL with Prisma ORM. Key models include:

- **User**: User accounts with authentication
- **Website**: Monitored websites with URL and metadata
- **WebsiteTick**: Individual monitoring check results
- **Region**: Geographic regions for global monitoring

## 📊 Monitoring Flow

1. **Redis Producer** queries the database every 3 minutes for active websites
2. **Website URLs** are added to Redis streams for processing
3. **Redis Workers** consume the stream and perform HTTP checks
4. **Results** (response time, status) are stored in PostgreSQL
5. **Web Dashboard** displays real-time data and historical analytics
6. **Old data** is automatically cleaned up (older than 1 hour)

## 🚀 Deployment

### Using Docker (Recommended)

```bash
# Build and run with Docker Compose
docker-compose up -d
```

### Manual Deployment

1. **Build the project**
```bash
npm run build
```

2. **Set up production database**
```bash
cd packages/store
npx prisma migrate deploy
```

3. **Start the services**
```bash
# Start API server
cd apps/api && npm start

# Start Redis producer
cd apps/redis-producer && npm start

# Start Redis worker(s)
cd apps/redis-worker && npm start

# Deploy web app to Vercel/Netlify
cd apps/web && npm run build
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🛠️ Built With

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Express.js, Node.js, TypeScript
- **Database**: PostgreSQL, Prisma ORM
- **Queue System**: Redis Streams
- **Monorepo**: Turborepo
- **Authentication**: Custom JWT implementation
- **Deployment**: Vercel, VM

## 📞 Support

If you have any questions or need help, please:

- Open an issue on GitHub
- Check the documentation in the `/docs` folder
- Reach out to the maintainers

---

Made with ❤️ by [omkarsp45](https://github.com/omkarsp45)