import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import useStore from "./store/useStore";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import Quiz from "./pages/Quiz";
import Navbar from "./components/layout/Navbar";
import Resources from "./pages/Resources";

function App() {
  const { checkAuth } = useStore();

  useEffect(() => {
    // Verificar el estado de autenticación al cargar la aplicación
    checkAuth();
  }, [checkAuth]);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/resources" element={<Resources />} />
      </Routes>
    </Router>
  );
}

export default App;
