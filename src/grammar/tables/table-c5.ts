import type { TableDefinition } from '../../types';

/**
 * Table C5: Reference time designator A2 (when T1 = Q, X or Y)
 * Finer resolution forecast hours (3-hour intervals) for regional pictorial data
 */
export const TABLE_C5: TableDefinition = {
  id: 'C5',
  name: 'Reference time designator A2 (regional)',
  description: 'Forecast time ranges for regional pictorial data (3-hour intervals)',
  entries: [
    { code: 'A', label: 'Analysis (00 hour)', metadata: { hours: 0, type: 'analysis' } },
    { code: 'B', label: '3 hours forecast', metadata: { hours: 3, type: 'forecast' } },
    { code: 'C', label: '6 hours forecast', metadata: { hours: 6, type: 'forecast' } },
    { code: 'D', label: '9 hours forecast', metadata: { hours: 9, type: 'forecast' } },
    { code: 'E', label: '12 hours forecast', metadata: { hours: 12, type: 'forecast' } },
    { code: 'F', label: '15 hours forecast', metadata: { hours: 15, type: 'forecast' } },
    { code: 'G', label: '18 hours forecast', metadata: { hours: 18, type: 'forecast' } },
    { code: 'H', label: '21 hours forecast', metadata: { hours: 21, type: 'forecast' } },
    { code: 'I', label: '24 hours forecast', metadata: { hours: 24, type: 'forecast' } },
    { code: 'J', label: '27 hours forecast', metadata: { hours: 27, type: 'forecast' } },
    { code: 'K', label: '30 hours forecast', metadata: { hours: 30, type: 'forecast' } },
    { code: 'L', label: '33 hours forecast', metadata: { hours: 33, type: 'forecast' } },
    { code: 'M', label: '36 hours forecast', metadata: { hours: 36, type: 'forecast' } },
    { code: 'N', label: '39 hours forecast', metadata: { hours: 39, type: 'forecast' } },
    { code: 'O', label: '42 hours forecast', metadata: { hours: 42, type: 'forecast' } },
    { code: 'P', label: '45 hours forecast', metadata: { hours: 45, type: 'forecast' } },
    { code: 'Q', label: '48 hours forecast', metadata: { hours: 48, type: 'forecast' } },
  ],
  groups: [
    { key: 'AN', label: 'Analysis', codes: ['A'] },
    { key: 'D1', label: 'Day 1 (0-24h)', codes: ['B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'] },
    { key: 'D2', label: 'Day 2 (24-48h)', codes: ['J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q'] },
  ]
};
