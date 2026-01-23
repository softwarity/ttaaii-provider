import type { TableDefinition } from '../../types';

/**
 * Table D1: Level designator ii (when T1 = O)
 * Ocean depths in metres for oceanographic GRIB products
 */
export const TABLE_D1: TableDefinition = {
  id: 'D1',
  name: 'Level designator ii (when T1 = O)',
  description: 'Ocean depth levels in metres',
  entries: [
    { code: '98', label: 'Surface', metadata: { depth: 0 } },
    { code: '96', label: '2.5 m', metadata: { depth: 2.5 } },
    { code: '94', label: '5.0 m', metadata: { depth: 5 } },
    { code: '92', label: '7.5 m', metadata: { depth: 7.5 } },
    { code: '90', label: '12.5 m', metadata: { depth: 12.5 } },
    { code: '88', label: '17.5 m', metadata: { depth: 17.5 } },
    { code: '86', label: '25.0 m', metadata: { depth: 25 } },
    { code: '84', label: '32.5 m', metadata: { depth: 32.5 } },
    { code: '82', label: '40.0 m', metadata: { depth: 40 } },
    { code: '80', label: '50.0 m', metadata: { depth: 50 } },
    { code: '78', label: '62.5 m', metadata: { depth: 62.5 } },
    { code: '76', label: '75.0 m', metadata: { depth: 75 } },
    { code: '74', label: '100 m', metadata: { depth: 100 } },
    { code: '72', label: '125 m', metadata: { depth: 125 } },
    { code: '70', label: '150 m', metadata: { depth: 150 } },
    { code: '68', label: '200 m', metadata: { depth: 200 } },
    { code: '66', label: '300 m', metadata: { depth: 300 } },
    { code: '64', label: '400 m', metadata: { depth: 400 } },
    { code: '62', label: '500 m', metadata: { depth: 500 } },
    { code: '60', label: '600 m', metadata: { depth: 600 } },
    { code: '58', label: '700 m', metadata: { depth: 700 } },
    { code: '56', label: '800 m', metadata: { depth: 800 } },
    { code: '54', label: '900 m', metadata: { depth: 900 } },
    { code: '52', label: '1000 m', metadata: { depth: 1000 } },
    { code: '50', label: '1100 m', metadata: { depth: 1100 } },
    { code: '48', label: '1200 m', metadata: { depth: 1200 } },
    { code: '46', label: '1300 m', metadata: { depth: 1300 } },
    { code: '44', label: '1400 m', metadata: { depth: 1400 } },
    { code: '42', label: '1500 m', metadata: { depth: 1500 } },
    { code: '40', label: '1750 m', metadata: { depth: 1750 } },
    { code: '38', label: '2000 m', metadata: { depth: 2000 } },
    { code: '36', label: '2500 m', metadata: { depth: 2500 } },
    { code: '34', label: '3000 m', metadata: { depth: 3000 } },
    { code: '32', label: '4000 m', metadata: { depth: 4000 } },
    { code: '30', label: '5000 m', metadata: { depth: 5000 } },
    { code: '01', label: 'Primary layer depth', metadata: { special: true } },
  ],
  groups: [
    { key: 'SH', label: 'Shallow (0-100m)', codes: ['98', '96', '94', '92', '90', '88', '86', '84', '82', '80', '78', '76', '74'] },
    { key: 'MD', label: 'Medium (100-500m)', codes: ['72', '70', '68', '66', '64', '62'] },
    { key: 'DP', label: 'Deep (500-5000m)', codes: ['60', '58', '56', '54', '52', '50', '48', '46', '44', '42', '40', '38', '36', '34', '32', '30'] },
    { key: 'SP', label: 'Special', codes: ['01'] },
  ]
};
