import type { TableDefinition, TableEntry, TtaaiiContext, TtaaiiField, TtaaiiTables } from '../types';

// Mappings: which table to use based on T1
const T1_TO_T2_TABLE: Record<string, string> = {
  'A': 'B1', 'C': 'B1', 'F': 'B1', 'N': 'B1', 'S': 'B1', 'T': 'B1', 'U': 'B1', 'W': 'B1',
  'D': 'B2', 'G': 'B2', 'H': 'B2', 'Y': 'B2',
  'I': 'B3', 'J': 'B3',
  'O': 'B4',
  'E': 'B5',
  'P': 'B6', 'Q': 'B6',
  'L': 'B7',
  'K': 'C7_T2',
};

const T1_TO_A1_TABLE: Record<string, string> = {
  'A': 'C1', 'C': 'C1', 'F': 'C1', 'N': 'C1', 'S': 'C1', 'T': 'C1', 'U': 'C1', 'W': 'C1',
  'P': 'C1', 'E': 'C1', 'L': 'C1',
  'D': 'C3', 'G': 'C3', 'H': 'C3', 'Y': 'C3', 'O': 'C3', 'Q': 'C3',
  'I': 'C6', 'J': 'C6',
  'K': 'C7',
};

const T1_TO_A2_TABLE: Record<string, string> = {
  'A': 'C1', 'C': 'C1', 'F': 'C1', 'N': 'C1', 'S': 'C1', 'T': 'C1', 'U': 'C1', 'W': 'C1',
  'P': 'C1', 'E': 'C1', 'L': 'C1',
  'D': 'C4', 'G': 'C4', 'H': 'C4', 'Y': 'C4',
  'Q': 'C5',
  'O': 'C3',
  'I': 'C3', 'J': 'C3', 'K': 'C3',
};

const T1_TO_II_TABLE: Record<string, string> = {
  'O': 'D1',
  'D': 'D2', 'G': 'D2', 'H': 'D2', 'Y': 'D2',
};

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
export function getT1Table(tables: TtaaiiTables): TableDefinition {
  return {
    id: tables.A.id,
    name: tables.A.name,
    entries: tables.A.entries,
  };
}

/**
 * Get the table definition for T2 based on T1 context
 */
export function getT2Table(tables: TtaaiiTables, context: TtaaiiContext): TableDefinition | null {
  const { T1 } = context;
  if (!T1) return null;

  const tableId = T1_TO_T2_TABLE[T1];
  if (!tableId) return null;

  switch (tableId) {
    case 'B1': {
      const entries = tables.B1.byT1[T1] || [];
      return { id: 'B1', name: tables.B1.name, entries };
    }
    case 'B2':
      return { id: 'B2', name: tables.B2.name, entries: tables.B2.entries };
    case 'B3':
      return { id: 'B3', name: tables.B3.name, entries: tables.B3.entries };
    case 'B4':
      return { id: 'B4', name: tables.B4.name, entries: tables.B4.entries };
    case 'B5':
      return { id: 'B5', name: tables.B5.name, entries: tables.B5.entries };
    case 'B6':
      return { id: 'B6', name: tables.B6.name, entries: tables.B6.entries };
    case 'B7':
      return { id: 'B7', name: tables.B7.name, entries: tables.B7.entries };
    case 'C7_T2':
      return { id: 'C7_T2', name: tables.C7.name, entries: tables.C7.T2 };
    default:
      return null;
  }
}

/**
 * Get the table definition for A1 based on context
 */
export function getA1Table(tables: TtaaiiTables, context: TtaaiiContext): TableDefinition | null {
  const { T1, T2 } = context;
  if (!T1) return null;

  // Special case: CREX (T1 = K) - A1 depends on T2
  if (T1 === 'K' && T2) {
    const entries = tables.C7.A1byT2[T2] || tables.C7.A1byT2['default'] || [];
    return { id: 'C7', name: tables.C7.name, entries };
  }

  // Special case: BUFR (T1 = I or J) - A1 depends on T1T2
  if ((T1 === 'I' || T1 === 'J') && T2) {
    const t1t2 = T1 + T2;
    const entries = tables.C6.byT1T2[t1t2] || tables.C6.byT1T2['default'] || [];
    return { id: 'C6', name: tables.C6.name, entries };
  }

  const tableId = T1_TO_A1_TABLE[T1];
  if (!tableId) return null;

  switch (tableId) {
    case 'C1':
      return { id: 'C1', name: tables.C1.name, entries: tables.C1.entries };
    case 'C3':
      return { id: 'C3', name: tables.C3.name, entries: tables.C3.entries };
    default:
      return null;
  }
}

/**
 * Get the table definition for A2 based on context
 */
export function getA2Table(tables: TtaaiiTables, context: TtaaiiContext): TableDefinition | null {
  const { T1 } = context;
  if (!T1) return null;

  // Special case: BUFR (T1 = I or J) - A2 uses C3 (geographical area)
  if (T1 === 'I' || T1 === 'J') {
    return { id: 'C3', name: tables.C3.name, entries: tables.C3.entries };
  }

  // Special case: CREX (T1 = K) - A2 uses C3
  if (T1 === 'K') {
    return { id: 'C3', name: tables.C3.name, entries: tables.C3.entries };
  }

  const tableId = T1_TO_A2_TABLE[T1];
  if (!tableId) return null;

  switch (tableId) {
    case 'C1':
      return { id: 'C1', name: tables.C1.name, entries: tables.C1.entries };
    case 'C3':
      return { id: 'C3', name: tables.C3.name, entries: tables.C3.entries };
    case 'C4':
      return { id: 'C4', name: tables.C4.name, entries: tables.C4.entries };
    case 'C5':
      return { id: 'C5', name: tables.C5.name, entries: tables.C5.entries };
    default:
      return null;
  }
}

/**
 * Generate ii codes from ranges
 */
function generateIiFromRanges(ranges: { start: number; end: number; label: string }[]): TableEntry[] {
  const codes: TableEntry[] = [];
  for (const range of ranges) {
    for (let i = range.start; i <= range.end; i++) {
      codes.push({
        code: i.toString().padStart(2, '0'),
        label: `${range.label} (${i.toString().padStart(2, '0')})`,
      });
    }
  }
  return codes;
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
 * Get the table/entries for ii based on context
 */
export function getIiTable(tables: TtaaiiTables, context: TtaaiiContext): TableDefinition | null {
  const { T1, T2 } = context;
  if (!T1) return null;

  // Special case: FA (Aviation area) or UA (Aircraft reports)
  const t1t2 = T1 + (T2 || '');
  if (t1t2 === 'FA') {
    return {
      id: 'D3_FA',
      name: 'Level designator ii (T1T2 = FA)',
      entries: generateIiFromRanges(tables.D3.FA.ranges),
    };
  }

  if (t1t2 === 'UA') {
    return {
      id: 'D3_UA',
      name: 'Level designator ii (T1T2 = UA)',
      entries: generateIiFromRanges(tables.D3.UA.ranges),
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
      return { id: 'D1', name: tables.D1.name, entries: tables.D1.entries };
    case 'D2':
      return { id: 'D2', name: tables.D2.name, entries: tables.D2.entries };
    default:
      return null;
  }
}

/**
 * Resolve the appropriate table for a given input string
 */
export function resolveTable(tables: TtaaiiTables, input: string): {
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
      table = getT1Table(tables);
      break;
    case 'T2':
      table = getT2Table(tables, context);
      break;
    case 'A1':
      table = getA1Table(tables, context);
      break;
    case 'A2':
      table = getA2Table(tables, context);
      break;
    case 'ii':
      table = getIiTable(tables, context);
      break;
  }

  return { position, field, table, context };
}

/**
 * Validate a character at a given position
 */
export function validateCharacter(
  tables: TtaaiiTables,
  char: string,
  position: number,
  context: TtaaiiContext
): { valid: boolean; error?: string } {
  const field = getFieldAtPosition(position);
  let table: TableDefinition | null = null;

  switch (field) {
    case 'T1':
      table = getT1Table(tables);
      break;
    case 'T2':
      table = getT2Table(tables, context);
      break;
    case 'A1':
      table = getA1Table(tables, context);
      break;
    case 'A2':
      table = getA2Table(tables, context);
      break;
    case 'ii':
      table = getIiTable(tables, context);
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
