import { useNavigate } from "react-router-dom"

const BackButton = () => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1)
    }

    return (
        <button type="button" className="btn btn-sm btn-qorange mb-1 mt-1 float-end" onClick={goBack}>Voltar</button>
    )
}

export default BackButton