// Version injected by Vite at build time
declare const __VERSION__: string;

/**
 * Library version (from package.json)
 */
export const VERSION: string = typeof __VERSION__ !== 'undefined' ? __VERSION__ : 'dev';

// Main exports
export { TtaaiiProvider } from './provider';

// Type exports
export type {
  TtaaiiField,
  CompletionItem,
  CompletionGroup,
  CompletionResult,
  CompletionOptions,
  TtaaiiContext,
  ValidationResult,
  ValidationError,
  DecodedTtaaii,
  TableEntry,
  TableDefinition,
  RegionalConfig,
  TtaaiiTables,
} from './types';

// Grammar exports (for advanced usage)
export {
  parseContext,
  resolveTable,
  validateCharacter,
  getT1Table,
  getT2Table,
  getA1Table,
  getA2Table,
  getIiTable,
  getFieldAtPosition,
} from './grammar';

// Default tables (English, for customization)
import defaultTables from './grammar/data/tables.en.json';
export { defaultTables };
