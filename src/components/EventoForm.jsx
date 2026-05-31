import { useEffect, useState } from "react";

export default function EventoForm({ onSave, eventoEmEdicao }) {
  const eventoInicial = {
    titulo: "",
    subTitulo: "",
    tipoEvento: "",

    endereco: {
      rua: "",
      numero: "",
      complemento: "",
      cep: "",
      cidade: "",
      estado: "",
    },

    inicioEvento: "",
    terminoEvento: "",
  };

  const [evento, setEvento] = useState(eventoInicial);

  useEffect(() => {
    if (eventoEmEdicao) {
      setEvento(eventoEmEdicao);
    }
  }, [eventoEmEdicao]);

  function handleChange(e) {
    const { name, value } = e.target;

    if (
      ["rua", "numero", "complemento", "cep", "cidade", "estado"].includes(name)
    ) {
      setEvento({
        ...evento,

        endereco: {
          ...evento.endereco,
          [name]: value,
        },
      });

      return;
    }

    setEvento({
      ...evento,
      [name]: value,
    });
  }

  function salvar(e) {
    e.preventDefault();
    onSave(evento);
    setEvento(eventoInicial);
  }

  return (
    <form className="formulario" onSubmit={salvar}>
      <input
        name="titulo"
        placeholder="Título"
        value={evento.titulo}
        onChange={handleChange}
      />
      <input
        name="subTitulo"
        placeholder="Subtítulo"
        value={evento.subTitulo}
        onChange={handleChange}
      />
      <input
        name="tipoEvento"
        placeholder="Tipo de Evento"
        value={evento.tipoEvento}
        onChange={handleChange}
      />
      <input
        name="rua"
        placeholder="Rua"
        value={evento.endereco.rua}
        onChange={handleChange}
      />

      <input
        name="numero"
        placeholder="Número"
        value={evento.endereco.numero}
        onChange={handleChange}
      />

      <input
        name="complemento"
        placeholder="Complemento"
        value={evento.endereco.complemento}
        onChange={handleChange}
      />

      <input
        name="cep"
        placeholder="CEP"
        value={evento.endereco.cep}
        onChange={handleChange}
      />

      <input
        name="cidade"
        placeholder="Cidade"
        value={evento.endereco.cidade}
        onChange={handleChange}
      />

      <input
        name="estado"
        placeholder="Estado"
        value={evento.endereco.estado}
        onChange={handleChange}
      />

      <input
        type="datetime-local"
        name="inicioEvento"
        value={evento.inicioEvento}
        onChange={handleChange}
      />

      <input
        type="datetime-local"
        name="terminoEvento"
        value={evento.terminoEvento}
        onChange={handleChange}
      />

      <button type="submit">
        {eventoEmEdicao ? "Atualizar Evento" : "Salvar Evento"}
      </button>
    </form>
  );
}
