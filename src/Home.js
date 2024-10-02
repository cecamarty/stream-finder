import React, { useEffect, useState, useRef } from 'react';
import './MovieCard.css'; // Import the CSS file for movie cards

const Home = () => {
  const [showMoreGenres, setShowMoreGenres] = useState({});
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const topRef = useRef(null);

  useEffect(() => {
    fetch('/movies.json')
      .then(response => response.json())
      .then(data => {
        setMovies(data);
        setGenres(groupMoviesByGenre(data));
      })
      .catch(error => console.error('Error fetching movies:', error));
  }, []);

  const groupMoviesByGenre = (movies) => {
    const genresList = ["Action", "Adventure", "Comedy", "Drama", "Romance", "Horror", "Animation", "Fantasy"];
    const genres = {};
    genresList.forEach(genre => {
      genres[genre] = [];
    });
    movies.forEach(movie => {
      if (movie.Genre) {
        const movieGenres = movie.Genre.split(', ');
        movieGenres.forEach(genre => {
          if (genres[genre]) {
            genres[genre].push(movie);
          }
        });
      }
    });
    return genres;
  };

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

// Logic to show more movies of the same genre
// Toggle the state for the clicked genre
  const handleShowMore = (genre) => {
    setShowMoreGenres(prevState => ({
    ...prevState,
    [genre]: !prevState[genre],
    }));
    alert(`Show more movies for genre: ${genre}`);
  };

  const scrollToTop = () => {
    topRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value.toLowerCase().replace(/\s+/g, ''));
  };

  const filteredMovies = movies.filter(movie => 
    movie.title.toLowerCase().replace(/\s+/g, '').includes(searchQuery)
  );

  return (
    <div className="home-container">
      <div ref={topRef} className="top-bar">
        <div className="app-name">
          <h1>StreamFinder</h1>
        </div>
        <div className="search-bar">
          <input 
            type="text" 
            placeholder="Search for movies..." 
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
      </div>
      {Object.keys(genres).map(genre => (
        <div key={genre} className="genre-section">
          <h2 className="genre-title">{genre}</h2>
          <div className="genre-row">
            {shuffleArray(genres[genre]).slice(0, 15).map(movie => (
              <div key={movie.id} className="movie-card">
                <img src={movie.imageUrl} alt={movie.title} />
                <div className="movie-card-content">
                  <h3 className="movie-card-title">{movie.title}</h3>
                  <p className="movie-card-description">
                    {movie.Genre ? movie.Genre : 'No genres available'}
                  </p>
                </div>
              </div>
            ))}
            <div className="show-more" onClick={() => handleShowMore(genre)}>
              <span>→</span>
            </div>
          </div>
        </div>
      ))}
      <div className="all-movies-section">
        <h2 className="genre-title">All Movies</h2>
        <div className="all-movies-grid">
          {shuffleArray(filteredMovies).map((movie, index) => (
            <div key={movie.id} className="movie-card">
              <img src={movie.imageUrl} alt={movie.title} />
              <div className="movie-card-content">
                <h3 className="movie-card-title">{movie.title}</h3>
                <p className="movie-card-description">
                  {movie.Genre ? movie.Genre : 'No genres available'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button className="back-to-top-button" onClick={scrollToTop}>
        <span className="arrow">↑</span> BACK TO TOP
      </button>
    </div>
  );
};

export default Home;
