import type { TableDefinition } from '../../types';

/**
 * Table B4: Data type designator T2 (when T1 = O)
 * Used for Oceanographic information (GRIB)
 */
export const TABLE_B4: TableDefinition = {
  id: 'B4',
  name: 'Data type designator T2 (when T1 = O)',
  description: 'T2 values for oceanographic GRIB products',
  entries: [
    { code: 'D', label: 'Depth' },
    { code: 'E', label: 'Ice concentration' },
    { code: 'F', label: 'Ice thickness' },
    { code: 'G', label: 'Ice drift' },
    { code: 'H', label: 'Ice growth' },
    { code: 'I', label: 'Ice convergence/divergence' },
    { code: 'Q', label: 'Temperature anomaly' },
    { code: 'R', label: 'Depth anomaly' },
    { code: 'S', label: 'Salinity' },
    { code: 'T', label: 'Temperature' },
    { code: 'U', label: 'Current component' },
    { code: 'V', label: 'Current component' },
    { code: 'W', label: 'Temperature warming' },
    { code: 'X', label: 'Mixed data' },
  ]
};
