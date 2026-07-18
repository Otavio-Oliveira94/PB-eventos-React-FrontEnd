const API_URL = "http://localhost:8080/eventos";

async function processarResposta(response) {
  if (!response.ok) {
    throw new Error(`Erro na requisição: ${response.status}`);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export async function exibirEventos() {
  const response = await fetch(API_URL);
  return processarResposta(response);
}

export async function buscarEventoPorId(id) {
  const response = await fetch(`${API_URL}/${id}`);
  return processarResposta(response);
}

export async function criarEvento(evento) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(evento),
  });

  return processarResposta(response);
}

export async function excluirEvento(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  return processarResposta(response);
}

export async function atualizarEvento(id, evento) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(evento),
  });

  return processarResposta(response);
}
