const section=document.body.dataset.section;
const activeHref={home:'index.html',quiz:'quiz.html',pk:'pk.html',db:'db.html'}[section];
if(activeHref) document.querySelector(`.global-nav a[href="${activeHref}"]`)?.setAttribute('aria-current','page');
const header=document.querySelector('.site-header');
if(header && typeof ResizeObserver!=='undefined') new ResizeObserver(()=>document.documentElement.style.setProperty('--header-height',`${header.getBoundingClientRect().height}px`)).observe(header);

const catalogTitle=document.querySelector('.catalog-copy h1');
if(catalogTitle) catalogTitle.textContent='日本の主なゲンゴロウ';


// 写真を原寸比のまま表示。リンク付きのサムネイルは従来どおり移動します。
document.addEventListener('DOMContentLoaded', () => {
  if (typeof HTMLDialogElement === 'undefined') return;
  const photos = [...document.querySelectorAll('.story-media img, .species-hero img, .species-gallery img, .catalog-photo img')];
  if (!photos.length) return;
  const dialog = document.createElement('dialog');
  dialog.className = 'photo-viewer';
  dialog.setAttribute('aria-label', '写真ビューア');
  dialog.innerHTML = '<div class="viewer-top"><p id="viewer-count" aria-live="polite"></p><button type="button" class="viewer-close" autofocus>閉じる ×</button></div><figure><img alt=""><figcaption aria-live="polite"></figcaption></figure><div class="viewer-controls"><button type="button" class="viewer-prev">← 前の写真</button><button type="button" class="viewer-next">次の写真 →</button></div>';
  document.body.append(dialog);
  let current = 0, opener, previousOverflow;
  const image = dialog.querySelector('img');
  function show(index) {
    current = (index + photos.length) % photos.length;
    image.src = photos[current].currentSrc || photos[current].src;
    image.alt = photos[current].alt;
    dialog.querySelector('figcaption').textContent = image.alt;
    dialog.querySelector('#viewer-count').textContent = `${current + 1} / ${photos.length}`;
    dialog.querySelector('.viewer-controls').hidden = photos.length < 2;
  }
  photos.forEach((photo, index) => {
    const button = document.createElement('button');
    button.type = 'button'; button.className = 'photo-open';
    button.setAttribute('aria-label', `${photo.alt || '写真'}を拡大する`);
    button.setAttribute('aria-haspopup', 'dialog');
    photo.replaceWith(button); button.append(photo);
    button.addEventListener('click', () => {
      opener = button; show(index); previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden'; dialog.showModal();
    });
  });
  dialog.querySelector('.viewer-close').addEventListener('click', () => dialog.close());
  dialog.querySelector('.viewer-prev').addEventListener('click', () => show(current - 1));
  dialog.querySelector('.viewer-next').addEventListener('click', () => show(current + 1));
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); show(current + (event.key === 'ArrowRight' ? 1 : -1)); }
  });
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => { document.body.style.overflow = previousOverflow; opener?.focus(); });
});
