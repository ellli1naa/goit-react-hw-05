import React from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";

const MovieList = ({ movies }) => {
  const location = useLocation(); 

  return (
    <ul>
      {movies.map(({ id, title, name }) => (
        <li key={id}>
          {}
          <Link to={`/movies/${id}`} state={{ from: location }}>
            {title || name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

MovieList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired, 
      title: PropTypes.string, 
      name: PropTypes.string, 
    })
  ).isRequired,
};

export default MovieList;