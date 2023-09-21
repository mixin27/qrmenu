import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { AuthProvider } from "../contexts/AuthContext";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Places from "../pages/Places";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/places"
              element={
                <ProtectedRoute>
                  <Places />
                </ProtectedRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
