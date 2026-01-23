import type { TableDefinition } from '../../types';

/**
 * Table B6: Data type designator T2 (when T1 = P, Q)
 * Used for Pictorial information (Binary coded)
 */
export const TABLE_B6: TableDefinition = {
  id: 'B6',
  name: 'Data type designator T2 (when T1 = P, Q)',
  description: 'T2 values for pictorial information',
  entries: [
    { code: 'A', label: 'Radar data' },
    { code: 'B', label: 'Cloud' },
    { code: 'C', label: 'Clear air turbulence' },
    { code: 'D', label: 'Thickness (relative topography)' },
    { code: 'E', label: 'Precipitation' },
    { code: 'F', label: 'Aerological diagrams (Ash cloud)' },
    { code: 'G', label: 'Significant weather' },
    { code: 'H', label: 'Height' },
    { code: 'I', label: 'Ice flow' },
    { code: 'J', label: 'Wave height + combinations' },
    { code: 'K', label: 'Swell height + combinations' },
    { code: 'L', label: 'Plain language' },
    { code: 'M', label: 'For national use', metadata: { national: true } },
    { code: 'N', label: 'Radiation' },
    { code: 'O', label: 'Vertical velocity' },
    { code: 'P', label: 'Pressure' },
    { code: 'Q', label: 'Wet bulb potential temperature' },
    { code: 'R', label: 'Relative humidity' },
    { code: 'S', label: 'Snow cover' },
    { code: 'T', label: 'Temperature' },
    { code: 'U', label: 'Eastward wind component' },
    { code: 'V', label: 'Northward wind component' },
    { code: 'W', label: 'Wind' },
    { code: 'X', label: 'Lifted index' },
    { code: 'Y', label: 'Observational plotted chart' },
    { code: 'Z', label: 'Not assigned' },
  ]
};
