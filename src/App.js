import {useEffect,useState} from 'react';
import './App.css';
import MovieCard from './MovieCard';
import Serachicon from './search.svg';




// 13c2e956


const API_URL = "http://www.omdbapi.com?apikey=13c2e956";



const App = () => {

    const [movies, setMovies] = useState([]);
    const [searchTerm, setSerachTerm] = useState("");

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
          searchMovies(searchTerm);
        }
      };
 
 const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);

    const data = await response.json();

    setMovies(data.Search);
 }

 useEffect(() => {
   searchMovies('Avatar');
 }, []);

  return (
    <div className='app'>
        <h1>Movies</h1>
        <div className='search' >
            <input placeholder='Search for Movies' value={searchTerm} onChange={(e) => setSerachTerm(e.target.value) } onKeyPress={handleKeyPress} />
            <img src={Serachicon} alt="search" onClick={() => searchMovies(searchTerm) } />
        </div>


        {
            movies?.length > 0 ? 
        (<div className='container'>
           {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.imdbID} />
           ) )}
        </div>) 
        : (
            <div className='empty' >
                <h2>No movies found</h2>
            </div>
        )}
        


    </div>
  )
}

export default App