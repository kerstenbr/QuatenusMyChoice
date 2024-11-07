import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";
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
// import Bom from "./pages/logistics-sector/Bom.jsx";
import UserPanel from "./pages/UserPanel.jsx";
import NotFound from "./pages/NotFound.jsx";
import { UserContext } from "./context/userContext.jsx";
import ProtectedRoute from "./components/routes/ProtectedRoute.jsx";
import AdminRoute from "./components/routes/AdminRoute.jsx";
import RoleBasedRoute from "./components/routes/RoleBasedRoute.jsx";
import ActiveAccountRoute from "./components/routes/ActiveAccountRoute.jsx";

function App() {
  const { user } = useContext(UserContext);
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <main>
          <Routes>
            {/* <Route path="/" element={<Home />} /> */}

            <Route
              path="/"
              element={
                <ProtectedRoute user={user}>
                  <ActiveAccountRoute>
                    <Home />
                  </ActiveAccountRoute>
                </ProtectedRoute>
              }
            />

            <Route
              path="/search/:name"
              element={
                <ProtectedRoute user={user}>
                  <ActiveAccountRoute>
                    <Search />
                  </ActiveAccountRoute>
                </ProtectedRoute>
              }
            />
            <Route
              path="/family/seemore/:id"
              element={
                <ProtectedRoute user={user}>
                  <ActiveAccountRoute>
                    <SeeMoreFamily />
                  </ActiveAccountRoute>
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />

            {/* TODO: Lembrar do ActiveAccountRoute */}
            {/* <Route
              path="/logistics-sector/bom"
              element={
                <ProtectedRoute user={user}>
                  <RoleBasedRoute user={user} roles={["técnica", "logística", "admin"]}>
                    <Bom />
                  </RoleBasedRoute>
                </ProtectedRoute>
              }
            /> */}

            <Route
              path="/family/create"
              element={
                <ProtectedRoute user={user}>
                  <AdminRoute user={user}>
                    <ActiveAccountRoute>
                      <CreateFamily />
                    </ActiveAccountRoute>
                  </AdminRoute>
                </ProtectedRoute>
              }
            />
            <Route
              path="/family/edit/:id"
              element={
                <ProtectedRoute user={user}>
                  <AdminRoute user={user}>
                    <ActiveAccountRoute>
                      <EditFamily />
                    </ActiveAccountRoute>
                  </AdminRoute>
                </ProtectedRoute>
              }
            />
            <Route
              path="/family/delete/:id"
              element={
                <ProtectedRoute user={user}>
                  <AdminRoute user={user}>
                    <ActiveAccountRoute>
                      <DeleteFamily />
                    </ActiveAccountRoute>
                  </AdminRoute>
                </ProtectedRoute>
              }
            />
            <Route
              path="/panel"
              element={
                <ProtectedRoute user={user}>
                  <AdminRoute user={user}>
                    <ActiveAccountRoute>
                      <Panel />
                    </ActiveAccountRoute>
                  </AdminRoute>
                </ProtectedRoute>
              }
            />
            <Route
              path="/panel/users"
              element={
                <ProtectedRoute user={user}>
                  <AdminRoute user={user}>
                    <ActiveAccountRoute>
                      <UserPanel />
                    </ActiveAccountRoute>
                  </AdminRoute>
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
