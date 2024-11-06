import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Search from "./pages/family/Search.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Footer from "./components/Footer.jsx";
import CreateFamily from "./pages/family/CreateFamily.jsx";
import SeeMoreFamily from "./pages/family/SeeMoreFamily.jsx";
import EditFamily from "./pages/family/EditFamily.jsx";
import DeleteFamily from "./pages/family/DeleteFamily.jsx";
import Panel from "./pages/Panel.jsx";
import UserPanel from "./pages/UserPanel.jsx";
import NotFound from "./pages/NotFound.jsx";
import { useContext } from "react";
import { UserContext } from "./context/userContext.jsx";

function App() {
  const { user } = useContext(UserContext);
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <main>
          <Routes>
            {user !== undefined ? (
              <>
                <Route path="/" element={<Home />} />
                <Route path="/search/:name" element={<Search />} />
                <Route path="/family/seemore/:id" element={<SeeMoreFamily />} />
                {user && user.admin === true ? (
                  <>
                    <Route path="/family/create" element={<CreateFamily />} />
                    <Route path="/family/edit/:id" element={<EditFamily />} />
                    <Route path="/family/delete/:id" element={<DeleteFamily />} />
                    <Route path="/panel" element={<Panel />} />
                    <Route path="/panel/users" element={<UserPanel />} />
                  </>
                ) : (
                  <Route path="*" element={<NotFound />} />
                )}
              </>
            ) : (
              <Route path="*" element={<Login />} />
            )}

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
