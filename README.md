# 🎬 Movies App

A movie discovery application built with **React, TypeScript, and TMDB API**. Browse popular movies, explore categories, search by title, apply filters, and save your favorites.

## ✨ Features

- Browse Popular, Top Rated, Upcoming, and Now Playing movies
- Search movies by title
- Filter by genre and rating, sort by popularity, rating, release date, or title
- View movie details, cast, and similar movies
- Add and remove favorite movies (saved in localStorage)
- Pagination and URL-synchronized filters
- Light and dark themes
- Loading skeletons and error notifications
- API response validation with Zod

## 🛠 Tech Stack

- React + TypeScript + Vite
- Redux Toolkit + RTK Query
- React Router
- React Hook Form + Zod
- CSS Modules
- TMDB API

## 🚀 Getting Started

Clone the repository and install dependencies:

```bash
git clone <repository-url>
cd movies-app
pnpm install
```

Create a `.env.local` file:

```env
VITE_BASE_URL=https://api.themoviedb.org/3
VITE_TMDB_TOKEN=your_tmdb_token
```

Start the development server:

```bash
pnpm dev
```

## 🌐 Deployment

Deployed on **Vercel**.

## 📌 API

Movie data is provided by [The Movie Database (TMDB)](https://www.themoviedb.org/). This project is not endorsed or certified by TMDB.
