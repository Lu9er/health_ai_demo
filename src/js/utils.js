let toastTimeout;

export function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => t.classList.remove('show'), 2800);
}

export function getStockColor(pct) {
  if (pct > 50) return 'var(--success)';
  if (pct > 25) return 'var(--warning)';
  return 'var(--danger)';
}

export function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
