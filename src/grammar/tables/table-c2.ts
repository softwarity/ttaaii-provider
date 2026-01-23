import type { TableDefinition } from '../../types';

/**
 * Table C2: Geographical designators A1A2 for use in abbreviated headings
 * T1T2A1A2ii CCCC YYGGgg for bulletins containing ships' weather reports
 * and oceanographic data including reports from automatic marine stations
 *
 * A1: Nature of ship/station (W=ocean weather, V=mobile ships, F=floats)
 * A2: Area from which reports originate
 */
export const TABLE_C2: TableDefinition = {
  id: 'C2',
  name: 'Geographical designators A1A2 for ships and oceanographic data',
  description: 'Area designators for marine bulletins',
  entries: [
    // A1 designators (first letter)
    { code: 'W', label: 'Ocean weather stations', metadata: { position: 'A1', stationType: 'ocean_weather' } },
    { code: 'V', label: 'Mobile ships and other marine stations', metadata: { position: 'A1', stationType: 'mobile' } },
    { code: 'F', label: 'Floats (T1T2 = SO)', metadata: { position: 'A1', stationType: 'float' } },

    // A2 designators (second letter - area)
    { code: 'A', label: 'Area between 30N-60S, 35W-70E', metadata: { position: 'A2', area: 'atlantic_indian' } },
    { code: 'B', label: 'Area between 90N-05N, 70E-180E', metadata: { position: 'A2', area: 'north_pacific_west' } },
    { code: 'C', label: 'Area between 05N-60S, 120W-35W', metadata: { position: 'A2', area: 'east_pacific_atlantic' } },
    { code: 'D', label: 'Area between 90N-05N, 180W-35W', metadata: { position: 'A2', area: 'north_pacific_atlantic' } },
    { code: 'E', label: 'Area between 05N-60S, 70E-120W', metadata: { position: 'A2', area: 'indian_pacific' } },
    { code: 'F', label: 'Area between 90N-30N, 35W-70E', metadata: { position: 'A2', area: 'north_atlantic_europe' } },
    { code: 'J', label: 'Area south of 60S', metadata: { position: 'A2', area: 'antarctic' } },
    { code: 'X', label: 'More than one area', metadata: { position: 'A2', area: 'multiple' } },
  ]
};

/**
 * Get A1 entries (station type)
 */
export function getTableC2A1Entries() {
  return TABLE_C2.entries.filter(e => e.metadata?.position === 'A1');
}

/**
 * Get A2 entries (area)
 */
export function getTableC2A2Entries() {
  return TABLE_C2.entries.filter(e => e.metadata?.position === 'A2');
}
