import {useState} from 'react'

const AddMovie = ({onAdd}) => {
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')
    const [publicationDay, setPublicationDay] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()

        if(!title) {
            alert('Please add a movie')
            return
        } 

        onAdd({title, category, publicationDay})

        setTitle(' ' )
        setCategory(' ')
        setPublicationDay(' ')
    } 

    return (
    <form className='add-form' onSubmit={onSubmit}>
        <div className='form-control'>
            <label>Movie: </label>
            <input type='text' placeholder='Add Movie' value={title} onChange={(e) => setTitle(e.target.value)}/>
        </div>
        <div className='form-control'>
            <label>Category: </label>
            <input type='text' placeholder='Add category' value={category} onChange={(e) => setCategory(e.target.value)} />
        </div>
        <div className='form-control'>
            <label>Publication Date: </label>
            <input type='date' placeholder='Publication Date' value={publicationDay} onChange={(e) => setPublicationDay(e.target.value)}/>
        </div>

        <input type='submit' value='Save Movie' className='btn btn-block'/>
    </form>
    )
}

export default AddMovie