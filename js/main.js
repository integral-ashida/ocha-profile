const section=document.body.dataset.section;
const activeHref={home:'index.html',quiz:'quiz.html',pk:'pk.html',db:'db.html'}[section];
if(activeHref) document.querySelector(`.global-nav a[href="${activeHref}"]`)?.setAttribute('aria-current','page');
const header=document.querySelector('.site-header');
if(header && typeof ResizeObserver!=='undefined') new ResizeObserver(()=>document.documentElement.style.setProperty('--header-height',`${header.getBoundingClientRect().height}px`)).observe(header);

const catalogTitle=document.querySelector('.catalog-copy h1');
if(catalogTitle) catalogTitle.textContent='日本の主な ゲンゴロウ';

if(section==='home'){
  const footer=document.querySelector('.site-footer');
  if(footer){
    const secretLink=document.createElement('a');
    secretLink.className='secret-entry';
    secretLink.href='secret.html';
    secretLink.textContent='ひみつの部屋';
    footer.insertAdjacentElement('afterend',secretLink);
  }
}
