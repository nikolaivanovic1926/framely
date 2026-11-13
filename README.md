# Framely

A movie discovery web app built with React. Browse popular movies, search by title, filter by genre, open a details page with plot, runtime, cast and trailer, or get a random pick with the "Surprise me" button.

**Live demo:** https://framely-app.vercel.app/

## Features

- Popular movies with "Load more" pagination
- Search with a short delay so the API is not called on every keystroke
- Genre filter
- Movie details page: poster, backdrop, rating, runtime, director, genres, plot, cast and trailer link
- "Surprise me" button that opens a random well-known movie
- Responsive layout and an animated burger menu

## Tech stack

- React with Vite
- React Router
- TMDB API
- Plain CSS (grid, flexbox)

## Run locally

```
git clone https://github.com/nikolaivanovic1926/framely.git
cd framely
npm install
```

Create a `.env` file in the project root:

```
VITE_TMDB_KEY=your_tmdb_api_key
```

Then start the dev server:

```
npm run dev
```

You can get a free API key at https://www.themoviedb.org/settings/api

## Credits

This product uses the TMDB API but is not endorsed or certified by TMDB.