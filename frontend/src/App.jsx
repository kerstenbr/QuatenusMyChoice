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

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search/:name" element={<Search />} />
            <Route path="/family/create" element={<CreateFamily />} />
            <Route path="/family/seemore/:id" element={<SeeMoreFamily />} />
            <Route path="/family/edit/:id" element={<EditFamily />} />
            <Route path="/family/delete/:id" element={<DeleteFamily />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/panel" element={<Panel />} />
            <Route path="/panel/users" element={<UserPanel />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
