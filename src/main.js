import './css/variables.css';
import './css/base.css';
import './css/mobile.css';
import './css/desktop.css';

import { showMobileScreen } from './js/mobile.js';
import { showDistrictTab } from './js/district.js';
import { showNationalTab } from './js/national.js';

// === VIEW SWITCHING ===
function switchView(view) {
  document.querySelectorAll('.view-panel').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));

  const activeTab = document.querySelector(`.nav-tab[data-view="${view}"]`);
  if (activeTab) activeTab.classList.add('active');

  if (view === 'mobile') {
    document.getElementById('view-mobile').classList.add('active');
  } else if (view === 'district') {
    document.getElementById('view-district').classList.add('active');
    showDistrictTab('overview');
    setActiveSubnav('districtSubnav', 'overview');
  } else if (view === 'national') {
    document.getElementById('view-national').classList.add('active');
    showNationalTab('natoverview');
    setActiveSubnav('nationalSubnav', 'natoverview');
  }
}

function setActiveSubnav(navId, tab) {
  const nav = document.getElementById(navId);
  nav.querySelectorAll('button').forEach(b => b.classList.remove('active'));
  const btn = nav.querySelector(`button[data-tab="${tab}"]`);
  if (btn) btn.classList.add('active');
}

// === EVENT LISTENERS ===

// Top nav tabs
document.getElementById('navTabs').addEventListener('click', (e) => {
  const tab = e.target.closest('.nav-tab');
  if (tab) switchView(tab.dataset.view);
});

// Phone bottom nav
document.getElementById('phoneNav').addEventListener('click', (e) => {
  const btn = e.target.closest('.phone-nav-btn');
  if (btn) showMobileScreen(btn.dataset.screen);
});

// District sub-nav
document.getElementById('districtSubnav').addEventListener('click', (e) => {
  const btn = e.target.closest('button');
  if (!btn) return;
  document.querySelectorAll('#districtSubnav button').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  showDistrictTab(btn.dataset.tab);
});

// National sub-nav
document.getElementById('nationalSubnav').addEventListener('click', (e) => {
  const btn = e.target.closest('button');
  if (!btn) return;
  document.querySelectorAll('#nationalSubnav button').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  showNationalTab(btn.dataset.tab);
});

// === INIT ===
showMobileScreen('dashboard');
