import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Footer from "./components/Footer";
import CreateFamily from "./pages/CreateFamily";
import SeeMoreFamily from "./pages/SeeMoreFamily";
import EditFamily from "./pages/EditFamily";
import DeleteFamily from "./pages/DeleteFamily";
import Panel from "./pages/Panel";
import UserPanel from "./pages/UserPanel";
import NotFound from "./pages/NotFound";
import { useContext } from "react";
import { UserContext } from "./context/userContext";

function App() {
  const { user } = useContext(UserContext);
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <main>
          <Routes>
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
              <Route element={<NotFound />} />
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
