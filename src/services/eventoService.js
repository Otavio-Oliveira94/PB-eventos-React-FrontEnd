const API_URL = "http://localhost:8080/eventos";

export async function exibirEventos() {
  const response = await fetch(API_URL);
  return response.json();
}

export async function criarEvento(evento) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(evento),
  });

  return response.json();
}

export async function excluirEvento(id) {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
}

export async function atualizarEvento(id, evento) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(evento),
  });

  return response.json();
}
