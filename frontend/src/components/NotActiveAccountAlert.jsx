import { Link } from "react-router-dom";

const NotActiveAccountAlert = () => {
  return (
    <div className="py-2 bg-light">
      <div className="container">
        <div className="alert alert-warning" role="alert">
          <h4 className="alert-heading">Sua conta está inativa!</h4>
          <p>
            Abra um ticket no{" "}
            <Link
              to={"https://qbm01.quatenus-system.com.br/quatenus10/QBM/Login/Login.aspx"}
              target="_blank"
              rel="noopener noreferrer">
              QBM
            </Link>{" "}
            para a equipe de Projetos e Inovações e inclua o email usado para criar essa conta.
          </p>
        </div>
      </div>
      <h5>Enquanto espera sua conta ser ativada, de uma olhada no nosso blog:</h5>
      <div>
        <iframe src="https://www.quatenusonline.com.br/blog/" width={"100%"} height={"800px"}></iframe>
      </div>
    </div>
  );
};

export default NotActiveAccountAlert;
