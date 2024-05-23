import { Link } from "react-router-dom"

const BackButton = () => {
    return (
        // TODO: Em vez de voltar direto pra Home, fazer voltar pro link anterior
        <Link to='/'>
            <button type="button" className="btn btn-sm btn-qorange mb-1 mt-1 float-end">Voltar</button>
        </Link>
    )
}

export default BackButton