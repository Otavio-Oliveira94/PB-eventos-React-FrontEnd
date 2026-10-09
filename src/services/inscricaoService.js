const API_URL = "/api/inscricoes-service/inscricoes";

async function processarResposta(response) {
  if (!response.ok) {
    let detalhes = null;

    try {
      detalhes = await response.json();
    } catch {
      detalhes = null;
    }

    const erro = new Error(
      detalhes?.message ||
        detalhes?.detail ||
        `Erro na requisição: ${response.status}`,
    );

    erro.status = response.status;

    throw erro;
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export async function buscarInscricoesPorEvento(eventoId) {
  const response = await fetch(`${API_URL}/evento/${eventoId}`);

  return processarResposta(response);
}

export async function criarInscricao(inscricao) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(inscricao),
  });

  return processarResposta(response);
}

export async function excluirInscricao(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  return processarResposta(response);
}
