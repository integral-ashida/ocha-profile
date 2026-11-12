(() => {
  'use strict';
  const names = ['リュウキュウオオイチモンジシマゲンゴロウ', 'ヤンバルオオイチモンジシマゲンゴロウ'];
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  // rare: true の種だけに表示する。未指定・false はオフ。
  const rareIds = new Set(typeof SPECIES === 'undefined' ? [] :
    SPECIES.filter(item => item.rare === true).map(item => item.id));
  function markHeading(node, id) {
    if (!node || !rareIds.has(id) || node.classList.contains('has-rare-mark')) return;
    const mark = document.createElement('span');
    mark.className = 'rare-species-mark';
    mark.setAttribute('role', 'img');
    mark.setAttribute('aria-label', '珍しい種');
    mark.title = '珍しい種';
    node.classList.add('has-rare-mark');
    node.append(mark);
  }
  function showMarks() {
    if (!rareIds.size) return;
    for (const card of document.querySelectorAll('.species-card')) {
      const id = new URL(card.href).searchParams.get('id');
      markHeading(card.querySelector('h3'), id);
    }
    const heading = document.getElementById('species-name');
    if (heading && typeof selected !== 'undefined') markHeading(heading, selected.id);
  }
  const selectors = ['.species-card h3', '#species-name', '.species-index-list a'];
  function fit() {
    showMarks();
    if (!context) return;
    for (const selector of selectors) {
      const targetNames = selector === '#species-name' ? [...names, 'オオイチモンジシマゲンゴロウ'] : names;
      const nodes = [...document.querySelectorAll(selector)].filter(node => targetNames.includes(node.textContent.trim()));
      if (!nodes.length) continue;
      let size = Infinity;
      for (const node of nodes) {
        node.style.removeProperty('font-size');
        node.style.whiteSpace = 'nowrap';
        const style = getComputedStyle(node);
        const available = node.clientWidth - parseFloat(style.paddingLeft || 0) - parseFloat(style.paddingRight || 0);
        if (available <= 0) continue;
        const original = parseFloat(style.fontSize);
        context.font = `${style.fontStyle} ${style.fontWeight} ${original}px ${style.fontFamily}`;
        const spacing = parseFloat(style.letterSpacing) || 0;
        const longest = Math.max(...names.map(name => context.measureText(name).width + name.length * spacing));
        const ceiling = selector === '.species-index-list a' ? original : original * 0.9;
        size = Math.min(size, ceiling, original * (available - 2) / longest);
      }
      if (Number.isFinite(size) && size > 0) {
        nodes.forEach(node => { node.style.fontSize = `${Math.floor(size * 100) / 100}px`; });
      }
    }
  }
  let frame;
  const schedule = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(fit); };
  fit();
  window.addEventListener('resize', schedule);
  if (document.fonts) document.fonts.ready.then(schedule);
  for (const id of ['catalog-groups', 'species-index-list']) {
    const root = document.getElementById(id);
    if (root) new MutationObserver(schedule).observe(root, { childList: true, subtree: true });
  }
})();
