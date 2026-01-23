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
 * Decoded TTAAII information
 */
export interface DecodedTtaaii {
  /** Original input */
  input: string;
  /** Data type (T1 decoded) */
  dataType?: {
    code: string;
    label: string;
    priority?: number;
  };
  /** Data subtype (T2 decoded) */
  dataSubtype?: {
    code: string;
    label: string;
    codeForm?: string;
  };
  /** Area/type A1 (decoded) */
  areaOrType1?: {
    code: string;
    label: string;
  };
  /** Area/time A2 (decoded) */
  areaOrTime2?: {
    code: string;
    label: string;
  };
  /** Level indicator (ii decoded) */
  level?: {
    code: string;
    label: string;
  };
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
 * Provider configuration
 */
export interface TtaaiiProviderConfig {
  /** Locale for labels */
  locale?: string;
  /** Regional extensions */
  regional?: RegionalConfig;
}
