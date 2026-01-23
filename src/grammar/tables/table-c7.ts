import type { TableDefinition, TableEntry } from '../../types';

/**
 * Table C7: Data type designator T2 and A1 (when T1 = K)
 * CREX data - Combined T2 and A1 designators
 *
 * For CREX, both T2 and A1 are defined together based on data type
 */

// KF - Surface forecasts
const A1_KF: TableEntry[] = [
  { code: 'A', label: 'Surface area forecast (e.g. airways)' },
  { code: 'D', label: 'Radiological forecast', codeForm: 'RADOF' },
  { code: 'M', label: 'Surface forecasts (e.g. MOS)' },
  { code: 'O', label: 'Maritime forecast', codeForm: 'MAFOR' },
  { code: 'P', label: 'Forecast amendments (airways)' },
  { code: 'R', label: 'Hydrologic forecast', codeForm: 'HYFOR' },
  { code: 'S', label: 'Forecast amendments (TAF)' },
  { code: 'T', label: 'Aerodrome forecast (TAF)' },
  { code: 'X', label: 'Other surface forecasts' },
];

// KO - Oceanographic data
const A1_KO: TableEntry[] = [
  { code: 'B', label: 'Buoy observations', codeForm: 'BUOY', metadata: { category: '001/025' } },
  { code: 'I', label: 'Sea ice' },
  { code: 'P', label: 'Sub-surface profiling floats', codeForm: 'TESAC', metadata: { category: '031/004' } },
  { code: 'R', label: 'Sea surface observations', codeForm: 'TRACKOB', metadata: { category: '031/001' } },
  { code: 'S', label: 'Sea surface and below soundings', codeForm: 'BATHY, TESAC', metadata: { category: '031/005' } },
  { code: 'T', label: 'Sea surface temperature' },
  { code: 'W', label: 'Sea surface waves', codeForm: 'WAVEOB', metadata: { category: '031/002' } },
  { code: 'X', label: 'Other sea environmental', codeForm: 'WAVEOB', metadata: { category: '031/002' } },
];

// KP - Pictorial oceanographic data (forecasts)
const A1_KP: TableEntry[] = [
  { code: 'I', label: 'Sea ice' },
  { code: 'S', label: 'Sea surface and below soundings' },
  { code: 'T', label: 'Sea surface temperature' },
  { code: 'W', label: 'Sea surface waves' },
  { code: 'X', label: 'Other sea environmental' },
];

// KS - Surface data
const A1_KS: TableEntry[] = [
  { code: 'A', label: 'Observations from automatic land stations', metadata: { category: '000/006', iiRange: '01-29 routine, 30-59 N-minute' } },
  { code: 'B', label: 'Radar reports (parts A and B)', codeForm: 'RADOB', metadata: { category: '006/003' } },
  { code: 'C', label: 'Climatic observations', codeForm: 'CLIMAT', metadata: { category: '000/020' } },
  { code: 'D', label: 'Radiological observation', codeForm: 'RADREP', metadata: { category: '010/001' } },
  { code: 'E', label: 'Measurement of surface ozone', metadata: { category: '008/000' } },
  { code: 'F', label: 'Source of atmospherics', codeForm: 'SFAZI, SFLOC, SFAZU', metadata: { category: '000/030' } },
  { code: 'I', label: 'Intermediate synoptic observations', codeForm: 'SYNOP', metadata: { category: '000/001' } },
  { code: 'M', label: 'Main synoptic observations', codeForm: 'SYNOP', metadata: { category: '000/002' } },
  { code: 'N', label: 'Synoptic observations at non-standard time', codeForm: 'SYNOP', metadata: { category: '000/000' } },
  { code: 'R', label: 'Hydrologic reports', codeForm: 'HYDRA', metadata: { category: '000/040' } },
  { code: 'S', label: 'Synoptic observations from marine stations', codeForm: 'SHIP', metadata: { category: '001/000' } },
  { code: 'V', label: 'Special aeronautical observations (SPECI)', codeForm: 'SPECI', metadata: { category: '000/011' } },
  { code: 'W', label: 'Aviation routine weather observations (METAR)', codeForm: 'METAR', metadata: { category: '000/010' } },
  { code: 'X', label: 'Other surface data', codeForm: 'IAC, IAC FLEET' },
];

// KT - Warnings
const A1_KT: TableEntry[] = [
  { code: 'E', label: 'Tsunami' },
  { code: 'H', label: 'Hurricane, typhoon, tropical storm warning' },
  { code: 'S', label: 'Severe weather, SIGMET' },
  { code: 'T', label: 'Tornado warning' },
  { code: 'X', label: 'Other warnings' },
];

// KU - Upper-air data
const A1_KU: TableEntry[] = [
  { code: 'A', label: 'Single level aircraft reports', codeForm: 'AMDAR/AIREP', metadata: { category: '004/000-001' } },
  { code: 'B', label: 'Single level balloon reports' },
  { code: 'C', label: 'Single level satellite-derived reports', codeForm: 'SAREP', metadata: { category: '005/000' } },
  { code: 'D', label: 'Dropsonde/dropwindsondes', codeForm: 'TEMP DROP', metadata: { category: '002/007' } },
  { code: 'E', label: 'Ozone vertical sounding', metadata: { category: '008/001' } },
  { code: 'I', label: 'Dispersal and transport analysis', metadata: { category: '009/000' } },
  { code: 'J', label: 'Upper wind from land/mobile/marine stations', codeForm: 'PILOT', metadata: { category: '002/001-003' } },
  { code: 'K', label: 'Radio soundings', codeForm: 'TEMP', metadata: { category: '002/004-006' } },
  { code: 'L', label: 'Total ozone', metadata: { category: '008/002' } },
  { code: 'M', label: 'Model derived sondes' },
  { code: 'N', label: 'Rocketsondes' },
  { code: 'O', label: 'Profiles of aircraft observations', codeForm: 'AMDAR', metadata: { category: '002/020' } },
  { code: 'P', label: 'Profilers', codeForm: 'PILOT', metadata: { category: '002/010' } },
  { code: 'Q', label: 'RASS temperature profilers', codeForm: 'TEMP', metadata: { category: '002/011' } },
  { code: 'S', label: 'Radiosondes/pibal reports', codeForm: 'TEMP', metadata: { category: '002/004-006' } },
  { code: 'T', label: 'Satellite derived sondes' },
  { code: 'U', label: 'Monthly statistics from marine stations', codeForm: 'SHIP', metadata: { category: '002/026' } },
  { code: 'W', label: 'Upper wind', codeForm: 'PILOT', metadata: { category: '002/001-003' } },
  { code: 'X', label: 'Other upper-air reports' },
];

// KV - Upper-air forecasts
const A1_KV: TableEntry[] = [
  { code: 'A', label: 'Forecast at single levels' },
  { code: 'B', label: 'Coded SIGWX, Embedded Cumulonimbus' },
  { code: 'C', label: 'CREX coded SIGWX, Clear air turbulence' },
  { code: 'F', label: 'CREX coded SIGWX, Fronts' },
  { code: 'N', label: 'CREX coded SIGWX, Other SIGWX parameters' },
  { code: 'O', label: 'CREX coded SIGWX, Turbulence' },
  { code: 'S', label: 'Forecast soundings' },
  { code: 'T', label: 'CREX coded SIGWX, Icing/Tropopause' },
  { code: 'V', label: 'CREX coded SIGWX, Tropical storms, sandstorms, volcanoes' },
  { code: 'W', label: 'CREX coded SIGWX, High-level winds' },
  { code: 'X', label: 'Other upper-air forecasts' },
];

/**
 * T2 options for T1 = K (CREX)
 */
export const TABLE_C7_T2: TableDefinition = {
  id: 'C7_T2',
  name: 'Data type designator T2 (when T1 = K)',
  description: 'T2 values for CREX data',
  entries: [
    { code: 'F', label: 'Surface forecasts' },
    { code: 'O', label: 'Oceanographic data' },
    { code: 'P', label: 'Pictorial oceanographic data' },
    { code: 'S', label: 'Surface data' },
    { code: 'T', label: 'Warnings' },
    { code: 'U', label: 'Upper-air data' },
    { code: 'V', label: 'Upper-air forecasts' },
  ]
};

/**
 * Mapping from T2 to A1 entries for CREX
 */
export const TABLE_C7_A1_BY_T2: Record<string, TableEntry[]> = {
  'F': A1_KF,
  'O': A1_KO,
  'P': A1_KP,
  'S': A1_KS,
  'T': A1_KT,
  'U': A1_KU,
  'V': A1_KV,
};

/**
 * Get Table C7 A1 definition for a specific T2 value
 */
export function getTableC7A1(t2: string): TableDefinition | null {
  const entries = TABLE_C7_A1_BY_T2[t2];
  if (!entries) return null;

  return {
    id: 'C7',
    name: `Data type designator A1 (when T1T2 = K${t2})`,
    description: `A1 values for CREX K${t2} data`,
    entries,
  };
}
