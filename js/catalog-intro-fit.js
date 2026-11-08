// 図鑑冒頭の2文を、それぞれスマホの横幅に合わせる。PCは元のサイズ。
(() => {
  const copy = document.querySelector('.catalog-intro-copy');
  if (!copy) return;
  const lines = [...copy.children];
  const mobile = window.matchMedia('(max-width: 600px)');
  let frame;
  function fit() {
    copy.style.fontSize = '';
    if (!mobile.matches || !copy.clientWidth) return;
    const base = parseFloat(getComputedStyle(copy).fontSize);
    const width = copy.clientWidth;
    lines.forEach(line => { line.style.whiteSpace = 'nowrap'; line.style.width = 'max-content'; });
    const needed = Math.max(...lines.map(line => line.scrollWidth));
    // 文字を過度に小さくしない。極端な狭幅・文字拡大時は折り返しを許容。
    const minimum = Math.min(base, parseFloat(getComputedStyle(document.documentElement).fontSize) * .75);
    if (needed > width) copy.style.fontSize = `${Math.max(minimum, Math.floor(base * (width - 2) / needed * 10) / 10)}px`;
    lines.forEach(line => { line.style.whiteSpace = ''; line.style.width = ''; });
  }
  function schedule() { cancelAnimationFrame(frame); frame = requestAnimationFrame(fit); }
  window.addEventListener('resize', schedule);
  window.addEventListener('pageshow', schedule);
  if (typeof ResizeObserver !== 'undefined') {
    let previousWidth = 0;
    new ResizeObserver(entries => {
      const width = entries[0].contentRect.width;
      if (width !== previousWidth) { previousWidth = width; schedule(); }
    }).observe(copy);
  }
  if (document.fonts) document.fonts.ready.then(schedule);
  fit();
})();
