import { useState } from 'react'
import Movie from './Movie'



const Movies = ({movies, onDelete}) => {
    
    return (
        <>
        {movies.map((movie) => (
            <Movie key={movie.id} movie={movie} onDelete={onDelete}/>
            
            
        ))}
        </>

    )
}

export default Movies