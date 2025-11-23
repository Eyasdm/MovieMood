# 🎬 MovieMood – Modern Movie Discovery App

MovieMood is a modern, responsive movie discovery web app built with **React + Vite** and **SCSS (BEM architecture)**.  
It lets you browse trending movies, search by title and genre, view detailed movie pages, and manage your personal **Watchlist** – all wrapped in a polished 2025-style UI with **light & dark themes**.

---

## 🔗 Live Demo

> 🖥️ **Live Demo:** [_add your Netlify/Vercel link here_  ](https://moviemoood.netlify.app/)

---

## ✨ Features

- 🎭 **Beautiful UI + Theming**
  - Fully responsive layout for desktop, tablet, and mobile
  - **Light / Dark** (and future custom) themes using CSS variables
  - Glassmorphism-inspired header, modern cards, and cinematic layouts

- 🔍 **Smart Movie Browsing**
  - Browse curated sections like _Trending_, _Top Rated_, _Now Playing_, etc.
  - Horizontal scrollable rows with smooth navigation

- 🎞️ **Movie Details Page**
  - Big hero poster with gradient overlay
  - Key info: rating, runtime, genres, release date
  - Overview, cast section, and related movies rows

- ⭐ **Watchlist (Local Storage)**
  - Add / remove movies from your personal Watchlist
  - Data stored in `localStorage` so it **persists between sessions**
  - Visual indicator if a movie is already in the Watchlist

- 🧭 **Search & Filters**
  - Search movies by title
  - Combine search with genre filters and pagination

- ⚙️ **Performance & DX**
  - Built with **Vite** for fast dev server & optimized build
  - Custom hooks for fetching movies and managing state
  - SCSS with a clear **7-1 architecture** + BEM naming

---

## 🛠 Tech Stack

- **Frontend:** React, Vite
- **Styling:** SCSS (Sass) with BEM methodology
- **State & Logic:** React hooks (`useState`, `useEffect`, custom hooks)
- **Routing:** React Router
- **API:** [The Movie Database (TMDB) API](https://www.themoviedb.org/)
- **Storage:** Browser `localStorage` for Watchlist
- **Tooling:** NPM / Yarn

---

## 📂 Project Structure (High-Level)

```bash
src/
  ├─ assets/           # Images, icons, static assets
  ├─ components/       # Reusable UI components (Header, Footer, Card, Row, etc.)
  ├─ pages/            # Page-level components (Home, Search, Watchlist, MovieDetails)
  ├─ hooks/            # Custom hooks (useMovieDetails, useSearchMovies, useRowMovies, useWatchlist)
  ├─ context/          # Context providers (e.g., MoviesContext, ThemeContext if used)
  ├─ styles/
  │   ├─ abstracts/    # Variables, mixins, tokens, themes
  │   ├─ base/         # Base styles, resets, typography
  │   ├─ components/   # Component-specific SCSS files
  │   ├─ pages/        # Page-specific SCSS files
  │   └─ main.scss     # Main entry SCSS file
  ├─ App.jsx
  ├─ main.jsx
  └─ ...
