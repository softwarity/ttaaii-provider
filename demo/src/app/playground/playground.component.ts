import {
  Component,
  ChangeDetectionStrategy,
  signal,
  computed,
  CUSTOM_ELEMENTS_SCHEMA,
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
import {
  TtaaiiProvider,
  CompletionResult,
  CompletionItem,
  CompletionGroup,
  DecodedTtaaii,
} from '../../../../src';
import { viewChild } from '@angular/core';

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
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './playground.component.html',
  styleUrl: './playground.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaygroundComponent {
  private provider = new TtaaiiProvider();
  private autoTrigger = viewChild<MatAutocompleteTrigger>(MatAutocompleteTrigger);

  // Input state
  protected inputValue = signal('');
  protected groupByContinent = signal(false);

  // Completion result
  protected completionResult = computed<CompletionResult>(() => {
    const input = this.inputValue();
    const options = this.groupByContinent() ? { groupBy: 'continent' } : {};
    return this.provider.complete(input, options);
  });

  // Decoded TTAAII
  protected decoded = computed<DecodedTtaaii>(() => {
    return this.provider.decode(this.inputValue());
  });

  // JSON string for display
  protected decodedJson = computed(() => {
    const d = this.decoded();
    // Only include non-empty fields
    const clean: Record<string, unknown> = { input: d.input };
    if (d.dataType) clean['dataType'] = d.dataType;
    if (d.dataSubtype) clean['dataSubtype'] = d.dataSubtype;
    if (d.areaOrType1) clean['areaOrType1'] = d.areaOrType1;
    if (d.areaOrTime2) clean['areaOrTime2'] = d.areaOrTime2;
    if (d.level) clean['level'] = d.level;
    return JSON.stringify(clean, null, 2);
  });

  // Filtered items for autocomplete
  protected filteredItems = computed<CompletionItem[]>(() => {
    return this.completionResult().items;
  });

  // Groups for grouped display
  protected groups = computed<CompletionGroup[] | undefined>(() => {
    return this.completionResult().groups;
  });

  // Current field being edited
  protected currentField = computed(() => this.completionResult().field);

  // Is complete
  protected isComplete = computed(() => this.completionResult().isComplete);

  // Position info
  protected position = computed(() => this.completionResult().position);

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
    this.inputValue.set(value.toUpperCase());
  }

  selectOption(item: CompletionItem): void {
    const currentInput = this.inputValue();

    // Append the selected code to the input
    this.inputValue.set(currentInput + item.code);
  }

  clearInput(): void {
    this.inputValue.set('');
  }

  backspace(): void {
    const current = this.inputValue();
    if (current.length > 0) {
      // For ii field (position 4-5), remove both characters if we're at position 6
      if (current.length === 6) {
        this.inputValue.set(current.slice(0, 4));
      } else {
        this.inputValue.set(current.slice(0, -1));
      }
    }
  }

  toggleGrouping(): void {
    this.groupByContinent.update((g) => !g);
  }

  // Display function for autocomplete
  displayFn = (item: CompletionItem): string => {
    return item ? `${item.code} - ${item.label}` : '';
  };

  // Track function for ngFor
  trackByCode = (_index: number, item: CompletionItem): string => item.code;
  trackByKey = (_index: number, group: CompletionGroup): string => group.key;
}
