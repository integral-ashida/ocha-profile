(() => {
  'use strict';

  const root = document.getElementById('quiz-room');
  const seen = new Set();
  const questions = (window.OCHA_QUIZ || []).filter(q => {
    const valid = q.published === true
      && /^[a-zA-Z0-9_-]{1,64}$/.test(q.id || '')
      && typeof q.question === 'string'
      && q.question.trim()
      && Array.isArray(q.answers)
      && q.answers.some(answer => typeof answer === 'string' && answer.trim());
    if (!valid || seen.has(q.id)) return false;
    seen.add(q.id);
    return true;
  });

  const normalize = value => String(value)
    .normalize('NFKC')
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/[ァ-ヶ]/g, character => String.fromCharCode(character.charCodeAt(0) - 0x60));

  let deck = [];
  let cursor = 0;
  let previousId = '';
  let roundAnswered = 0;
  let roundCorrect = 0;

  function element(tag, text = '', className = '') {
    const item = document.createElement(tag);
    if (text) item.textContent = text;
    if (className) item.className = className;
    return item;
  }

  function shuffle() {
    deck = questions.slice();
    for (let index = deck.length - 1; index > 0; index -= 1) {
      const target = Math.floor(Math.random() * (index + 1));
      [deck[index], deck[target]] = [deck[target], deck[index]];
    }
    if (deck.length > 1 && deck[0].id === previousId) {
      [deck[0], deck[1]] = [deck[1], deck[0]];
    }
    cursor = 0;
    roundAnswered = 0;
    roundCorrect = 0;
  }

  function focusQuestion() {
    root.querySelector('h2')?.focus();
  }

  function advance() {
    previousId = deck[cursor].id;
    cursor += 1;
    if (cursor < deck.length) {
      render();
      focusQuestion();
      return;
    }

    root.replaceChildren();
    const title = element('h2', '問題集をひと巡りしました。');
    title.tabIndex = -1;
    root.append(
      title,
      element('p', `この回は${roundAnswered}問に回答し、${roundCorrect}問正解しました。`),
      element('p', 'もう一度遊ぶと、違う順番で出題されます。', 'small-note')
    );
    const again = element('button', 'もう一度ランダムに遊ぶ', 'solid-button');
    again.type = 'button';
    again.addEventListener('click', () => {
      shuffle();
      render();
      focusQuestion();
    });
    root.append(again);
    title.focus();
  }

  function render() {
    root.replaceChildren();
    if (!questions.length) {
      root.append(
        element('h2', 'ただいま、出題の準備中です。'),
        element('p', '問題が届くまで、もう少しお待ちください。')
      );
      return;
    }

    const question = deck[cursor];
    const title = element('h2', '問題');
    title.tabIndex = -1;
    root.append(
      element('p', `${questions.length}問の問題集から、ランダムに出題`, 'eyebrow'),
      title,
      element('p', question.question, 'question-text')
    );

    if (/^images\/[\w\-./]+\.(webp|png|jpe?g)$/i.test(question.image || '') && !question.image.includes('..')) {
      const image = element('img', '', 'question-image');
      image.src = question.image;
      image.alt = question.imageAlt || '問題の画像';
      root.append(image);
    }

    const form = element('form');
    const label = element('label', 'あなたの答え');
    label.htmlFor = 'quiz-answer';
    const input = element('input');
    input.id = 'quiz-answer';
    input.autocomplete = 'off';
    input.required = true;
    input.maxLength = 200;
    const submit = element('button', '回答を送信する', 'solid-button');
    submit.type = 'submit';
    form.append(label, input, submit);
    root.append(form);

    const feedback = element('section', '', 'quiz-feedback');
    feedback.hidden = true;
    feedback.setAttribute('aria-label', '回答結果');
    const verdict = element('h3', '', 'quiz-verdict');
    verdict.tabIndex = -1;
    const explanation = element('div', '', 'answer-explanation');
    const primaryAnswer = question.answers.find(answer => typeof answer === 'string' && answer.trim());
    explanation.append(
      element('h3', `答え：${primaryAnswer}`),
      element('p', question.explanation || '')
    );
    feedback.append(verdict, explanation);
    root.append(feedback);

    const navigation = element('nav', '', 'question-nav');
    navigation.setAttribute('aria-label', '次の問題へ');
    const note = element('span', '回答せず、別の問題へ進めます。');
    const next = element('button', 'この問題をとばす');
    next.type = 'button';
    navigation.append(note, next);
    root.append(navigation);

    let submitted = false;
    next.addEventListener('click', advance);
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (submitted || !normalize(input.value)) return;
      submitted = true;
      const correct = question.answers.some(answer =>
        typeof answer === 'string' && normalize(answer) === normalize(input.value)
      );
      input.readOnly = true;
      submit.disabled = true;
      roundAnswered += 1;
      if (correct) roundCorrect += 1;
      verdict.textContent = correct ? '正解！' : '不正解';
      verdict.dataset.correct = String(correct);
      feedback.hidden = false;
      next.textContent = cursor === deck.length - 1 ? 'この回の結果へ' : '別の問題を解く';
      note.textContent = '';
      verdict.focus();
    });
  }

  shuffle();
  render();
})();
