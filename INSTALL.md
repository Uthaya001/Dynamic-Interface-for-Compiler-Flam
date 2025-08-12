# Quick Installation Guide

## Prerequisites
- Node.js 20+ 
- npm (comes with Node.js)

## Installation Steps

```bash
# 1. Clone or download the project
# 2. Install dependencies
npm install

# 3. Start the application  
npm run dev
```

That's it! The app will be available at `http://localhost:5000`

## What Gets Installed

All 77 dependencies from `package.json` including:

**Core Framework:**
- React 18 + TypeScript
- Express.js server
- Vite development server

**UI Components:**  
- Tailwind CSS + shadcn/ui
- 23 Radix UI component primitives
- Lucide React icons

**Key Features:**
- TanStack Query (API management)
- React Hook Form + Zod validation  
- Drizzle ORM (database)
- Custom sandboxed code execution

## No Database Setup Required
- Uses in-memory storage by default
- Pre-loaded with sample schemas
- Optional PostgreSQL support available

## Development Commands
```bash
npm run dev      # Start development server
npm run build    # Build for production  
npm run check    # TypeScript type checking
```

Ready to build dynamic interfaces with JSON schemas!