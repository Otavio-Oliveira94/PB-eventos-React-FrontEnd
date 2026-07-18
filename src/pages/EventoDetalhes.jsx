import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { buscarEventoPorId } from "../services/eventoService";

export default function EventoDetalhes() {
  const { id } = useParams();

  const [evento, setEvento] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregarEvento() {
      setCarregando(true);
      setErro("");

      try {
        const dados = await buscarEventoPorId(id);
        setEvento(dados);
      } catch {
        setErro("Não foi possível encontrar o evento.");
      } finally {
        setCarregando(false);
      }
    }

    carregarEvento();
  }, [id]);

  function formatarData(data) {
    if (!data) {
      return "Não informada";
    }

    return new Date(data).toLocaleString("pt-BR");
  }

  if (carregando) {
    return (
      <div className="container">
        <p className="mensagem">Carregando evento...</p>
      </div>
    );
  }

  if (erro || !evento) {
    return (
      <div className="container">
        <p className="mensagem mensagem-erro">
          {erro || "Evento não encontrado."}
        </p>

        <Link to="/eventos" className="link-voltar">
          Voltar aos eventos
        </Link>
      </div>
    );
  }

  const endereco = evento.endereco;

  return (
    <div className="container">
      <section className="detalhes-evento">
        <div className="detalhes-cabecalho">
          <span className="detalhes-tipo">{evento.tipoEvento}</span>

          <h1>{evento.titulo}</h1>
          <p>{evento.subTitulo}</p>
        </div>

        <div className="detalhes-conteudo">
          <div className="detalhes-grupo">
            <h2>Data e horário</h2>

            <p>
              <strong>Início:</strong> {formatarData(evento.inicioEvento)}
            </p>

            <p>
              <strong>Término:</strong> {formatarData(evento.terminoEvento)}
            </p>
          </div>

          <div className="detalhes-grupo">
            <h2>Endereço</h2>

            <p>
              {endereco?.rua || "Rua não informada"},{" "}
              {endereco?.numero || "sem número"}
            </p>

            {endereco?.complemento && <p>{endereco.complemento}</p>}

            <p>{endereco?.cep || "CEP não informado"}</p>

            <p>
              {endereco?.cidade || "Cidade não informada"}
              {endereco?.estado ? ` - ${endereco.estado}` : ""}
            </p>
          </div>
        </div>
      </section>

      <div className="acoes-pagina">
        <Link to="/eventos" className="link-voltar">
          Voltar aos eventos
        </Link>

        <Link to="/" className="link-voltar">
          Menu principal
        </Link>
      </div>
    </div>
  );
}
