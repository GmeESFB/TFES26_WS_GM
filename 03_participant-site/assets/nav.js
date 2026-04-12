/* TFES 2026 — Shared Nav & Utilities */

// === Navigation ===
function renderNav(currentPage) {
  const pages = [
    { file: 'index.html', label: 'Prompt Builder', icon: '🛠️' },
    { file: '01-pathways.html', label: 'Pathways', icon: '🛤️' },
    { file: '02-hallucination.html', label: 'Hallucination Grid', icon: '🔍' },
    { file: '03-quality.html', label: 'Quality', icon: '✅' },
    { file: '04-certificate.html', label: 'Certificate', icon: '📜' },
    { file: '05-prefixes.html', label: 'Prompt Prefixes', icon: '⚡' },
  ];
  const nav = document.querySelector('.nav-footer');
  if (!nav) return;
  nav.innerHTML = `
    <div>TFES 2026 · Guillaume Martel · European School of Mol</div>
    <div class="nav-links">
      ${pages.map(p => `<a href="${p.file}" class="${p.file===currentPage?'nav-link-active':''}">${p.icon} ${p.label}</a>`).join('')}
    </div>
  `;
}

// === Chip groups ===
function initChips() {
  document.querySelectorAll('.chip-group').forEach(group => {
    group.querySelectorAll('.chip').forEach(chip => {
      chip.addEventListener('click', () => chip.classList.toggle('selected'));
    });
  });
}

// === Toggle switches ===
function toggleSwitch(el) { el.classList.toggle('on'); }
function isOn(id) { return document.getElementById(id).classList.contains('on'); }

// === Collapsible ===
function toggleColl(el) {
  el.classList.toggle('open');
  el.nextElementSibling.classList.toggle('open');
}

// === Tabs ===
function initTabs(container) {
  const c = document.getElementById(container);
  if (!c) return;
  c.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      c.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      c.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(tab.dataset.panel).classList.add('active');
    });
  });
}

// === Copy ===
function copyText(text, btnEl) {
  navigator.clipboard.writeText(text).then(() => {
    if (btnEl) { const orig = btnEl.textContent; btnEl.textContent = '✅ Copied!'; setTimeout(() => btnEl.textContent = orig, 2000); }
  }).catch(() => {
    const ta = document.createElement('textarea');
    ta.value = text; document.body.appendChild(ta); ta.select();
    document.execCommand('copy'); document.body.removeChild(ta);
  });
}

// === Checklist progress ===
function updateProgress(zoneId) {
  const zone = document.getElementById(zoneId);
  if (!zone) return;
  const checks = zone.querySelectorAll('input[type="checkbox"]');
  const done = [...checks].filter(c => c.checked).length;
  const counter = zone.querySelector('.zone-counter');
  if (counter) counter.textContent = done+'/'+checks.length;
  const allChecks = document.querySelectorAll('.check-zone input[type="checkbox"]');
  const allDone = [...allChecks].filter(c => c.checked).length;
  const fill = document.querySelector('.progress-fill');
  if (fill) fill.style.width = (allDone/allChecks.length*100) + '%';
  const globalCounter = document.getElementById('globalCounter');
  if (globalCounter) globalCounter.textContent = allDone+'/'+allChecks.length;
}

// === Init ===
document.addEventListener('DOMContentLoaded', () => { initChips(); });
