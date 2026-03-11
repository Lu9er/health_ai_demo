import { showToast } from './utils.js';

export function showNationalTab(tab) {
  const el = document.getElementById('national-content');
  const renderers = {
    natoverview: renderOverview,
    regional: renderRegional,
    integration: renderIntegration,
    mlinsights: renderML,
  };
  if (renderers[tab]) renderers[tab](el);
}

function renderOverview(el) {
  el.innerHTML = `
    <div class="dash-grid">
      <div class="dash-stat"><div class="label">Pilot Facilities</div><div class="value">10</div><div class="change">Across 4 districts, 2 regions</div></div>
      <div class="dash-stat"><div class="label">National Stockout Rate</div><div class="value" style="color:var(--warning)">48%</div><div class="change up">Down from 68% baseline</div></div>
      <div class="dash-stat"><div class="label">Avg Sync Frequency</div><div class="value">3.8d</div><div class="change">Target: 7 days or less</div></div>
      <div class="dash-stat"><div class="label">ML Model Accuracy</div><div class="value" style="color:var(--success)">84%</div><div class="change">Tier 3 XGBoost — MAPE 16%</div></div>
    </div>
    <div class="chart-area">
      <h3>National Facility Map — Pilot Districts</h3>
      <div class="map-placeholder">
        <div class="map-region-outline" style="left:55%;top:10%;width:25%;height:40%"></div>
        <div class="map-region-outline" style="left:20%;top:50%;width:30%;height:35%"></div>
        <div class="map-label" style="left:60%;top:8%">KARAMOJA</div>
        <div class="map-label" style="left:22%;top:48%">SOUTHWESTERN</div>
        <div class="map-dot warn" style="left:65%;top:22%" title="Moroto RRH"></div>
        <div class="map-dot bad" style="left:70%;top:28%" title="Rupa HC III"></div>
        <div class="map-dot bad" style="left:62%;top:34%" title="Nadunget HC III"></div>
        <div class="map-dot bad" style="left:72%;top:38%" title="Katikekile HC II"></div>
        <div class="map-dot good" style="left:75%;top:42%" title="Amudat HC IV"></div>
        <div class="map-dot warn" style="left:78%;top:46%" title="Karita HC III"></div>
        <div class="map-dot good" style="left:30%;top:62%" title="Mbarara RRH"></div>
        <div class="map-dot warn" style="left:35%;top:72%" title="Nakivale Base"></div>
        <div class="map-dot good" style="left:28%;top:78%" title="Isingiro HC IV"></div>
        <div class="map-dot warn" style="left:38%;top:80%" title="Rugaaga HC III"></div>
        <div style="position:absolute;bottom:12px;right:12px;background:rgba(255,255,255,0.9);padding:8px 12px;border-radius:8px;font-size:11px">
          <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:var(--success);margin-right:4px"></span> Low risk
          <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:var(--warning);margin:0 4px 0 10px"></span> Medium
          <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:var(--danger);margin:0 4px 0 10px"></span> High risk
        </div>
      </div>
    </div>
    <div class="two-col">
      <div class="chart-area">
        <h3>Stockout Duration Trend — National (Pilot Sites)</h3>
        <div class="chart-placeholder">
          <svg viewBox="0 0 500 200">
            <line x1="50" y1="170" x2="480" y2="170" class="chart-grid-line"/>
            <line x1="50" y1="110" x2="480" y2="110" class="chart-grid-line" stroke-dasharray="4"/>
            <line x1="50" y1="50" x2="480" y2="50" class="chart-grid-line" stroke-dasharray="4"/>
            <text x="5" y="175" class="chart-label">0d</text>
            <text x="5" y="115" class="chart-label">60d</text>
            <text x="5" y="55" class="chart-label">120d</text>
            <path d="M 95 50 L 167 58 L 239 72 L 311 95 L 383 110 L 455 120" class="chart-line" stroke="var(--light-teal)"/>
            <path d="M 95 50 L 167 58 L 239 72 L 311 95 L 383 110 L 455 120 L 455 170 L 95 170 Z" fill="var(--light-teal)" class="chart-area-fill"/>
            <text x="5" y="15" class="chart-label" font-weight="600">Baseline: 120 days avg</text>
            <line x1="50" y1="50" x2="480" y2="50" stroke="var(--danger)" stroke-width="1" stroke-dasharray="4"/>
            <text x="360" y="45" class="chart-label" fill="var(--danger)">Baseline</text>
          </svg>
        </div>
      </div>
      <div class="chart-area">
        <h3>Emergency Procurement Frequency</h3>
        <div class="chart-placeholder">
          <svg viewBox="0 0 500 200">
            <line x1="50" y1="170" x2="480" y2="170" class="chart-grid-line"/>
            <rect x="80" y="50" width="50" height="120" fill="var(--accent)" class="chart-bar" opacity="0.3"/>
            <rect x="80" y="95" width="50" height="75" fill="var(--accent)" class="chart-bar"/>
            <rect x="180" y="65" width="50" height="105" fill="var(--accent)" class="chart-bar" opacity="0.3"/>
            <rect x="180" y="110" width="50" height="60" fill="var(--accent)" class="chart-bar"/>
            <rect x="280" y="80" width="50" height="90" fill="var(--accent)" class="chart-bar" opacity="0.3"/>
            <rect x="280" y="120" width="50" height="50" fill="var(--accent)" class="chart-bar"/>
            <rect x="380" y="90" width="50" height="80" fill="var(--accent)" class="chart-bar" opacity="0.3"/>
            <rect x="380" y="130" width="50" height="40" fill="var(--accent)" class="chart-bar"/>
            <text x="80" y="190" class="chart-label">Moroto</text>
            <text x="180" y="190" class="chart-label">Amudat</text>
            <text x="280" y="190" class="chart-label">Mbarara</text>
            <text x="385" y="190" class="chart-label">Isingiro</text>
            <text x="200" y="15" class="chart-label">Baseline</text>
            <text x="300" y="15" class="chart-label" fill="var(--accent)">Current</text>
          </svg>
        </div>
      </div>
    </div>
  `;
}

function renderRegional(el) {
  el.innerHTML = `
    <div class="chart-area">
      <h3>Regional Comparison — Karamoja vs Southwestern</h3>
      <table class="data-table">
        <thead><tr><th>Metric</th><th>Karamoja (Moroto, Amudat)</th><th>Southwestern (Mbarara, Isingiro)</th><th>Gap</th></tr></thead>
        <tbody>
          <tr><td>Facilities in pilot</td><td>6</td><td>4</td><td>—</td></tr>
          <tr><td>Avg stockout rate</td><td style="color:var(--danger)">58%</td><td style="color:var(--warning)">35%</td><td>23pp</td></tr>
          <tr><td>Avg sync frequency</td><td>5.2 days</td><td>2.3 days</td><td>2.9d</td></tr>
          <tr><td>Storage adequacy</td><td style="color:var(--danger)">17% adequate</td><td style="color:var(--warning)">50% adequate</td><td>33pp</td></tr>
          <tr><td>Override rate</td><td>38%</td><td>24%</td><td>14pp</td></tr>
          <tr><td>Avg connectivity</td><td>Intermittent (2G)</td><td>Moderate (3G)</td><td>—</td></tr>
          <tr><td>Road access (rainy season)</td><td style="color:var(--danger)">57% impassable</td><td style="color:var(--warning)">20% impassable</td><td>37pp</td></tr>
        </tbody>
      </table>
      <div style="margin-top:12px;font-size:13px;color:var(--text-muted);border-left:3px solid var(--accent-gold);padding-left:12px">
        Karamoja's higher override rate and lower sync frequency reflect infrastructure reality, not user disengagement. The framework is designed to handle this gracefully through offline-first architecture and storage-capped forecasting.
      </div>
    </div>
  `;
}

function renderIntegration(el) {
  el.innerHTML = `
    <div class="chart-area">
      <h3>National System Integration Status</h3>
      <div class="integration-row">
        <div class="integration-icon" style="background:#2196F3">D2</div>
        <div><div style="font-weight:600;font-size:14px">DHIS2</div><div style="font-size:12px;color:var(--text-muted)">Health facility reporting · Disease surveillance · Consumption data</div></div>
        <div class="int-status"><span class="int-dot connected"></span><span style="font-size:12px;color:var(--success)">Level 2 — Opportunistic Sync</span></div>
      </div>
      <div class="integration-row">
        <div class="integration-icon" style="background:#4CAF50">eL</div>
        <div><div style="font-weight:600;font-size:14px">eLMIS</div><div style="font-size:12px;color:var(--text-muted)">Logistics management · Stock tracking · Order processing</div></div>
        <div class="int-status"><span class="int-dot connected"></span><span style="font-size:12px;color:var(--success)">Level 2 — Opportunistic Sync</span></div>
      </div>
      <div class="integration-row">
        <div class="integration-icon" style="background:#FF9800">eA</div>
        <div><div style="font-weight:600;font-size:14px">eAFYA</div><div style="font-size:12px;color:var(--text-muted)">Health worker registry · Service volume data · Demand proxy</div></div>
        <div class="int-status"><span class="int-dot connected"></span><span style="font-size:12px;color:var(--success)">Level 2 — Opportunistic Sync</span></div>
      </div>
      <div class="integration-row">
        <div class="integration-icon" style="background:#F44336">WF</div>
        <div><div style="font-weight:600;font-size:14px">WFP LESS</div><div style="font-size:12px;color:var(--text-muted)">Last-mile logistics · Delivery tracking · Transport status</div></div>
        <div class="int-status"><span class="int-dot connected"></span><span style="font-size:12px;color:var(--success)">Level 2 — Opportunistic Sync</span></div>
      </div>
      <div class="integration-row">
        <div class="integration-icon" style="background:#9C27B0">CS</div>
        <div><div style="font-weight:600;font-size:14px">CSSP</div><div style="font-size:12px;color:var(--text-muted)">Client Self-Service Portal · Reporting interface</div></div>
        <div class="int-status"><span class="int-dot connected"></span><span style="font-size:12px;color:var(--success)">Level 2 — Opportunistic Sync</span></div>
      </div>
    </div>
    <div class="chart-area">
      <h3>Integration Architecture</h3>
      <div style="padding:20px;text-align:center">
        <div style="display:flex;justify-content:center;gap:40px;align-items:center;flex-wrap:wrap">
          <div style="padding:16px 24px;background:linear-gradient(135deg,var(--light-teal),var(--teal));color:#fff;border-radius:12px;font-weight:600">Facility App<br><span style="font-size:11px;opacity:0.8">SQLite · Tier 1</span></div>
          <div style="font-size:24px;color:var(--text-muted)">&#10230;</div>
          <div style="padding:16px 24px;background:linear-gradient(135deg,var(--deep-blue),var(--navy));color:#fff;border-radius:12px;font-weight:600">District Server<br><span style="font-size:11px;opacity:0.8">PostgreSQL · Tier 2</span></div>
          <div style="font-size:24px;color:var(--text-muted)">&#10230;</div>
          <div style="padding:16px 24px;background:linear-gradient(135deg,var(--accent),#c44536);color:#fff;border-radius:12px;font-weight:600">Central Hub<br><span style="font-size:11px;opacity:0.8">Warehouse · Tier 3 ML</span></div>
        </div>
        <div style="margin-top:16px;display:flex;justify-content:center;gap:16px;flex-wrap:wrap">
          <div style="padding:8px 14px;background:#E3F2FD;border-radius:8px;font-size:12px">DHIS2</div>
          <div style="padding:8px 14px;background:#E8F5E9;border-radius:8px;font-size:12px">eLMIS</div>
          <div style="padding:8px 14px;background:#FFF3E0;border-radius:8px;font-size:12px">eAFYA</div>
          <div style="padding:8px 14px;background:#FFEBEE;border-radius:8px;font-size:12px">WFP LESS</div>
          <div style="padding:8px 14px;background:#F3E5F5;border-radius:8px;font-size:12px">CSSP</div>
        </div>
        <div style="margin-top:8px;font-size:12px;color:var(--text-muted)">All integrations at Level 2 maturity — JSON/REST APIs · FHIR-compliant where supported · No hard dependencies</div>
      </div>
    </div>
  `;
}

function renderML(el) {
  const features = [
    { name: 'Storage capacity rating', val: 0.28 },
    { name: '3-month consumption trend', val: 0.22 },
    { name: 'Days since last delivery', val: 0.18 },
    { name: 'Seasonal multiplier', val: 0.14 },
    { name: 'Facility type', val: 0.10 },
    { name: 'Road accessibility score', val: 0.08 },
  ];

  el.innerHTML = `
    <div class="two-col">
      <div class="chart-area">
        <h3>Tier 3 ML — Stockout Risk Predictions</h3>
        <div style="margin-bottom:12px"><span class="tier-badge t3">Tier 3 — XGBoost / Random Forest</span></div>
        <table class="data-table">
          <thead><tr><th>Facility</th><th>Risk Score</th><th>Top Risk Factor</th><th>Predicted In</th></tr></thead>
          <tbody>
            <tr><td>Katikekile HC II</td><td><span class="risk-badge high">0.89</span></td><td>Storage capacity + low sync</td><td>5 days</td></tr>
            <tr><td>Rupa HC III</td><td><span class="risk-badge high">0.76</span></td><td>Consumption spike (malaria)</td><td>8 days</td></tr>
            <tr><td>Rugaaga HC III</td><td><span class="risk-badge medium">0.52</span></td><td>Delivery delay risk (roads)</td><td>14 days</td></tr>
            <tr><td>Karita HC III</td><td><span class="risk-badge medium">0.48</span></td><td>Low buffer stock</td><td>18 days</td></tr>
            <tr><td>Nakivale Base</td><td><span class="risk-badge medium">0.41</span></td><td>Population influx</td><td>21 days</td></tr>
            <tr><td>Nadunget HC III</td><td><span class="risk-badge low">0.28</span></td><td>—</td><td>—</td></tr>
            <tr><td>Moroto RRH</td><td><span class="risk-badge low">0.15</span></td><td>—</td><td>—</td></tr>
            <tr><td>Mbarara RRH</td><td><span class="risk-badge low">0.08</span></td><td>—</td><td>—</td></tr>
          </tbody>
        </table>
      </div>
      <div class="chart-area">
        <h3>ML Model Performance</h3>
        <div style="padding:20px">
          <div style="display:flex;gap:16px;margin-bottom:20px">
            <div style="flex:1;text-align:center;padding:14px;background:var(--bg);border-radius:10px">
              <div style="font-size:24px;font-weight:700;color:var(--navy)">84%</div>
              <div style="font-size:11px;color:var(--text-muted)">Accuracy (F1)</div>
            </div>
            <div style="flex:1;text-align:center;padding:14px;background:var(--bg);border-radius:10px">
              <div style="font-size:24px;font-weight:700;color:var(--navy)">16%</div>
              <div style="font-size:11px;color:var(--text-muted)">MAPE</div>
            </div>
            <div style="flex:1;text-align:center;padding:14px;background:var(--bg);border-radius:10px">
              <div style="font-size:24px;font-weight:700;color:var(--navy)">0.79</div>
              <div style="font-size:11px;color:var(--text-muted)">AUC-ROC</div>
            </div>
          </div>
          <div style="font-size:13px;font-weight:600;margin-bottom:8px">Feature Importance (XGBoost)</div>
          ${features.map(f => `
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">
              <div style="width:160px;font-size:12px">${f.name}</div>
              <div style="flex:1;height:14px;background:#E5E7EB;border-radius:4px;overflow:hidden">
                <div style="width:${f.val * 100 * 3}%;height:100%;background:var(--teal);border-radius:4px;transition:width 0.6s ease"></div>
              </div>
              <div style="width:36px;font-size:12px;text-align:right;font-weight:600">${(f.val * 100).toFixed(0)}%</div>
            </div>
          `).join('')}
          <div style="margin-top:14px;font-size:12px;color:var(--text-muted);border-left:3px solid var(--teal);padding-left:10px">
            Storage capacity is the strongest predictor — consistent with baseline finding (r = -0.695). Model retrains monthly on synced data from all pilot facilities.
          </div>
        </div>
      </div>
    </div>
    <div class="chart-area">
      <h3>External Data Sources Feeding Tier 3</h3>
      <div style="display:flex;gap:16px;flex-wrap:wrap;padding:10px">
        <div style="flex:1;min-width:200px;padding:14px;background:var(--bg);border-radius:10px">
          <div style="font-weight:600;font-size:13px">DHIS2 Surveillance</div>
          <div style="font-size:12px;color:var(--text-muted);margin-top:4px">Malaria case counts, disease outbreak alerts, facility reporting completeness</div>
        </div>
        <div style="flex:1;min-width:200px;padding:14px;background:var(--bg);border-radius:10px">
          <div style="font-weight:600;font-size:13px">Climate / Seasonal</div>
          <div style="font-size:12px;color:var(--text-muted);margin-top:4px">Rainfall patterns, rainy season multipliers (Apr–Jun, Oct–Dec)</div>
        </div>
        <div style="flex:1;min-width:200px;padding:14px;background:var(--bg);border-radius:10px">
          <div style="font-weight:600;font-size:13px">Facility Infrastructure</div>
          <div style="font-size:12px;color:var(--text-muted);margin-top:4px">Storage ratings, power reliability, device status from baseline</div>
        </div>
        <div style="flex:1;min-width:200px;padding:14px;background:var(--bg);border-radius:10px">
          <div style="font-weight:600;font-size:13px">Logistics (WFP LESS)</div>
          <div style="font-size:12px;color:var(--text-muted);margin-top:4px">Delivery lead times, road accessibility, transport schedules</div>
        </div>
      </div>
    </div>
  `;
}
