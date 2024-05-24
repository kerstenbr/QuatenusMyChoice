import { Link } from "react-router-dom"
import LimitedParagraph from "./LimitedParagraph"
import { useContext } from 'react'
import { UserContext } from '../context/userContext'

// TODO: Adicionar páginação

const Card = ({ family }) => {
    const { user } = useContext(UserContext)

    return (
        // TODO: Melhorar a responsividade do card em si, principalmente em telas menores aonde só aparece dois cards um do lado do outro
        <div className="col" style={{ minWidth: '300px' }}>
            <div className="card shadow-sm" style={{ height: '450px' }}>
                <img className="card-img-top" width="100%" height="225" src={family.bannerLink} />

                <div className="card-body">
                    <h3>{family.name}</h3>
                    {/* <p className="card-text">{family.desc}</p> */}
                    <LimitedParagraph text={family.desc} limit={200} />

                </div>

                <div className="ms-3 mb-3 me-3">
                    <Link to={`/family/seemore/${family._id}`} target="_blank" rel="noopener noreferrer">
                        <button type="button" className="btn btn-sm btn-qblue me-1">Ver mais</button>
                    </Link>
                    {/* <Link to={`/family/edit/${family._id}`}>
                        <button type="button" className="btn btn-sm btn-warning me-1">Editar</button>
                    </Link>
                    <Link to={`/family/delete/${family._id}`}>
                        <button type="button" className="btn btn-sm btn-danger">Excluir</button>
                    </Link> */}
                    {/* {console.log(user)} */}
                    {/* TODO: Achar outra maneira de fazer esse check, atualmente ele faz isso pra TODOS os cards... nada legal. */}
                    {user && user.admin === true ? (
                        <>
                            <Link to={`/family/edit/${family._id}`}>
                                <button type="button" className="btn btn-sm btn-warning me-1">Editar</button>
                            </Link>
                            <Link to={`/family/delete/${family._id}`}>
                                <button type="button" className="btn btn-sm btn-danger">Excluir</button>
                            </Link>
                        </>
                    ) : (<></>)}
                </div>
            </div>
        </div>
    )
}

export default Card