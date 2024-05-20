import { Link } from 'react-router-dom'
import Logo from '../assets/logo.png'

const Navbar = () => {

    return (
        <header>
            <div className="container">
                <Link className='navbar-brand p-0' to="/">
                    <img className='logo' src={Logo} />
                </Link>
            </div>
        </header>
    )
}

export default Navbar