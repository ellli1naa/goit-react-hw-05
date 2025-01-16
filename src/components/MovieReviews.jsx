import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNjVmMmYzNDYwMmIwNzhjMzRhYmRkOGQ3MjJlYjUzYiIsIm5iZiI6MTczNjc3MDk4OS4xOSwic3ViIjoiNjc4NTA1YWQwNjkwYWMwNmU3N2I3ODYyIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.yY1ELnX71iIFQopf6jvRmxKyxi5JjrhQ-t3NtoA2Mdg";
const BASE_URL = "https://api.themoviedb.org/3";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/movie/${movieId}/reviews`, {
          headers: { Authorization: `Bearer ${API_KEY}` },
        });
        setReviews(response.data.results);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [movieId]);

  if (!reviews.length) return <p>No reviews available.</p>;

  return (
    <ul>
      {reviews.map((review) => (
        <li key={review.id}>
          <h3>{review.author}</h3>
          <p>{review.content}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieReviews;
