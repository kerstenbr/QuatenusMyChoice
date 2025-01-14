import PanelNavbar from "../components/PanelNavbar.jsx";
import BackButton from "../components/BackButton.jsx";

const Panel = () => {
  return (
    <div className="py-2 bg-light">
      <div className="container">
        <BackButton />
        <h1 className="mt-3 mb-4">Painel</h1>
        <PanelNavbar />
      </div>
    </div>
  );
};

export default Panel;
