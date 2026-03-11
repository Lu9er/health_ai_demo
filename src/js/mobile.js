import { COMMODITIES, OVERRIDES } from './data.js';
import { showToast, getStockColor } from './utils.js';

let isOffline = true;

export function getOfflineState() { return isOffline; }

export function showMobileScreen(screen) {
  document.querySelectorAll('.phone-nav-btn').forEach(n => n.classList.remove('active'));
  const btn = document.querySelector(`.phone-nav-btn[data-screen="${screen}"]`);
  if (btn) btn.classList.add('active');

  const content = document.getElementById('phoneContent');
  const subtitles = {
    dashboard: 'Facility Dashboard',
    stock: 'Stock Levels',
    order: 'Order with Tier 1 Forecast',
    sync: 'Sync Status',
    overrides: 'Override Log',
  };
  document.getElementById('phoneSubtitle').textContent = subtitles[screen] || '';

  const renderers = {
    dashboard: renderDashboard,
    stock: renderStock,
    order: renderOrder,
    sync: renderSync,
    overrides: renderOverrides,
  };

  if (renderers[screen]) renderers[screen](content);
}

function toggleOffline() {
  isOffline = !isOffline;
  document.getElementById('syncDot').className = 'sync-dot ' + (isOffline ? 'offline' : 'online');
  document.getElementById('syncLabel').textContent = isOffline
    ? 'Offline — Last sync: 2 days ago'
    : 'Online — Syncing...';

  if (!isOffline) {
    showToast('Connectivity detected — sync initiated');
    setTimeout(() => {
      document.getElementById('syncLabel').textContent = 'Online — Synced just now';
      showToast('Sync complete — 12 records pushed, 3 forecasts pulled');
    }, 2000);
  }
  showMobileScreen('dashboard');
}

// Make toggleOffline available globally for onclick
window.toggleOffline = toggleOffline;

function renderDashboard(el) {
  const criticalItems = COMMODITIES.filter(c => (c.stock / c.max) < 0.25);
  el.innerHTML = `
    <div class="stat-row">
      <div class="stat-box good"><div class="value">8</div><div class="label">Items Tracked</div></div>
      <div class="stat-box bad"><div class="value">${criticalItems.length}</div><div class="label">Critical Stock</div></div>
      <div class="stat-box warn"><div class="value">4</div><div class="label">Overrides This Month</div></div>
    </div>
    <div class="section-label">Alerts</div>
    <div class="m-card" style="border-left:3px solid var(--danger)">
      <div style="font-size:13px;font-weight:600;color:var(--danger)">Critical: RDT Malaria</div>
      <div style="font-size:12px;color:var(--text-muted);margin-top:4px">Stock at 7.5% — estimated 5 days until stockout. Order recommended.</div>
    </div>
    <div class="m-card" style="border-left:3px solid var(--danger)">
      <div style="font-size:13px;font-weight:600;color:var(--danger)">Critical: Inj. Artesunate</div>
      <div style="font-size:12px;color:var(--text-muted);margin-top:4px">Stock at 15% — 18 days at current consumption. Reorder now.</div>
    </div>
    <div class="m-card" style="border-left:3px solid var(--warning)">
      <div style="font-size:13px;font-weight:600;color:var(--warning)">Malaria surge detected</div>
      <div style="font-size:12px;color:var(--text-muted);margin-top:4px">Consumption of antimalarials up 40% vs. last month. Seasonal multiplier active (1.3x).</div>
    </div>
    <div class="section-label">Quick Stock Overview</div>
    ${COMMODITIES.slice(0, 5).map(c => {
      const pct = Math.round((c.stock / c.max) * 100);
      return `<div class="stock-item">
        <div><div class="name">${c.name}</div><div class="meta">${c.stock} ${c.unit} · ${pct}%</div></div>
        <div class="stock-level-bar"><div class="stock-level-fill" style="width:${pct}%;background:${getStockColor(pct)}"></div></div>
      </div>`;
    }).join('')}
    <div style="margin-top:10px">
      <div class="toggle-row">
        <span class="toggle-label">Simulate offline mode</span>
        <div class="toggle ${isOffline ? 'on' : ''}" onclick="toggleOffline()"><div class="knob"></div></div>
      </div>
    </div>
  `;
}

function renderStock(el) {
  el.innerHTML = `
    <div class="section-label">All Commodities — Moroto HC III</div>
    ${COMMODITIES.map(c => {
      const pct = Math.round((c.stock / c.max) * 100);
      const daysLeft = Math.round(c.stock / (c.consumption / 30));
      return `<div class="stock-item" style="flex-wrap:wrap">
        <div style="flex:1"><div class="name">${c.name}</div><div class="meta">${c.category} · ${c.code}</div></div>
        <div style="text-align:right">
          <div style="font-size:14px;font-weight:600;color:${getStockColor(pct)}">${c.stock}</div>
          <div class="meta">${daysLeft}d supply</div>
        </div>
        <div style="width:100%;margin-top:6px">
          <div class="stock-level-bar" style="width:100%"><div class="stock-level-fill" style="width:${pct}%;background:${getStockColor(pct)}"></div></div>
          <div style="display:flex;justify-content:space-between;font-size:10px;color:var(--text-muted);margin-top:2px">
            <span>0</span><span>Max: ${c.max}</span>
          </div>
        </div>
      </div>`;
    }).join('')}
  `;
}

function renderOrder(el) {
  const c = COMMODITIES[0];
  const avgMonthly = c.consumption;
  const leadTimeMonths = 2;
  const safetyMonths = 1;
  const seasonalMultiplier = 1.3;
  const calculated = Math.round(avgMonthly * (leadTimeMonths + safetyMonths) * seasonalMultiplier);
  const storageCapPct = 0.7;
  const capped = Math.round(calculated * storageCapPct);
  const orderQty = Math.max(0, capped - c.stock);

  el.innerHTML = `
    <div class="forecast-box">
      <span class="forecast-tag t1">TIER 1 — On-Device Forecast</span>
      <div style="font-size:14px;font-weight:600;margin:6px 0">${c.name}</div>
      <div class="forecast-row"><span class="label">Avg monthly consumption</span><span class="val">${avgMonthly} ${c.unit}</span></div>
      <div class="forecast-row"><span class="label">Lead time</span><span class="val">${leadTimeMonths} months</span></div>
      <div class="forecast-row"><span class="label">Safety stock buffer</span><span class="val">${safetyMonths} month</span></div>
      <div class="forecast-row"><span class="label">Seasonal multiplier (rainy)</span><span class="val">x${seasonalMultiplier}</span></div>
      <hr style="margin:8px 0;border:none;border-top:1px dashed #ccc">
      <div class="forecast-row"><span class="label">Calculated need</span><span class="val">${calculated}</span></div>
      <div class="forecast-row"><span class="label">Storage cap (70% — inadequate)</span><span class="val" style="color:var(--warning)">${capped}</span></div>
      <div class="forecast-row"><span class="label">Current stock</span><span class="val">-${c.stock}</span></div>
      <hr style="margin:8px 0;border:none;border-top:1px solid var(--light-teal)">
      <div class="forecast-row"><span class="label" style="font-weight:600;color:var(--navy)">Recommended order</span><span class="val" style="font-size:18px;color:var(--teal)">${orderQty} ${c.unit}</span></div>
    </div>
    ${!isOffline ? `<div class="forecast-box tier2">
      <span class="forecast-tag t2">TIER 2 — District Forecast (last sync)</span>
      <div class="forecast-row"><span class="label">HES district forecast</span><span class="val">268 ${c.unit}</span></div>
      <div class="forecast-row"><span class="label">Confidence interval</span><span class="val">220 – 316</span></div>
      <div style="font-size:11px;color:var(--text-muted);margin-top:6px">District forecast is 12% higher than your Tier 1. Consider reviewing consumption data.</div>
    </div>` : `<div class="m-card" style="border-left:3px solid var(--warning)">
      <div style="font-size:12px;color:var(--text-muted)">Tier 2 district forecast unavailable — device offline. Using Tier 1 only.</div>
    </div>`}
    <div class="override-section">
      <div class="section-label">Adjust Order (Override)</div>
      <input class="override-input" type="number" value="${orderQty}" id="overrideQty" placeholder="Order quantity">
      <select class="override-select" id="overrideReason">
        <option value="">Accept recommended quantity</option>
        <option value="outbreak">Disease outbreak — increase needed</option>
        <option value="storage">Storage constraint — reduce order</option>
        <option value="delivery_delay">Expected delivery delay</option>
        <option value="forecast_error">System forecasting error</option>
        <option value="budget">Budget adjustment</option>
        <option value="other">Other (specify in notes)</option>
      </select>
      <button class="btn-primary" id="submitOrderBtn">Submit Order</button>
      <button class="btn-outline" id="paperBackupBtn">Generate Paper Backup (HMIS 105)</button>
    </div>
  `;

  document.getElementById('submitOrderBtn').addEventListener('click', () => {
    const qty = document.getElementById('overrideQty').value;
    const reason = document.getElementById('overrideReason').value;
    if (reason) {
      showToast(`Override logged: ${qty} units — Reason: ${reason}`);
    } else {
      showToast(`Order submitted: ${qty} units of Coartem`);
    }
  });

  document.getElementById('paperBackupBtn').addEventListener('click', () => {
    showToast('HMIS 105 paper form generated');
  });
}

function renderSync(el) {
  el.innerHTML = `
    <div class="m-card">
      <div class="m-card-title">Connection Status</div>
      <div style="text-align:center;padding:10px">
        <div style="font-size:36px">${isOffline ? '&#128225;' : '&#9989;'}</div>
        <div style="font-size:15px;font-weight:600;margin-top:6px">${isOffline ? 'No Connectivity' : 'Connected'}</div>
        <div style="font-size:12px;color:var(--text-muted);margin-top:4px">${isOffline ? 'All features operational in offline mode' : 'Sync active — data flowing'}</div>
      </div>
    </div>
    <div class="section-label">Sync Queue</div>
    <div class="sync-queue-item">
      <span class="sync-icon">&#128230;</span>
      <div style="flex:1"><div style="font-size:13px;font-weight:500">Stock count (8 items)</div><div style="font-size:11px;color:var(--text-muted)">11 Mar 2026, 08:30</div></div>
      <span class="sync-status-tag ${isOffline ? 'queued' : 'synced'}">${isOffline ? 'Queued' : 'Synced'}</span>
    </div>
    <div class="sync-queue-item">
      <span class="sync-icon">&#128722;</span>
      <div style="flex:1"><div style="font-size:13px;font-weight:500">Order — Coartem (override)</div><div style="font-size:11px;color:var(--text-muted)">10 Mar 2026, 14:15</div></div>
      <span class="sync-status-tag ${isOffline ? 'queued' : 'synced'}">${isOffline ? 'Queued' : 'Synced'}</span>
    </div>
    <div class="sync-queue-item">
      <span class="sync-icon">&#9999;&#65039;</span>
      <div style="flex:1"><div style="font-size:13px;font-weight:500">Override log (4 entries)</div><div style="font-size:11px;color:var(--text-muted)">10 Mar 2026, 14:15</div></div>
      <span class="sync-status-tag ${isOffline ? 'queued' : 'synced'}">${isOffline ? 'Queued' : 'Synced'}</span>
    </div>
    <div class="sync-queue-item">
      <span class="sync-icon">&#128229;</span>
      <div style="flex:1"><div style="font-size:13px;font-weight:500">Tier 2 forecasts (pending download)</div><div style="font-size:11px;color:var(--text-muted)">Awaiting connectivity</div></div>
      <span class="sync-status-tag pending">Pending</span>
    </div>
    <div class="section-label">Sync Rules</div>
    <div class="m-card">
      <div style="font-size:12px;line-height:1.6">
        <div>Auto-sync when: connectivity + battery &gt;20% + idle</div>
        <div>Manual sync: available anytime via button below</div>
        <div>Conflict rule: <strong>local edits always win</strong></div>
        <div>Auth: offline credentials valid for 90 days</div>
      </div>
    </div>
    <button class="btn-primary" style="margin-top:8px" id="trySyncBtn">
      ${isOffline ? 'Try Sync Now' : 'Sync Complete'}
    </button>
  `;

  document.getElementById('trySyncBtn').addEventListener('click', () => {
    if (isOffline) {
      showToast('No connectivity detected. Data safely queued locally.');
    } else {
      showToast('All data synced successfully');
    }
  });
}

function renderOverrides(el) {
  el.innerHTML = `
    <div class="section-label">Override Audit Log</div>
    <div style="font-size:12px;color:var(--text-muted);margin-bottom:10px">All overrides logged with timestamp, user, and reason. No-blame principle — overrides improve the model.</div>
    ${OVERRIDES.map(o => `
      <div class="override-log-item">
        <div class="head"><span>${o.item}</span><span style="color:var(--text-muted);font-size:11px">${o.date}</span></div>
        <div class="detail">
          ${o.user} · System: ${o.from} → Final: ${o.to} (${o.to > o.from ? '+' : ''}${o.to - o.from})<br>
          Reason: ${o.reason}
        </div>
      </div>
    `).join('')}
    <div class="m-card" style="background:var(--bg);margin-top:10px">
      <div style="font-size:12px;color:var(--text-muted);text-align:center">
        Override rate this month: <strong style="color:var(--navy)">35%</strong><br>
        <span style="font-size:11px">Within expected range (30–40% during ramp-up)</span>
      </div>
    </div>
  `;
}
