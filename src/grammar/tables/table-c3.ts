import type { TableDefinition } from '../../types';

/**
 * Table C3: Geographical area designator A1 (when T1 = D, G, H, O, P, Q, T, X or Y)
 * and geographical area designator A2 (when T1 = I or J)
 *
 * Hemisphere and tropical belt quadrants
 */
export const TABLE_C3: TableDefinition = {
  id: 'C3',
  name: 'Geographical area designator',
  description: 'Hemisphere quadrants and global areas',
  entries: [
    // Northern hemisphere quadrants
    { code: 'A', label: '0 - 90W northern hemisphere', metadata: { hemisphere: 'N', quadrant: 'NW' } },
    { code: 'B', label: '90W - 180 northern hemisphere', metadata: { hemisphere: 'N', quadrant: 'NE_pacific' } },
    { code: 'C', label: '180 - 90E northern hemisphere', metadata: { hemisphere: 'N', quadrant: 'NE_asia' } },
    { code: 'D', label: '90E - 0 northern hemisphere', metadata: { hemisphere: 'N', quadrant: 'NE_europe' } },

    // Tropical belt quadrants
    { code: 'E', label: '0 - 90W tropical belt', metadata: { hemisphere: 'T', quadrant: 'TW' } },
    { code: 'F', label: '90W - 180 tropical belt', metadata: { hemisphere: 'T', quadrant: 'TE_pacific' } },
    { code: 'G', label: '180 - 90E tropical belt', metadata: { hemisphere: 'T', quadrant: 'TE_asia' } },
    { code: 'H', label: '90E - 0 tropical belt', metadata: { hemisphere: 'T', quadrant: 'TE_africa' } },

    // Southern hemisphere quadrants
    { code: 'I', label: '0 - 90W southern hemisphere', metadata: { hemisphere: 'S', quadrant: 'SW' } },
    { code: 'J', label: '90W - 180 southern hemisphere', metadata: { hemisphere: 'S', quadrant: 'SE_pacific' } },
    { code: 'K', label: '180 - 90E southern hemisphere', metadata: { hemisphere: 'S', quadrant: 'SE_oceania' } },
    { code: 'L', label: '90E - 0 southern hemisphere', metadata: { hemisphere: 'S', quadrant: 'SE_indian' } },

    // Hemisphere designators
    { code: 'N', label: 'Northern hemisphere', metadata: { hemisphere: 'N', scope: 'hemisphere' } },
    { code: 'S', label: 'Southern hemisphere', metadata: { hemisphere: 'S', scope: 'hemisphere' } },

    // Special areas
    { code: 'T', label: '45W - 180 northern hemisphere', metadata: { hemisphere: 'N', scope: 'partial' } },
    { code: 'X', label: 'Global area (area not definable)', metadata: { scope: 'global' } },
  ],
  groups: [
    { key: 'NH', label: 'Northern Hemisphere', codes: ['A', 'B', 'C', 'D', 'N', 'T'] },
    { key: 'TR', label: 'Tropical Belt', codes: ['E', 'F', 'G', 'H'] },
    { key: 'SH', label: 'Southern Hemisphere', codes: ['I', 'J', 'K', 'L', 'S'] },
    { key: 'GL', label: 'Global', codes: ['X'] },
  ]
};
