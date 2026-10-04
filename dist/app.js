(() => {
  const projects = Array.isArray(window.PORTFOLIO_PROJECTS) ? window.PORTFOLIO_PROJECTS : [];
  const featuredProjects = projects.filter(project => project.featured !== false).sort((a, b) => Number(b.id === 'madahao') - Number(a.id === 'madahao'));
  const grid = document.querySelector('#project-grid');
  const empty = document.querySelector('#empty-state');
  const search = document.querySelector('#search');
  const dialog = document.querySelector('#project-dialog');
  const categories = { jogos: 'Jogos', projetos: 'Projetos', experimentos: 'Experimentos' };
  let filter = 'todos';
  let previousFocus;
  document.querySelector('#year').textContent = new Date().getFullYear();
  document.querySelector('#total-count').textContent = String(projects.length).padStart(2, '0');
  const normalize = value => String(value ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const text = (tag, className, value) => { const el = document.createElement(tag); el.className = className; el.textContent = value; return el; };
  function safeURL(value) { if (typeof value !== 'string' || !value.trim()) return null; try { const url = new URL(value, location.href); return ['https:', 'http:'].includes(url.protocol) ? url.href : null; } catch { return null; } }
  const resultsStatus = text('p', 'results-status micro', '');
  resultsStatus.setAttribute('role', 'status');
  resultsStatus.setAttribute('aria-live', 'polite');
  grid.before(resultsStatus);
  function openProject(project, trigger) {
    previousFocus = trigger;
    const content = document.querySelector('#dialog-content');
    content.replaceChildren();
    content.append(text('p', 'eyebrow red', categories[project.category] || 'Projeto'));
    const title = text('h2', '', project.title); title.id = 'dialog-title'; content.append(title);
    const imageURL = safeURL(project.image);
    if (imageURL) { const image = document.createElement('img'); image.className = 'dialog-cover'; image.src = imageURL; image.alt = 'Capa ilustrada de ' + project.title; image.addEventListener('error', () => { image.hidden = true; }, { once: true }); content.append(image); }
    content.append(text('p', 'project-details', project.details || project.description));
    const tags = text('div', 'tags', '');
    (project.tags || []).forEach(tag => tags.append(text('span', '', tag))); content.append(tags);
    const links = text('div', 'dialog-links', '');
    [['url', project.category === 'jogos' ? 'Jogar agora ↗' : 'Ver projeto ↗'], ['repository', 'Ver código ↗']].forEach(([field, label]) => {
      const url = safeURL(project[field]); if (!project[field] || !url) return;
      const a = text('a', 'button ' + (field === 'url' ? 'primary' : ''), label); a.href = url; a.target = '_blank'; a.rel = 'noopener noreferrer'; links.append(a);
    }); content.append(links); dialog.showModal();
  }
  function render() {
    const query = normalize(search.value.trim());
    const visible = projects.filter(p => (filter === 'todos' || p.category === filter) && normalize([p.title, p.description, ...(p.tags || [])].join(' ')).includes(query));
    grid.replaceChildren();
    visible.forEach(project => {
      const card = text('article', 'project-card', ''); card.dataset.project = project.id; card.dataset.category = project.category;
      const art = text('button', 'project-cover', ''); art.type = 'button'; art.setAttribute('aria-label', 'Ver detalhes de ' + project.title);
      if (project.image && safeURL(project.image)) { const img = document.createElement('img'); img.src = safeURL(project.image); img.alt = ''; img.loading = 'lazy'; img.addEventListener('error', () => art.replaceChildren(text('span', '', '✳')), { once: true }); art.append(img); } else { art.append(text('span', '', '✳')); }
      const body = text('div', 'project-body', '');
      const meta = text('div', 'project-meta micro', ''); meta.append(text('span', 'red', categories[project.category] || 'Projeto'), text('span', '', 'CRIAÇÃO INDIVIDUAL'));
      const tags = text('div', 'tags', ''); (project.tags || []).forEach(tag => tags.append(text('span', '', tag)));
      const footer = text('div', 'project-footer', ''); const details = text('button', 'project-details-button', 'Sobre a criação +'); details.type = 'button'; details.setAttribute('aria-label', 'Sobre ' + project.title);
      details.addEventListener('click', () => openProject(project, details)); footer.append(details);
      const url = safeURL(project.url); if (url) { const play = text('a', 'project-play', project.category === 'jogos' ? 'Jogar agora ↗' : 'Abrir projeto ↗'); play.href = url; play.target = '_blank'; play.rel = 'noopener noreferrer'; play.setAttribute('aria-label', (project.category === 'jogos' ? 'Jogar ' : 'Abrir ') + project.title + ' (nova aba)'); footer.append(play); }
      body.append(meta, text('h3', '', project.title), text('p', '', project.description), tags, footer); card.append(art, body);
      art.addEventListener('click', () => openProject(project, art)); grid.append(card);
    });
    empty.hidden = visible.length > 0;
    resultsStatus.textContent = visible.length === 1 ? '1 criação encontrada' : `${visible.length} criações encontradas`;
    const categoryCards = document.querySelector('.category-grid');
    categoryCards.hidden = projects.length > 0 || Boolean(query);
    document.querySelectorAll('.category-card').forEach((card, index) => { card.hidden = filter !== 'todos' && Object.keys(categories)[index] !== filter; });
    document.querySelector('#empty-message').textContent = query ? 'Nenhuma criação encontrada para essa busca.' : projects.length ? 'Ainda não há criações nesta categoria.' : filter === 'todos' ? 'As próximas ideias estão a caminho.' : `Novos ${filter} estão a caminho.`;
  }
  document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => {
    filter = button.dataset.filter;
    document.querySelectorAll('.filter').forEach(b => { b.classList.toggle('active', b === button); b.setAttribute('aria-pressed', String(b === button)); }); render();
  }));
  document.querySelectorAll('.filter').forEach(button => { button.hidden = button.dataset.filter !== 'todos' && !projects.some(project => project.category === button.dataset.filter); });
  search.addEventListener('input', render);
  document.querySelector('#clear-search')?.addEventListener('click', () => {
    search.value = '';
    filter = 'todos';
    document.querySelectorAll('.filter').forEach(button => { const active = button.dataset.filter === 'todos'; button.classList.toggle('active', active); button.setAttribute('aria-pressed', String(active)); });
    render();
    search.focus();
  });
  document.querySelector('#close-dialog').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target !== dialog || event.detail === 0) return; const r = dialog.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close(); });
  dialog.addEventListener('close', () => { if (previousFocus?.isConnected) previousFocus.focus(); });
  const effects = document.querySelector('.effects');
  let paused = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  try { const saved = localStorage.getItem('aq-motion'); if (saved !== null) paused = saved === 'paused'; } catch {}
  function updateMotion() { document.body.classList.toggle('paused', paused); effects.setAttribute('aria-pressed', String(paused)); effects.setAttribute('aria-label', paused ? 'Ativar animações' : 'Pausar animações'); effects.title = paused ? 'Ativar animações' : 'Pausar animações'; }
  effects.addEventListener('click', () => { paused = !paused; updateMotion(); try { localStorage.setItem('aq-motion', paused ? 'paused' : 'active'); } catch {} });
  let featuredIndex = 0;
  function updateFeatured() {
    const project = featuredProjects[featuredIndex];
    const showcase = document.querySelector('.hero-showcase');
    if (showcase) showcase.hidden = !project;
    if (!project) return;
    const image = document.querySelector('#featured-image');
    const imageURL = safeURL(project.image);
    image.hidden = !imageURL;
    if (imageURL) image.src = imageURL; else image.removeAttribute('src');
    image.alt = 'Capa ilustrada de ' + project.title;
    image.onerror = () => { image.hidden = true; };
    document.querySelector('#featured-title').textContent = project.title;
    document.querySelector('#featured-tag').textContent = (project.tags || []).slice(0, 2).join(' / ').toUpperCase();
    document.querySelector('#featured-count').textContent = String(featuredIndex + 1).padStart(2, '0') + ' / ' + String(featuredProjects.length).padStart(2, '0');
    const play = document.querySelector('#featured-play');
    const url = safeURL(project.url);
    play.href = url || '#colecao';
    play.textContent = url ? (project.category === 'jogos' ? 'Jogar agora ↗' : 'Abrir projeto ↗') : 'Ver coleção ↗';
    if (url) { play.target = '_blank'; play.rel = 'noopener noreferrer'; } else { play.removeAttribute('target'); play.removeAttribute('rel'); }
    play.setAttribute('aria-label', url ? (project.category === 'jogos' ? 'Jogar ' : 'Abrir ') + project.title + ' (nova aba)' : 'Explorar a coleção');
    document.querySelector('#featured-prev').disabled = featuredProjects.length < 2;
    document.querySelector('#featured-next').disabled = featuredProjects.length < 2;
  }
  document.querySelector('#featured-prev').addEventListener('click', () => { if (!featuredProjects.length) return; featuredIndex = (featuredIndex - 1 + featuredProjects.length) % featuredProjects.length; updateFeatured(); });
  document.querySelector('#featured-next').addEventListener('click', () => { if (!featuredProjects.length) return; featuredIndex = (featuredIndex + 1) % featuredProjects.length; updateFeatured(); });
  updateMotion(); render(); updateFeatured();
})();
