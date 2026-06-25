import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Pocao from "./pages/Pocao";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* tela inicial = login */}
                <Route path="/" element={<Login />} />

                {/* usuário comum */}
                <Route path="/home" element={<Home />} />

                {/* admin */}
                <Route path="/admin" element={<Admin />} />

                {/* detalhe da poção */}
                <Route path="/pocao/:id" element={<Pocao />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;