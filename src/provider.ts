import type {
  TtaaiiProviderConfig,
  CompletionOptions,
  CompletionResult,
  CompletionItem,
  CompletionGroup,
  ValidationResult,
  ValidationError,
  DecodedTtaaii,
  TtaaiiContext,
  TableEntry,
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
} from './grammar';

import { CONTINENT_LABELS } from './grammar/tables/table-c1';

/**
 * TTAAII completion provider
 *
 * Provides context-aware completion suggestions for WMO TTAAII codes.
 * UI-agnostic - can be used with any autocomplete implementation.
 */
export class TtaaiiProvider {
  private config: TtaaiiProviderConfig;

  constructor(config: TtaaiiProviderConfig = {}) {
    this.config = {
      locale: config.locale || 'en',
      regional: config.regional,
    };
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
    const { position, field, table, context } = resolveTable(normalizedInput);

    const items: CompletionItem[] = [];
    let groups: CompletionGroup[] | undefined;

    if (table) {
      // Convert table entries to completion items
      for (const entry of table.entries) {
        items.push(this.entryToCompletionItem(entry));
      }

      // Handle grouping if requested
      if (options.groupBy && table.groups) {
        groups = this.groupItems(items, table.groups, options.groupBy);
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
      const result = validateCharacter(char, i, partialContext);

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
      const t1Table = getT1Table();
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
      const t2Table = getT2Table(context);
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

    // Decode A1
    if (context.T1 && context.T2 && context.A1) {
      const a1Table = getA1Table(context);
      if (a1Table) {
        // For C1 table, A1 might be first character of 2-char code
        const a1Entry = a1Table.entries.find(e =>
          e.code === context.A1 ||
          (e.code.length === 2 && e.code[0] === context.A1)
        );
        if (a1Entry) {
          result.areaOrType1 = {
            code: a1Entry.code,
            label: a1Entry.label,
          };
        }
      }
    }

    // Decode A2
    if (context.T1 && context.T2 && context.A1 && context.A2) {
      const a2Table = getA2Table(context);
      if (a2Table) {
        // For C1 table (countries), combine A1A2
        const combinedCode = context.A1 + context.A2;
        let a2Entry = a2Table.entries.find(e => e.code === combinedCode);

        // If not found as combined, try single character
        if (!a2Entry) {
          a2Entry = a2Table.entries.find(e => e.code === context.A2);
        }

        if (a2Entry) {
          result.areaOrTime2 = {
            code: a2Entry.code,
            label: a2Entry.label,
          };
        }
      }
    }

    // Decode ii
    if (context.ii) {
      const iiTable = getIiTable(context);
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

    if (!table) {
      return { items: [] };
    }

    const items = table.entries.map(e => this.entryToCompletionItem(e));

    let groups: CompletionGroup[] | undefined;
    if (options.groupBy && table.groups) {
      groups = this.groupItems(items, table.groups, options.groupBy);
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
   * Group items based on table groups and groupBy option
   */
  private groupItems(
    items: CompletionItem[],
    tableGroups: { key: string; label: string; codes: string[] }[],
    groupBy: string
  ): CompletionGroup[] {
    // If groupBy matches a metadata field (e.g., 'continent'), use that
    if (groupBy === 'continent') {
      return this.groupByContinent(items);
    }

    // Otherwise use table-defined groups
    const groups: CompletionGroup[] = [];
    const usedCodes = new Set<string>();

    for (const group of tableGroups) {
      const groupItems = items.filter(item => group.codes.includes(item.code));
      if (groupItems.length > 0) {
        groups.push({
          key: group.key,
          label: group.label,
          items: groupItems,
        });
        groupItems.forEach(item => usedCodes.add(item.code));
      }
    }

    // Add ungrouped items to "Other" group
    const ungrouped = items.filter(item => !usedCodes.has(item.code));
    if (ungrouped.length > 0) {
      groups.push({
        key: 'OTHER',
        label: 'Other',
        items: ungrouped,
      });
    }

    return groups;
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
