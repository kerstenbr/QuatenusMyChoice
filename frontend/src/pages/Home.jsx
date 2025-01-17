import { useContext } from "react";
import { UserContext } from "../context/userContext";
import Card from "../components/Card";
import familiesImage from "../assets/families.png";
import bomImage from "../assets/bom.png";
import faqImage from "../assets/faq.png";
import paymentImage from "../assets/payment.png";

const Home = () => {
  const { user } = useContext(UserContext);

  const cards = [
    { image: familiesImage, title: "Famílias", path: "/families", canAccess: true },
    { image: bomImage, title: "B.O.M", path: "/logistics-sector/bom", canAccess: user && (user.role === "logística" || user.role === "técnica" || user.admin === true), },
    { image: faqImage, title: "F.A.Q", path: "", canAccess: false },
    // { image: paymentImage, title: "Pagamento", path: "", canAccess: false },
  ];

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="container">
        <div className="row justify-content-center">
          {cards.map((card, index) => (
            <Card key={index} image={card.image} title={card.title} path={card.path} canAccess={card.canAccess} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
