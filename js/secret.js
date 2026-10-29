// この合言葉は簡易的な入口です。公開コード上の情報は保護できません。
const PASSWORD = '0607';
(() => {
  const gate = document.querySelector('#secret-gate');
  const room = document.querySelector('#secret-room');
  const input = document.querySelector('#secret-password');
  const error = document.querySelector('#password-error');
  const listView = document.querySelector('#journal-index');
  const postView = document.querySelector('#journal-post');
  const data = window.OCHA_JOURNAL || { posts: [] };
  const posts = (data.posts || []).filter(p => p.published === true && p.title?.trim() && /^[a-z0-9-]+$/.test(p.id))
    .slice().sort((a,b) => (b.date || '').localeCompare(a.date || ''));
  let opened = false;
  function remember(value) {
    try { if (value) sessionStorage.setItem('secret-room-open-0607','yes'); else sessionStorage.removeItem('secret-room-open-0607'); } catch (_) {}
  }
  function meta(post) {
    const div = document.createElement('div'); div.className = 'post-meta';
    if (/^\d{4}-\d{2}-\d{2}$/.test(post.date || '')) { const t = document.createElement('time'); t.dateTime=post.date; t.textContent=post.date.replaceAll('-','.'); div.append(t); }
    if (post.category) { const s=document.createElement('span'); s.textContent=post.category; div.append(s); }
    return div;
  }
  function returnLink() { const a=document.createElement('a'); a.href='secret.html'; a.className='post-back'; a.textContent='記事一覧へ戻る'; return a; }
  function render() {
    const list=document.querySelector('#journal-list'); list.replaceChildren();
    document.querySelector('#journal-empty').hidden=posts.length>0;
    for(const post of posts) {
      const li=document.createElement('li'); const a=document.createElement('a'); a.href=`secret.html?post=${encodeURIComponent(post.id)}`;
      const h=document.createElement('h2'); h.textContent=post.title; a.append(meta(post),h);
      if(post.summary) { const p=document.createElement('p');p.textContent=post.summary;a.append(p); }
      li.append(a);list.append(li);
    }
    const id=new URLSearchParams(location.search).get('post');
    listView.hidden=!!id;postView.hidden=!id;postView.replaceChildren();
    if(!id) { document.title='ひみつの部屋｜お茶。';return; }
    const post=posts.find(p=>p.id===id); postView.append(returnLink());
    if(!post) {const h=document.createElement('h2');h.textContent='この記事はまだ開けません。';postView.append(h);return;}
    document.title=`${post.title}｜ひみつの部屋`;
    const head=document.createElement('header');head.className='post-head'; const h=document.createElement('h2');h.textContent=post.title;head.append(meta(post),h);postView.append(head);
    const body=document.createElement('div');body.className='post-body';
    for(const block of post.blocks || []) {
      if(block.type==='p'||block.type==='h2') { const el=document.createElement(block.type==='h2'?'h3':'p');el.textContent=block.text||'';body.append(el); }
      if(block.type==='image' && typeof block.src==='string' && /^images\/[\w./-]+\.(?:webp|jpe?g|png|gif)$/i.test(block.src) && !block.src.includes('..')) {
        const figure=document.createElement('figure');const img=document.createElement('img');img.src=block.src;img.alt=block.alt||'';img.loading='lazy';figure.append(img);
        if(block.caption){const c=document.createElement('figcaption');c.textContent=block.caption;figure.append(c);}body.append(figure);
      }
    }
    postView.append(body); const bottom=document.createElement('div');bottom.className='post-bottom';bottom.append(returnLink());postView.append(bottom);
  }
  function openRoom() { opened=true; gate.hidden=true;room.hidden=false;remember(true);render();room.querySelector('h1').focus(); }
  function closeRoom() { opened=false;remember(false);room.hidden=true;gate.hidden=false;postView.replaceChildren();input.value='';error.textContent='';document.title='ひみつの部屋｜お茶。';input.focus(); }
  document.querySelector('#password-form').addEventListener('submit',event=>{event.preventDefault();if(input.value===PASSWORD){error.textContent='';openRoom();}else{error.textContent='合言葉が違うよ';input.select();}});
  document.querySelector('#lock-room').addEventListener('click',closeRoom);
  try{if(sessionStorage.getItem('secret-room-open-0607')==='yes')openRoom();}catch(_){}
})();
