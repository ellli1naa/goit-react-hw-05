import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import MovieList from "../components/MovieList";

const API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNjVmMmYzNDYwMmIwNzhjMzRhYmRkOGQ3MjJlYjUzYiIsIm5iZiI6MTczNjc3MDk4OS4xOSwic3ViIjoiNjc4NTA1YWQwNjkwYWMwNmU3N2I3ODYyIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.yY1ELnX71iIFQopf6jvRmxKyxi5JjrhQ-t3NtoA2Mdg"; // Замість цього додайте свій API Read Access Token
const BASE_URL = "https://api.themoviedb.org/3";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  useEffect(() => {
    if (!query) return; 

    const fetchMovies = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/search/movie`, {
          params: { query },
          headers: { Authorization: `Bearer ${API_KEY}` },
        });
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [query]); 

  const handleSearch = (e) => {
    e.preventDefault();
    const searchQuery = e.target.elements.query.value.trim();
    if (searchQuery === "") return;
    setSearchParams({ query: searchQuery });
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input type="text" name="query" defaultValue={query} placeholder="Search movies" />
        <button type="submit">Search</button>
      </form>
      <MovieList movies={movies} />
    </div>
  );
};

export default MoviesPage;