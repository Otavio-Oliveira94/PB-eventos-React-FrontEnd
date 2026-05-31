export default function EventoCard({ evento, onDelete, onEdit }) {
  return (
    <div className="card">
      <h3>{evento.titulo}</h3>

      <p className="subtitulo">{evento.subTitulo}</p>
      <span className="badge">{evento.tipoEvento}</span>

      <hr />
      <div className="info">
        <p>
          {evento.endereco?.cidade} - {evento.endereco?.estado}
        </p>
        <p>
          {evento.endereco?.rua}, {evento.endereco?.numero},{" "}
          {evento.endereco?.complemento}
        </p>
      </div>
      <div className="acoes">
        <button className="botao-editar" onClick={() => onEdit(evento)}>
          Editar
        </button>
        <button className="botao-excluir" onClick={() => onDelete(evento.id)}>
          Excluir
        </button>
      </div>
    </div>
  );
}
