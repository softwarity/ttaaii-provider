import type { TableDefinition } from '../../types';

/**
 * Table B2: Data type designator T2 (when T1 = D, G, H, X or Y)
 * Used for Grid point information and related data types
 */
export const TABLE_B2: TableDefinition = {
  id: 'B2',
  name: 'Data type designator T2 (when T1 = D, G, H, X or Y)',
  description: 'T2 values for grid point and related data',
  entries: [
    { code: 'A', label: 'Radar data' },
    { code: 'B', label: 'Cloud' },
    { code: 'C', label: 'Vorticity' },
    { code: 'D', label: 'Thickness (relative topography)' },
    { code: 'E', label: 'Precipitation' },
    { code: 'G', label: 'Divergence' },
    { code: 'H', label: 'Height' },
    { code: 'J', label: 'Wave height + combinations' },
    { code: 'K', label: 'Swell height + combinations' },
    { code: 'M', label: 'For national use', metadata: { national: true } },
    { code: 'N', label: 'Radiation' },
    { code: 'O', label: 'Vertical velocity' },
    { code: 'P', label: 'Pressure' },
    { code: 'Q', label: 'Wet bulb potential temperature' },
    { code: 'R', label: 'Relative humidity' },
    { code: 'T', label: 'Temperature' },
    { code: 'U', label: 'Eastward wind component' },
    { code: 'V', label: 'Northward wind component' },
    { code: 'W', label: 'Wind' },
    { code: 'Z', label: 'Not assigned' },
  ]
};
