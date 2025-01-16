import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieList from "../components/MovieList";

const API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNjVmMmYzNDYwMmIwNzhjMzRhYmRkOGQ3MjJlYjUzYiIsIm5iZiI6MTczNjc3MDk4OS4xOSwic3ViIjoiNjc4NTA1YWQwNjkwYWMwNmU3N2I3ODYyIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.yY1ELnX71iIFQopf6jvRmxKyxi5JjrhQ-t3NtoA2Mdg"; // Замість цього додайте свій API Read Access Token
const BASE_URL = "https://api.themoviedb.org/3";

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/trending/movie/day`, {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
          },
        });
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching trending movies:", error);
      }
    };

    fetchTrendingMovies();
  }, []);

  return (
    <div>
      <h1>Trending Movies</h1>
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
