# Dynamic Interface Compiler - Dependencies Guide

This project uses Node.js and npm for dependency management. All dependencies are defined in `package.json`.

## Quick Start

```bash
# Install Node.js 20+ 
# Clone the repository
npm install          # Install all dependencies
npm run dev         # Start development server
```

## Core Dependencies

### Frontend Framework
- **React 18** - UI library with hooks and modern patterns
- **TypeScript** - Type safety and better development experience
- **Vite** - Fast development server with hot module replacement

### Backend Framework  
- **Express.js** - RESTful API server
- **tsx** - TypeScript execution for Node.js

### Database & Storage
- **Drizzle ORM** - Type-safe database operations
- **@neondatabase/serverless** - PostgreSQL database connection
- **In-memory storage** - Default storage (no database setup required)

### UI Components & Styling
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality React components built on Radix UI
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library

### Form Handling & Validation
- **React Hook Form** - Form state management
- **Zod** - Schema validation for TypeScript
- **@hookform/resolvers** - Form validation integration

### State Management
- **TanStack Query** - Server state management
- **Wouter** - Lightweight client-side routing

### Key Features
- **JSON Schema Editor** - Live editing with syntax validation
- **Component Factory** - Dynamic React component rendering
- **Sandboxed Execution** - Safe user logic execution
- **Responsive Preview** - Desktop/tablet/mobile view modes
- **Template System** - Pre-built component templates

## Architecture

```
client/                 # Frontend React application
├── src/
│   ├── components/    # UI components
│   ├── pages/         # Application pages
│   ├── hooks/         # Custom React hooks
│   └── lib/           # Utilities and configurations

server/                # Backend Express application
├── index.ts          # Server entry point
├── routes.ts         # API routes
└── storage.ts        # Data storage interface

shared/               # Shared types and schemas
└── schema.ts        # Zod schemas for validation
```

## Environment Variables (Optional)

For PostgreSQL database (instead of in-memory storage):
```env
DATABASE_URL=postgresql://user:pass@host:port/db
PGHOST=localhost
PGPORT=5432
PGUSER=your_username
PGPASSWORD=your_password
PGDATABASE=your_database
```

## Development

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run type-check   # Run TypeScript compiler
```

## Browser Support

- Chrome/Chromium 88+
- Firefox 85+
- Safari 14+
- Edge 88+

All dependencies are automatically installed via `npm install` - no manual setup required!