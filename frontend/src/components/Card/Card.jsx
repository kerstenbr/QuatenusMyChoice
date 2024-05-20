import { Link } from "react-router-dom"
import DeleteCard from "./DeleteCard"
import EditCard from "./EditCard"
import SeeMore from "./SeeMore"

const Card = ({ family }) => {
    return (
        <div className="col">
            <div className="card shadow-sm" style={{ height: '450px' }}>
                <img className="card-img-top" width="100%" height="225" src={family.bannerLink} />

                <div className="card-body">
                    <h3>{family.name}</h3>
                    <p className="card-text">{family.desc}</p>
                </div>

                <div className="ms-3 mb-3 me-3">
                    <SeeMore id={family._id} />
                    <EditCard id={family._id} />
                    <DeleteCard id={family._id} />
                </div>
            </div>
        </div>
    )
}

export default Card