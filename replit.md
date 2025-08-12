# Dynamic Interface Compiler

## Overview

This is a no-code interface builder that allows users to design UI components dynamically and compile them into working React components in real-time. Users can define components like forms, text sections, and images through JSON schemas, which are then rendered as fully functional UI elements with validation, state management, and custom logic execution. The application features a live preview system, schema editor, and component library for rapid prototyping of internal tools and interfaces.

The application is fully functional with a three-panel interface: Component Library (left), Schema Editor (center), and Live Preview (right). Users can add components, edit JSON schemas directly, and see changes instantly.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes (January 2025)

✓ Fixed all TypeScript compilation errors across the codebase
✓ Created comprehensive dependency documentation (DEPENDENCIES.md, INSTALL.md)
✓ Improved type safety in storage layer and component rendering
✓ Enhanced error handling in schema validation
✓ All 77 dependencies properly configured in package.json

## System Architecture

### Frontend Architecture
- **React + TypeScript**: Modern React application with TypeScript for type safety
- **Vite**: Development server and build tool for fast hot module replacement
- **Tailwind CSS + shadcn/ui**: Utility-first CSS framework with a comprehensive component library
- **Wouter**: Lightweight client-side routing
- **TanStack Query**: Server state management and API data fetching

### Component System
- **Dynamic Component Factory**: Renders components based on JSON schemas using a factory pattern
- **Supported Component Types**: Form, Text, and Image components with extensible architecture
- **Schema-Driven Rendering**: Components are defined through JSON schemas and rendered dynamically
- **Live Preview System**: Real-time compilation and rendering of schema changes

### State Management
- **React Hooks**: Local state management using useState and custom hooks
- **TanStack Query**: Server state caching and synchronization
- **Schema Context**: Centralized schema state management through custom hooks

### Data Storage
- **PostgreSQL**: Primary database using Drizzle ORM for type-safe database operations
- **Neon Database**: Serverless PostgreSQL hosting
- **In-Memory Storage**: Fallback storage implementation with seeded default schemas

### Validation & Security
- **Zod**: Schema validation for both frontend and backend data structures
- **Sandboxed Code Execution**: Safe execution of user-defined logic using restricted Function constructors
- **Form Validation**: Real-time client-side validation with custom error messaging

### Logic Injection System
- **Sandboxed Functions**: Users can define custom logic that executes in a restricted environment
- **Safe Globals**: Limited access to Math, Date, JSON, and console objects
- **Dynamic Logic Execution**: Real-time execution of user-defined validation and submission logic

### API Architecture
- **Express.js**: RESTful API server with middleware for logging and error handling
- **Type-Safe Routes**: Shared type definitions between frontend and backend
- **CRUD Operations**: Full schema management with create, read, update, delete operations

## External Dependencies

### Database & ORM
- **Neon Database**: Serverless PostgreSQL database hosting
- **Drizzle ORM**: Type-safe database operations and migrations
- **connect-pg-simple**: Session storage for PostgreSQL

### UI Framework
- **Radix UI**: Accessible component primitives for complex UI elements
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Lucide React**: Icon library for consistent iconography

### Development Tools
- **Vite**: Fast development server with HMR support
- **TypeScript**: Static type checking across the entire application
- **ESBuild**: Fast JavaScript bundler for production builds

### Validation & Forms
- **Zod**: Runtime type validation and schema parsing
- **React Hook Form**: Form state management with validation integration
- **@hookform/resolvers**: Zod integration for form validation

### Utility Libraries
- **date-fns**: Date manipulation and formatting
- **clsx**: Conditional CSS class name utility
- **class-variance-authority**: Type-safe component variant management