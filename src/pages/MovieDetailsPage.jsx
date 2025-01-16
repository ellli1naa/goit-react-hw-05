import React, { useEffect, useState, useRef } from "react";
import { useParams, Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNjVmMmYzNDYwMmIwNzhjMzRhYmRkOGQ3MjJlYjUzYiIsIm5iZiI6MTczNjc3MDk4OS4xOSwic3ViIjoiNjc4NTA1YWQwNjkwYWMwNmU3N2I3ODYyIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.yY1ELnX71iIFQopf6jvRmxKyxi5JjrhQ-t3NtoA2Mdg"; // Замість цього додайте свій API Read Access Token
const BASE_URL = "https://api.themoviedb.org/3";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const previousLocation = useRef(location.state?.from || "/movies");

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
          headers: { Authorization: `Bearer ${API_KEY}` },
        });
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div>
      <button onClick={() => navigate(previousLocation.current)}>Go back</button>
      <h1>{movie.title}</h1>
      <p>{movie.overview}</p>
      <img
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        alt={movie.title}
      />
      <nav>
        <Link to="cast">Cast</Link>
        <Link to="reviews">Reviews</Link>
      </nav>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;