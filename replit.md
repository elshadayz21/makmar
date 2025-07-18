# Makmar Trading PLC - Web Application

## Overview

This is a full-stack web application for Makmar Trading PLC, an international trading company. The application is built with a modern tech stack featuring React for the frontend, Express.js for the backend, and is designed to showcase the company's trading services while providing a contact form for potential clients.

## User Preferences

```
Preferred communication style: Simple, everyday language.
```

## System Architecture

The application follows a monorepo structure with clear separation between client and server code:

- **Frontend**: React 18 with TypeScript, using Vite for development and building
- **Backend**: Express.js with TypeScript, providing REST API endpoints
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Styling**: Tailwind CSS with shadcn/ui components for consistent UI design
- **Deployment**: Optimized for production with build scripts and static file serving

## Key Components

### Frontend Architecture
- **React Router**: Using `wouter` for lightweight client-side routing
- **State Management**: TanStack Query for server state management
- **UI Components**: shadcn/ui component library with Radix UI primitives
- **Styling**: Tailwind CSS with custom design system (Makmar branding)
- **Internationalization**: Custom language provider supporting English and potentially other languages
- **Theme System**: Dark/light mode support with theme persistence

### Backend Architecture
- **Express.js**: RESTful API server with middleware for logging and error handling
- **Database Layer**: Drizzle ORM with PostgreSQL for data persistence
- **Storage Interface**: Abstract storage layer with in-memory fallback for development
- **Development Tools**: Vite integration for hot module replacement in development

### Database Schema
The application uses two main database tables:
- **Users**: For potential future authentication (id, username, password)
- **Contacts**: For storing contact form submissions (id, firstName, lastName, email, subject, message, createdAt)

## Data Flow

1. **Client Requests**: Frontend makes API calls using TanStack Query
2. **API Processing**: Express.js handles requests with validation using Zod schemas
3. **Database Operations**: Drizzle ORM performs type-safe database operations
4. **Response Handling**: Structured JSON responses with proper error handling
5. **UI Updates**: React components update based on query results

## External Dependencies

### Core Technologies
- **@neondatabase/serverless**: Database connection for PostgreSQL
- **Drizzle ORM**: Type-safe database operations and migrations
- **React & React DOM**: Frontend framework
- **Express.js**: Backend web framework
- **TanStack Query**: Server state management
- **Zod**: Schema validation and type safety

### UI Libraries
- **Radix UI**: Unstyled, accessible UI primitives
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Pre-built components with consistent styling
- **Lucide React**: Icon library

### Development Tools
- **Vite**: Fast development server and build tool
- **TypeScript**: Type safety across the stack
- **ESBuild**: Fast JavaScript bundler for production builds

## Deployment Strategy

### Development
- Vite dev server for frontend with HMR
- Express server with TypeScript compilation via `tsx`
- Database migrations using Drizzle Kit
- Environment-based configuration

### Production
- Frontend: Vite build process creating optimized static files
- Backend: ESBuild compilation to single bundled file
- Database: PostgreSQL with connection pooling
- Static file serving through Express in production

### Build Process
1. `npm run build`: Builds frontend assets and compiles backend
2. `npm start`: Runs production server serving static files and API
3. `npm run db:push`: Applies database schema changes

The application is designed to be easily deployable on platforms like Replit, Vercel, or traditional hosting providers with minimal configuration required.