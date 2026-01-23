/**
 * English labels for i18n support
 * These can be used to override default labels from tables
 */
export const EN_LABELS = {
  // Field names
  fields: {
    T1: 'Data Type',
    T2: 'Data Subtype',
    A1: 'Area/Type 1',
    A2: 'Area/Type 2',
    ii: 'Level/Sequence',
  },

  // Continent names for grouping
  continents: {
    EU: 'Europe',
    AF: 'Africa',
    AS: 'Asia',
    NA: 'North America',
    SA: 'South America',
    CA: 'Caribbean and Central America',
    OC: 'Oceania',
    AN: 'Antarctic',
    AREA: 'Area Designators',
    OTHER: 'Other',
  },

  // Validation messages
  validation: {
    invalidT1: 'Invalid data type (T1)',
    invalidT2: 'Invalid data subtype (T2) for this data type',
    invalidA1: 'Invalid area/type designator (A1)',
    invalidA2: 'Invalid area/type designator (A2)',
    invalidIi: 'Invalid level/sequence indicator (ii)',
    incomplete: 'TTAAII code is incomplete',
    tooLong: 'TTAAII code cannot exceed 6 characters',
  },

  // Group labels
  groups: {
    analysis: 'Analysis',
    shortTerm: 'Short-term Forecast',
    mediumTerm: 'Medium-term Forecast',
    longTerm: 'Long-term Forecast',
    surface: 'Surface',
    upperAir: 'Upper Air',
    special: 'Special Levels',
  },
};
