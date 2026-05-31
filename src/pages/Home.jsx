import { useEffect, useState } from "react";
import EventoForm from "../components/EventoForm";
import EventoCard from "../components/EventoCard";
import {
  atualizarEvento,
  criarEvento,
  excluirEvento,
  exibirEventos,
} from "../services/eventoService";

export default function Home() {
  const [eventos, setEvento] = useState([]);
  const [eventoEmEdicao, setEventoEmEdicao] = useState(null);

  async function carregarEventos() {
    const dados = await exibirEventos();

    setEvento(dados);
  }

  async function salvarEvento(evento) {
    if (eventoEmEdicao) {
      await atualizarEvento(eventoEmEdicao.id, evento);
      setEventoEmEdicao(null);
    } else {
      await criarEvento(evento);
    }
    carregarEventos();
  }

  function editarEvento(evento) {
    setEventoEmEdicao(evento);
  }

  async function removerEvento(id) {
    await excluirEvento(id);

    carregarEventos();
  }

  useEffect(() => {
    carregarEventos();
  }, []);

  return (
    <div className="container">
      <h1>Sistema de Eventos</h1>
      <EventoForm onSave={salvarEvento} eventoEmEdicao={eventoEmEdicao} />

      <div className="lista-eventos">
        {eventos.map((evento) => (
          <EventoCard
            key={evento.id}
            evento={evento}
            onDelete={removerEvento}
            onEdit={editarEvento}
          />
        ))}
      </div>
    </div>
  );
}
