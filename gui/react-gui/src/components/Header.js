import PropTypes from 'prop-types'
import Button from './Button'
const Header = ({title}) => {
    const onClick = () => {
        console.log('click')
    }
    return (
        <header clasName='header'>
            <h1 style={{color: 'red'}}>{title}</h1>
            <Button color='green' text='Add Movie' onClick={onClick}/>
        </header>
    )
}

Header.protoTypes =  {
    title: PropTypes.string
}


export default Header;
