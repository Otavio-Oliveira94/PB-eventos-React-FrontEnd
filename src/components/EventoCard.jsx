import { Link } from "react-router";

export default function EventoCard({ evento, onDelete }) {
  function formatarData(data) {
    if (!data) {
      return "Data não informada";
    }

    return new Date(data).toLocaleString("pt-BR");
  }

  return (
    <article className="card">
      <Link to={`/eventos/${evento.id}`} className="card-link">
        <h2>{evento.titulo}</h2>

        <p className="card-subtitulo">{evento.subTitulo}</p>

        <p>
          <strong>Tipo:</strong> {evento.tipoEvento}
        </p>

        <p>
          <strong>Local:</strong> {evento.endereco?.cidade || "Não informado"}
        </p>

        <p>
          <strong>Início:</strong> {formatarData(evento.inicioEvento)}
        </p>

        <span className="card-detalhes">Ver detalhes</span>
      </Link>

      <button
        type="button"
        className="botao-excluir"
        onClick={() => onDelete(evento.id)}
      >
        Excluir
      </button>
    </article>
  );
}
