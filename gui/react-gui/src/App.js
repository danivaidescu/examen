import Header from './components/Header'
import Movies from './components/Movies'
import { useState } from 'react'
import { FaTasks } from 'react-icons/fa'
import AddMovie from './components/AddMovie'


function App() {
  const [movies, setMovies] = useState([
    {
        id: 1,
        title: 'Some movie1',
        category: 'horror',
        publicationDay: '11-11-2020'
    },
    {
        id : 2,
        title: 'Some movie2',
        category: 'comedy',
        publicationDay: '11-11-2020'
    },
    {
        id: 3,
        title: 'Some movie3',
        category: 'drama',
        publicationDay: '11-11-2020'
    }

])

// AddMovie 
const addMovie = (movie) => {
  const id = Math.floor(Math.random() * 10000) + 1
  const newMovie = {id, ...movie}
  setMovies([...movies, newMovie])
}


// Delete movie
const deleteMovie = (id) => {
  setMovies(movies.filter((movie) => movie.id !== id))

}
  return (
    <div className='contianer'>
      <Header title='Movie List'/>
      <AddMovie onAdd={addMovie}/>
      {movies.length > 0 ? <Movies movies={movies} onDelete={deleteMovie}/> : 'No Movies on the list'}
    </div>
  );
}

export default App;
