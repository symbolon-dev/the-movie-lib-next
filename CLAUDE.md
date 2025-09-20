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
│   ├── layout.tsx               # Root layout with Header
│   └── page.tsx                 # Home page (MovieFilter + MovieResults)
├── components/
│   ├── ui/                      # shadcn/ui primitives with barrel export
│   │   ├── index.ts             # Central export for all UI components
│   │   ├── button.tsx, card.tsx, input.tsx, etc.
│   ├── skeleton/                # Centralized loading skeleton components
│   │   ├── common/              # Generic skeleton components
│   │   │   ├── CardSkeleton.tsx
│   │   │   └── ListSkeleton.tsx
│   │   ├── movie/               # Domain-specific skeleton components
│   │   │   ├── card/MovieCardSkeleton.tsx
│   │   │   ├── detail/MovieDetailSkeleton.tsx
│   │   │   └── list/MovieListSkeleton.tsx
│   │   └── index.ts             # Barrel export for all skeletons
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
│   │       ├── RatingDisplay.tsx
│   │       └── index.ts         # Barrel export
│   └── layout/                  # App-level layout components
│       ├── Header.tsx           # Header component
│       ├── ThemeToggle.tsx      # Theme toggle component
│       └── index.ts             # Barrel export
├── lib/                         # Core utilities and logic
│   ├── store.ts                 # Zustand state management
│   ├── api.ts                   # TMDB API wrapper
│   ├── schema.ts                # Zod validation schemas
│   ├── image.ts                 # Image URL utilities
│   ├── theme.ts                 # Dark mode utilities
│   └── formatters.ts            # Data formatting utilities
└── types/movie.ts               # TypeScript type definitions
```

## Project Architecture

This is a Next.js 15 application using the App Router with a movie library interface powered by The Movie Database (TMDB) API.

### Key Architectural Patterns

**State Management**: Uses Zustand for global state in `lib/store.ts`. The main `useMovieStore` handles movie data, filters, pagination, and API calls with automatic refetching when filters change.

**API Layer**:

- TMDB API wrapper in `lib/api.ts` with Zod validation
- Next.js API routes in `app/api/movies/` handle server-side TMDB requests
- Client-side store makes requests to internal API routes, not directly to TMDB

**Component Structure**:

- `components/ui/` - shadcn/ui primitives with centralized barrel export (`index.ts`)
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

**Image Handling**: Next.js Image component configured for TMDB domains in `next.config.ts`. Image utility functions in `lib/image.ts` handle poster/backdrop URL construction.

**Styling**: Tailwind CSS with dark mode support (`darkMode: 'selector'`). Theme toggle managed by `lib/theme.ts`.

### Key Files

- `lib/store.ts` - Zustand store with all movie state and API logic
- `lib/api.ts` - TMDB API wrapper with error handling and validation
- `lib/schema.ts` - Zod schemas for API response validation
- `types/movie.ts` - TypeScript types derived from Zod schemas
- `app/page.tsx` - Main page with MovieFilter and MovieResults layout

### Loading States & Skeletons

**Skeleton Organization**: All skeleton components are centralized in `components/skeleton/` with subfolders mirroring the main component structure. This makes finding and maintaining loading states easier.

**Loading Strategy**:
- Route-level loading via `loading.tsx` files (e.g., `app/movies/[id]/loading.tsx`)
- Component-level loading via `isLoading` props from Zustand store
- Skeleton components have specific, predictable structures rather than generic configurable ones

**Import Pattern**:
```ts
// UI components
import { Button, Card, Input } from '@/components/ui';

// Skeleton components
import { MovieCardSkeleton, ListSkeleton } from '@/components/skeleton';
```

### Development Notes

The package manager used is `pnpm` (as seen in README.md installation instructions).

Type validation is handled by Zod schemas rather than raw TypeScript interfaces, providing runtime validation of API responses.

The store automatically manages loading states and error handling for all API operations.

**Coding Conventions**:
- Use TypeScript `type` declarations instead of `interface`
- Prefer explicit named exports in barrel files: `export { Component } from './Component'`
- Skeleton components have fixed, semantic structures rather than configurable props
- Internal component imports use absolute paths via barrel exports: `import { Component } from '@/components/movie'`
- Folder structure follows logical functionality: `card/`, `list/`, `filter/`, `detail/`, `shared/`
