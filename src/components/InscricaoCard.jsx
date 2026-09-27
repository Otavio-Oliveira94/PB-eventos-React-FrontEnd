const CONFIGURACAO_STATUS = {
  PENDENTE: {
    texto: "Pendente",
    descricao: "Aguardando validação do evento.",
    classe: "inscricao-status-pendente",
  },
  CONFIRMADA: {
    texto: "Confirmada",
    descricao: "Inscrição validada com sucesso.",
    classe: "inscricao-status-confirmada",
  },
  REJEITADA: {
    texto: "Rejeitada",
    descricao: "A inscrição não pôde ser confirmada.",
    classe: "inscricao-status-rejeitada",
  },
};

export default function InscricaoCard({ inscricao, onDelete, excluindoId }) {
  function formatarData(data) {
    if (!data) {
      return "Data não informada";
    }

    return new Date(data).toLocaleString("pt-BR");
  }

  const excluindo = excluindoId === inscricao.id;

  const configuracaoStatus = CONFIGURACAO_STATUS[inscricao.status] ?? {
    texto: "Não informado",
    descricao: "O status da inscrição não foi informado.",
    classe: "inscricao-status-desconhecido",
  };

  const mostrarMotivo =
    inscricao.status === "REJEITADA" && inscricao.motivoRejeicao;

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

      <div className="inscricao-status-area">
        <span className={`inscricao-status-selo ` + configuracaoStatus.classe}>
          {configuracaoStatus.texto}
        </span>

        <p className="inscricao-status-descricao">
          {configuracaoStatus.descricao}
        </p>

        {mostrarMotivo && (
          <p className="inscricao-motivo-rejeicao">
            <strong>Motivo:</strong> {inscricao.motivoRejeicao}
          </p>
        )}
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
