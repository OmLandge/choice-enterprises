import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "@/pages/Login";
import Admin from "./pages/Admin";
import Dashboard from "./pages/Dashboard";
import ContactPage from "./pages/Contact";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
