import type { TableDefinition, TableEntry } from '../../types';

/**
 * Table C6: Data type designator A1 (when T1 = I or J)
 * Used for BUFR data - the A1 value depends on T1T2 combination
 *
 * This is a complex table where valid A1 values depend on T1T2
 */

// A1 entries for IN (Satellite data in BUFR)
const A1_IN: TableEntry[] = [
  { code: 'A', label: 'Satellite data (AMSUA)', metadata: { category: '003/003' } },
  { code: 'B', label: 'Satellite data (AMSUB)', metadata: { category: '003/004' } },
  { code: 'C', label: 'CrIS (selected channels)', metadata: { category: '003/030' } },
  { code: 'H', label: 'Satellite data (HIRS)', metadata: { category: '003/005' } },
  { code: 'I', label: 'IRAS', metadata: { category: '003/020' } },
  { code: 'J', label: 'HIRAS', metadata: { category: '003/030' } },
  { code: 'K', label: 'MWHS/MWHS-2', metadata: { category: '003/040' } },
  { code: 'M', label: 'Satellite data (MHS)', metadata: { category: '003/006' } },
  { code: 'Q', label: 'IASI (Principle component scores)', metadata: { category: '003/007' } },
  { code: 'S', label: 'ATMS', metadata: { category: '003/040' } },
  { code: 'T', label: 'MWTS/MWTS-2', metadata: { category: '003/040' } },
];

// A1 entries for IO (Oceanographic data in BUFR)
const A1_IO: TableEntry[] = [
  { code: 'B', label: 'Buoy observations', codeForm: 'BUOY', metadata: { category: '001/025' } },
  { code: 'I', label: 'Sea ice' },
  { code: 'P', label: 'Sub-surface profiling floats', codeForm: 'TESAC', metadata: { category: '031/004' } },
  { code: 'R', label: 'Sea surface observations', codeForm: 'TRACKOB', metadata: { category: '031/001' } },
  { code: 'S', label: 'Sea surface and below soundings', codeForm: 'BATHY, TESAC', metadata: { category: '031/005' } },
  { code: 'T', label: 'Sea surface temperature' },
  { code: 'W', label: 'Sea surface waves', codeForm: 'WAVEOB', metadata: { category: '031/002' } },
  { code: 'X', label: 'Other sea environmental' },
  { code: 'Z', label: 'Deep ocean tsunameter', metadata: { category: '031/007' } },
];

// A1 entries for IP (Pictorial data in BUFR)
const A1_IP: TableEntry[] = [
  { code: 'C', label: 'Radar composite imagery data' },
  { code: 'I', label: 'Satellite imagery data' },
  { code: 'R', label: 'Radar imagery data' },
  { code: 'X', label: 'Not defined' },
];

// A1 entries for IS (Surface data in BUFR)
const A1_IS: TableEntry[] = [
  { code: 'A', label: 'Observations from automatic land stations', metadata: { category: '000/006', iiRange: '01-29 routine, 30-59 N-minute' } },
  { code: 'B', label: 'Radar reports (parts A and B)', codeForm: 'RADOB', metadata: { category: '006/003' } },
  { code: 'C', label: 'Climatic observations', codeForm: 'CLIMAT', metadata: { category: '000/020 (01-45 land), 001/020 (46-59 marine)' } },
  { code: 'D', label: 'Radiological observation', codeForm: 'RADREP', metadata: { category: '010/001' } },
  { code: 'E', label: 'Measurement of surface ozone', metadata: { category: '008/000' } },
  { code: 'F', label: 'Source of atmospherics', codeForm: 'SFAZI, SFLOC, SFAZU', metadata: { category: '000/030' } },
  { code: 'I', label: 'Intermediate synoptic observations', codeForm: 'SYNOP', metadata: { category: '000/001' } },
  { code: 'M', label: 'Main synoptic observations', codeForm: 'SYNOP', metadata: { category: '000/002' } },
  { code: 'N', label: 'Synoptic observations at non-standard time', codeForm: 'SYNOP', metadata: { category: '000/000' } },
  { code: 'R', label: 'Hydrologic reports', codeForm: 'HYDRA', metadata: { category: '000/040' } },
  { code: 'S', label: 'Synoptic observations from marine stations', codeForm: 'SHIP', metadata: { category: '001/000' } },
  { code: 'T', label: 'Tide gauge observations', metadata: { category: '001/030' } },
  { code: 'V', label: 'Special aeronautical observations (SPECI)', codeForm: 'SPECI', metadata: { category: '000/011' } },
  { code: 'W', label: 'Aviation routine weather observations (METAR)', codeForm: 'METAR', metadata: { category: '000/010' } },
  { code: 'X', label: 'Other surface data', codeForm: 'IAC, IAC FLEET' },
];

// A1 entries for IT (Text in BUFR)
const A1_IT: TableEntry[] = [
  { code: 'A', label: 'Administrative message' },
  { code: 'B', label: 'Service message' },
  { code: 'R', label: 'Request for data (inclusive of type)' },
  { code: 'X', label: 'Other text messages or information' },
];

// A1 entries for IU (Upper-air data in BUFR)
const A1_IU: TableEntry[] = [
  { code: 'A', label: 'Single level aircraft reports', codeForm: 'AMDAR/AIREP', metadata: { category: '004/000-001' } },
  { code: 'B', label: 'Single level balloon reports' },
  { code: 'C', label: 'Single level satellite-derived reports', codeForm: 'SAREP/SATOB', metadata: { category: '005/000' } },
  { code: 'D', label: 'Dropsonde/Dropwindsondes', codeForm: 'TEMP DROP', metadata: { category: '002/007' } },
  { code: 'E', label: 'Ozone vertical sounding', metadata: { category: '008/001' } },
  { code: 'I', label: 'Dispersal and transport analysis', metadata: { category: '009/000' } },
  { code: 'J', label: 'Upper wind from land/mobile/marine stations', codeForm: 'PILOT', metadata: { category: '002/001-003' } },
  { code: 'K', label: 'Radio soundings (up to 100 hPa)', codeForm: 'TEMP', metadata: { category: '002/004-006' } },
  { code: 'L', label: 'Total ozone', metadata: { category: '008/002' } },
  { code: 'M', label: 'Model derived sondes' },
  { code: 'N', label: 'Rocketsondes' },
  { code: 'O', label: 'Profiles of aircraft observations', codeForm: 'AMDAR', metadata: { category: '002/020' } },
  { code: 'P', label: 'Profilers', codeForm: 'PILOT', metadata: { category: '002/010' } },
  { code: 'Q', label: 'RASS temperature profilers', codeForm: 'TEMP', metadata: { category: '002/011' } },
  { code: 'R', label: 'Radiance data (reserved)' },
  { code: 'S', label: 'Radiosondes/pibal reports (entire sounding)', codeForm: 'TEMP', metadata: { category: '002/004-006' } },
  { code: 'T', label: 'Satellite-derived sondes (reserved)', codeForm: 'SATEM, SARAD, SATOB' },
  { code: 'U', label: 'Monthly statistics from marine stations', codeForm: 'SHIP', metadata: { category: '002/026' } },
  { code: 'W', label: 'Upper wind (up to 100 hPa)', codeForm: 'PILOT', metadata: { category: '002/001-003' } },
  { code: 'X', label: 'Other upper-air reports' },
];

// A1 entries for JO (Oceanographic forecast in BUFR)
const A1_JO: TableEntry[] = [
  { code: 'I', label: 'Sea ice' },
  { code: 'S', label: 'Sea surface and below soundings' },
  { code: 'T', label: 'Sea surface temperature' },
  { code: 'W', label: 'Sea surface waves' },
  { code: 'X', label: 'Other sea environmental data' },
];

// A1 entries for JS (Surface forecast in BUFR)
const A1_JS: TableEntry[] = [
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

// A1 entries for JT (Warnings in BUFR)
const A1_JT: TableEntry[] = [
  { code: 'E', label: 'Tsunami' },
  { code: 'H', label: 'Hurricane, typhoon, tropical storm warning' },
  { code: 'S', label: 'Severe weather, SIGMET' },
  { code: 'T', label: 'Tornado warning' },
  { code: 'X', label: 'Other warnings' },
];

// A1 entries for JU (Upper-air forecast in BUFR)
const A1_JU: TableEntry[] = [
  { code: 'A', label: 'Forecast at single levels' },
  { code: 'B', label: 'Binary coded SIGWX, Embedded Cumulonimbus' },
  { code: 'C', label: 'Binary coded SIGWX, Clear-air turbulence' },
  { code: 'F', label: 'Binary coded SIGWX, Fronts' },
  { code: 'N', label: 'Binary coded SIGWX, Other SIGWX parameters' },
  { code: 'O', label: 'Binary coded SIGWX, Turbulence' },
  { code: 'S', label: 'Forecast soundings' },
  { code: 'T', label: 'Binary coded SIGWX, Icing/Tropopause' },
  { code: 'V', label: 'Binary coded SIGWX, Tropical storms, sandstorms, volcanoes' },
  { code: 'W', label: 'Binary coded SIGWX, High-level winds' },
  { code: 'X', label: 'Other upper-air forecasts' },
];

/**
 * Mapping from T1T2 to A1 entries
 */
export const TABLE_C6_BY_T1T2: Record<string, TableEntry[]> = {
  'IN': A1_IN,
  'IO': A1_IO,
  'IP': A1_IP,
  'IS': A1_IS,
  'IT': A1_IT,
  'IU': A1_IU,
  'JO': A1_JO,
  'JS': A1_JS,
  'JT': A1_JT,
  'JU': A1_JU,
};

/**
 * Get Table C6 definition for a specific T1T2 combination
 */
export function getTableC6(t1t2: string): TableDefinition | null {
  const entries = TABLE_C6_BY_T1T2[t1t2];
  if (!entries) return null;

  return {
    id: 'C6',
    name: `Data type designator A1 (when T1T2 = ${t1t2})`,
    description: `A1 values for ${t1t2} BUFR data`,
    entries,
  };
}

/**
 * Full Table C6 with all entries (for reference)
 */
export const TABLE_C6: TableDefinition = {
  id: 'C6',
  name: 'Data type designator A1 (when T1 = I or J)',
  description: 'A1 values for BUFR data - context dependent on T1T2',
  entries: [
    ...A1_IN.map(e => ({ ...e, metadata: { ...e.metadata, t1t2: 'IN' } })),
    ...A1_IO.map(e => ({ ...e, metadata: { ...e.metadata, t1t2: 'IO' } })),
    ...A1_IP.map(e => ({ ...e, metadata: { ...e.metadata, t1t2: 'IP' } })),
    ...A1_IS.map(e => ({ ...e, metadata: { ...e.metadata, t1t2: 'IS' } })),
    ...A1_IT.map(e => ({ ...e, metadata: { ...e.metadata, t1t2: 'IT' } })),
    ...A1_IU.map(e => ({ ...e, metadata: { ...e.metadata, t1t2: 'IU' } })),
    ...A1_JO.map(e => ({ ...e, metadata: { ...e.metadata, t1t2: 'JO' } })),
    ...A1_JS.map(e => ({ ...e, metadata: { ...e.metadata, t1t2: 'JS' } })),
    ...A1_JT.map(e => ({ ...e, metadata: { ...e.metadata, t1t2: 'JT' } })),
    ...A1_JU.map(e => ({ ...e, metadata: { ...e.metadata, t1t2: 'JU' } })),
  ],
};
