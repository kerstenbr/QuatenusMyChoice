import { Link } from 'react-router-dom'
import Logo from '../assets/logo.png'

const Navbar = () => {

    return (
        <header>
            <div className="container">
                <Link className='navbar-brand p-0' to="/">
                    <img className='logo' src={Logo} />
                </Link>
                <div className='navbar-brand p-0' to="/">
                    <Link to='/login'><button className='btn btn-sm btn-qblue me-1'>Entrar</button></Link>
                    <Link to='/register'><button className='btn btn-sm btn-qblue me-1'>Registrar</button></Link>
                    <Link to='/family/create'><button type="button" className="btn btn-sm btn-qblue">Criar Família</button></Link>
                </div>
            </div>
        </header>
    )
}

export default Navbar