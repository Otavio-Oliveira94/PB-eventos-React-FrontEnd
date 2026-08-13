import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import InscricaoCard from "../components/InscricaoCard";
import InscricaoForm from "../components/InscricaoForm";
import { buscarEventoPorId } from "../services/eventoService";
import {
  buscarInscricoesPorEvento,
  criarInscricao,
  excluirInscricao,
} from "../services/inscricaoService";

export default function EventoDetalhes() {
  const { id } = useParams();

  const [evento, setEvento] = useState(null);
  const [carregandoEvento, setCarregandoEvento] = useState(true);
  const [erroEvento, setErroEvento] = useState("");

  const [inscricoes, setInscricoes] = useState([]);
  const [carregandoInscricoes, setCarregandoInscricoes] = useState(true);
  const [erroInscricoes, setErroInscricoes] = useState("");

  const [salvando, setSalvando] = useState(false);
  const [excluindoId, setExcluindoId] = useState(null);
  const [erroAcao, setErroAcao] = useState("");
  const [mensagemSucesso, setMensagemSucesso] = useState("");

  useEffect(() => {
    async function carregarEvento() {
      setCarregandoEvento(true);
      setErroEvento("");

      try {
        const dados = await buscarEventoPorId(id);
        setEvento(dados);
      } catch {
        setErroEvento("Não foi possível encontrar o evento.");
      } finally {
        setCarregandoEvento(false);
      }
    }

    async function carregarInscricoes() {
      setCarregandoInscricoes(true);
      setErroInscricoes("");

      try {
        const dados = await buscarInscricoesPorEvento(id);

        setInscricoes(dados);
      } catch {
        setErroInscricoes(
          "Não foi possível carregar as inscrições. " +
            "Verifique se o serviço de inscrições está ativo.",
        );
      } finally {
        setCarregandoInscricoes(false);
      }
    }

    carregarEvento();
    carregarInscricoes();
  }, [id]);

  async function salvarInscricao(dadosParticipante) {
    setSalvando(true);
    setErroAcao("");
    setMensagemSucesso("");

    try {
      const inscricaoCriada = await criarInscricao({
        eventoId: Number(id),
        ...dadosParticipante,
      });

      setInscricoes((inscricoesAtuais) => [
        ...inscricoesAtuais,
        inscricaoCriada,
      ]);

      setErroInscricoes("");
      setMensagemSucesso("Participante inscrito com sucesso.");

      return true;
    } catch (erro) {
      if (erro.status === 404) {
        setErroAcao(
          "O evento não existe mais. " + "Atualize a página e tente novamente.",
        );
      } else if (erro.status === 503) {
        setErroAcao(
          "O serviço de eventos está indisponível. " +
            "Tente novamente mais tarde.",
        );
      } else {
        setErroAcao(
          "Não foi possível realizar a inscrição. " +
            "Verifique se os serviços estão ativos.",
        );
      }

      return false;
    } finally {
      setSalvando(false);
    }
  }

  async function removerInscricao(inscricao) {
    const confirmado = window.confirm(
      `Deseja excluir a inscrição de ` + `${inscricao.nomeParticipante}?`,
    );

    if (!confirmado) {
      return;
    }

    setExcluindoId(inscricao.id);
    setErroAcao("");
    setMensagemSucesso("");

    try {
      await excluirInscricao(inscricao.id);

      setInscricoes((inscricoesAtuais) =>
        inscricoesAtuais.filter((item) => item.id !== inscricao.id),
      );

      setMensagemSucesso("Inscrição excluída com sucesso.");
    } catch {
      setErroAcao("Não foi possível excluir a inscrição.");
    } finally {
      setExcluindoId(null);
    }
  }

  function formatarData(data) {
    if (!data) {
      return "Não informada";
    }

    return new Date(data).toLocaleString("pt-BR");
  }

  if (carregandoEvento) {
    return (
      <div className="container">
        <p className="mensagem">Carregando evento...</p>
      </div>
    );
  }

  if (erroEvento || !evento) {
    return (
      <div className="container">
        <p className="mensagem mensagem-erro">
          {erroEvento || "Evento não encontrado."}
        </p>

        <Link to="/eventos" className="link-voltar">
          Voltar aos eventos
        </Link>
      </div>
    );
  }

  const endereco = evento.endereco;
  const totalInscricoes = inscricoes.length;

  return (
    <div className="container">
      <section className="detalhes-evento">
        <div className="detalhes-cabecalho">
          <span className="detalhes-tipo">{evento.tipoEvento}</span>

          <h1>{evento.titulo}</h1>
          <p>{evento.subTitulo}</p>
        </div>

        <div className="detalhes-conteudo">
          <div className="detalhes-grupo">
            <h2>Data e horário</h2>

            <p>
              <strong>Início:</strong> {formatarData(evento.inicioEvento)}
            </p>

            <p>
              <strong>Término:</strong> {formatarData(evento.terminoEvento)}
            </p>
          </div>

          <div className="detalhes-grupo">
            <h2>Endereço</h2>

            <p>
              {endereco?.rua || "Rua não informada"},{" "}
              {endereco?.numero || "sem número"}
            </p>

            {endereco?.complemento && <p>{endereco.complemento}</p>}

            <p>{endereco?.cep || "CEP não informado"}</p>

            <p>
              {endereco?.cidade || "Cidade não informada"}

              {endereco?.estado ? ` - ${endereco.estado}` : ""}
            </p>
          </div>
        </div>
      </section>

      <section className="inscricoes-secao">
        <header className="inscricoes-cabecalho">
          <div>
            <h2>Inscrições do evento</h2>
            <p>Cadastre e gerencie os participantes.</p>
          </div>

          <span className="inscricoes-contador">
            {totalInscricoes}{" "}
            {totalInscricoes === 1 ? "participante" : "participantes"}
          </span>
        </header>

        {mensagemSucesso && (
          <p className="aviso-inscricao aviso-inscricao-sucesso">
            {mensagemSucesso}
          </p>
        )}

        {erroAcao && (
          <p className="aviso-inscricao aviso-inscricao-erro">{erroAcao}</p>
        )}

        <div className="inscricoes-layout">
          <div className="inscricao-form-card">
            <h3>Nova inscrição</h3>

            <InscricaoForm onSave={salvarInscricao} salvando={salvando} />
          </div>

          <div className="inscricoes-lista-card">
            <h3>Participantes inscritos</h3>

            {carregandoInscricoes && (
              <p className="inscricoes-estado">Carregando inscrições...</p>
            )}

            {!carregandoInscricoes && erroInscricoes && (
              <p className="inscricoes-estado inscricoes-estado-erro">
                {erroInscricoes}
              </p>
            )}

            {!carregandoInscricoes &&
              !erroInscricoes &&
              inscricoes.length === 0 && (
                <p className="inscricoes-estado">
                  Nenhum participante inscrito.
                </p>
              )}

            {inscricoes.length > 0 && (
              <div className="inscricoes-lista">
                {inscricoes.map((inscricao) => (
                  <InscricaoCard
                    key={inscricao.id}
                    inscricao={inscricao}
                    onDelete={removerInscricao}
                    excluindoId={excluindoId}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="acoes-pagina">
        <Link to="/eventos" className="link-voltar">
          Voltar aos eventos
        </Link>

        <Link to="/" className="link-voltar">
          Menu principal
        </Link>
      </div>
    </div>
  );
}
