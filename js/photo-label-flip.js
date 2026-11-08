/* 採集記録だけを切り替える。写真には触れない。 */
(() => {
  'use strict';
  const clean = value => typeof value === 'string' ? value.trim() : '';
  const id = new URLSearchParams(window.location.search).get('id') || document.documentElement.dataset.speciesId;
  if (typeof SPECIES === 'undefined') return;
  const species = SPECIES.find(item => item.id === id) || SPECIES[0];
  const label = document.getElementById('species-photo-label');
  if (!species || !label) return;
  const place = clean(species.imageLocation);
  const date = clean(species.imageDate);
  const englishPlace = clean(species.imageLocationEn);
  const englishDate = clean(species.imageDateEn) || translateDate(date);

  // 日本語だけの記録も、場所（日付）の表記に統一する。
  label.textContent = formatRecord(place, date, 'ja');

  // 英語の地名は推測しない。翻訳が未入力なら日本語のまま表示する。
  if ((place && !englishPlace) || (!place && !date)) return;
  if (date && !englishDate) return;
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'photo-record-toggle';
  button.setAttribute('aria-pressed', 'false');
  const faces = document.createElement('span');
  faces.className = 'photo-record-faces';
  const japanese = makeFace(formatRecord(place, date, 'ja'), 'ja');
  const english = makeFace(formatRecord(englishPlace, englishDate, 'en'), 'en');
  english.setAttribute('aria-hidden', 'true');
  faces.append(japanese, english);
  const hint = document.createElement('span');
  hint.className = 'photo-record-language';
  hint.textContent = 'JP / EN';
  hint.setAttribute('aria-hidden', 'true');
  button.append(faces, hint);
  button.setAttribute('aria-label', accessibleLabel(false));
  let flipped = false;
  button.addEventListener('click', () => {
    flipped = !flipped;
    button.classList.toggle('is-english', flipped);
    button.setAttribute('aria-pressed', String(flipped));
    japanese.setAttribute('aria-hidden', String(flipped));
    english.setAttribute('aria-hidden', String(!flipped));
    button.setAttribute('aria-label', accessibleLabel(flipped));
    hint.textContent = flipped ? 'EN / JP' : 'JP / EN';
  });
  label.replaceChildren(button);

  function accessibleLabel(en) {
    return en
      ? [englishPlace, englishDate, 'Switch collection record to Japanese'].filter(Boolean).join(', ')
      : [place, date, '採集記録を英語に切り替える'].filter(Boolean).join('、');
  }
  function formatRecord(place, date, language) {
    if (!place) return date;
    if (!date) return place;
    return language === 'ja' ? place + '（' + date + '）' : place + ' (' + date + ')';
  }
  function makeFace(text, language) {
    const face = document.createElement('span');
    face.className = 'photo-record-face photo-record-' + language;
    face.lang = language;
    const line = document.createElement('span');
    line.className = 'photo-record-line';
    line.textContent = text;
    face.append(line);
    return face;
  }
  function translateDate(value) {
    if (!value) return '';
    const match = /^(\d{4})[\/-](\d{1,2})[\/-](\d{1,2})$/.exec(value);
    if (!match) return '';
    const year = Number(match[1]), month = Number(match[2]), day = Number(match[3]);
    const check = new Date(0);
    check.setUTCFullYear(year, month - 1, day);
    if (check.getUTCFullYear() !== year || check.getUTCMonth() !== month - 1 || check.getUTCDate() !== day) return '';
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return day + ' ' + months[month - 1] + ' ' + match[1];
  }
})();
