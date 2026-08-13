import { useState } from "react";

export default function InscricaoForm({ onSave, salvando }) {
  const dadosIniciais = {
    nomeParticipante: "",
    emailParticipante: "",
  };

  const [dados, setDados] = useState(dadosIniciais);

  function handleChange(event) {
    const { name, value } = event.target;

    setDados((dadosAtuais) => ({
      ...dadosAtuais,
      [name]: value,
    }));
  }

  async function salvar(event) {
    event.preventDefault();

    const inscricaoSalva = await onSave({
      nomeParticipante: dados.nomeParticipante.trim(),
      emailParticipante: dados.emailParticipante.trim(),
    });

    if (inscricaoSalva) {
      setDados(dadosIniciais);
    }
  }

  return (
    <form className="inscricao-formulario" onSubmit={salvar}>
      <div className="campo-formulario">
        <label htmlFor="nomeParticipante">Nome do participante</label>

        <input
          id="nomeParticipante"
          name="nomeParticipante"
          type="text"
          placeholder="Digite o nome completo"
          value={dados.nomeParticipante}
          onChange={handleChange}
          minLength="3"
          autoComplete="name"
          disabled={salvando}
          required
        />
      </div>

      <div className="campo-formulario">
        <label htmlFor="emailParticipante">E-mail</label>

        <input
          id="emailParticipante"
          name="emailParticipante"
          type="email"
          placeholder="participante@email.com"
          value={dados.emailParticipante}
          onChange={handleChange}
          autoComplete="email"
          disabled={salvando}
          required
        />
      </div>

      <button type="submit" className="botao-inscrever" disabled={salvando}>
        {salvando ? "Realizando inscrição..." : "Inscrever participante"}
      </button>
    </form>
  );
}
