import { Link } from "react-router-dom"

const Footer = () => {
    return (
        <footer className="text-muted py-5">
            <div className="container">
                <p className="float-end mb-1">
                    <Link to={'https://github.com/kerstenbr/QuatenusMyChoice'} target="_blank" rel="noopener noreferrer">Repo do Projeto</Link>
                </p>
                <p className="mb-1">&copy; Quatenus MyChoice</p>
                <p className="float-end mb-1">
                    <Link to={'https://qbm01.quatenus-system.com.br/quatenus10/QBM/Login/Login.aspx'} target="_blank" rel="noopener noreferrer">Reporte um bug</Link>
                </p>

                <p>Criado por <Link to={'https://kerstenbr.github.io/SitePei/'} target="_blank" rel="noopener noreferrer">Projetos e Inovações</Link>
                    <span><br />Com ajuda de  <Link to={'https://github.com/codebruno'} target="_blank" rel="noopener noreferrer">Bruno Silva</Link>, <Link to={'https://github.com/EricSemE'} target="_blank" rel="noopener noreferrer">Eric Caetano</Link> e <Link to={'https://github.com/lucind0'} target="_blank" rel="noopener noreferrer">Kauã Lucindo</Link></span>
                </p>
                <p>v0.0.0 - Em testes</p>
            </div>
        </footer >
    )
}

export default Footer