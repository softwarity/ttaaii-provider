import type { TableDefinition, TableEntry } from '../../types';

/**
 * Table B1: Data type designator T2 (when T1 = A, C, F, N, S, T, U or W)
 * Organized by T1 value for contextual lookup
 */

const T2_ANALYSES: TableEntry[] = [
  { code: 'C', label: 'Cyclone', codeForm: '[TEXT]' },
  { code: 'G', label: 'Hydrological/marine', codeForm: '[TEXT]' },
  { code: 'H', label: 'Thickness', codeForm: '[TEXT]' },
  { code: 'I', label: 'Ice', codeForm: 'FM 44 (ICEAN)' },
  { code: 'O', label: 'Ozone layer', codeForm: '[TEXT]' },
  { code: 'R', label: 'Radar', codeForm: '[TEXT]' },
  { code: 'S', label: 'Surface', codeForm: 'FM 45 (IAC)/FM 46 (IAC FLEET)' },
  { code: 'U', label: 'Upper air', codeForm: 'FM 45 (IAC)' },
  { code: 'W', label: 'Weather summary', codeForm: '[TEXT]' },
  { code: 'X', label: 'Miscellaneous', codeForm: '[TEXT]' },
];

const T2_CLIMATIC: TableEntry[] = [
  { code: 'A', label: 'Climatic anomalies', codeForm: '[TEXT]' },
  { code: 'E', label: 'Monthly means (upper air)', codeForm: 'FM 76 (SHIP)' },
  { code: 'H', label: 'Monthly means (surface)', codeForm: 'FM 72 (CLIMAT SHIP)' },
  { code: 'O', label: 'Monthly means (ocean areas)', codeForm: 'FM 73 (NACLI, CLINP, SPCLI, CLISA, INCLI)' },
  { code: 'S', label: 'Monthly means (surface)', codeForm: 'FM 71 (CLIMAT)' },
];

const T2_FORECASTS: TableEntry[] = [
  { code: 'A', label: 'Aviation area/GAMET/advisories', codeForm: 'FM 53 (ARFOR)/[TEXT]' },
  { code: 'B', label: 'Upper winds and temperatures', codeForm: 'FM 50 (WINTEM)' },
  { code: 'C', label: 'Aerodrome (VT < 12 hours)', codeForm: 'FM 51 (TAF)' },
  { code: 'D', label: 'Radiological trajectory dose', codeForm: 'FM 57 (RADOF)' },
  { code: 'E', label: 'Extended', codeForm: '[TEXT]' },
  { code: 'F', label: 'Shipping', codeForm: 'FM 46 (IAC FLEET)' },
  { code: 'G', label: 'Hydrological', codeForm: 'FM 68 (HYFOR)' },
  { code: 'H', label: 'Upper-air thickness', codeForm: '[TEXT]' },
  { code: 'I', label: 'Iceberg', codeForm: '[TEXT]' },
  { code: 'J', label: 'Radio warning service (including IUWDS data)', codeForm: '[TEXT]' },
  { code: 'K', label: 'Tropical cyclone advisories', codeForm: '[TEXT]' },
  { code: 'L', label: 'Local/area', codeForm: '[TEXT]' },
  { code: 'M', label: 'Temperature extremes', codeForm: '[TEXT]' },
  { code: 'N', label: 'Space weather advisories', codeForm: '[TEXT]' },
  { code: 'O', label: 'Guidance', codeForm: '[TEXT]' },
  { code: 'P', label: 'Public', codeForm: '[TEXT]' },
  { code: 'Q', label: 'Other shipping', codeForm: '[TEXT]' },
  { code: 'R', label: 'Aviation route', codeForm: 'FM 54 (ROFOR)' },
  { code: 'S', label: 'Surface', codeForm: 'FM 45 (IAC)/FM 46 (IAC FLEET)' },
  { code: 'T', label: 'Aerodrome (VT >= 12 hours)', codeForm: 'FM 51 (TAF)' },
  { code: 'U', label: 'Upper air', codeForm: 'FM 45 (IAC)' },
  { code: 'V', label: 'Volcanic ash advisories', codeForm: '[TEXT]' },
  { code: 'W', label: 'Winter sports', codeForm: '[TEXT]' },
  { code: 'X', label: 'Miscellaneous', codeForm: '[TEXT]' },
  { code: 'Z', label: 'Shipping area', codeForm: 'FM 61 (MAFOR)' },
];

const T2_NOTICES: TableEntry[] = [
  { code: 'G', label: 'Hydrological', codeForm: '[TEXT]' },
  { code: 'H', label: 'Marine', codeForm: '[TEXT]' },
  { code: 'N', label: 'Nuclear emergency response', codeForm: '[TEXT]' },
  { code: 'O', label: 'METNO/WIFMA', codeForm: '[TEXT]' },
  { code: 'P', label: 'Product generation delay', codeForm: '[TEXT]' },
  { code: 'T', label: 'TEST MSG [System related]', codeForm: '[TEXT]' },
  { code: 'W', label: 'Warning related and/or cancellation', codeForm: '[TEXT]' },
];

const T2_SURFACE: TableEntry[] = [
  { code: 'A', label: 'Aviation routine reports', codeForm: 'FM 15 (METAR)' },
  { code: 'B', label: 'Radar reports (Part A)', codeForm: 'FM 20 (RADOB)' },
  { code: 'C', label: 'Radar reports (Part B)', codeForm: 'FM 20 (RADOB)' },
  { code: 'D', label: 'Radar reports (Parts A & B)', codeForm: 'FM 20 (RADOB)' },
  { code: 'E', label: 'Seismic data', codeForm: '(SEISMIC)' },
  { code: 'F', label: 'Atmospherics reports', codeForm: 'FM 81 (SFAZI)/FM 82 (SFLOC)/FM 83 (SFAZU)' },
  { code: 'G', label: 'Radiological data report', codeForm: 'FM 22 (RADREP)' },
  { code: 'H', label: 'Reports from DCP stations', codeForm: '(any format)' },
  { code: 'I', label: 'Intermediate synoptic hour', codeForm: 'FM 12 (SYNOP)/FM 13 (SHIP)' },
  // L is not assigned
  { code: 'M', label: 'Main synoptic hour', codeForm: 'FM 12 (SYNOP)/FM 13 (SHIP)' },
  { code: 'N', label: 'Non-standard synoptic hour', codeForm: 'FM 12 (SYNOP)/FM 13 (SHIP)' },
  { code: 'O', label: 'Oceanographic data', codeForm: 'FM 63 (BATHY)/FM 64 (TESAC)/FM 62 (TRACKOB)' },
  { code: 'P', label: 'Special aviation weather reports', codeForm: 'FM 16 (SPECI)' },
  { code: 'R', label: 'Hydrological (river) reports', codeForm: 'FM 67 (HYDRA)' },
  { code: 'S', label: 'Drifting buoy reports', codeForm: 'FM 18 (DRIFTER)' },
  { code: 'T', label: 'Sea ice', codeForm: '[TEXT]' },
  { code: 'U', label: 'Snow depth', codeForm: '[TEXT]' },
  { code: 'V', label: 'Lake ice', codeForm: '[TEXT]' },
  { code: 'W', label: 'Wave information', codeForm: 'FM 65 (WAVEOB)' },
  { code: 'X', label: 'Miscellaneous', codeForm: '[TEXT]' },
  { code: 'Y', label: 'Seismic waveform data', codeForm: '(any format)' },
  { code: 'Z', label: 'Sea-level data and deep-ocean tsunami data', codeForm: '(any alphanumeric format)' },
];

const T2_SATELLITE: TableEntry[] = [
  { code: 'B', label: 'Satellite orbit parameters', codeForm: '[TEXT]' },
  { code: 'C', label: 'Satellite cloud interpretations', codeForm: 'FM 85 (SAREP)' },
  { code: 'H', label: 'Satellite remote upper-air soundings', codeForm: 'FM 86 (SATEM)' },
  { code: 'R', label: 'Clear radiance observations', codeForm: 'FM 87 (SARAD)' },
  { code: 'T', label: 'Sea surface temperatures', codeForm: 'FM 88 (SATOB)' },
  { code: 'W', label: 'Winds and cloud temperatures', codeForm: 'FM 88 (SATOB)' },
  { code: 'X', label: 'Miscellaneous', codeForm: '[TEXT]' },
];

const T2_UPPER_AIR: TableEntry[] = [
  { code: 'A', label: 'Aircraft reports', codeForm: 'FM 41 (CODAR), ICAO (AIREP)' },
  { code: 'D', label: 'Aircraft reports', codeForm: 'FM 42 (AMDAR)' },
  { code: 'E', label: 'Upper-level pressure, temperature, humidity and wind (Part D)', codeForm: 'FM 35 (TEMP)/FM 36 (TEMP SHIP)/FM 38 (TEMP MOBIL)' },
  { code: 'F', label: 'Upper-level pressure, temperature, humidity and wind (Parts C and D) [National and bilateral option]', codeForm: 'FM 35 (TEMP)/FM 36 (TEMP SHIP)/FM 38 (TEMP MOBIL)' },
  { code: 'G', label: 'Upper wind (Part B)', codeForm: 'FM 32 (PILOT)/FM 33 (PILOT SHIP)/FM 34 (TEMP MOBIL)' },
  { code: 'H', label: 'Upper wind (Part C)', codeForm: 'FM 32 (PILOT)/FM 33 (PILOT SHIP)/FM 34 (TEMP MOBIL)' },
  { code: 'I', label: 'Upper wind (Parts A and B) [National and bilateral option]', codeForm: 'FM 32 (PILOT)/FM 33 (PILOT SHIP)/FM 34 (TEMP MOBIL)' },
  { code: 'K', label: 'Upper-level pressure, temperature, humidity and wind (Part B)', codeForm: 'FM 35 (TEMP)/FM 36 (TEMP SHIP)/FM 38 (TEMP MOBIL)' },
  { code: 'L', label: 'Upper-level pressure, temperature, humidity and wind (Part C)', codeForm: 'FM 35 (TEMP)/FM 36 (TEMP SHIP)/FM 38 (TEMP MOBIL)' },
  { code: 'M', label: 'Upper-level pressure, temperature, humidity and wind (Parts A and B) [National and bilateral option]', codeForm: 'FM 35 (TEMP)/FM 36 (TEMP SHIP)/FM 38 (TEMP MOBIL)' },
  { code: 'N', label: 'Rocketsonde reports', codeForm: 'FM 39 (ROCOB)/FM 40 (ROCOB SHIP)' },
  { code: 'P', label: 'Upper wind (Part A)', codeForm: 'FM 32 (PILOT)/FM 33 (PILOT SHIP)/FM 34 (PILOT MOBIL)' },
  { code: 'Q', label: 'Upper wind (Part D)', codeForm: 'FM 32 (PILOT)/FM 33 (PILOT SHIP)/FM 34 (PILOT MOBIL)' },
  { code: 'R', label: 'Aircraft report', codeForm: '[NATIONAL] (RECCO)' },
  { code: 'S', label: 'Upper-level pressure, temperature, humidity and wind (Part A)', codeForm: 'FM 35 (TEMP)/FM 36 (PILOT SHIP)/FM 38 (TEMP MOBIL)' },
  { code: 'T', label: 'Aircraft report', codeForm: 'FM 41 (CODAR)' },
  { code: 'X', label: 'Miscellaneous', codeForm: '[TEXT]' },
  { code: 'Y', label: 'Upper wind (Parts C and D) [National and bilateral option]', codeForm: 'FM 32 (PILOT)/FM 33 (PILOT SHIP)/FM 34 (PILOT MOBIL)' },
  { code: 'Z', label: 'Upper-level pressure, temperature, humidity and wind from a sonde released by carrier balloon or aircraft (Parts A, B, C, D)', codeForm: 'FM 37 (TEMP DROP)' },
];

const T2_WARNINGS: TableEntry[] = [
  { code: 'A', label: 'AIRMET', codeForm: '[TEXT]' },
  { code: 'C', label: 'Tropical cyclone (SIGMET)', codeForm: '[TEXT]' },
  { code: 'E', label: 'Tsunami', codeForm: '[TEXT]' },
  { code: 'F', label: 'Tornado', codeForm: '[TEXT]' },
  { code: 'G', label: 'Hydrological/river flood', codeForm: '[TEXT]' },
  { code: 'H', label: 'Marine/coastal flood', codeForm: '[TEXT]' },
  { code: 'O', label: 'Other', codeForm: '[TEXT]' },
  { code: 'R', label: 'Humanitarian activities', codeForm: '(any format)' },
  { code: 'S', label: 'SIGMET', codeForm: '[TEXT]' },
  { code: 'T', label: 'Tropical cyclone (Typhoon/hurricane)', codeForm: '[TEXT]' },
  { code: 'U', label: 'Severe thunderstorm', codeForm: '[TEXT]' },
  { code: 'V', label: 'Volcanic ash clouds (SIGMET)', codeForm: '[TEXT]' },
  { code: 'W', label: 'Warnings and weather summary', codeForm: '[TEXT]' },
];

/**
 * Table B1 entries organized by T1 value
 */
export const TABLE_B1_BY_T1: Record<string, TableEntry[]> = {
  'A': T2_ANALYSES,
  'C': T2_CLIMATIC,
  'F': T2_FORECASTS,
  'N': T2_NOTICES,
  'S': T2_SURFACE,
  'T': T2_SATELLITE,
  'U': T2_UPPER_AIR,
  'W': T2_WARNINGS,
};

/**
 * Get Table B1 definition for a specific T1 value
 */
export function getTableB1(t1: string): TableDefinition | null {
  const entries = TABLE_B1_BY_T1[t1];
  if (!entries) return null;

  return {
    id: 'B1',
    name: `Data type designator T2 (when T1 = ${t1})`,
    description: `T2 values for ${t1} data type`,
    entries,
  };
}
