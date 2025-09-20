# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Development server**: `npm run dev` (uses Turbopack for faster builds)
- **Build**: `npm run build`
- **Production server**: `npm start`
- **Linting**: `npm run lint`
- **Formatting**: `npm run format` (Prettier with import sorting)

## Project Structure

```
├── app/                          # Next.js App Router
│   ├── api/movies/              # Internal API routes (TMDB proxy)
│   │   ├── discover/route.ts    # Movie discovery endpoint
│   │   ├── search/route.ts      # Movie search endpoint
│   │   ├── genre/route.ts       # Genre list endpoint
│   │   └── [id]/route.ts        # Movie details endpoint
│   ├── movies/[id]/             # Movie detail pages
│   │   ├── loading.tsx          # Loading skeleton for detail page
│   │   ├── not-found.tsx        # Not found page
│   │   └── page.tsx             # Movie detail page
│   ├── layout.tsx               # Root layout with Header
│   ├── not-found.tsx            # Global not found page
│   └── page.tsx                 # Home page (MovieFilter + MovieResults)
├── components/
│   ├── ui/                      # shadcn/ui primitives
│   │   ├── button.tsx, card.tsx, input.tsx, skeleton.tsx, etc.
│   ├── skeleton/                # Centralized loading skeleton components
│   │   └── common/              # Generic skeleton components
│   │       ├── CardSkeleton.tsx
│   │       └── ListSkeleton.tsx
│   ├── common/                  # Generic reusable components
│   │   ├── feedback/            # ErrorMessage, EmptyState
│   │   └── navigation/          # BackButton, Pagination
│   ├── movie/                   # Movie domain components (logical folder structure)
│   │   ├── card/                # Card components
│   │   │   └── MovieCard.tsx
│   │   ├── list/                # List and results components
│   │   │   ├── MovieList.tsx
│   │   │   └── MovieResults.tsx
│   │   ├── filter/              # Filter and search components
│   │   │   ├── MovieFilter.tsx
│   │   │   ├── SearchBar.tsx
│   │   │   ├── GenreFilter.tsx
│   │   │   └── SortSelect.tsx
│   │   ├── detail/              # Movie detail page components
│   │   │   ├── MovieHeader.tsx, MovieInfo.tsx, etc.
│   │   └── shared/              # Shared movie components
│   │       ├── PosterImage.tsx
│   │       └── RatingDisplay.tsx
│   └── layout/                  # App-level layout components
│       ├── Header.tsx           # Header component
│       └── ThemeToggle.tsx      # Theme toggle component
├── lib/                         # Core utilities and logic
│   └── utils.ts                 # shadcn/ui utility functions (cn)
├── schemas/                     # Zod validation schemas
│   └── movie.ts                 # Movie-related schemas
├── stores/                      # Zustand state management
│   ├── movie-store.ts           # Movie state and actions
│   └── theme-store.ts           # Theme state and actions
├── types/                       # TypeScript type definitions
│   └── movie.ts                 # Movie-related types
└── utils/                       # Utility functions
    ├── api.ts                   # TMDB API wrapper
    ├── formatter.ts             # Data formatting utilities
    ├── image.ts                 # Image URL utilities
    └── errorHandler/            # Error handling utilities
        ├── api-error-handler.ts # API error handling
        └── store-error-handler.ts # Store error handling
```

## Project Architecture

This is a Next.js 15 application using the App Router with a movie library interface powered by The Movie Database (TMDB) API.

### Key Architectural Patterns

**State Management**: Uses Zustand for global state in `stores/movie-store.ts`. The main `useMovieStore` handles movie data, filters, pagination, and API calls with automatic refetching when filters change. Theme state is managed separately in `stores/theme-store.ts`.

**API Layer**:

- TMDB API wrapper in `utils/api.ts` with Zod validation
- Next.js API routes in `app/api/movies/` handle server-side TMDB requests
- Client-side store makes requests to internal API routes, not directly to TMDB
- Error handling is centralized in `utils/errorHandler/` with separate handlers for API and store errors

**Component Structure**:

- `components/ui/` - shadcn/ui primitives with direct imports
- `components/skeleton/` - Centralized loading skeleton components with domain-specific subfolders
- `components/common/` - Generic reusable components (feedback, navigation)
- `components/movie/` - Movie domain with logical folder structure (card/, list/, filter/, detail/, shared/)
- `components/layout/` - App-level layout components (header, theme)
- Domain-driven architecture with clean barrel exports for simplified imports
- Skeleton components follow the same folder structure as their corresponding components

**Data Flow**:

1. UI components trigger store actions (setSortBy, setSearchQuery, etc.)
2. Store actions automatically call `fetchMovies()`
3. `fetchMovies()` routes to either `searchMovies()` or `discoverMovies()`
4. Store methods call internal API routes (`/api/movies/discover`, `/api/movies/search`)
5. API routes use TMDB wrapper with Zod validation
6. Validated data updates store state, triggering UI re-render

### Configuration

**Environment Variables**:

- `TMDB_API_KEY` - TMDB API Bearer token (required)
- `TMDB_BASE_URL` - https://api.themoviedb.org/3
- `TMDB_IMAGE_BASE_URL` - https://image.tmdb.org/t/p

**Image Handling**: Next.js Image component configured for TMDB domains in `next.config.ts`. Image utility functions in `utils/image.ts` handle poster/backdrop URL construction.

**Styling**: Tailwind CSS with dark mode support (`darkMode: 'selector'`). Theme toggle managed by `stores/theme-store.ts`.

### Key Files

- `stores/movie-store.ts` - Zustand store with all movie state and API logic
- `stores/theme-store.ts` - Zustand store for theme management
- `utils/api.ts` - TMDB API wrapper with error handling and validation
- `schemas/movie.ts` - Zod schemas for API response validation
- `types/movie.ts` - TypeScript types derived from Zod schemas
- `lib/utils.ts` - shadcn/ui utility functions (cn)
- `app/page.tsx` - Main page with MovieFilter and MovieResults layout

### Loading States & Skeletons

**Skeleton Organization**: All skeleton components are centralized in `components/skeleton/` with subfolders mirroring the main component structure. This makes finding and maintaining loading states easier.

**Loading Strategy**:

- Route-level loading via `loading.tsx` files (e.g., `app/movies/[id]/loading.tsx`) using shadcn/ui Skeleton components
- Component-level loading via `isLoading` props from Zustand store
- Home page uses component-level loading (no `app/loading.tsx`) for better UX
- Skeleton components have specific, predictable structures rather than generic configurable ones

**Import Pattern**:

```ts
// UI components

// Skeleton components
import { CardSkeleton, ListSkeleton } from '@/components/skeleton/common';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
// Utilities
import { cn } from '@/lib/utils';
// Stores
import { useMovieStore } from '@/stores/movie-store';
import { useThemeStore } from '@/stores/theme-store';
```

### Development Notes

The package manager used is `pnpm` (as seen in README.md installation instructions).

Type validation is handled by Zod schemas rather than raw TypeScript interfaces, providing runtime validation of API responses.

The store automatically manages loading states and error handling for all API operations.

**Coding Conventions**:

- Use TypeScript `type` declarations instead of `interface`
- Prefer explicit named exports in barrel files: `export { Component } from './Component'`
- Skeleton components have fixed, semantic structures rather than configurable props
- Internal component imports use absolute paths with direct imports from specific files
- Folder structure follows logical functionality: `card/`, `list/`, `filter/`, `detail/`, `shared/`

**File Naming Conventions**:

- **kebab-case**: Normal files, routes, utilities (`movie-store.ts`, `api-error-handler.ts`, `loading.tsx`)
- **PascalCase**: React Components (`MovieCard.tsx`, `BackButton.tsx`)
- **camelCase**: Functions, variables, and hooks (`useMovieStore`, `formatDate`)

**Error Handling**:

- Centralized error handling in `utils/errorHandler/`
- API errors handled by `api-error-handler.ts`
- Store errors handled by `store-error-handler.ts`
- Consistent error response format across all API routes
