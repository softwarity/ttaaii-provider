import type { TableDefinition, TableEntry, TtaaiiContext, TtaaiiField } from '../types';
import {
  TABLE_A,
  T1_TO_T2_TABLE,
  T1_TO_A1_TABLE,
  T1_TO_A2_TABLE,
  T1_TO_II_TABLE,
  getTableB1,
  TABLE_B2,
  TABLE_B3,
  TABLE_B4,
  TABLE_B5,
  TABLE_B6,
  TABLE_B7,
  TABLE_C1,
  TABLE_C2,
  TABLE_C3,
  TABLE_C4,
  TABLE_C5,
  getTableC6,
  TABLE_C7_T2,
  getTableC7A1,
  TABLE_D1,
  TABLE_D2,
  TABLE_D3,
  generateFAiiCodes,
  generateUAiiCodes,
} from './tables';

/**
 * Parse a TTAAII string into its context components
 */
export function parseContext(input: string): TtaaiiContext {
  const context: TtaaiiContext = {};

  if (input.length >= 1) context.T1 = input[0];
  if (input.length >= 2) context.T2 = input[1];
  if (input.length >= 3) context.A1 = input[2];
  if (input.length >= 4) context.A2 = input[3];
  if (input.length >= 6) context.ii = input.slice(4, 6);

  return context;
}

/**
 * Determine which field is being completed at a given position
 */
export function getFieldAtPosition(position: number): TtaaiiField {
  switch (position) {
    case 0: return 'T1';
    case 1: return 'T2';
    case 2: return 'A1';
    case 3: return 'A2';
    case 4:
    case 5: return 'ii';
    default: return 'ii';
  }
}

/**
 * Get the table definition for T1 (always Table A)
 */
export function getT1Table(): TableDefinition {
  return TABLE_A;
}

/**
 * Get the table definition for T2 based on T1 context
 */
export function getT2Table(context: TtaaiiContext): TableDefinition | null {
  const { T1 } = context;
  if (!T1) return null;

  const tableId = T1_TO_T2_TABLE[T1];
  if (!tableId) return null;

  switch (tableId) {
    case 'B1':
      return getTableB1(T1);
    case 'B2':
      return TABLE_B2;
    case 'B3':
      // For CREX (K), T2 comes from C7_T2
      if (T1 === 'K') return TABLE_C7_T2;
      return TABLE_B3;
    case 'B4':
      return TABLE_B4;
    case 'B5':
      return TABLE_B5;
    case 'B6':
      return TABLE_B6;
    case 'B7':
      return TABLE_B7;
    default:
      return null;
  }
}

/**
 * Get the table definition for A1 based on context
 */
export function getA1Table(context: TtaaiiContext): TableDefinition | null {
  const { T1, T2 } = context;
  if (!T1) return null;

  // Special case: CREX (T1 = K) - A1 depends on T2
  if (T1 === 'K' && T2) {
    return getTableC7A1(T2);
  }

  // Special case: BUFR (T1 = I or J) - A1 depends on T1T2
  if ((T1 === 'I' || T1 === 'J') && T2) {
    const t1t2 = T1 + T2;
    return getTableC6(t1t2);
  }

  const tableId = T1_TO_A1_TABLE[T1];
  if (!tableId) return null;

  switch (tableId) {
    case 'C1':
      return TABLE_C1;
    case 'C3':
      return TABLE_C3;
    case 'C6':
      // Should have been handled above for I/J
      return null;
    case 'C7':
      // Should have been handled above for K
      return null;
    default:
      return null;
  }
}

/**
 * Get the table definition for A2 based on context
 */
export function getA2Table(context: TtaaiiContext): TableDefinition | null {
  const { T1, T2 } = context;
  if (!T1) return null;

  // Special handling for ships/oceanographic data based on T2
  // When T1 = S and T2 uses Table C2 for certain surface data
  if (T1 === 'S' && T2) {
    // Check if this is ship-related (SYNOP SHIP etc.)
    const shipT2 = ['I', 'M', 'N', 'O', 'S'].includes(T2);
    if (shipT2) {
      // Could use C1 or C2 - default to C1 for land, but expose C2 option
      return TABLE_C1;
    }
  }

  // Special case: BUFR (T1 = I or J) - A2 uses C3 (geographical area)
  if (T1 === 'I' || T1 === 'J') {
    return TABLE_C3;
  }

  // Special case: CREX (T1 = K) - A2 uses C3
  if (T1 === 'K') {
    return TABLE_C3;
  }

  const tableId = T1_TO_A2_TABLE[T1];
  if (!tableId) return null;

  switch (tableId) {
    case 'C1':
      return TABLE_C1;
    case 'C3':
      return TABLE_C3;
    case 'C4':
      return TABLE_C4;
    case 'C5':
      return TABLE_C5;
    default:
      return null;
  }
}

/**
 * Get the table/entries for ii based on context
 */
export function getIiTable(context: TtaaiiContext): TableDefinition | null {
  const { T1, T2 } = context;
  if (!T1) return null;

  // Special case: FA (Aviation area) or UA (Aircraft reports)
  const t1t2 = T1 + (T2 || '');
  if (t1t2 === 'FA') {
    const codes = generateFAiiCodes();
    return {
      id: 'D3_FA',
      name: 'Level designator ii (T1T2 = FA)',
      description: 'Aviation area ii designators',
      entries: codes.map(c => ({ code: c.code, label: c.label })),
    };
  }

  if (t1t2 === 'UA') {
    const codes = generateUAiiCodes();
    return {
      id: 'D3_UA',
      name: 'Level designator ii (T1T2 = UA)',
      description: 'Aircraft report ii designators',
      entries: codes.map(c => ({ code: c.code, label: c.label })),
    };
  }

  const tableId = T1_TO_II_TABLE[T1];
  if (!tableId) {
    // Many T1 values don't have specific ii tables
    // For these, ii can be any 2-digit number (bulletin sequence)
    return {
      id: 'generic_ii',
      name: 'Bulletin number ii',
      description: 'Sequential bulletin number (00-99)',
      entries: generateGenericIiCodes(),
    };
  }

  switch (tableId) {
    case 'D1':
      return TABLE_D1;
    case 'D2':
      return TABLE_D2;
    default:
      return null;
  }
}

/**
 * Generate generic ii codes (00-99) for bulletin sequencing
 */
function generateGenericIiCodes(): TableEntry[] {
  const codes: TableEntry[] = [];
  for (let i = 0; i <= 99; i++) {
    codes.push({
      code: i.toString().padStart(2, '0'),
      label: `Bulletin ${i.toString().padStart(2, '0')}`,
    });
  }
  return codes;
}

/**
 * Resolve the appropriate table for a given input string
 */
export function resolveTable(input: string): {
  position: number;
  field: TtaaiiField;
  table: TableDefinition | null;
  context: TtaaiiContext;
} {
  const context = parseContext(input);
  const position = input.length;
  const field = getFieldAtPosition(position);

  let table: TableDefinition | null = null;

  switch (field) {
    case 'T1':
      table = getT1Table();
      break;
    case 'T2':
      table = getT2Table(context);
      break;
    case 'A1':
      table = getA1Table(context);
      break;
    case 'A2':
      table = getA2Table(context);
      break;
    case 'ii':
      table = getIiTable(context);
      break;
  }

  return { position, field, table, context };
}

/**
 * Validate a character at a given position
 */
export function validateCharacter(
  char: string,
  position: number,
  context: TtaaiiContext
): { valid: boolean; error?: string } {
  const field = getFieldAtPosition(position);
  let table: TableDefinition | null = null;

  switch (field) {
    case 'T1':
      table = getT1Table();
      break;
    case 'T2':
      table = getT2Table(context);
      break;
    case 'A1':
      table = getA1Table(context);
      break;
    case 'A2':
      table = getA2Table(context);
      break;
    case 'ii':
      table = getIiTable(context);
      // For ii, we need to validate both digits together
      if (position === 4) {
        // First digit of ii - can't fully validate yet
        return { valid: /^\d$/.test(char) };
      }
      // Second digit - validate full ii
      const fullIi = (context.ii || '') + char;
      if (table) {
        const entry = table.entries.find(e => e.code === fullIi);
        if (!entry) {
          return { valid: false, error: `Invalid ii value: ${fullIi}` };
        }
      }
      return { valid: true };
  }

  if (!table) {
    return { valid: false, error: `No valid table for ${field} in current context` };
  }

  const entry = table.entries.find(e => e.code === char);
  if (!entry) {
    return { valid: false, error: `Invalid ${field} value: ${char}` };
  }

  return { valid: true };
}
