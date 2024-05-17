import { Link } from "react-router-dom"

const Footer = () => {
    return (
        <footer className="text-muted py-5">
            <div className="container">
                <p className="float-end mb-1">
                    {/* TODO: Adicionar a opção de subir pra parte de cima da página */}
                    <Link>Voltar ao Início</Link>
                </p>
                <p className="mb-1">&copy; Quatenus MyChoice</p>
                <p className="float-end mb-1">
                    <Link to={'https://qbm01.quatenus-system.com.br/quatenus10/QBM/Default.aspx?Language=pt-BR#:~:text=Opera%C3%A7%C3%B5es%20%3A%3A%20Tickets" target="_blank" rel="noopener noreferrer'}>Report um bug</Link>
                </p>

                <p>Criado por <Link to={'https://kerstenbr.github.io/SitePei/'} target="_blank" rel="noopener noreferrer">Projetos e Inovações</Link>.</p>
                <p>v0.0.0 - Em testes</p>
            </div>
        </footer >
    )
}

export default Footer