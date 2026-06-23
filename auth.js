(function () {
  var STORAGE_KEY = 'rh-summit-2026-auth';
  var PASSWORD_HASH = '5ec4a11bd49af6bca72f8c101ced9c659c810754cc4c0d103cdebf3333eaec7a';

  if (sessionStorage.getItem(STORAGE_KEY) === 'ok') return;

  document.documentElement.classList.add('auth-locked');

  var style = document.createElement('style');
  style.textContent =
    'html.auth-locked body { overflow: hidden; }' +
    'html.auth-locked body > :not(#rh-summit-auth-gate) { visibility: hidden; }' +
    '#rh-summit-auth-gate {' +
    '  position: fixed; inset: 0; z-index: 2147483647;' +
    '  display: flex; align-items: center; justify-content: center;' +
    '  padding: 24px; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;' +
    '  background: #151515; color: #fff;' +
    '}' +
    '#rh-summit-auth-gate .auth-card {' +
    '  width: 100%; max-width: 400px; background: #212427; border: 1px solid #383838;' +
    '  border-radius: 12px; padding: 32px 28px; box-shadow: 0 24px 48px rgba(0,0,0,0.45);' +
    '}' +
    '#rh-summit-auth-gate h1 { margin: 0 0 8px; font-size: 22px; font-weight: 700; }' +
    '#rh-summit-auth-gate p { margin: 0 0 24px; font-size: 14px; color: #8a8d90; line-height: 1.5; }' +
    '#rh-summit-auth-gate label { display: block; font-size: 13px; font-weight: 600; margin-bottom: 8px; color: #c7c7c7; }' +
    '#rh-summit-auth-gate input {' +
    '  width: 100%; box-sizing: border-box; padding: 12px 14px; font-size: 15px;' +
    '  border: 1px solid #383838; border-radius: 8px; background: #151515; color: #fff; outline: none;' +
    '}' +
    '#rh-summit-auth-gate input:focus { border-color: #0066cc; box-shadow: 0 0 0 2px rgba(0,102,204,0.2); }' +
    '#rh-summit-auth-gate button {' +
    '  width: 100%; margin-top: 16px; padding: 12px; font-size: 15px; font-weight: 600;' +
    '  border: none; border-radius: 8px; background: #0066cc; color: #fff; cursor: pointer;' +
    '}' +
    '#rh-summit-auth-gate button:hover { background: #004d99; }' +
    '#rh-summit-auth-gate .auth-error {' +
    '  margin-top: 12px; font-size: 13px; color: #f87171; min-height: 18px;' +
    '}';
  document.head.appendChild(style);

  function sha256(text) {
    var encoder = new TextEncoder();
    return crypto.subtle.digest('SHA-256', encoder.encode(text)).then(function (buf) {
      return Array.from(new Uint8Array(buf))
        .map(function (b) { return b.toString(16).padStart(2, '0'); })
        .join('');
    });
  }

  function unlock() {
    sessionStorage.setItem(STORAGE_KEY, 'ok');
    document.documentElement.classList.remove('auth-locked');
    var gate = document.getElementById('rh-summit-auth-gate');
    if (gate) gate.remove();
  }

  function mountGate() {
    var gate = document.createElement('div');
    gate.id = 'rh-summit-auth-gate';
    gate.setAttribute('role', 'dialog');
    gate.setAttribute('aria-modal', 'true');
    gate.setAttribute('aria-labelledby', 'auth-title');
    gate.innerHTML =
      '<div class="auth-card">' +
        '<h1 id="auth-title">Summit 2026 Demo</h1>' +
        '<p>Enter the access password to continue.</p>' +
        '<form id="rh-summit-auth-form">' +
          '<label for="rh-summit-auth-password">Password</label>' +
          '<input id="rh-summit-auth-password" type="password" autocomplete="current-password" autofocus />' +
          '<button type="submit">Sign in</button>' +
          '<div class="auth-error" id="rh-summit-auth-error" aria-live="polite"></div>' +
        '</form>' +
      '</div>';

    document.body.appendChild(gate);

    var form = document.getElementById('rh-summit-auth-form');
    var input = document.getElementById('rh-summit-auth-password');
    var error = document.getElementById('rh-summit-auth-error');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      error.textContent = '';
      sha256(input.value).then(function (hash) {
        if (hash === PASSWORD_HASH) {
          unlock();
        } else {
          error.textContent = 'Incorrect password. Please try again.';
          input.select();
        }
      }).catch(function () {
        error.textContent = 'Unable to verify password in this browser.';
      });
    });
  }

  if (document.body) mountGate();
  else document.addEventListener('DOMContentLoaded', mountGate);
})();
