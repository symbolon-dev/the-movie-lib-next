# The Movie Library

A modern movie library application developed with Next.js 15 and using the TMDB API.

## Features

- **Movie Search**: Browse thousands of movies from the TMDB database
- **Filters**: Filter movies by genres and sort by various criteria
- **Detail Views**: View detailed information about each movie
- **Pagination**: Navigate through large numbers of movie results
- **Dark/Light Mode**: Choose your preferred appearance
- **Responsive Design**: Optimized for desktop and mobile devices

## Technologies

- [Next.js 15](https://nextjs.org)
- [React 19](https://react.dev)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com)
- [Zustand](https://github.com/pmndrs/zustand) (State Management)
- [Zod](https://zod.dev) (Type Validation)

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

## Usage

- On the home page, you'll get an overview of popular movies
- Use the search bar to look for specific movies
- Filter by genres and/or sort the results
- Click on a movie to see more details
- Use pagination to browse through more results
- Toggle between light and dark modes using the button in the header

## Deployment

The application can be deployed with [Vercel](https://vercel.com) or any other Next.js-compatible hosting service.

```bash
pnpm build
```
