import {
  Component,
  ChangeDetectionStrategy,
  signal,
  computed,
  CUSTOM_ELEMENTS_SCHEMA,
  AfterViewInit,
  OnDestroy,
  OnInit,
  ElementRef,
  NgZone,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import {
  TtaaiiProvider,
  CompletionResult,
  CompletionItem,
  CompletionGroup,
  DecodedTtaaii,
  TtaaiiTables,
  VERSION,
} from '../../../../src';
import { environment } from '../../environments/environment';

// PrismJS for syntax highlighting
import Prism from 'prismjs';
import 'prismjs/components/prism-json';

// Register interactive-code custom elements
import { registerInteractiveCode } from '@softwarity/interactive-code';
registerInteractiveCode();

@Component({
  selector: 'app-playground',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatTooltipModule,
    MatSelectModule,
    MatTabsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './playground.component.html',
  styleUrl: './playground.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaygroundComponent implements OnInit, AfterViewInit, OnDestroy {
  private autoTrigger = viewChild<MatAutocompleteTrigger>(MatAutocompleteTrigger);
  private codeBindingListener?: () => void;

  // Library version
  protected readonly version = VERSION;

  // Available tables for i18n (loaded dynamically)
  private tablesMap = signal<Record<string, TtaaiiTables>>({});

  // Loading state
  protected isLoading = signal(true);

  constructor(
    private elementRef: ElementRef,
    private ngZone: NgZone
  ) {}

  // Language selection (en or fr)
  protected language = signal<'en' | 'fr'>('en');

  // Provider based on selected language
  private provider = computed(() => {
    const tables = this.tablesMap()[this.language()];
    return tables ? new TtaaiiProvider(tables) : null;
  });

  async ngOnInit(): Promise<void> {
    // Load tables dynamically to demonstrate i18n resource loading
    // In development: loads from /assets (local)
    // In production: loads from CDN (jsdelivr)
    const baseUrl = environment.tablesBaseUrl;
    const [tablesEn, tablesFr] = await Promise.all([
      fetch(`${baseUrl}/tables.en.json`).then(r => r.json()),
      fetch(`${baseUrl}/tables.fr.json`).then(r => r.json()),
    ]);

    this.tablesMap.set({
      en: tablesEn as TtaaiiTables,
      fr: tablesFr as TtaaiiTables,
    });
    this.isLoading.set(false);
  }

  // Input state - raw input value (may include filter characters)
  protected inputValue = signal('');

  // Committed length - characters that have been validated/selected
  protected committedLength = signal(0);

  // GroupBy value (undefined or 'continent')
  protected groupByValue = signal<string | undefined>(undefined);

  // GroupBy value for Angular framework example (uses [class.hidden] binding)
  protected angularGroupBy = signal<string | undefined>(undefined);

  // Committed input (validated characters only)
  protected committedInput = computed(() =>
    this.inputValue().slice(0, this.committedLength())
  );

  // Filter text (characters typed but not yet committed)
  protected filterText = computed(() =>
    this.inputValue().slice(this.committedLength())
  );

  // Completion result based on committed input
  protected completionResult = computed<CompletionResult | null>(() => {
    const provider = this.provider();
    if (!provider) return null;
    const input = this.committedInput();
    const groupBy = this.groupByValue();
    const options = groupBy ? { groupBy } : {};
    return provider.complete(input, options);
  });

  // Decoded TTAAII (based on committed input for accurate meanings)
  protected decoded = computed<DecodedTtaaii | null>(() => {
    const provider = this.provider();
    if (!provider) return null;
    return provider.decode(this.committedInput());
  });

  // JSON string for display (plain)
  protected decodedJson = computed(() => {
    const d = this.decoded();
    if (!d) return '{}';
    // Only include non-empty fields
    const clean: Record<string, unknown> = { input: this.committedInput() };
    if (d.dataType) clean['dataType'] = d.dataType;
    if (d.dataSubtype) clean['dataSubtype'] = d.dataSubtype;
    if (d.areaOrType1) clean['areaOrType1'] = d.areaOrType1;
    if (d.areaOrTime2) clean['areaOrTime2'] = d.areaOrTime2;
    if (d.level) clean['level'] = d.level;
    return JSON.stringify(clean, null, 2);
  });

  // Colorized JSON for display using PrismJS
  protected decodedJsonHtml = computed(() => {
    const json = this.decodedJson();
    return Prism.highlight(json, Prism.languages['json'], 'json');
  });

  // Filtered items for autocomplete (filtered by filterText)
  protected filteredItems = computed<CompletionItem[]>(() => {
    const result = this.completionResult();
    if (!result) return [];
    const items = result.items;
    const filter = this.filterText().toUpperCase();
    if (!filter) return items;

    // Filter items where code starts with filter text
    return items.filter((item) => item.code.toUpperCase().startsWith(filter));
  });

  // Groups for grouped display (filtered by filterText)
  protected groups = computed<CompletionGroup[] | undefined>(() => {
    const result = this.completionResult();
    if (!result) return undefined;
    const groups = result.groups;
    if (!groups) return undefined;

    const filter = this.filterText().toUpperCase();
    if (!filter) return groups;

    // Filter items within each group where code starts with filter
    const filteredGroups = groups
      .map((group) => ({
        ...group,
        items: group.items.filter((item) =>
          item.code.toUpperCase().startsWith(filter)
        ),
      }))
      .filter((group) => group.items.length > 0);

    return filteredGroups.length > 0 ? filteredGroups : undefined;
  });

  // Current field being edited (based on committed input)
  protected currentField = computed(() => this.completionResult()?.field ?? 'T1');

  // Is complete (based on committed input)
  protected isComplete = computed(() => this.completionResult()?.isComplete ?? false);

  // Position info (based on committed input)
  protected position = computed(() => this.completionResult()?.position ?? 0);

  // Field labels for display
  protected readonly fieldLabels: Record<string, string> = {
    T1: 'Data Type',
    T2: 'Data Subtype',
    A1: 'Area/Type 1',
    A2: 'Area/Type 2',
    ii: 'Level/Sequence',
  };

  openPanel(): void {
    this.autoTrigger()?.openPanel();
  }

  onInputChange(value: string): void {
    const upper = value.toUpperCase();
    let currentCommitted = this.committedLength();

    // If user deleted characters beyond committed, adjust committed length
    if (upper.length < currentCommitted) {
      // Handle ii field special case (positions 4-5 are together)
      if (currentCommitted === 6 && upper.length >= 4) {
        // If we had a complete ii and deleted part of it, remove both
        this.committedLength.set(4);
      } else {
        this.committedLength.set(upper.length);
      }
      this.inputValue.set(upper);
      setTimeout(() => this.autoTrigger()?.openPanel());
      return;
    }

    this.inputValue.set(upper);

    // Try to commit as many valid characters as possible
    const provider = this.provider();
    if (!provider) return;

    while (currentCommitted < upper.length && currentCommitted < 6) {
      const partialInput = upper.slice(0, currentCommitted);
      const result = provider.complete(partialInput);
      const field = result.field;

      if (field === 'ii') {
        // ii needs 2 characters
        const iiChars = upper.slice(currentCommitted, currentCommitted + 2);
        if (iiChars.length < 2) break; // Not enough chars for ii yet

        const match = result.items.find(item => item.code === iiChars);
        if (match) {
          currentCommitted += 2;
        } else {
          break; // Invalid ii, keep as filter
        }
      } else {
        // Single character fields (T1, T2, A1, A2)
        const char = upper[currentCommitted];
        const match = result.items.find(item => item.code === char);
        if (match) {
          currentCommitted++;
        } else {
          break; // Invalid char, keep as filter
        }
      }
    }

    this.committedLength.set(currentCommitted);

    // Open panel for next field if not complete, close if complete
    if (currentCommitted >= 6) {
      setTimeout(() => this.autoTrigger()?.closePanel());
    } else if (upper.length < 6) {
      setTimeout(() => this.autoTrigger()?.openPanel());
    }
  }

  selectOption(item: CompletionItem): void {
    const committed = this.committedInput();
    const newValue = committed + item.code;
    this.inputValue.set(newValue);
    this.committedLength.set(newValue.length);

    // Open panel for next field if not complete
    if (newValue.length < 6) {
      setTimeout(() => this.autoTrigger()?.openPanel());
    }
  }

  clearInput(): void {
    this.inputValue.set('');
    this.committedLength.set(0);
  }

  backspace(): void {
    const current = this.inputValue();
    const committed = this.committedLength();

    if (current.length > 0) {
      // First remove filter characters if any
      if (current.length > committed) {
        this.inputValue.set(current.slice(0, -1));
      } else {
        // Remove committed character
        // For ii field (position 4-5), remove both characters if we're at position 6
        if (committed === 6) {
          this.inputValue.set(current.slice(0, 4));
          this.committedLength.set(4);
        } else {
          this.inputValue.set(current.slice(0, -1));
          this.committedLength.set(Math.max(0, committed - 1));
        }
      }
      // Reopen panel after backspace
      setTimeout(() => this.autoTrigger()?.openPanel());
    }
  }

  ngAfterViewInit(): void {
    // Listen to all code-binding change events using event delegation
    const handler = (event: Event) => {
      const target = event.target as HTMLElement;
      if (target.tagName !== 'CODE-BINDING') return;

      const key = target.getAttribute('key');
      const customEvent = event as CustomEvent<string>;
      let value = customEvent.detail;

      // Strip surrounding quotes from the value (interactive-code sends "'continent'" not "continent")
      if (value && value.startsWith("'") && value.endsWith("'")) {
        value = value.slice(1, -1);
      }
      const finalValue = value === 'undefined' ? undefined : value;

      this.ngZone.run(() => {
        switch (key) {
          case 'tablesFile':
            // Extract language from tables.xx.json
            if (value === 'tables.fr.json') {
              this.language.set('fr');
            } else {
              this.language.set('en');
            }
            break;
          case 'groupBy':
            this.groupByValue.set(finalValue);
            break;
          case 'angularGroupBy':
            this.angularGroupBy.set(finalValue);
            break;
        }
      });
    };

    // Use capturing phase to catch events before they bubble
    this.elementRef.nativeElement.addEventListener('change', handler, true);
    this.codeBindingListener = () =>
      this.elementRef.nativeElement.removeEventListener('change', handler, true);
  }

  ngOnDestroy(): void {
    this.codeBindingListener?.();
  }

  // Display function for autocomplete - returns the full TTAAII code
  displayFn = (item: CompletionItem): string => {
    if (!item) return '';
    // Return the committed input + the selected code
    return this.committedInput() + item.code;
  };

  // Track function for ngFor
  trackByCode = (_index: number, item: CompletionItem): string => item.code;
  trackByKey = (_index: number, group: CompletionGroup): string => group.key;
}
