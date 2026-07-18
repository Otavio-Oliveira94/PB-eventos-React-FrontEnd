import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Eventos from "./pages/Eventos";
import CadastroEvento from "./pages/CadastroEvento";
import EventoDetalhes from "./pages/EventoDetalhes";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/eventos" element={<Eventos />} />

      <Route path="/eventos/novo" element={<CadastroEvento />} />

      <Route path="/eventos/:id" element={<EventoDetalhes />} />
    </Routes>
  );
}
