# Portfolio_AspiraQualquer

Portfólio de projetos, jogos e experimentos com visual escuro, detalhes em roxo, animações suaves e identidade própria AspiraQualquer.

## Abrir

O site está em `dist/`. Abra `dist/index.html` ou use um servidor estático. Não exige instalação de dependências ou compilação. As fontes usam Google Fonts; sem internet, o navegador utiliza fontes do sistema.

## Adicionar um projeto

Edite a lista em `dist/projects.js`. Exemplo de estrutura (substitua os valores pelo projeto real antes de publicar):

```js
window.PORTFOLIO_PROJECTS = [
  {
    id: 'meu-primeiro-jogo',
    title: 'Nome do jogo',
    category: 'jogos',
    description: 'Descrição curta do projeto.',
    details: 'História, processo de criação e informações adicionais.',
    tags: ['Tecnologia usada'],
    image: './assets/capa.webp',
    url: 'https://exemplo.com/jogo',
    repository: 'https://github.com/usuario/repositorio'
  }
];
```

Categorias aceitas: `jogos`, `projetos` e `experimentos`. Imagem, detalhes e links são opcionais. Guarde imagens em `dist/assets/`. A galeria tem filtros, busca sem distinção de acentos e detalhes em uma janela acessível pelo teclado. A versão inicial contém oito criações reais: Lumi & the Lost Stars, NEXOS, MadaHao, ANCESTRIA, PolyGlotRPG, TURNO, JúriLab e Pulso. Os dois últimos estão na categoria projetos. As capas são ilustrações editoriais próprias, não capturas dos jogos.

## Identidade

Favicon vetorial em `dist/favicon.svg`, monograma AQ. O site não contém crédito ou marca “feito com Skip”. O rodapé, o título da aba e os metadados usam a identidade do portfólio.

## GitHub Pages

O arquivo `.github/workflows/pages.yml` publica `dist/` quando alterações chegam à branch `main`. No GitHub, selecione **Settings → Pages → Source → GitHub Actions** para ativar a publicação. Esse procedimento torna o portfólio público.

Os arquivos `.openai/` guardam apenas a configuração da prévia hospedada no Sites. Não contêm credenciais. O GitHub Pages usa somente `dist/`.


Depois de editar os projetos, rode `node scripts/sync-gallery.mjs` para atualizar também a galeria estática. No navegador, a lista é atualizada automaticamente a partir de `projects.js`.

O visual gamer inclui roxo neon, vitrine com seleção de criações, tipografia própria e monograma AQ. A publicidade está preparada, mas desativada; veja `MONETIZACAO.md`.


A abertura usa arte original de um universo gamer em roxo, rosa e azul, com portal, controle e ilhas de fantasia. Gerada com a ferramenta integrada de imagens; o arquivo final é dist/assets/gaming-universe.webp (aproximadamente 208 KiB). Prompt: ilustração 3D estilizada de um multiverso de jogos, luzes roxas, magenta e ciano, controle flutuante e portal à direita, espaço escuro à esquerda para texto, sem marcas ou letras. As redes YouTube, TikTok e Instagram ficam na seção de acompanhamento.
