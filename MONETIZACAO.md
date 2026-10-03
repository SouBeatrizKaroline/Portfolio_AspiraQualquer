# Monetização do AspiraQualquer

É possível monetizar o portfólio e os jogos. Nenhum anúncio ou rastreador de publicidade foi ativado nesta versão.

## No portfólio

O Google AdSense é uma opção para anúncios de conteúdo. É necessário cadastrar uma conta, enviar o site para análise e obter aprovação. O Google avalia conteúdo original, utilidade e experiência de navegação. Aprovação e renda não são garantidas.

Para este portfólio, um bom primeiro passo é enriquecer as páginas com histórias de criação, controles, objetivos e bastidores reais dos jogos. Um domínio próprio facilita reunir o portfólio, conteúdo e arquivos de autorização sob a mesma identidade.

Depois da aprovação, podemos inserir uma faixa identificada como **Publicidade**, após a coleção e com espaço suficiente em relação aos botões de jogar. Os anúncios não devem parecer jogos, botões ou links de navegação, e não se deve incentivar cliques.

## Dentro dos jogos

O programa H5 Games Ads do Google oferece anúncios em momentos como carregamento, pausas e recompensas. É uma integração específica, sujeita a inscrição e aprovação. Ela precisa ser feita no código de cada jogo: um anúncio no portfólio não monetiza automaticamente os jogos hospedados em outros sites.

## O que enviar para ativar

1. O domínio público aprovado no serviço de anúncios.
2. O identificador público de editor e o código da unidade de anúncio fornecidos pela plataforma. Não envie senha ou credenciais privadas.
3. A linha de `ads.txt` indicada pela plataforma, quando aplicável.

Antes da ativação, também é preciso preparar a política de privacidade e a gestão de consentimento adequada ao público e à plataforma. Se o Google exigir uma plataforma de consentimento certificada, um aviso simples de cookies não a substitui.

Uma alternativa é vender espaço de patrocínio diretamente. Nesse caso, a faixa deve indicar que o conteúdo é patrocinado e só pode anunciar uma parceria real.

## Documentação oficial consultada

- Preparação do site para AdSense: https://support.google.com/adsense/answer/7299563
- Posicionamento de anúncios: https://support.google.com/adsense/answer/1346295
- Anúncios para jogos HTML5: https://adsense.google.com/start/h5-games-ads/
- Estrutura de integração dos jogos: https://developers.google.com/ad-placement/docs/html5-game-structure
- Guia de ads.txt: https://support.google.com/adsense/answer/12171612

Consulta em 3 de outubro de 2026.

## Integração preparada nesta versão

A unidade está definida em `dist/index.html`, entre a coleção e a seção pessoal. Permanece oculta enquanto a publicidade estiver desativada.

A configuração fica em `dist/ads-config.js`: preencha os IDs reais, revise a privacidade e ative `enabled` somente após aprovação. `dist/ads.js` carrega uma unidade responsiva do AdSense apenas após liberação da plataforma de consentimento.

O adaptador da CMP deve definir `window.AQ_ADS_CAN_REQUEST = true` quando a solicitação de anúncios for permitida, antes da execução do módulo, ou emitir `aq:ads-consent` com `detail: { canRequestAds: true }`. Na revogação, emita o mesmo evento com `false`; a página recarrega para remover anúncios carregados. Esse adaptador ainda depende da CMP escolhida e configurada. Não basta alterar os IDs para ativar anúncios.

Para visitantes do EEE, Reino Unido e Suíça, observe a exigência de CMP certificada do Google: https://support.google.com/adsense/answer/13554020
