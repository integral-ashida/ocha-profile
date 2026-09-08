const section=document.body.dataset.section;
const activeHref={home:'index.html',quiz:'quiz.html',pk:'pk.html',db:'db.html'}[section];
if(activeHref) document.querySelector(`.global-nav a[href="${activeHref}"]`)?.setAttribute('aria-current','page');
const header=document.querySelector('.site-header');
if(header && typeof ResizeObserver!=='undefined') new ResizeObserver(()=>document.documentElement.style.setProperty('--header-height',`${header.getBoundingClientRect().height}px`)).observe(header);
