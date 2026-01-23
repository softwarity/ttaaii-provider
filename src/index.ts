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
  TtaaiiProviderConfig,
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
} from './grammar';

// Table exports (for advanced usage or extension)
export {
  TABLE_A,
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
  TABLE_D1,
  TABLE_D2,
  TABLE_D3,
  CONTINENT_LABELS,
} from './grammar/tables';
