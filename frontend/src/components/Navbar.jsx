import { Link, useNavigate } from 'react-router-dom'
import Logo from '../assets/logo.png'
import { useContext, useEffect } from 'react'
import { UserContext } from '../context/userContext'
import { userLogged } from '../services/userService'
import Cookies from "js-cookie"

const Navbar = () => {
    const navigate = useNavigate()
    const { user, setUser } = useContext(UserContext)

    const signout = () => {
        Cookies.remove("token", { sameSite: 'strict' })
        setUser(undefined)
        navigate("/login")
    }

    async function findUserLogged() {
        try {
            const response = await userLogged()
            setUser(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (Cookies.get("token")) findUserLogged()
    }, [])

    return (
        <header>
            <div className="container">
                <Link className='navbar-brand p-0' to="/">
                    <img className='logo' src={Logo} />
                </Link>
                <div className='navbar-brand p-0' to="/">
                    {user && user.admin === true ? (
                        <Link to='/family/create'><button type="button" className="btn btn-sm btn-qblue me-1">Criar Família</button></Link>
                    ) : (<></>)}
                    {user ? (
                        <>
                            <button className='btn btn-sm btn-qblue me-1' onClick={signout}>Sair</button>
                        </>
                    ) : (
                        <>
                            <Link to='/login'><button className='btn btn-sm btn-qblue me-1'>Entrar</button></Link>
                            <Link to='/register'><button className='btn btn-sm btn-qblue me-1'>Registrar</button></Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Navbar