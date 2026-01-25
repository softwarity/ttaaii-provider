/**
 * Position field in TTAAII code
 */
export type TtaaiiField = 'T1' | 'T2' | 'A1' | 'A2' | 'ii';

/**
 * A single completion suggestion
 */
export interface CompletionItem {
  /** The character code (e.g., "A", "FR", "01") */
  code: string;
  /** Human-readable description */
  label: string;
  /** WMO-386 table this entry comes from (e.g., "A", "B1", "C1", "C2") */
  table: string;
  /** Optional code form reference (e.g., "FM 44 (ICEAN)", "[TEXT]") */
  codeForm?: string;
  /** Optional GTS priority level */
  priority?: number;
  /** Additional metadata for grouping/filtering */
  metadata?: Record<string, unknown>;
}

/**
 * A group of completion items (for hierarchical display)
 */
export interface CompletionGroup {
  /** Group identifier (e.g., "EU", "AF") */
  key: string;
  /** Group display label (e.g., "Europe", "Africa") */
  label: string;
  /** Items in this group */
  items: CompletionItem[];
}

/**
 * Result of a completion request
 */
export interface CompletionResult {
  /** Current position in the TTAAII string (0-5) */
  position: number;
  /** Which field is being completed */
  field: TtaaiiField;
  /** Flat list of completion items */
  items: CompletionItem[];
  /** Optional grouped items (when groupBy is specified) */
  groups?: CompletionGroup[];
  /** True if the TTAAII code is complete (6 characters) */
  isComplete: boolean;
  /** The current input being completed */
  input: string;
  /** Parsed context from current input */
  context: TtaaiiContext;
}

/**
 * Parsed context from a partial TTAAII string
 */
export interface TtaaiiContext {
  T1?: string;
  T2?: string;
  A1?: string;
  A2?: string;
  ii?: string;
}

/**
 * Options for completion request
 */
export interface CompletionOptions {
  /** Group results by category (e.g., 'continent', 'region') */
  groupBy?: string;
  /** Locale for labels (default: 'en') */
  locale?: string;
}

/**
 * Validation result for a TTAAII code
 */
export interface ValidationResult {
  /** Whether the code is valid */
  valid: boolean;
  /** Whether the code is complete (6 characters) */
  complete: boolean;
  /** Validation errors if any */
  errors: ValidationError[];
  /** Parsed context */
  context: TtaaiiContext;
}

/**
 * A validation error
 */
export interface ValidationError {
  /** Position of the error (0-5) */
  position: number;
  /** Field with error */
  field: TtaaiiField;
  /** Invalid character */
  character: string;
  /** Error message */
  message: string;
}

/**
 * Decoded field with table reference
 */
export interface DecodedField {
  /** The code value */
  code: string;
  /** Human-readable label */
  label: string;
  /** WMO-386 table this value comes from */
  table: string;
  /** Optional code form reference */
  codeForm?: string;
  /** Optional priority */
  priority?: number;
}

/**
 * Decoded TTAAII information
 */
export interface DecodedTtaaii {
  /** Original input */
  input: string;
  /** Data type (T1 decoded) */
  dataType?: DecodedField;
  /** Data subtype (T2 decoded) */
  dataSubtype?: DecodedField;
  /** Area/type A1 (decoded) */
  areaOrType1?: DecodedField;
  /** Area/time A2 (decoded) */
  areaOrTime2?: DecodedField;
  /** Level indicator (ii decoded) */
  level?: DecodedField;
}

/**
 * Table entry definition
 */
export interface TableEntry {
  code: string;
  label: string;
  codeForm?: string;
  priority?: number;
  metadata?: Record<string, unknown>;
}

/**
 * Table definition with entries and optional resolver
 */
export interface TableDefinition {
  id: string;
  name: string;
  description?: string;
  entries: TableEntry[];
  /** Optional groupings for hierarchical display */
  groups?: {
    key: string;
    label: string;
    codes: string[];
  }[];
}

/**
 * Regional configuration for extending tables
 */
export interface RegionalConfig {
  /** Region identifier */
  id: string;
  /** Region name */
  name: string;
  /** Table extensions */
  extensions: {
    tableId: string;
    entries: TableEntry[];
  }[];
}

/**
 * Tables JSON structure
 * This is the format for the tables data that can be overridden
 */
export interface TtaaiiTables {
  /** Table A: T1 data types */
  A: {
    id: string;
    name: string;
    entries: TableEntry[];
  };
  /** Table B1: T2 by T1 */
  B1: {
    id: string;
    name: string;
    byT1: Record<string, TableEntry[]>;
  };
  /** Table B2-B7: T2 entries */
  B2: { id: string; name: string; entries: TableEntry[] };
  B3: { id: string; name: string; entries: TableEntry[] };
  B4: { id: string; name: string; entries: TableEntry[] };
  B5: { id: string; name: string; entries: TableEntry[] };
  B6: { id: string; name: string; entries: TableEntry[] };
  B7: { id: string; name: string; entries: TableEntry[] };
  /** Table C1: Countries */
  C1: { id: string; name: string; entries: TableEntry[] };
  /** Table C2: Ships and oceanographic (A1 = station type, A2 = ocean area) */
  C2: {
    id: string;
    name: string;
    A1: TableEntry[];  // W, V, F (station types)
    A2: TableEntry[];  // A-X (ocean areas)
  };
  /** Table C3: GRID areas */
  C3: { id: string; name: string; entries: TableEntry[] };
  /** Table C4: GRID reference time */
  C4: { id: string; name: string; entries: TableEntry[] };
  /** Table C5: Regional pictorial time */
  C5: { id: string; name: string; entries: TableEntry[] };
  /** Table C6: BUFR A1 by T1T2 */
  C6: {
    id: string;
    name: string;
    byT1T2: Record<string, TableEntry[]>;
  };
  /** Table C7: CREX */
  C7: {
    id: string;
    name: string;
    T2: TableEntry[];
    A1byT2: Record<string, TableEntry[]>;
  };
  /** Table D1: Oceanographic ii */
  D1: { id: string; name: string; entries: TableEntry[] };
  /** Table D2: GRID ii */
  D2: { id: string; name: string; entries: TableEntry[] };
  /** Table D3: FA/UA ii ranges */
  D3: {
    id: string;
    name: string;
    FA: { ranges: { start: number; end: number; label: string }[] };
    UA: { ranges: { start: number; end: number; label: string }[] };
  };
}
