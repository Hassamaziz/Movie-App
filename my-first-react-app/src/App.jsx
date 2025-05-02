import React, { useState,useEffect } from "react";
import Search from "./components/Search";

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
  const [errorMessage,setErrorMessage] =useState('');
  const [movieList, setMovieList] = useState([]);
  const [isloading, setIsLoading] = useState(false);

  const fetchMovies = async () => {
    setIsLoading(true);
    setErrorMessage('');
   try { 
    const endpoint = `${API_BASE_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`;
    const response = await fetch(endpoint , API_OPTIONS);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();

    if (data.response === "False") {
      setErrorMessage(data.Error || "Movie not found");
      setMovieList([]);
      return;
    }
    setMovieList(data.results || []);
    setIsLoading(false);
    
  
   } catch (error) {
    console.log("Error fetching Movies" + error);
    setErrorMessage("Error fetching movies. Please try again later.");
   }
    finally {
      setIsLoading(false);
    }
  }



  useEffect(() => {
    fetchMovies();
    
  }, [])
  
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

        <section className="all-movies">
        <h2>All Movies</h2>
         
          {isloading ? (
           <p className="text-white">Loading...</p>
          ) : errorMessage ? (
            <div className="text-red-600">{errorMessage}</div>
          ) : movieList.length > 0 ? (
            <ul className="movie-list">
              {movieList.map((movie) => (
                <li key={movie.id}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                  />
                  <h3 className="text-white">{movie.title}</h3>
                </li>
              ))}
            </ul>
          ) : (
            <div className="no-movies">No movies found.</div>
          )}
        
        </section>
      </div>
    </main>
  );
};

export default App;
