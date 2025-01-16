import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNjVmMmYzNDYwMmIwNzhjMzRhYmRkOGQ3MjJlYjUzYiIsIm5iZiI6MTczNjc3MDk4OS4xOSwic3ViIjoiNjc4NTA1YWQwNjkwYWMwNmU3N2I3ODYyIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.yY1ELnX71iIFQopf6jvRmxKyxi5JjrhQ-t3NtoA2Mdg";
const BASE_URL = "https://api.themoviedb.org/3";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/movie/${movieId}/credits`, {
          headers: { Authorization: `Bearer ${API_KEY}` },
        });
        setCast(response.data.cast);
      } catch (error) {
        console.error("Error fetching cast:", error);
      }
    };

    fetchCast();
  }, [movieId]);

  if (!cast.length) return <p>No cast information available.</p>;

  return (
    <ul>
      {cast.map((actor) => (
        <li key={actor.id}>
          <p>{actor.name}</p>
          {actor.profile_path && (
            <img
              src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`}
              alt={actor.name}
            />
          )}
        </li>
      ))}
    </ul>
  );
};

export default MovieCast;