import type { TableDefinition } from '../../types';

/**
 * Table B3: Data type designator T2 (when T1 = I or J)
 * Used for BUFR coded data
 */
export const TABLE_B3: TableDefinition = {
  id: 'B3',
  name: 'Data type designator T2 (when T1 = I or J)',
  description: 'T2 values for BUFR coded observational and forecast data',
  entries: [
    { code: 'N', label: 'Satellite data' },
    { code: 'O', label: 'Oceanographic/limnographic (water property)' },
    { code: 'P', label: 'Pictorial' },
    { code: 'S', label: 'Surface/sea level' },
    { code: 'T', label: 'Text (plain language information)' },
    { code: 'U', label: 'Upper-air data' },
    { code: 'X', label: 'Other data types' },
  ]
};
