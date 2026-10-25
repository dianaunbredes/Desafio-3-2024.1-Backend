Pokédex | Desafio EngNet
Projeto de Pokédex feito com HTML, CSS e JavaScript, consumindo a PokéAPI.
Funcionalidades
Mostra o nome, imagem, número, tipos, altura e peso do Pokémon.
Navega pelos Pokémon com os botões Anterior e Próximo.
A navegação é circular: do primeiro Pokémon, voltar leva ao último; do último, avançar leva ao primeiro.
Busca por nome ou número.
Exibe uma mensagem quando o Pokémon não é encontrado.
Guarda os dados já consultados em cache para evitar requisições repetidas.
Layout responsivo para telas pequenas e grandes.
Como executar
Baixe ou clone o repositório.
Abra a pasta no Visual Studio Code.
Execute index.html com a extensão Live Server ou abra o arquivo no navegador.
É necessária conexão com a internet para consultar a PokéAPI e carregar as imagens.
Arquivos
index.html: estrutura da página.
style.css: estilos e responsividade.
script.js: requisições à API, renderização e navegação.
Conceitos utilizados
fetch() para consultar a API.
async/await para aguardar a resposta.
response.json() para converter a resposta em objeto JavaScript.
Map para armazenar em cache Pokémon já consultados.
Eventos click e submit para interagir com os controles.
try/catch/finally para tratar erros e controlar o estado de carregamento.
API
Lista de Pokémon: https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1292
Dados individuais: https://pokeapi.co/api/v2/pokemon/{id-ou-nome}
Entrega pelo GitHub
Faça um fork do repositório original para sua conta.
Coloque os arquivos do projeto no fork e faça commit/push.
Crie uma Release no seu repositório, incluindo uma tag (por exemplo, v1.0.0).
Baixe o ZIP da release e envie ao Google Classroom.
Mantenha o repositório e a release disponíveis depois da entrega.
Antes de entregar, revise o código, teste os botões e a busca, e esteja preparada para explicar como fetch, async/await, o cache e a navegação funcionam.
