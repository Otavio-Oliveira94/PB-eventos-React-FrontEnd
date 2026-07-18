import { Link } from "react-router";

export default function Home() {
  return (
    <div className="container">
      <header className="menu-cabecalho">
        <h1>Sistema de Eventos</h1>
        <p>Escolha uma das opções abaixo.</p>
      </header>

      <nav className="menu-opcoes">
        <Link to="/eventos" className="menu-card">
          <h2>Eventos</h2>
          <p>Visualize os eventos cadastrados e acesse suas informações.</p>
        </Link>

        <Link to="/eventos/novo" className="menu-card">
          <h2>Cadastrar Evento</h2>
          <p>Preencha o formulário para cadastrar um novo evento.</p>
        </Link>
      </nav>
    </div>
  );
}
