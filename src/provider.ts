import type {
  CompletionOptions,
  CompletionResult,
  CompletionItem,
  CompletionGroup,
  ValidationResult,
  ValidationError,
  DecodedTtaaii,
  TtaaiiContext,
  TableEntry,
  TtaaiiTables,
} from './types';

import {
  resolveTable,
  parseContext,
  validateCharacter,
  getT1Table,
  getT2Table,
  getA1Table,
  getA2Table,
  getIiTable,
  usesCountryTable,
  getCountryEntry,
} from './grammar/resolver';

// Default tables
import defaultTables from './grammar/data/tables.json';

// Continent labels for grouping
const CONTINENT_LABELS: Record<string, string> = {
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
};

/**
 * TTAAII completion provider
 *
 * Provides context-aware completion suggestions for WMO TTAAII codes.
 * UI-agnostic - can be used with any autocomplete implementation.
 */
export class TtaaiiProvider {
  private tables: TtaaiiTables;

  constructor(tables?: TtaaiiTables) {
    this.tables = tables || (defaultTables as TtaaiiTables);
  }

  /**
   * Get completion suggestions for a partial TTAAII string
   *
   * @param input - Current input string (0-6 characters)
   * @param options - Completion options (groupBy, locale)
   * @returns Completion result with items and optional groups
   */
  complete(input: string, options: CompletionOptions = {}): CompletionResult {
    const normalizedInput = input.toUpperCase();
    const { position, field, table, context } = resolveTable(this.tables, normalizedInput);

    const items: CompletionItem[] = [];
    let groups: CompletionGroup[] | undefined;

    if (table) {
      // Convert table entries to completion items
      for (const entry of table.entries) {
        items.push(this.entryToCompletionItem(entry));
      }

      // Handle grouping if requested
      if (options.groupBy) {
        groups = this.groupItems(items, options.groupBy);
      }
    }

    return {
      position,
      field,
      items,
      groups,
      isComplete: normalizedInput.length >= 6,
      input: normalizedInput,
      context,
    };
  }

  /**
   * Validate a TTAAII string
   *
   * @param input - TTAAII string to validate
   * @returns Validation result with errors if any
   */
  validate(input: string): ValidationResult {
    const normalizedInput = input.toUpperCase();
    const errors: ValidationError[] = [];
    const context = parseContext(normalizedInput);

    // Validate each character
    for (let i = 0; i < normalizedInput.length; i++) {
      const char = normalizedInput[i];
      const partialContext = parseContext(normalizedInput.slice(0, i));
      const result = validateCharacter(this.tables, char, i, partialContext);

      if (!result.valid) {
        errors.push({
          position: i,
          field: this.getFieldName(i),
          character: char,
          message: result.error || `Invalid character at position ${i}`,
        });
      }
    }

    return {
      valid: errors.length === 0,
      complete: normalizedInput.length === 6 && errors.length === 0,
      errors,
      context,
    };
  }

  /**
   * Decode a TTAAII string into human-readable format
   *
   * @param input - TTAAII string to decode
   * @returns Decoded TTAAII information
   */
  decode(input: string): DecodedTtaaii {
    const normalizedInput = input.toUpperCase();
    const context = parseContext(normalizedInput);
    const result: DecodedTtaaii = { input: normalizedInput };

    // Decode T1
    if (context.T1) {
      const t1Table = getT1Table(this.tables);
      const t1Entry = t1Table.entries.find(e => e.code === context.T1);
      if (t1Entry) {
        result.dataType = {
          code: t1Entry.code,
          label: t1Entry.label,
          priority: t1Entry.priority,
        };
      }
    }

    // Decode T2
    if (context.T1 && context.T2) {
      const t2Table = getT2Table(this.tables, context);
      if (t2Table) {
        const t2Entry = t2Table.entries.find(e => e.code === context.T2);
        if (t2Entry) {
          result.dataSubtype = {
            code: t2Entry.code,
            label: t2Entry.label,
            codeForm: t2Entry.codeForm,
          };
        }
      }
    }

    // Decode A1A2
    if (context.T1 && context.T2 && context.A1) {
      if (usesCountryTable(context.T1)) {
        // For country tables (C1), A1A2 form a 2-char country code
        if (context.A2) {
          const countryCode = context.A1 + context.A2;
          const countryEntry = getCountryEntry(this.tables, countryCode);
          if (countryEntry) {
            // Store country info in areaOrType1 (combined A1A2)
            result.areaOrType1 = {
              code: countryCode,
              label: countryEntry.label,
            };
            // areaOrTime2 not used for country codes
          }
        } else {
          // Only A1 available, show partial info
          result.areaOrType1 = {
            code: context.A1,
            label: `Countries starting with ${context.A1}`,
          };
        }
      } else {
        // For non-country tables, A1 and A2 are separate single-char codes
        const a1Table = getA1Table(this.tables, context);
        if (a1Table) {
          const a1Entry = a1Table.entries.find(e => e.code === context.A1);
          if (a1Entry) {
            result.areaOrType1 = {
              code: a1Entry.code,
              label: a1Entry.label,
            };
          }
        }

        // Decode A2 separately for non-country tables
        if (context.A2) {
          const a2Table = getA2Table(this.tables, context);
          if (a2Table) {
            const a2Entry = a2Table.entries.find(e => e.code === context.A2);
            if (a2Entry) {
              result.areaOrTime2 = {
                code: a2Entry.code,
                label: a2Entry.label,
              };
            }
          }
        }
      }
    }

    // Decode ii
    if (context.ii) {
      const iiTable = getIiTable(this.tables, context);
      if (iiTable) {
        const iiEntry = iiTable.entries.find(e => e.code === context.ii);
        if (iiEntry) {
          result.level = {
            code: iiEntry.code,
            label: iiEntry.label,
          };
        }
      }
    }

    return result;
  }

  /**
   * Get suggestions for a specific field
   *
   * Useful when you want to show options for a field independently
   * of the current input position.
   */
  getFieldSuggestions(
    field: 'T1' | 'T2' | 'A1' | 'A2' | 'ii',
    context: TtaaiiContext,
    options: CompletionOptions = {}
  ): { items: CompletionItem[]; groups?: CompletionGroup[] } {
    let table;

    switch (field) {
      case 'T1':
        table = getT1Table(this.tables);
        break;
      case 'T2':
        table = getT2Table(this.tables, context);
        break;
      case 'A1':
        table = getA1Table(this.tables, context);
        break;
      case 'A2':
        table = getA2Table(this.tables, context);
        break;
      case 'ii':
        table = getIiTable(this.tables, context);
        break;
    }

    if (!table) {
      return { items: [] };
    }

    const items = table.entries.map(e => this.entryToCompletionItem(e));

    let groups: CompletionGroup[] | undefined;
    if (options.groupBy) {
      groups = this.groupItems(items, options.groupBy);
    }

    return { items, groups };
  }

  /**
   * Convert a table entry to a completion item
   */
  private entryToCompletionItem(entry: TableEntry): CompletionItem {
    return {
      code: entry.code,
      label: entry.label,
      codeForm: entry.codeForm,
      priority: entry.priority,
      metadata: entry.metadata,
    };
  }

  /**
   * Group items based on groupBy option
   */
  private groupItems(
    items: CompletionItem[],
    groupBy: string
  ): CompletionGroup[] {
    // If groupBy matches a metadata field (e.g., 'continent'), use that
    if (groupBy === 'continent') {
      return this.groupByContinent(items);
    }

    // Default: no grouping
    return [];
  }

  /**
   * Group items by continent using metadata
   */
  private groupByContinent(items: CompletionItem[]): CompletionGroup[] {
    const continentMap = new Map<string, CompletionItem[]>();

    for (const item of items) {
      const continent = (item.metadata?.continent as string) || 'OTHER';
      if (!continentMap.has(continent)) {
        continentMap.set(continent, []);
      }
      continentMap.get(continent)!.push(item);
    }

    const groups: CompletionGroup[] = [];
    for (const [key, groupItems] of continentMap) {
      groups.push({
        key,
        label: CONTINENT_LABELS[key] || key,
        items: groupItems,
      });
    }

    // Sort groups by label, but put "Other" last
    groups.sort((a, b) => {
      if (a.key === 'OTHER') return 1;
      if (b.key === 'OTHER') return -1;
      return a.label.localeCompare(b.label);
    });

    return groups;
  }

  /**
   * Get field name for a position
   */
  private getFieldName(position: number): 'T1' | 'T2' | 'A1' | 'A2' | 'ii' {
    switch (position) {
      case 0: return 'T1';
      case 1: return 'T2';
      case 2: return 'A1';
      case 3: return 'A2';
      default: return 'ii';
    }
  }
}
