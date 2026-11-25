(() => {
  const root = document.documentElement;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Theme toggle (dark by default, choice remembered when storage is available) */
  const themeBtn = document.querySelector('[data-theme-toggle]');
  let saved = null;
  try { saved = localStorage.getItem('mt-theme'); } catch (_) { /* storage may be disabled */ }
  if (saved === 'light' || saved === 'dark') root.dataset.theme = saved;
  const syncThemeLabel = () => {
    if (!themeBtn) return;
    const label = root.dataset.theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme';
    themeBtn.setAttribute('aria-label', label);
    themeBtn.title = label;
  };
  syncThemeLabel();
  themeBtn?.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'light' ? 'dark' : 'light';
    try { localStorage.setItem('mt-theme', root.dataset.theme); } catch (_) { /* still works for this page */ }
    syncThemeLabel();
  });

  /* Dock scroll-spy: highlight the section currently in view */
  const dockLinks = [...document.querySelectorAll('[data-dock] a[href^="#"]')];
  const spied = dockLinks.map(a => document.getElementById(a.getAttribute('href').slice(1))).filter(Boolean);
  if (spied.length && 'IntersectionObserver' in window) {
    const setActive = id => dockLinks.forEach(a => {
      const on = a.getAttribute('href') === '#' + id;
      a.classList.toggle('active', on);
      if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
    });
    const spy = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
    }, { rootMargin: '-45% 0px -50% 0px' });
    spied.forEach(s => spy.observe(s));
    setActive(spied[0].id);
  }

  /* Project filters + "view all" */
  const filterBtns = [...document.querySelectorAll('[data-filter]')];
  const cards = [...document.querySelectorAll('[data-category]')];
  const moreBtn = document.querySelector('[data-more]');
  let filter = 'all';
  let expanded = false;
  const renderCards = () => {
    cards.forEach(card => {
      const matches = filter === 'all' || card.dataset.category === filter;
      const hiddenExtra = filter === 'all' && card.hasAttribute('data-extra') && !expanded;
      card.hidden = !matches || hiddenExtra;
      if (!card.hidden) card.classList.add('in-view');
    });
    if (moreBtn) {
      moreBtn.hidden = filter !== 'all';
      moreBtn.setAttribute('aria-expanded', String(expanded));
      const extra = cards.filter(c => c.hasAttribute('data-extra')).length;
      moreBtn.firstChild.textContent = expanded ? 'Show fewer projects ' : `View all ${cards.length} projects (+${extra} more) `;
    }
  };
  filterBtns.forEach(btn => btn.addEventListener('click', () => {
    filter = btn.dataset.filter;
    filterBtns.forEach(b => b.setAttribute('aria-pressed', String(b === btn)));
    renderCards();
  }));
  moreBtn?.addEventListener('click', () => { expanded = !expanded; renderCards(); });
  if (cards.length) renderCards();

  /* Copy buttons */
  document.querySelectorAll('[data-copy]').forEach(btn => {
    const label = btn.querySelector('span');
    btn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(btn.dataset.copy);
        if (label) { label.textContent = 'Copied'; setTimeout(() => { label.textContent = 'Copy'; }, 1800); }
      } catch (_) {
        if (label) label.textContent = btn.dataset.copy;
      }
    });
  });

  /* Contact form: static site, so it opens the visitor's email app with the message filled in */
  const form = document.querySelector('[data-mail-form]');
  const status = document.querySelector('[data-form-status]');
  form?.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      if (status) status.textContent = 'Please fill in every field with a valid email address.';
      return;
    }
    const data = new FormData(form);
    const body = `${data.get('message')}\n\n— ${data.get('name')} (${data.get('email')})`;
    const href = 'mailto:mihir3646@gmail.com'
      + '?subject=' + encodeURIComponent(String(data.get('subject')))
      + '&body=' + encodeURIComponent(body);
    window.location.href = href;
    if (status) status.textContent = 'Opening your email app… If nothing happens, email mihir3646@gmail.com directly.';
  });

  /* Resume viewer: opens the HTML resume in a dialog; the PDF stays one click away.
     Without <dialog> support or JS, the links simply open the PDF. */
  const resumeDialog = document.querySelector('[data-resume-dialog]');
  if (resumeDialog && typeof resumeDialog.showModal === 'function') {
    const openResume = () => {
      if (resumeDialog.open) return;
      root.classList.add('resume-open');
      resumeDialog.showModal();
      resumeDialog.querySelector('.rd-body')?.scrollTo(0, 0);
    };
    document.querySelectorAll('[data-resume-open]').forEach(link => link.addEventListener('click', event => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      openResume();
    }));
    resumeDialog.querySelectorAll('[data-resume-close]').forEach(btn => btn.addEventListener('click', () => resumeDialog.close()));
    resumeDialog.addEventListener('click', event => { if (event.target === resumeDialog) resumeDialog.close(); });
    resumeDialog.addEventListener('close', () => {
      root.classList.remove('resume-open');
      if (location.hash === '#resume') history.replaceState(null, '', location.pathname + location.search);
    });
    const openFromHash = () => { if (location.hash === '#resume') openResume(); };
    window.addEventListener('hashchange', openFromHash);
    openFromHash();
  }

  /* Back to top */
  document.querySelector('[data-to-top]')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  });

  /* Reveal on scroll */
  if ('IntersectionObserver' in window && !reduceMotion) {
    root.classList.add('js-ready');
    const reveal = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in-view'); reveal.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -30px 0px', threshold: 0.04 });
    document.querySelectorAll('.reveal').forEach(el => reveal.observe(el));
  }
})();
