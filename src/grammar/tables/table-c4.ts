import type { TableDefinition } from '../../types';

/**
 * Table C4: Reference time designator A2 (when T1 = D, G, H, J, O, P, or T)
 * Forecast hours from analysis time
 */
export const TABLE_C4: TableDefinition = {
  id: 'C4',
  name: 'Reference time designator A2',
  description: 'Forecast time ranges for grid/binary/satellite data',
  entries: [
    { code: 'A', label: 'Analysis (00 hour)', metadata: { hours: 0, type: 'analysis' } },
    { code: 'B', label: '6 hours forecast', metadata: { hours: 6, type: 'forecast' } },
    { code: 'C', label: '12 hours forecast', metadata: { hours: 12, type: 'forecast' } },
    { code: 'D', label: '18 hours forecast', metadata: { hours: 18, type: 'forecast' } },
    { code: 'E', label: '24 hours forecast', metadata: { hours: 24, type: 'forecast' } },
    { code: 'F', label: '30 hours forecast', metadata: { hours: 30, type: 'forecast' } },
    { code: 'G', label: '36 hours forecast', metadata: { hours: 36, type: 'forecast' } },
    { code: 'H', label: '42 hours forecast', metadata: { hours: 42, type: 'forecast' } },
    { code: 'I', label: '48 hours forecast', metadata: { hours: 48, type: 'forecast' } },
    { code: 'J', label: '60 hours forecast', metadata: { hours: 60, type: 'forecast' } },
    { code: 'K', label: '72 hours forecast', metadata: { hours: 72, type: 'forecast' } },
    { code: 'L', label: '84 hours forecast', metadata: { hours: 84, type: 'forecast' } },
    { code: 'M', label: '96 hours forecast', metadata: { hours: 96, type: 'forecast' } },
    { code: 'N', label: '108 hours forecast', metadata: { hours: 108, type: 'forecast' } },
    { code: 'O', label: '120 hours forecast (5 days)', metadata: { hours: 120, days: 5, type: 'forecast' } },
    { code: 'P', label: '132 hours forecast', metadata: { hours: 132, type: 'forecast' } },
    { code: 'Q', label: '144 hours forecast', metadata: { hours: 144, type: 'forecast' } },
    { code: 'R', label: '156 hours forecast (7 days)', metadata: { hours: 156, days: 7, type: 'forecast' } },
    { code: 'S', label: '168 hours forecast', metadata: { hours: 168, type: 'forecast' } },
    { code: 'T', label: '10 days forecast', metadata: { days: 10, type: 'forecast' } },
    { code: 'U', label: '15 days forecast', metadata: { days: 15, type: 'forecast' } },
    { code: 'V', label: '30 days forecast', metadata: { days: 30, type: 'forecast' } },
    // W...Z Not assigned
  ],
  groups: [
    { key: 'AN', label: 'Analysis', codes: ['A'] },
    { key: 'ST', label: 'Short-term (6-48h)', codes: ['B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'] },
    { key: 'MT', label: 'Medium-term (60h-7d)', codes: ['J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S'] },
    { key: 'LT', label: 'Long-term (10-30d)', codes: ['T', 'U', 'V'] },
  ]
};
