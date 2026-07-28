import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "@/pages/Login";
import Admin from "./pages/Admin";
import Dashboard from "./pages/Dashboard";
import ContactPage from "./pages/Contact";
import Contacts from "./pages/Contacts";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/admin/contacts" element={<Contacts />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
