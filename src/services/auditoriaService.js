const SERVICOS = {
  eventos: "http://localhost:8080",
  inscricoes: "http://localhost:8081",
};

export async function consultarHistorico(servico, registroId = "", signal) {
  const parametros = new URLSearchParams({ limite: "100" });
  if (registroId) parametros.set("registroId", registroId);

  const resposta = await fetch(`${SERVICOS[servico]}/auditoria?${parametros}`, {
    signal,
  });
  if (!resposta.ok) {
    throw new Error(
      "Não foi possível consultar o histórico. Verifique o serviço selecionado.",
    );
  }
  return resposta.json();
}
