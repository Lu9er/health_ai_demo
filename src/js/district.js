import { FACILITIES, COMMODITIES, OVERRIDES } from './data.js';
import { showToast } from './utils.js';

export function showDistrictTab(tab) {
  const el = document.getElementById('district-content');
  const renderers = {
    overview: renderOverview,
    facilities: renderFacilities,
    forecasts: renderForecasts,
    redistribution: renderRedistribution,
    overridelog: renderOverrideLog,
  };
  if (renderers[tab]) renderers[tab](el);
}

function renderOverview(el) {
  el.innerHTML = `
    <div class="dash-grid">
      <div class="dash-stat"><div class="label">Facilities Reporting</div><div class="value">8<span style="font-size:14px;color:var(--text-muted)">/8</span></div><div class="change up">100% sync rate this week</div></div>
      <div class="dash-stat"><div class="label">Active Stockouts</div><div class="value" style="color:var(--danger)">3</div><div class="change down">+1 from last week</div></div>
      <div class="dash-stat"><div class="label">Override Rate</div><div class="value" style="color:var(--accent-gold)">32%</div><div class="change up">Within expected range</div></div>
      <div class="dash-stat"><div class="label">Avg Days Since Sync</div><div class="value">4.2</div><div class="change down">+1.1 from last week</div></div>
    </div>
    <div class="two-col">
      <div class="chart-area">
        <h3>Stockout Trend — Moroto District (6 months)</h3>
        <div class="chart-placeholder">
          <svg viewBox="0 0 500 200">
            <line x1="50" y1="20" x2="50" y2="170" class="chart-grid-line"/>
            <line x1="50" y1="170" x2="480" y2="170" class="chart-grid-line"/>
            <line x1="50" y1="95" x2="480" y2="95" class="chart-grid-line" stroke-dasharray="4"/>
            <line x1="50" y1="45" x2="480" y2="45" class="chart-grid-line" stroke-dasharray="4"/>
            <text x="15" y="175" class="chart-label">0</text>
            <text x="15" y="100" class="chart-label">3</text>
            <text x="15" y="50" class="chart-label">6</text>
            <text x="95" y="190" class="chart-label">Oct</text>
            <text x="167" y="190" class="chart-label">Nov</text>
            <text x="239" y="190" class="chart-label">Dec</text>
            <text x="311" y="190" class="chart-label">Jan</text>
            <text x="383" y="190" class="chart-label">Feb</text>
            <text x="451" y="190" class="chart-label">Mar</text>
            <path d="M 95 45 L 167 70 L 239 57 L 311 95 L 383 107 L 455 82" class="chart-line" stroke="var(--accent)"/>
            <path d="M 95 45 L 167 70 L 239 57 L 311 95 L 383 107 L 455 82 L 455 170 L 95 170 Z" fill="var(--accent)" class="chart-area-fill"/>
            <circle cx="95" cy="45" r="4" fill="var(--accent)" class="chart-dot"/>
            <circle cx="167" cy="70" r="4" fill="var(--accent)" class="chart-dot"/>
            <circle cx="239" cy="57" r="4" fill="var(--accent)" class="chart-dot"/>
            <circle cx="311" cy="95" r="4" fill="var(--accent)" class="chart-dot"/>
            <circle cx="383" cy="107" r="4" fill="var(--accent)" class="chart-dot"/>
            <circle cx="455" cy="82" r="4" fill="var(--accent)" class="chart-dot"/>
          </svg>
        </div>
      </div>
      <div class="chart-area">
        <h3>Consumption by Category — March 2026</h3>
        <div class="chart-placeholder">
          <svg viewBox="0 0 500 200">
            <line x1="50" y1="170" x2="480" y2="170" class="chart-grid-line"/>
            <line x1="50" y1="110" x2="480" y2="110" class="chart-grid-line" stroke-dasharray="4"/>
            <line x1="50" y1="50" x2="480" y2="50" class="chart-grid-line" stroke-dasharray="4"/>
            <text x="15" y="175" class="chart-label">0</text>
            <text x="15" y="115" class="chart-label">500</text>
            <text x="15" y="55" class="chart-label">1000</text>
            <rect x="80" y="55" width="55" height="115" fill="var(--teal)" class="chart-bar" opacity="0.85"/>
            <rect x="170" y="85" width="55" height="85" fill="var(--deep-blue)" class="chart-bar" opacity="0.85"/>
            <rect x="260" y="110" width="55" height="60" fill="var(--light-teal)" class="chart-bar" opacity="0.85"/>
            <rect x="350" y="70" width="55" height="100" fill="var(--accent-gold)" class="chart-bar" opacity="0.85"/>
            <rect x="440" y="130" width="35" height="40" fill="var(--accent)" class="chart-bar" opacity="0.85"/>
            <text x="85" y="190" class="chart-label">Anti-</text>
            <text x="82" y="198" class="chart-label">malarial</text>
            <text x="172" y="190" class="chart-label">Antibiotic</text>
            <text x="265" y="190" class="chart-label">ORS/Zinc</text>
            <text x="350" y="190" class="chart-label">Diagnostic</text>
            <text x="440" y="190" class="chart-label">Other</text>
          </svg>
        </div>
      </div>
    </div>
    <div class="chart-area">
      <h3>Facility Sync Timeline — Last 14 Days</h3>
      <div class="chart-placeholder" style="height:160px">
        <svg viewBox="0 0 700 140">
          <text x="10" y="25" class="chart-label" font-weight="600">Moroto RRH</text>
          <text x="10" y="45" class="chart-label" font-weight="600">Rupa HC III</text>
          <text x="10" y="65" class="chart-label" font-weight="600">Nadunget HC III</text>
          <text x="10" y="85" class="chart-label" font-weight="600">Katikekile HC II</text>
          ${[
            {y:20, syncs:[1,3,5,7,9,11,13]},
            {y:40, syncs:[2,6,10]},
            {y:60, syncs:[1,7]},
            {y:80, syncs:[3]},
          ].map(row => row.syncs.map(d =>
            `<rect x="${120 + d * 38}" y="${row.y - 6}" width="30" height="12" rx="3" fill="var(--light-teal)" opacity="0.8"/>`
          ).join('')).join('')}
          ${Array.from({length:14}, (_,i) => `<text x="${125 + i * 38}" y="110" class="chart-label">${i+1}</text>`).join('')}
          <text x="380" y="130" class="chart-label">Days ago</text>
        </svg>
      </div>
    </div>
  `;
}

function renderFacilities(el) {
  const distFacilities = FACILITIES.filter(f => f.district === 'Moroto');
  el.innerHTML = `
    <div class="chart-area">
      <h3>Facility Status — Moroto District</h3>
      <table class="data-table">
        <thead><tr><th>Facility</th><th>Type</th><th>Storage</th><th>Last Sync</th><th>Active Stockouts</th><th>Risk</th></tr></thead>
        <tbody>
          ${distFacilities.map(f => {
            const risk = f.stockouts >= 3 ? 'high' : f.stockouts >= 2 ? 'medium' : 'low';
            return `<tr>
              <td style="font-weight:500">${f.name}</td>
              <td>${f.type}</td>
              <td>${f.storage === 'adequate' ? '<span style="color:var(--success)">Adequate</span>' : '<span style="color:var(--warning)">Inadequate</span>'}</td>
              <td>${f.syncDays === 0 ? 'Today' : f.syncDays + ' days ago'}</td>
              <td>${f.stockouts}</td>
              <td><span class="risk-badge ${risk}">${risk.toUpperCase()}</span></td>
            </tr>`;
          }).join('')}
        </tbody>
      </table>
    </div>
  `;
}

function renderForecasts(el) {
  el.innerHTML = `
    <div class="two-col">
      <div class="chart-area">
        <h3>Tier 2 Forecast — Coartem 20/120mg (HES Model)</h3>
        <div class="chart-placeholder">
          <svg viewBox="0 0 500 200">
            <line x1="50" y1="170" x2="480" y2="170" class="chart-grid-line"/>
            <line x1="50" y1="110" x2="480" y2="110" class="chart-grid-line" stroke-dasharray="4"/>
            <line x1="50" y1="50" x2="480" y2="50" class="chart-grid-line" stroke-dasharray="4"/>
            <text x="5" y="175" class="chart-label">0</text>
            <text x="5" y="115" class="chart-label">400</text>
            <text x="5" y="55" class="chart-label">800</text>
            <path d="M 95 75 L 167 80 L 239 55 L 311 40 L 383 50 L 455 65 L 455 130 L 383 120 L 311 110 L 239 115 L 167 130 L 95 125 Z" fill="var(--teal)" opacity="0.1"/>
            <path d="M 95 100 L 167 105 L 239 85" class="chart-line" stroke="var(--navy)"/>
            <path d="M 239 85 L 311 75 L 383 85 L 455 95" class="chart-line" stroke="var(--teal)" stroke-dasharray="6"/>
            <circle cx="95" cy="100" r="4" fill="var(--navy)" class="chart-dot"/>
            <circle cx="167" cy="105" r="4" fill="var(--navy)" class="chart-dot"/>
            <circle cx="239" cy="85" r="4" fill="var(--navy)" class="chart-dot"/>
            <circle cx="311" cy="75" r="3" fill="var(--teal)" class="chart-dot" stroke="var(--teal)"/>
            <circle cx="383" cy="85" r="3" fill="var(--teal)" class="chart-dot" stroke="var(--teal)"/>
            <circle cx="455" cy="95" r="3" fill="var(--teal)" class="chart-dot" stroke="var(--teal)"/>
            <text x="80" y="190" class="chart-label">Jan</text><text x="155" y="190" class="chart-label">Feb</text>
            <text x="228" y="190" class="chart-label">Mar</text><text x="300" y="190" class="chart-label">Apr</text>
            <text x="372" y="190" class="chart-label">May</text><text x="444" y="190" class="chart-label">Jun</text>
            <text x="90" y="15" class="chart-label" fill="var(--navy)">— Actual</text>
            <text x="200" y="15" class="chart-label" fill="var(--teal)">- - Forecast</text>
            <text x="340" y="15" class="chart-label" fill="var(--teal)">95% CI</text>
          </svg>
        </div>
        <div style="margin-top:10px;display:flex;gap:8px;align-items:center">
          <span class="tier-badge t2">Tier 2 — HES</span>
          <span style="font-size:12px;color:var(--text-muted)">MAPE: 12.4% · Seasonal multiplier: 1.3x (Mar–May)</span>
        </div>
      </div>
      <div class="chart-area">
        <h3>Tier 1 vs Tier 2 Comparison — All Antimalarials</h3>
        <div class="chart-placeholder">
          <svg viewBox="0 0 500 200">
            <line x1="50" y1="170" x2="480" y2="170" class="chart-grid-line"/>
            <text x="70" y="190" class="chart-label">Moroto RRH</text>
            <text x="190" y="190" class="chart-label">Rupa HC III</text>
            <text x="295" y="190" class="chart-label">Nadunget</text>
            <text x="405" y="190" class="chart-label">Katikekile</text>
            <rect x="80" y="80" width="25" height="90" fill="var(--light-teal)" class="chart-bar"/>
            <rect x="200" y="100" width="25" height="70" fill="var(--light-teal)" class="chart-bar"/>
            <rect x="310" y="110" width="25" height="60" fill="var(--light-teal)" class="chart-bar"/>
            <rect x="420" y="120" width="25" height="50" fill="var(--light-teal)" class="chart-bar"/>
            <rect x="110" y="70" width="25" height="100" fill="var(--accent-gold)" class="chart-bar"/>
            <rect x="230" y="90" width="25" height="80" fill="var(--accent-gold)" class="chart-bar"/>
            <rect x="340" y="100" width="25" height="70" fill="var(--accent-gold)" class="chart-bar"/>
            <rect x="450" y="115" width="25" height="55" fill="var(--accent-gold)" class="chart-bar"/>
            <text x="300" y="15" class="chart-label" fill="var(--light-teal)">Tier 1</text>
            <text x="370" y="15" class="chart-label" fill="var(--accent-gold)">Tier 2</text>
          </svg>
        </div>
        <div style="margin-top:10px;font-size:12px;color:var(--text-muted)">
          Average Tier 1/Tier 2 discrepancy: 14% — within acceptable range. No investigation flags.
        </div>
      </div>
    </div>
  `;
}

function renderRedistribution(el) {
  el.innerHTML = `
    <div class="chart-area">
      <h3>Redistribution Recommendations — Generated by Tier 2 Analysis</h3>
      <div style="margin-bottom:16px;font-size:13px;color:var(--text-muted)">Based on current stock levels, consumption trends, and storage capacity ratings across Moroto district.</div>
      <table class="data-table">
        <thead><tr><th>Commodity</th><th>From (Surplus)</th><th>To (At-Risk)</th><th>Qty</th><th>Urgency</th><th>Action</th></tr></thead>
        <tbody>
          <tr>
            <td>RDT Malaria</td><td>Moroto RRH (surplus: 180)</td><td>Katikekile HC II (5 days supply)</td>
            <td style="font-weight:600">80 tests</td><td><span class="risk-badge high">URGENT</span></td>
            <td><button class="btn-primary redist-btn" style="width:auto;padding:6px 14px;font-size:12px">Approve</button></td>
          </tr>
          <tr>
            <td>Inj. Artesunate</td><td>Moroto RRH (surplus: 42)</td><td>Rupa HC III (12 days supply)</td>
            <td style="font-weight:600">15 vials</td><td><span class="risk-badge high">URGENT</span></td>
            <td><button class="btn-primary redist-btn" style="width:auto;padding:6px 14px;font-size:12px">Approve</button></td>
          </tr>
          <tr>
            <td>Amoxicillin 250mg</td><td>Nadunget HC III (surplus: 120)</td><td>Katikekile HC II (18 days supply)</td>
            <td style="font-weight:600">60 caps</td><td><span class="risk-badge medium">MODERATE</span></td>
            <td><button class="btn-primary redist-btn" style="width:auto;padding:6px 14px;font-size:12px">Approve</button></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="chart-area">
      <h3>Redistribution Impact Estimate</h3>
      <div style="display:flex;gap:20px;justify-content:center;padding:20px;flex-wrap:wrap">
        <div style="text-align:center"><div style="font-size:28px;font-weight:700;color:var(--danger)">3</div><div style="font-size:12px;color:var(--text-muted)">Current stockouts</div></div>
        <div style="font-size:28px;color:var(--text-muted);padding-top:4px">&#8594;</div>
        <div style="text-align:center"><div style="font-size:28px;font-weight:700;color:var(--success)">1</div><div style="font-size:12px;color:var(--text-muted)">After redistribution</div></div>
        <div style="font-size:28px;color:var(--text-muted);padding-top:4px">=</div>
        <div style="text-align:center"><div style="font-size:28px;font-weight:700;color:var(--light-teal)">67%</div><div style="font-size:12px;color:var(--text-muted)">Reduction</div></div>
      </div>
    </div>
  `;

  el.querySelectorAll('.redist-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      showToast('Redistribution approved — dispatch notification sent');
      btn.textContent = 'Approved';
      btn.disabled = true;
      btn.style.background = 'var(--success)';
    });
  });
}

function renderOverrideLog(el) {
  const allOverrides = [
    ...OVERRIDES,
    { date: '28 Feb', user: 'Nurse Akello', item: 'Amoxicillin 250mg', from: 240, to: 180, reason: 'Storage constraint' },
    { date: '25 Feb', user: 'Dr. Lokwi P.', item: 'Paracetamol 500mg', from: 300, to: 450, reason: 'Increased OPD attendance' },
  ];
  el.innerHTML = `
    <div class="chart-area">
      <h3>Override Audit Log — Moroto District (All Facilities)</h3>
      <table class="data-table">
        <thead><tr><th>Date</th><th>Facility</th><th>User</th><th>Commodity</th><th>System Qty</th><th>Final Qty</th><th>Delta</th><th>Reason</th></tr></thead>
        <tbody>
          ${allOverrides.map(o => `<tr>
            <td>${o.date} 2026</td>
            <td>Moroto HC III</td>
            <td>${o.user}</td>
            <td>${o.item}</td>
            <td>${o.from}</td>
            <td style="font-weight:600">${o.to}</td>
            <td style="color:${o.to > o.from ? 'var(--success)' : 'var(--danger)'}">${o.to > o.from ? '+' : ''}${o.to - o.from}</td>
            <td>${o.reason}</td>
          </tr>`).join('')}
        </tbody>
      </table>
      <div style="margin-top:14px;display:flex;gap:24px;font-size:13px;color:var(--text-muted);flex-wrap:wrap">
        <span>Total overrides this month: <strong style="color:var(--navy)">6</strong></span>
        <span>Override rate: <strong style="color:var(--navy)">32%</strong></span>
        <span>Top reason: <strong style="color:var(--navy)">Outbreak (50%)</strong></span>
      </div>
    </div>
  `;
}
