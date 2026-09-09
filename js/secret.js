// 合言葉は編集できます。公開コード上の簡易的な扉です。
const PASSWORD = 'MM';
const gate = document.querySelector('#secret-gate');
const room = document.querySelector('#secret-room');
const input = document.querySelector('#secret-password');
const error = document.querySelector('#password-error');
const status = document.querySelector('#comments-status');
let commentsLoaded = false;
function remember(open) {
  try { if (open) sessionStorage.setItem('secret-room-open', 'yes'); else sessionStorage.removeItem('secret-room-open'); } catch (_) {}
}
function loadComments() {
  const config = window.OCHA_COMMENTS;
  if (commentsLoaded || !config?.repoId || !config?.categoryId) return;
  commentsLoaded = true;
  status.textContent = '投稿・リアクションにはGitHubへのログインが必要です。コメントはGitHub上でも公開されます。';
  const script = document.createElement('script');
  script.src = 'https://giscus.app/client.js';
  const attrs = {'repo': config.repo, 'repo-id': config.repoId, 'category': config.category, 'category-id': config.categoryId, 'mapping': 'pathname', 'strict': '1', 'reactions-enabled': '1', 'emit-metadata': '0', 'input-position': 'top', 'theme': 'light', 'lang': 'ja'};
  for (const [key, value] of Object.entries(attrs)) script.setAttribute('data-' + key, value);
  script.crossOrigin = 'anonymous'; script.async = true;
  script.onerror = () => {
    status.textContent = 'コメント欄を読み込めませんでした。時間をおいて開き直してください。';
    commentsLoaded = false; script.remove();
  };
  document.querySelector('#comments').append(script);
}
function openRoom() {
  gate.hidden = true; room.hidden = false; remember(true);
  room.querySelector('h1').focus(); loadComments();
}
function closeRoom() {
  remember(false); room.hidden = true; gate.hidden = false;
  input.value = ''; error.textContent = ''; input.focus();
}
document.querySelector('#password-form').addEventListener('submit', event => {
  event.preventDefault();
  if (input.value === PASSWORD) { error.textContent = ''; openRoom(); }
  else { error.textContent = '合言葉が違うようです。もう一度どうぞ。'; input.select(); }
});
document.querySelector('#lock-room').addEventListener('click', closeRoom);
try { if (sessionStorage.getItem('secret-room-open') === 'yes') openRoom(); } catch (_) {}
