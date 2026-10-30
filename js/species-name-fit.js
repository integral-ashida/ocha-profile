// 長い２種名だけ、表示幅に合わせて同じ文字サイズに整えます。
(() => {
  'use strict';
  const names = ['リュウキュウオオイチモンジシマゲンゴロウ', 'ヤンバルオオイチモンジシマゲンゴロウ'];
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (!context) return;
  const selectors = ['.species-card h3', '#species-name', '.species-index-list a'];
  function fit() {
    for (const selector of selectors) {
      const nodes = [...document.querySelectorAll(selector)].filter(node => names.includes(node.textContent.trim()));
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
        // 見出しは少し小さく。２種とも長い方の名前を基準にします。
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
