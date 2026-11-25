(() => {
  const root = document.documentElement;
  const themeBtn = document.querySelector('[data-theme-toggle]');
  const menuBtn = document.querySelector('[data-menu-toggle]');
  const nav = document.querySelector('[data-nav]');
  let mode = null;
  try { mode = localStorage.getItem('mt-theme'); } catch (_) { /* Storage can be disabled by browser privacy settings. */ }
  if (mode === 'light' || mode === 'dark') root.dataset.theme = mode;
  if (themeBtn) {
    const update = () => {
      const isLight = root.dataset.theme === 'light';
      themeBtn.setAttribute('aria-label', isLight ? 'Switch to dark theme' : 'Switch to light theme');
      themeBtn.title = isLight ? 'Switch to dark theme' : 'Switch to light theme';
    };
    update();
    themeBtn.addEventListener('click', () => {
      root.dataset.theme = root.dataset.theme === 'light' ? 'dark' : 'light';
      try { localStorage.setItem('mt-theme', root.dataset.theme); } catch (_) { /* Theme toggle still works for this page. */ }
      update();
    });
  }
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(open));
      menuBtn.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      nav.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false'); menuBtn.setAttribute('aria-label', 'Open navigation menu');
    }));
  }
  const filterBtns = [...document.querySelectorAll('[data-filter]')];
  const cards = [...document.querySelectorAll('[data-category]')];
  filterBtns.forEach(button => button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    filterBtns.forEach(b => b.setAttribute('aria-pressed', String(b === button)));
    cards.forEach(card => card.hidden = filter !== 'all' && card.dataset.category !== filter);
  }));
  document.querySelectorAll('[data-copy-email]').forEach(button => {
    button.addEventListener('click', async () => {
      const label = button.textContent;
      try {
        await navigator.clipboard.writeText('mihir3646@gmail.com');
        button.textContent = 'Email copied';
        window.setTimeout(() => button.textContent = label, 2000);
      } catch (_) {
        window.location.href = 'mailto:mihir3646@gmail.com';
      }
    });
  });
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    root.classList.add('js-ready');
    const sections = [...document.querySelectorAll('.reveal')];
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {if (entry.isIntersecting) { entry.target.classList.add('in-view'); observer.unobserve(entry.target); }});
    }, {rootMargin:'0px 0px -35px 0px',threshold:.05});
    sections.forEach(s => observer.observe(s));
  }
})();
