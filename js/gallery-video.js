/* 写真保管庫にYouTubeプレーヤーを表示します。 */
(() => {
  const gallery = document.querySelector('#species-gallery');
  if (!gallery) return;
  const id = new URLSearchParams(location.search).get('id');
  const entries = window.OCHA_SPECIES_MEDIA?.[id] || [];
  function youtubeId(raw) {
    try {
      const url = new URL(raw);
      if (url.protocol !== 'https:') return null;
      const host = url.hostname.toLowerCase();
      let key = '';
      if (host === 'youtu.be') key = url.pathname.split('/')[1];
      else if (['youtube.com', 'www.youtube.com', 'm.youtube.com'].includes(host)) {
        key = url.pathname === '/watch' ? url.searchParams.get('v') : /^\/(?:shorts|embed|live)\/([^/]+)/.exec(url.pathname)?.[1];
      }
      return /^[\w-]{11}$/.test(key || '') ? key : null;
    } catch (_) { return null; }
  }
  let added = 0;
  for (const entry of entries) {
    const key = youtubeId(entry.url);
    if (!key) continue;
    const box = document.createElement('figure'); box.className = 'species-video';
    const stage = document.createElement('div'); stage.className = 'video-stage';
    const caption = document.createElement('figcaption'); caption.className = 'video-caption';
    const title = document.createElement('h3'); title.textContent = entry.title || '動画';
    const note = document.createElement('p'); note.textContent = entry.caption || '';
    note.hidden = !entry.caption;
    const link = document.createElement('a'); link.href = `https://www.youtube.com/watch?v=${key}`;
    link.textContent = 'YouTubeで見る'; link.target = '_blank'; link.rel = 'noopener noreferrer';
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube-nocookie.com/embed/${key}?playsinline=1&rel=0`;
    iframe.title = title.textContent;
    iframe.loading = 'lazy';
    iframe.allow = 'encrypted-media; picture-in-picture; fullscreen';
    iframe.allowFullscreen = true;
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    stage.append(iframe);
    caption.append(title, note, link); box.append(stage, caption); gallery.append(box); added++;
  }
  if (added) {
    const heading = document.querySelector('.gallery-title');
    if (heading) heading.textContent = '写真・動画';
  }
})();
