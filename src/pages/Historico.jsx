import { useEffect, useState } from "react";
import { Link } from "react-router";
import { consultarHistorico } from "../services/auditoriaService";

const OPERACOES = {
  CRIACAO: "Criação",
  ATUALIZACAO: "Atualização",
  EXCLUSAO: "Exclusão",
};

function Dados({ titulo, dados }) {
  return (
    <div className="historico-dados">
      <h3>{titulo}</h3>
      {dados === null ? (
        <p>Registro inexistente.</p>
      ) : (
        <pre>{JSON.stringify(dados, null, 2)}</pre>
      )}
    </div>
  );
}

export default function Historico() {
  const [servico, setServico] = useState("eventos");
  const [registroId, setRegistroId] = useState("");
  const [consulta, setConsulta] = useState({
    servico: "eventos",
    registroId: "",
  });
  const [estado, setEstado] = useState({
    registros: [],
    erro: "",
    carregando: true,
  });

  useEffect(() => {
    const controller = new AbortController();
    consultarHistorico(consulta.servico, consulta.registroId, controller.signal)
      .then((registros) => {
        if (!controller.signal.aborted) {
          setEstado({ registros, erro: "", carregando: false });
        }
      })
      .catch(() => {
        if (!controller.signal.aborted) {
          setEstado({
            registros: [],
            erro: "Não foi possível consultar o histórico. Verifique se o serviço selecionado está ativo e consulte seu log em caso de falha de auditoria.",
            carregando: false,
          });
        }
      });
    return () => controller.abort();
  }, [consulta]);

  function consultar(event) {
    event.preventDefault();
    setEstado({ registros: [], erro: "", carregando: true });
    setConsulta({ servico, registroId });
  }

  return (
    <main className="container">
      <header className="pagina-cabecalho">
        <div>
          <h1>Histórico de alterações</h1>
          <p>Consulte os dados antes e depois de cada alteração.</p>
        </div>
        <Link to="/" className="link-voltar">
          Voltar ao menu
        </Link>
      </header>

      <form className="historico-filtros" onSubmit={consultar}>
        <label>
          Histórico de
          <select
            value={servico}
            onChange={(event) => setServico(event.target.value)}
          >
            <option value="eventos">Eventos</option>
            <option value="inscricoes">Inscrições</option>
          </select>
        </label>
        <label>
          ID do registro (opcional)
          <input
            type="number"
            min="1"
            step="1"
            value={registroId}
            onChange={(event) => setRegistroId(event.target.value)}
            placeholder="Todos"
          />
        </label>
        <button className="botao botao-principal" disabled={estado.carregando}>
          {estado.carregando ? "Consultando..." : "Consultar / atualizar"}
        </button>
      </form>

      <div aria-live="polite">
        {estado.carregando && (
          <p className="mensagem">Carregando histórico...</p>
        )}
        {estado.erro && (
          <p className="mensagem mensagem-erro" role="alert">
            {estado.erro}
          </p>
        )}
        {!estado.carregando && !estado.erro && (
          <p className="historico-resumo">
            {consulta.servico === "eventos" ? "Eventos" : "Inscrições"}
            {consulta.registroId
              ? ` · ID ${consulta.registroId}`
              : " · Todos os IDs"}
            {" — "}
            {estado.registros.length} registro(s), até os 100 últimos.
          </p>
        )}
        {!estado.carregando &&
          !estado.erro &&
          estado.registros.length === 0 && (
            <p className="mensagem">
              Nenhuma alteração encontrada. Crie, edite ou exclua um registro
              para iniciar o histórico.
            </p>
          )}
      </div>

      <div className="historico-lista">
        {estado.registros.map((registro) => (
          <article className="historico-card" key={registro.id}>
            <div className="historico-cabecalho">
              <h2>
                {OPERACOES[registro.operacao] || registro.operacao} · ID{" "}
                {registro.registroId}
              </h2>
              <time dateTime={registro.instante}>
                {new Date(registro.instante).toLocaleString("pt-BR")}
              </time>
            </div>
            <details>
              <summary>Ver dados anteriores e posteriores</summary>
              <div className="historico-comparacao">
                <Dados titulo="Antes" dados={registro.antes} />
                <Dados titulo="Depois" dados={registro.depois} />
              </div>
              <p className="historico-execucao">
                Execução do serviço: {registro.execucao}
              </p>
            </details>
          </article>
        ))}
      </div>
    </main>
  );
}
