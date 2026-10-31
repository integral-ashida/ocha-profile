// Automatically generated. Do not edit.
const params=new URLSearchParams(location.search),selected=SPECIES.find(s=>s.id===(params.get('id') || document.documentElement.dataset.speciesId))||SPECIES[0],title=document.querySelector('#species-name'),latin=document.querySelector('#species-latin'),hero=document.querySelector('#species-hero'),description=document.querySelector('#species-description'),gallery=document.querySelector('#species-gallery'),indexList=document.querySelector('#species-index-list'),indexSearch=document.querySelector('#species-index-search');document.title=`${selected.name}｜日本の主なゲンゴロウ`;title.textContent=selected.name;latin.textContent=selected.latin;latin.hidden=!selected.latin;hero.src=selected.image;hero.alt=selected.name;description.textContent=selected.description||'編集中、もうしばらくお待ちください';gallery.innerHTML=selected.gallery.map((src,i)=>`<img src="${src}" alt="${selected.name}の写真 ${i+1}" loading="lazy">`).join('');function renderIndex(q=''){const term=q.trim().toLowerCase();indexList.innerHTML=SPECIES.filter(s=>s.name.toLowerCase().includes(term)).map(s=>`<a href="species.html?id=${s.id}" class="${s.id===selected.id?'current':''}">${s.name}</a>`).join('')||'<p>該当する種はありません</p>'}indexSearch.addEventListener('input',e=>renderIndex(e.target.value));renderIndex();


// 基本情報：すべて textContent で表示するため、HTMLを書く必要はありません。
function renderSpeciesFacts(species) {
  const heading = document.querySelector('.species-hero');
  if (!heading) return;
  document.querySelector('#species-facts')?.remove();
  const fields = [
    ['大きさ', species.bodyLength],
    ['生息地', species.habitat],
    ['環境省カテゴリー', species.redList]
  ].filter(([, value]) => typeof value === 'string' && value.trim());
  if (!fields.length) return;

  const section = document.createElement('section');
  section.id = 'species-facts';
  section.className = 'species-facts';
  section.setAttribute('aria-label', '基本情報');
  const list = document.createElement('dl');
  for (const [label, value] of fields) {
    const row = document.createElement('div');
    row.className = 'species-facts-row';
    const term = document.createElement('dt');
    term.textContent = label;
    const detail = document.createElement('dd');
    detail.textContent = value.trim();
    row.append(term, detail);
    list.append(row);
  }
  section.append(list);
  heading.insertAdjacentElement('afterend', section);
}
renderSpeciesFacts(selected);
