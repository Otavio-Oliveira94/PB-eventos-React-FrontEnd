export default function InscricaoCard({ inscricao, onDelete, excluindoId }) {
  function formatarData(data) {
    if (!data) {
      return "Data não informada";
    }

    return new Date(data).toLocaleString("pt-BR");
  }

  const excluindo = excluindoId === inscricao.id;

  return (
    <article className="inscricao-card">
      <div className="inscricao-info">
        <h4>{inscricao.nomeParticipante}</h4>

        <a
          href={`mailto:${inscricao.emailParticipante}`}
          className="inscricao-email"
        >
          {inscricao.emailParticipante}
        </a>

        <p className="inscricao-data">
          Inscrito em: {formatarData(inscricao.dataInscricao)}
        </p>
      </div>

      <button
        type="button"
        className="botao-remover-inscricao"
        onClick={() => onDelete(inscricao)}
        disabled={excluindo}
      >
        {excluindo ? "Excluindo..." : "Excluir"}
      </button>
    </article>
  );
}
