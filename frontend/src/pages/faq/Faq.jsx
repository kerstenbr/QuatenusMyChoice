import { useEffect, useState } from "react";
import FaqSearchbar from "../../components/faq/FaqSearchbar";
import FaqAccordion from "../../components/faq/FaqAccordion";
import axios from "axios";
import Cookies from "js-cookie";

const Faq = () => {
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/api/faq/`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      .then((response) => {
        setFaqs(response.data);
      })
      .catch((error) => {
        console.error(error.response?.data?.message || error.message);
      });
  }, []);

  return (
    <div className="py-2 bg-light">
      <div className="container">
        <div>
          <FaqSearchbar />
        </div>
        {faqs.map((faq) => (
          <FaqAccordion key={faq._id} faq={faq} />
        ))}     
      </div>
    </div>
  );
};

export default Faq;
