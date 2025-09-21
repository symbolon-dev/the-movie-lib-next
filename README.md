# The Movie Library

A modern movie library application developed with Next.js 15 and using the TMDB API.

## Frontend Developer Coding Challenge

This project is a coding challenge for frontend developers to demonstrate skills in modern web technologies, UX/UI design, and development capabilities.

**Challenge Overview:**
Develop a web application that displays a movie list with search, filter, and sort functionality. Users should be able to click on movies to view detailed information.

**Required Technologies:**
- Framework: Next.js
- Styling: Tailwind CSS
- API: TMDB (The Movie Database)
- Code Management: Git

**Key Features to Implement:**
- Movie list display
- Search functionality by title
- Filter by genres
- Sort by various criteria (popularity, date, rating)
- Detailed movie view
- Responsive design

## Features

- **Movie Discovery**: Browse popular movies from the TMDB database
- **Movie Search**: Search for specific movies by title
- **Advanced Filters**: Filter movies by genres and sort by popularity, release date, rating, etc.
- **Detailed Movie Views**: View comprehensive information including cast, crew, ratings, and metadata
- **Infinite Scrolling**: Automatically load more movies as you scroll
- **Dark/Light Mode**: Toggle between themes with persistent preference
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices
- **Loading States**: Smooth skeleton loading animations
- **Error Handling**: Graceful error handling with user-friendly messages

## Technologies

- [Next.js 15](https://nextjs.org) with App Router
- [React 19](https://react.dev)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com) (UI Components)
- [Zustand](https://github.com/pmndrs/zustand) (State Management)
- [Zod](https://zod.dev) (Runtime Type Validation)
- [Lucide React](https://lucide.dev) (Icons)
- [date-fns](https://date-fns.org) (Date Utilities)

## Prerequisites

- Node.js 20.x or higher
- TMDB API key (available for free at [themoviedb.org](https://www.themoviedb.org/documentation/api))

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/the-movie-lib-next.git
cd the-movie-lib-next
```

2. Install dependencies:

```bash
pnpm install
```

3. Create a `.env.local` file in the root directory with the following environment variables:

```
TMDB_API_KEY=your_tmdb_api_key
TMDB_BASE_URL=https://api.themoviedb.org/3
TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
```

4. Start the development server:

```bash
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier

## Usage

- **Home Page**: Browse popular movies with filters and search
- **Search**: Use the search bar to find movies by title
- **Filters**: Select genres and sort by various criteria (popularity, release date, rating, etc.)
- **Movie Details**: Click on any movie card to view detailed information
- **Navigation**: Infinite scrolling automatically loads more results
- **Theme Toggle**: Switch between light and dark modes using the toggle in the header
- **Responsive**: Works seamlessly on all device sizes

## Project Structure

```
├── app/                    # Next.js App Router
├── components/             # React components
│   ├── ui/                # shadcn/ui components
│   ├── movie/             # Movie-specific components
│   ├── common/            # Reusable components
│   └── layout/            # Layout components
├── stores/                # Zustand state management
├── utils/                 # Utility functions
├── types/                 # TypeScript definitions
└── schemas/               # Zod validation schemas
```

## Architecture

- **State Management**: Zustand for global state (movies, theme)
- **API Layer**: Internal Next.js API routes proxy TMDB requests
- **Type Safety**: Zod schemas for runtime validation + TypeScript
- **Styling**: Tailwind CSS with shadcn/ui component system
- **Loading**: Route-level loading.tsx + component-level skeleton states

## Deployment

The application can be deployed with [Vercel](https://vercel.com) or any other Next.js-compatible hosting service.

```bash
pnpm build
```

Make sure to set the environment variables in your deployment platform.
