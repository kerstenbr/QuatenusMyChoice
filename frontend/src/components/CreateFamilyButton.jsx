import { Link } from "react-router-dom"

const CreateFamily = () => {
    return (
        <Link to='/create'>
            <button type="button" className="btn btn-sm btn-qorange mb-1">Criar Família</button>
        </Link>
    )
}

export default CreateFamily