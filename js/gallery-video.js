/* 写真保管庫に動画を追加。再生を押すまでYouTubeへ接続しません。 */
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
    const privacy = document.createElement('p'); privacy.textContent = '再生するとYouTubeに接続します。';
    const link = document.createElement('a'); link.href = `https://www.youtube.com/watch?v=${key}`;
    link.textContent = 'YouTubeで見る'; link.target = '_blank'; link.rel = 'noopener noreferrer';
    const reset = document.createElement('button'); reset.type = 'button'; reset.className = 'video-release'; reset.textContent = '動画を閉じる'; reset.hidden = true;
    function showPoster() {
      stage.replaceChildren(); reset.hidden = true;
      const button = document.createElement('button'); button.type = 'button'; button.className = 'video-start';
      button.setAttribute('aria-label', `${title.textContent}を再生`);
      const poster = entry.poster || document.querySelector('#species-hero')?.getAttribute('src');
      if (poster && !/^(?:[a-z]+:|\/\/)/i.test(poster)) button.style.backgroundImage = `url(${JSON.stringify(poster)})`;
      button.innerHTML = '<svg viewBox="0 0 52 52" aria-hidden="true"><circle cx="26" cy="26" r="24" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M21 17 L35 26 L21 35 Z" fill="currentColor"/></svg><span>動画を再生</span>';
      button.addEventListener('click', () => {
        const iframe = document.createElement('iframe');
        iframe.src = `https://www.youtube-nocookie.com/embed/${key}?playsinline=1&autoplay=1&rel=0`;
        iframe.title = title.textContent; iframe.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
        iframe.allowFullscreen = true; iframe.referrerPolicy = 'strict-origin-when-cross-origin';
        stage.replaceChildren(iframe); reset.hidden = false; iframe.focus();
      });
      stage.append(button);
    }
    reset.addEventListener('click', () => { showPoster(); stage.querySelector('button').focus(); });
    caption.append(title, note, privacy, link, reset); box.append(stage, caption); gallery.append(box);
    showPoster(); added++;
  }
  if (added) {
    const heading = document.querySelector('.gallery-title');
    if (heading) heading.textContent = '写真・動画';
  }
})();
