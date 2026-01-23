import type { TableDefinition } from '../../types';

/**
 * Table A: Data type designator T1
 * Matrix Table for T2A1A2ii definitions
 */
export const TABLE_A: TableDefinition = {
  id: 'A',
  name: 'Data type designator T1',
  description: 'First character defining the data type',
  entries: [
    { code: 'A', label: 'Analyses', priority: 3 },
    { code: 'B', label: 'Addressed message', priority: 1 },
    { code: 'C', label: 'Climatic data', priority: 4 },
    { code: 'D', label: 'Grid point information (GRID)', priority: 3 },
    { code: 'E', label: 'Satellite imagery', priority: 3 },
    { code: 'F', label: 'Forecasts', priority: 3 },
    { code: 'G', label: 'Grid point information (GRID)', priority: 3 },
    { code: 'H', label: 'Grid point information (GRIB)', priority: 3 },
    { code: 'I', label: 'Observational data (Binary coded) - BUFR', priority: 2 },
    { code: 'J', label: 'Forecast information (Binary coded) - BUFR', priority: 3 },
    { code: 'K', label: 'CREX', priority: 2 },
    { code: 'L', label: 'Aviation information in XML', priority: 1 },
    // M is not assigned
    { code: 'N', label: 'Notices', priority: 4 },
    { code: 'O', label: 'Oceanographic information (GRIB)', priority: 3 },
    { code: 'P', label: 'Pictorial information (Binary coded)', priority: 3 },
    { code: 'Q', label: 'Pictorial information regional (Binary coded)', priority: 3 },
    // R is not assigned
    { code: 'S', label: 'Surface data', priority: 2 },
    { code: 'T', label: 'Satellite data', priority: 2 },
    { code: 'U', label: 'Upper-air data', priority: 2 },
    { code: 'V', label: 'National data', metadata: { national: true } },
    { code: 'W', label: 'Warnings', priority: 1 },
    { code: 'X', label: 'Common Alert Protocol (CAP) messages' },
    { code: 'Y', label: 'GRIB regional use', priority: 3 },
    // Z is not assigned
  ]
};

/**
 * Mapping from T1 to the T2 table to use
 */
export const T1_TO_T2_TABLE: Record<string, string> = {
  'A': 'B1', // Analyses
  'C': 'B1', // Climatic data
  'F': 'B1', // Forecasts
  'N': 'B1', // Notices
  'S': 'B1', // Surface data
  'T': 'B1', // Satellite data
  'U': 'B1', // Upper-air data
  'W': 'B1', // Warnings
  'D': 'B2', // Grid point information (GRID)
  'G': 'B2', // Grid point information (GRID)
  'H': 'B2', // Grid point information (GRIB)
  'X': 'B2', // CAP messages (uses B2 per table structure)
  'Y': 'B2', // GRIB regional use
  'I': 'B3', // Observational data (BUFR)
  'J': 'B3', // Forecast information (BUFR)
  'O': 'B4', // Oceanographic information
  'E': 'B5', // Satellite imagery
  'P': 'B6', // Pictorial information
  'Q': 'B6', // Pictorial information regional
  'L': 'B7', // Aviation information in XML
  'K': 'B3', // CREX (uses B3 for T2, but C7 for A1)
  'B': null!, // Addressed message - special handling
  'V': null!, // National data - special handling
};

/**
 * Mapping from T1 to the A1 table to use
 */
export const T1_TO_A1_TABLE: Record<string, string> = {
  'A': 'C1',
  'C': 'C1',
  'F': 'C1',
  'N': 'C1',
  'S': 'C1', // or C2 for ships
  'U': 'C1', // or C2 for ships
  'W': 'C1',
  'E': 'C1',
  'L': 'C1',
  'V': 'C1',
  'D': 'C3',
  'G': 'C3',
  'H': 'C3',
  'O': 'C3',
  'P': 'C3',
  'Q': 'C3',
  'T': 'C3',
  'X': 'C3',
  'Y': 'C3',
  'I': 'C6', // Data type designator
  'J': 'C6', // Data type designator
  'K': 'C7', // Combined T2 and A1
};

/**
 * Mapping from T1 to the A2 table to use
 */
export const T1_TO_A2_TABLE: Record<string, string> = {
  'A': 'C1',
  'C': 'C1',
  'F': 'C1',
  'N': 'C1',
  'S': 'C1', // or C2 for ships
  'U': 'C1', // or C2 for ships
  'W': 'C1',
  'E': 'C1',
  'L': 'C1',
  'V': 'C1',
  'D': 'C4',
  'G': 'C4',
  'H': 'C4',
  'J': 'C4',
  'O': 'C4',
  'P': 'C4',
  'T': 'C4',
  'I': 'C3', // Geographical area designator
  'Q': 'C5',
  'X': 'C5',
  'Y': 'C5',
  'K': 'C3', // Geographical area designator
};

/**
 * Mapping from T1 to the ii table to use
 */
export const T1_TO_II_TABLE: Record<string, string> = {
  'O': 'D1', // Ocean depths
  'D': 'D2', // Pressure levels
  'G': 'D2',
  'H': 'D2',
  'J': 'D2',
  'P': 'D2',
  'Q': 'D2',
  'X': 'D2',
  'Y': 'D2',
  // For FA and UA, D3 is used (special handling based on T1T2)
};
