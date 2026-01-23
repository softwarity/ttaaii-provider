import type { TableDefinition } from '../../types';

/**
 * Table D3: Level designator ii (when T1T2 = FA or UA)
 * Special ii designators for aviation forecasts and aircraft reports
 */
export const TABLE_D3: TableDefinition = {
  id: 'D3',
  name: 'Level designator ii (when T1T2 = FA or UA)',
  description: 'Aviation and aircraft report designators',
  entries: [
    // FA - Aviation area/advisories
    { code: '01', label: 'Aviation area/advisories', codeForm: 'FM 53 (ARFOR) [text]', metadata: { t1t2: 'FA', range: '01-49' } },
    { code: '50', label: 'GAMET', codeForm: '[TEXT]', metadata: { t1t2: 'FA', range: '50-59' } },
    // 60-99 Not assigned for FA

    // UA - Aircraft reports
    { code: '01', label: 'Routine aircraft reports', codeForm: 'ICAO AIREP', metadata: { t1t2: 'UA', range: '01-59' } },
    { code: '60', label: 'Special aircraft reports, except for volcanic ash', codeForm: 'ICAO AIREP', metadata: { t1t2: 'UA', range: '60-69' } },
    { code: '70', label: 'Special aircraft reports, related to volcanic ash', codeForm: 'ICAO AIREP', metadata: { t1t2: 'UA', range: '70-79' } },
    { code: '80', label: 'Routine aircraft reports (reserved)', codeForm: 'ICAO AIREP', metadata: { t1t2: 'UA', range: '80-99', reserved: true } },
  ]
};

/**
 * Get valid ii ranges for FA
 */
export function getValidIiRangesFA(): { start: number; end: number; label: string }[] {
  return [
    { start: 1, end: 49, label: 'Aviation area/advisories' },
    { start: 50, end: 59, label: 'GAMET' },
  ];
}

/**
 * Get valid ii ranges for UA
 */
export function getValidIiRangesUA(): { start: number; end: number; label: string }[] {
  return [
    { start: 1, end: 59, label: 'Routine aircraft reports' },
    { start: 60, end: 69, label: 'Special aircraft reports, except for volcanic ash' },
    { start: 70, end: 79, label: 'Special aircraft reports, related to volcanic ash' },
    { start: 80, end: 99, label: 'Routine aircraft reports (reserved)' },
  ];
}

/**
 * Generate all valid ii codes for FA
 */
export function generateFAiiCodes(): { code: string; label: string }[] {
  const codes: { code: string; label: string }[] = [];

  // 01-49: Aviation area/advisories
  for (let i = 1; i <= 49; i++) {
    codes.push({
      code: i.toString().padStart(2, '0'),
      label: `Aviation area/advisories (${i.toString().padStart(2, '0')})`
    });
  }

  // 50-59: GAMET
  for (let i = 50; i <= 59; i++) {
    codes.push({
      code: i.toString().padStart(2, '0'),
      label: `GAMET (${i.toString().padStart(2, '0')})`
    });
  }

  return codes;
}

/**
 * Generate all valid ii codes for UA
 */
export function generateUAiiCodes(): { code: string; label: string }[] {
  const codes: { code: string; label: string }[] = [];

  // 01-59: Routine aircraft reports
  for (let i = 1; i <= 59; i++) {
    codes.push({
      code: i.toString().padStart(2, '0'),
      label: `Routine aircraft reports (${i.toString().padStart(2, '0')})`
    });
  }

  // 60-69: Special aircraft reports, except for volcanic ash
  for (let i = 60; i <= 69; i++) {
    codes.push({
      code: i.toString().padStart(2, '0'),
      label: `Special aircraft reports (${i.toString().padStart(2, '0')})`
    });
  }

  // 70-79: Special aircraft reports, related to volcanic ash
  for (let i = 70; i <= 79; i++) {
    codes.push({
      code: i.toString().padStart(2, '0'),
      label: `Volcanic ash aircraft reports (${i.toString().padStart(2, '0')})`
    });
  }

  // 80-99: Reserved
  for (let i = 80; i <= 99; i++) {
    codes.push({
      code: i.toString().padStart(2, '0'),
      label: `Reserved (${i.toString().padStart(2, '0')})`
    });
  }

  return codes;
}
