export const FACILITIES = [
  { name: 'Moroto RRH', type: 'RRH', district: 'Moroto', storage: 'adequate', syncDays: 1, stockouts: 1 },
  { name: 'Rupa HC III', type: 'HC III', district: 'Moroto', storage: 'inadequate', syncDays: 4, stockouts: 3 },
  { name: 'Nadunget HC III', type: 'HC III', district: 'Moroto', storage: 'inadequate', syncDays: 7, stockouts: 2 },
  { name: 'Katikekile HC II', type: 'HC II', district: 'Moroto', storage: 'inadequate', syncDays: 12, stockouts: 4 },
  { name: 'Amudat HC IV', type: 'HC IV', district: 'Amudat', storage: 'adequate', syncDays: 2, stockouts: 1 },
  { name: 'Karita HC III', type: 'HC III', district: 'Amudat', storage: 'inadequate', syncDays: 6, stockouts: 3 },
  { name: 'Mbarara RRH', type: 'RRH', district: 'Mbarara', storage: 'adequate', syncDays: 0, stockouts: 0 },
  { name: 'Nakivale Base', type: 'Base Camp', district: 'Isingiro', storage: 'inadequate', syncDays: 3, stockouts: 2 },
  { name: 'Isingiro HC IV', type: 'HC IV', district: 'Isingiro', storage: 'adequate', syncDays: 1, stockouts: 1 },
  { name: 'Rugaaga HC III', type: 'HC III', district: 'Isingiro', storage: 'inadequate', syncDays: 5, stockouts: 2 },
];

export const COMMODITIES = [
  { name: 'Coartem 20/120mg', code: 'ACT-001', category: 'Antimalarial', stock: 420, max: 1000, consumption: 180, unit: 'tablets' },
  { name: 'Amoxicillin 250mg', code: 'AB-012', category: 'Antibiotic', stock: 85, max: 500, consumption: 120, unit: 'capsules' },
  { name: 'ORS Sachets', code: 'ORS-001', category: 'ORS/Zinc', stock: 200, max: 600, consumption: 90, unit: 'sachets' },
  { name: 'Paracetamol 500mg', code: 'AN-003', category: 'Analgesic', stock: 650, max: 800, consumption: 150, unit: 'tablets' },
  { name: 'RDT Malaria', code: 'DX-005', category: 'Diagnostics', stock: 30, max: 400, consumption: 160, unit: 'tests' },
  { name: 'Injectable Artesunate', code: 'ACT-003', category: 'Antimalarial', stock: 15, max: 100, consumption: 25, unit: 'vials' },
  { name: 'Zinc 20mg', code: 'ORS-002', category: 'ORS/Zinc', stock: 340, max: 500, consumption: 70, unit: 'tablets' },
  { name: 'Cotrimoxazole', code: 'AB-008', category: 'Antibiotic', stock: 180, max: 400, consumption: 95, unit: 'tablets' },
];

export const OVERRIDES = [
  { date: '10 Mar', user: 'Sr. Apio M.', item: 'Coartem 20/120mg', from: 540, to: 720, reason: 'Outbreak — malaria cases rising' },
  { date: '08 Mar', user: 'Sr. Apio M.', item: 'RDT Malaria', from: 320, to: 400, reason: 'Outbreak — need more test kits' },
  { date: '05 Mar', user: 'Sr. Apio M.', item: 'ORS Sachets', from: 270, to: 180, reason: 'Storage constraint — shelf space limited' },
  { date: '01 Mar', user: 'Dr. Lokwi P.', item: 'Inj. Artesunate', from: 50, to: 75, reason: 'Severe malaria admissions up' },
];
