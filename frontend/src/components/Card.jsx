import { Link } from "react-router-dom"

const Card = ({ family }) => {

    const handleMore = () => {
        console.log("handleMore")
    }
    const handleEdit = () => {
        console.log("handleEdit")
    }
    const handleDelete = () => {
        console.log("handleDelete")
    }

    return (
        <div className="col">
            <div className="card shadow-sm" style={{ height: '450px' }}>
                <img className="card-img-top" width="100%" height="225" src={family.bannerLink} />

                <div className="card-body">
                    <h3>{family.name}</h3>
                    <p className="card-text">{family.desc}</p>
                </div>

                <div className="ms-3 mb-3 me-3">
                    <button type="button" className="btn btn-sm btn-qblue me-1" onClick={handleMore}>Ver mais</button>
                    <button type="button" className="btn btn-sm btn-warning me-1" onClick={handleEdit}>Editar</button>
                    <button type="button" className="btn btn-sm btn-danger" onClick={handleDelete}>Excluir</button>
                </div>
            </div>
        </div>
    )
}

export default Card