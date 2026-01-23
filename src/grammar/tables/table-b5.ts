import type { TableDefinition } from '../../types';

/**
 * Table B5: Data type designator T2 (when T1 = E)
 * Used for Satellite imagery
 */
export const TABLE_B5: TableDefinition = {
  id: 'B5',
  name: 'Data type designator T2 (when T1 = E)',
  description: 'T2 values for satellite imagery',
  entries: [
    { code: 'C', label: 'Cloud top temperature' },
    { code: 'F', label: 'Fog' },
    { code: 'I', label: 'Infrared' },
    { code: 'S', label: 'Surface temperature' },
    { code: 'V', label: 'Visible' },
    { code: 'W', label: 'Water vapour' },
    { code: 'Y', label: 'User specified' },
    { code: 'Z', label: 'Unspecified' },
  ]
};
