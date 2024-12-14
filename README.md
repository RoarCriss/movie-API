# TMDB Movie App

## Table of Contents
- [TMDB Movie App](#tmdb-movie-app)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Features](#features)
  - [Technologies Used](#technologies-used)
  - [Getting Started](#getting-started)
  - [Configuration](#configuration)
  - [Usage](#usage)
  - [Contributing](#contributing)

## Introduction

This project is a movie discovery app built using Vite and fetching data from The Movie Database (TMDB) API. It allows users to browse popular movies, filter by category, and paginate through results.

## Features

- Browse movies categorized as Now Playing, Popular, Top Rated, and Upcoming
- Filter movies by category
- Paginate through movie results
- Display movie details including poster, title, overview, release date, and rating

## Technologies Used

- Frontend:
  - HTML5
  - CSS3
  - JavaScript
  - Vite
- Backend:
  - TMDB API

## Getting Started

1. Clone the repository
2. Navigate to the project directory: cd tmdb-vite
3. Install dependencies
4. To run this project locally, you need to set up your own API key from The Movie Database (TMDB). Here's how:

   1. Go to [The Movie Database API Key](https://www.themoviedb.org/account) website.
   2. Sign up for an account if you don't have one already.
   3. Once logged in, go to "API" section in your account settings.
   4. Generate a new API key.

## Configuration

- Create a `.env` file in the root directory of this project with the following content: VITE_API_KEY=your_api_key_here
- Replace `your_api_key_here` with the actual API key you generated from The Movie Database.

## Usage

1. Run the development server: npm run dev
2. Open http://localhost:5173 in your web browser to see the app running.
3. Use the category selector at the top to filter movies.
4. Click on "Next" or "Previous" buttons to paginate through results.
5. Each movie card displays information such as title, overview, release date, and rating.

**Remember to replace the placeholder API key in the `.env` file with your own before running the project.**

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request