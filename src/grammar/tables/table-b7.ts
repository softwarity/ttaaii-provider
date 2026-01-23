import type { TableDefinition } from '../../types';

/**
 * Table B7: Data type designator T2 (when T1 = L)
 * Used for Aviation information in XML (IWXXM FM-205)
 */
export const TABLE_B7: TableDefinition = {
  id: 'B7',
  name: 'Data type designator T2 (when T1 = L)',
  description: 'T2 values for aviation XML information (IWXXM)',
  entries: [
    { code: 'A', label: 'Aviation routine reports ("METAR")', priority: 2 },
    { code: 'C', label: 'Aerodrome Forecast ("TAF") (VT < 12 hours)', priority: 3 },
    { code: 'K', label: 'Tropical cyclone advisories', priority: 3 },
    { code: 'N', label: 'Space weather advisories', priority: 3 },
    { code: 'P', label: 'Special aviation weather reports ("SPECI")', priority: 2 },
    { code: 'S', label: 'Aviation general warning ("SIGMET")', priority: 1 },
    { code: 'T', label: 'Aerodrome forecast ("TAF") (VT >= 12 hours)', priority: 3 },
    { code: 'U', label: 'Volcanic ash advisory', priority: 3 },
    { code: 'V', label: 'Aviation volcanic ash warning ("SIGMET")', priority: 1 },
    { code: 'W', label: 'AIRMET', priority: 1 },
    { code: 'Y', label: 'Aviation tropical cyclone warning ("SIGMET")', priority: 1 },
  ]
};
