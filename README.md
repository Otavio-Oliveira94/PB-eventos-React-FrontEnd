# Frontend Eventos Express

Interface React responsável pelo cadastro e visualização de eventos e
pelo gerenciamento das inscrições dos participantes.

## Tecnologias

- React
- React Router
- Vite
- JavaScript
- CSS

## Serviços utilizados

- Eventos API: http://localhost:8080
- Inscrições API: http://localhost:8081

## Executando o projeto

npm install
npm run dev

A aplicação ficará disponível em:

http://localhost:5173

## Gerando a versão de produção

npm run build

## Histórico de alterações

Acesse a opção **Histórico** no menu ou a rota `/historico`. Selecione Eventos ou Inscrições, informe um ID opcional e clique em Consultar/atualizar. A tela mostra até as últimas 100 entradas e permite abrir os valores anteriores e posteriores. Ela consulta o endpoint `/auditoria` do serviço selecionado.
