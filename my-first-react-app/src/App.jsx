import React, { useState, useEffect } from "react";
import { useDebounce } from "react-use";
import Search from "./components/Search";
import Spinner from "./components/Spinner";
import MovieCard from "./components/MovieCard";
import { updateSearchCount,getTrendingMovies } from "./appwrite";



const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [trendingMovies, setTrendingMovies] = useState([]);

  useDebounce(
    () => {
      setDebouncedSearchTerm(searchTerm);
    },
    1000,
    [searchTerm]
  );
  const fetchMovies = async (pageNumber = 1, query = "") => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?include_adult=false&language=en-US&page=1&query=${encodeURIComponent(
            query
          )}`
        : `${API_BASE_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=${pageNumber}&sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      setMovieList((prev) => {
        const existingIds = new Set(prev.map((movie) => movie.id));
        const newMovies = data.results.filter(
          (movie) => !existingIds.has(movie.id)
        );
        return pageNumber === 1 ? data.results : [...prev, ...newMovies];
      });

      if (query && data.results.length > 0) {
        const movie = data.results[0];
        await updateSearchCount(query, data.results[0]);
        console.log("Search term updated in Appwrite:", query);
      }
     
    } catch (error) {
      console.log("Error fetching Movies", error);
      setErrorMessage("Error fetching movies. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies();
      setTrendingMovies(movies);
    } catch (error) {
      console.error("Error fetching trending movies:", error);
      
      
    }
  }

  useEffect(() => {
    loadTrendingMovies();
  }
  , []);

  const handleLoadMore = async () => {
    const nextPage = page + 1;
    await fetchMovies(nextPage);
    setPage(nextPage);
  };


  useEffect(() => {
    fetchMovies(1, debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="hero banner" />
          <h1>
            Find <span className="text-gradient">Movies</span> You'll Enjoy
            Watching Without the Hassle!
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        {trendingMovies.length > 0 && (
          <section className="trending">
            <h2>Trending Movies</h2>
            <ul>
             {trendingMovies.map((movie,index) => (
                <li key={movie.$id}>
                  <p>{index+1}</p>
                  <img src={movie.poster_url} alt={movie.title} />
                </li>
             ))}
            </ul>
           
          </section>
        )}

        <section className="all-movies">
          <h2>All Movies</h2>

          {isloading ? (
            <Spinner />
          ) : errorMessage ? (
            <div className="text-red-600">{errorMessage}</div>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <li key={movie.id}>
                  <MovieCard movie={movie} />
                </li>
              ))}
            </ul>
          )}

          {!isloading && !errorMessage && movieList.length > 0 && (
            <div className="mt-6 text-center">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={handleLoadMore}
              >
                Show More
              </button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default App;
