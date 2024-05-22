import { Link } from "react-router-dom"

const BackButton = () => {
    return (
        <Link to='/'>
            <button type="button" className="btn btn-sm btn-qorange mb-1 float-end">Voltar</button>
        </Link>
    )
}

export default BackButton