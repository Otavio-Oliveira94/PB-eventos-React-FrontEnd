import { useEffect, useState } from "react";
import { Link } from "react-router";
import EventoCard from "../components/EventoCard";
import { excluirEvento, exibirEventos } from "../services/eventoService";

export default function Eventos() {
  const [eventos, setEventos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  async function carregarEventos() {
    setCarregando(true);
    setErro("");

    try {
      const dados = await exibirEventos();
      setEventos(dados);
    } catch {
      setErro("Não foi possível carregar os eventos.");
    } finally {
      setCarregando(false);
    }
  }

  async function removerEvento(id) {
    const confirmado = window.confirm("Deseja realmente excluir este evento?");

    if (!confirmado) {
      return;
    }

    try {
      await excluirEvento(id);

      setEventos((eventosAtuais) =>
        eventosAtuais.filter((evento) => evento.id !== id),
      );
    } catch {
      setErro("Não foi possível excluir o evento.");
    }
  }

  useEffect(() => {
    carregarEventos();
  }, []);

  return (
    <div className="container">
      <header className="pagina-cabecalho">
        <div>
          <h1>Eventos cadastrados</h1>
          <p>Selecione um evento para ver os detalhes.</p>
        </div>

        <Link to="/eventos/novo" className="botao botao-principal">
          Cadastrar evento
        </Link>
      </header>

      {carregando && <p className="mensagem">Carregando eventos...</p>}

      {erro && <p className="mensagem mensagem-erro">{erro}</p>}

      {!carregando && !erro && eventos.length === 0 && (
        <div className="mensagem">
          <p>Nenhum evento cadastrado.</p>

          <Link to="/eventos/novo">Cadastre o primeiro evento</Link>
        </div>
      )}

      {!carregando && eventos.length > 0 && (
        <div className="lista-eventos">
          {eventos.map((evento) => (
            <EventoCard
              key={evento.id}
              evento={evento}
              onDelete={removerEvento}
            />
          ))}
        </div>
      )}

      <div className="acoes-pagina">
        <Link to="/" className="link-voltar">
          Voltar ao menu
        </Link>
      </div>
    </div>
  );
}
