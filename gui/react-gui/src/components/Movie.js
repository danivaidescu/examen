import {FaTimes} from 'react-icons/fa'

const Movie = ({movie, onDelete }) => {
    return (
        <div className='movie'>
            <h3>
                Title: {movie.title} <FaTimes style={{color: 'red',
                 cursor: 'pointer'}} onClick={() => onDelete(movie.id)} />
            </h3>
            <p>Category: {movie.category}</p>
            <p>Publication Day: {movie.publicationDay}</p>
        </div>
    )
}

export default Movie