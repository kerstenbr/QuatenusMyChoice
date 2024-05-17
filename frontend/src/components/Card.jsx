import { Link } from "react-router-dom"
import DeleteCard from "./DeleteCard"

const Card = ({ family }) => {
    return (
        <div className="col">
            <div className="card shadow-sm" style={{ height: '450px' }}>
                <Link>
                    <img className="card-img-top" width="100%" height="225" src={family.bannerLink} />
                </Link>

                <div className="card-body">
                    <h3>{family.name}</h3>
                    <p className="card-text">{family.desc}</p>
                </div>

                <div className="ms-3 mb-3 g-2">
                    <button type="button" className="btn btn-sm btn-qblue me-1">Ver mais</button>
                    <DeleteCard id={family._id} />
                </div>
            </div>
        </div>
    )
}

export default Card