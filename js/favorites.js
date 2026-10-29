(() => {
  const root = document.querySelector('#favorite-shelves');
  const nav = document.querySelector('#shelf-nav');
  if (!root || !nav) return;
  for (const category of window.OCHA_FAVORITES || []) {
    if (!/^[a-z0-9-]+$/.test(category.id)) continue;
    const anchor = document.createElement('a'); anchor.href = '#' + category.id; anchor.textContent = category.title; nav.append(anchor);
    const section = document.createElement('section'); section.id = category.id; section.className = 'shelf-section';
    const head = document.createElement('header'); head.className = 'shelf-head';
    const title = document.createElement('h2'); title.textContent = category.title;
    const sub = document.createElement('p'); sub.textContent = category.subtitle || '';
    head.append(title, sub); section.append(head);
    const items = (category.items || []).filter(item => item.name?.trim());
    for (const item of items) {
      const row = document.createElement('article'); row.className = 'shelf-item';
      const heading = document.createElement('div');
      const name = document.createElement('h3'); name.textContent = item.name; heading.append(name);
      if (item.creator) { const by = document.createElement('p'); by.className = 'shelf-meta'; by.textContent = item.creator; heading.append(by); }
      const text = document.createElement('div'); const note = document.createElement('p'); note.className = 'shelf-note'; note.textContent = item.note || ''; text.append(note);
      try { const url = new URL(item.url); if (url.protocol === 'https:') { const a = document.createElement('a'); a.href = url.href; a.target = '_blank'; a.rel = 'noopener noreferrer'; a.textContent = '作品のサイト'; text.append(a); } } catch (_) {}
      row.append(heading, text); section.append(row);
    }
    if (!items.length) { const p = document.createElement('p'); p.className = 'shelf-empty'; p.textContent = '少しずつ、書き留めていきます。'; section.append(p); }
    root.append(section);
  }
})();
