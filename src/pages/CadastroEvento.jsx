import { useState } from "react";
import { Link, useNavigate } from "react-router";
import EventoForm from "../components/EventoForm";
import { criarEvento } from "../services/eventoService";

export default function CadastroEvento() {
  const navigate = useNavigate();
  const [erro, setErro] = useState("");

  async function salvarEvento(evento) {
    setErro("");

    try {
      const eventoCriado = await criarEvento(evento);

      navigate(`/eventos/${eventoCriado.id}`);
    } catch {
      setErro("Não foi possível cadastrar o evento.");
    }
  }

  return (
    <div className="container">
      <header className="pagina-cabecalho">
        <div>
          <h1>Cadastrar evento</h1>
          <p>Informe os dados do novo evento.</p>
        </div>
      </header>

      {erro && <p className="mensagem mensagem-erro">{erro}</p>}

      <EventoForm onSave={salvarEvento} />

      <div className="acoes-pagina">
        <Link to="/" className="link-voltar">
          Voltar ao menu
        </Link>

        <Link to="/eventos" className="link-voltar">
          Ver eventos
        </Link>
      </div>
    </div>
  );
}
