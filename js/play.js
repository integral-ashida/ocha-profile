(() => {
  'use strict';
  const root = document.getElementById('quiz-room');
  const normalize = value => String(value).normalize('NFKC').toLowerCase()
    .replace(/[\s・･·]/g, '').replace(/[ァ-ヶ]/g, c => String.fromCharCode(c.charCodeAt(0) - 96));
  const questions = (window.OCHA_QUIZ || []).filter(q => q.published && q.question && q.answers?.length);
  const shuffled = values => {
    const result = values.slice();
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  };
  function el(tag, text = '', cls = '') {
    const node = document.createElement(tag);
    node.textContent = text; node.className = cls; return node;
  }
  function button(text, cls, fn) {
    const node = el('button', text, cls); node.type = 'button';
    node.addEventListener('click', fn); return node;
  }
  let deck = shuffled(questions), cursor = 0, correctCount = 0, unknownCount = 0;
  function render() {
    root.replaceChildren();
    if (!deck.length) { root.append(el('h2', 'ただいま準備中です。')); return; }
    if (cursor === deck.length) {
      root.append(el('h2', 'ひと巡り、おつかれさまでした。'), el('p', `${deck.length}問中 ${correctCount}問正解（わからない：${unknownCount}問）`));
      root.append(button('もう一度遊ぶ', 'quiz-primary', () => {
        const last = deck[deck.length - 1].id; deck = shuffled(questions);
        if (deck.length > 1 && deck[0].id === last) [deck[0],deck[1]] = [deck[1],deck[0]];
        cursor = 0; correctCount = 0; unknownCount = 0; render();
      })); return;
    }
    const q = deck[cursor];
    const title = el('h2', '問題'); title.tabIndex = -1;
    root.append(title, el('p', q.question, 'question-text'));
    const form = el('form');
    const controls = el('div', '', 'quiz-controls');
    const feedback = el('section', '', 'quiz-result'); feedback.hidden = true;
    feedback.setAttribute('aria-live', 'polite');
    const next = button('次へ！', 'quiz-primary quiz-next', () => { cursor++; render(); root.querySelector('h2')?.focus(); });
    next.hidden = true;
    let done = false, input;
    const finish = (value, unknown = false) => {
      if (done || (!unknown && !normalize(value))) return;
      done = true;
      const correct = !unknown && q.answers.some(a => normalize(a) === normalize(value));
      if (correct) correctCount++;
      if (unknown) unknownCount++;
      if (input) { input.readOnly = true; input.blur(); }
      form.querySelectorAll('button').forEach(b => {
        b.disabled = true;
        if (b.classList.contains('quiz-choice')) {
          if (q.answers.some(a => normalize(a) === normalize(b.textContent))) b.classList.add('is-correct');
          else if (!unknown && b.textContent === value) b.classList.add('is-wrong');
        }
      });
      controls.hidden = true;
      feedback.append(el('h3', unknown ? '答えはこちら' : correct ? '正解！' : '不正解'), el('p', `答え：${q.answers[0]}`));
      feedback.hidden = false; next.hidden = false;
      next.textContent = cursor === deck.length - 1 ? '結果を見る！' : '次へ！';
      next.focus({ preventScroll: true });
      next.scrollIntoView({ block: 'nearest', behavior: 'auto' });
    };
    if (Array.isArray(q.choices) && q.choices.length === 4) {
      form.append(el('p', '選んで回答', 'quiz-instruction'));
      const grid = el('div', '', 'quiz-choices');
      shuffled(q.choices).forEach(choice => grid.append(button(choice, 'quiz-choice', () => finish(choice))));
      form.append(grid);
    } else {
      const label = el('label', 'あなたの答え'); label.htmlFor = 'quiz-answer';
      input = el('input'); input.id = 'quiz-answer'; input.autocomplete = 'off'; input.maxLength = 200;
      input.setAttribute('enterkeyhint', 'done');
      form.append(label, input);
      const submit = el('button', '回答する', 'quiz-primary'); submit.type = 'submit'; controls.append(submit);
    }
    controls.append(button('わからない', 'quiz-secondary', () => finish('', true)));
    form.append(controls);
    form.addEventListener('submit', e => { e.preventDefault(); if (!e.isComposing && input) finish(input.value); });
    root.append(form, feedback, next);
  }
  render();
})();
