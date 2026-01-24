# @softwarity/ttaaii-provider

A **UI-agnostic** TypeScript library for WMO TTAAII code completion, validation, and decoding.

This library provides the data and logic layer only - it can be used with **any UI framework** (Angular, React, Vue.js, Svelte, or vanilla JavaScript).

TTAAII is a 6-character code used in meteorological bulletins following the [WMO-No. 386](https://library.wmo.int/records/item/35713-manual-on-the-global-telecommunication-system) specification.

## Installation

```bash
npm install @softwarity/ttaaii-provider
```

## Basic Usage

```typescript
import { TtaaiiProvider } from '@softwarity/ttaaii-provider';

const provider = new TtaaiiProvider();

// Get completions for current input
const result = provider.complete('SA');
console.log(result.field);  // 'A1'
console.log(result.items);  // [{ code: 'A', label: 'Afghanistan' }, ...]

// Decode a TTAAII code
const decoded = provider.decode('SAFR01');
console.log(decoded.dataType?.label);     // 'Surface data'
console.log(decoded.dataSubtype?.label);  // 'Aviation routine reports'

// Validate a code
const validation = provider.validate('SAFR01');
console.log(validation.valid);     // true
console.log(validation.complete);  // true
```

## Framework Examples

### Angular

```typescript
import { Component, signal, computed } from '@angular/core';
import { TtaaiiProvider, CompletionResult } from '@softwarity/ttaaii-provider';

@Component({
  selector: 'app-ttaaii-input',
  template: `
    <input [value]="input()" (input)="onInput($event)" [matAutocomplete]="auto" />
    <mat-autocomplete #auto>
      @for (item of completions().items; track item.code) {
        <mat-option [value]="item.code">{{ item.code }} - {{ item.label }}</mat-option>
      }
    </mat-autocomplete>
  `
})
export class TtaaiiInputComponent {
  private provider = new TtaaiiProvider();

  input = signal('');
  completions = computed(() => this.provider.complete(this.input()));

  onInput(event: Event) {
    this.input.set((event.target as HTMLInputElement).value.toUpperCase());
  }
}
```

### React

```tsx
import { useState, useMemo } from 'react';
import { TtaaiiProvider } from '@softwarity/ttaaii-provider';

const provider = new TtaaiiProvider();

function TtaaiiInput() {
  const [input, setInput] = useState('');
  const completions = useMemo(() => provider.complete(input), [input]);

  return (
    <div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value.toUpperCase())}
        maxLength={6}
      />
      <ul>
        {completions.items.map((item) => (
          <li key={item.code} onClick={() => setInput(input + item.code)}>
            <strong>{item.code}</strong> - {item.label}
          </li>
        ))}
      </ul>
      {completions.isComplete && <span>✓ Complete</span>}
    </div>
  );
}
```

### Vue.js

```vue
<script setup lang="ts">
import { ref, computed } from 'vue';
import { TtaaiiProvider } from '@softwarity/ttaaii-provider';

const provider = new TtaaiiProvider();
const input = ref('');

const completions = computed(() => provider.complete(input.value));

function onInput(event: Event) {
  input.value = (event.target as HTMLInputElement).value.toUpperCase();
}

function selectItem(code: string) {
  input.value += code;
}
</script>

<template>
  <input :value="input" @input="onInput" maxlength="6" />
  <ul>
    <li v-for="item in completions.items" :key="item.code" @click="selectItem(item.code)">
      <strong>{{ item.code }}</strong> - {{ item.label }}
    </li>
  </ul>
  <span v-if="completions.isComplete">✓ Complete</span>
</template>
```

## Grouped Completions

Group countries by continent for better UX:

```typescript
// Flat list (default)
const result = provider.complete('SA');
// result.items = [{ code: 'A', label: 'Afghanistan' }, ...]

// Grouped by continent
const result = provider.complete('SA', { groupBy: 'continent' });
// result.groups = [
//   { key: 'EU', label: 'Europe', items: [...] },
//   { key: 'AF', label: 'Africa', items: [...] },
//   ...
// ]
```

## Custom Tables (i18n/Localization)

The provider accepts custom tables for localization or customization:

```typescript
import { TtaaiiProvider, defaultTables, TtaaiiTables } from '@softwarity/ttaaii-provider';

// Create localized tables
const frenchTables: TtaaiiTables = {
  ...defaultTables,
  A: {
    ...defaultTables.A,
    entries: defaultTables.A.entries.map(entry => ({
      ...entry,
      label: translateToFrench(entry.label)
    }))
  },
  // ... localize other tables as needed
};

const provider = new TtaaiiProvider(frenchTables);
```

## API

### TtaaiiProvider

#### Constructor

```typescript
new TtaaiiProvider(tables?: TtaaiiTables)
```

- `tables` - Optional custom tables (defaults to built-in WMO tables)

#### Methods

##### `complete(input: string, options?: CompletionOptions): CompletionResult`

Get completion suggestions for a partial TTAAII string.

- `input` - Current input (0-6 characters)
- `options.groupBy` - Group results (e.g., 'continent')

Returns:
- `position` - Current position (0-5)
- `field` - Current field ('T1', 'T2', 'A1', 'A2', 'ii')
- `items` - Completion items
- `groups` - Grouped items (when groupBy is specified)
- `isComplete` - True if code is complete (6 characters)
- `context` - Parsed context

##### `validate(input: string): ValidationResult`

Validate a TTAAII string.

Returns:
- `valid` - Whether the code is valid
- `complete` - Whether the code is complete
- `errors` - Validation errors
- `context` - Parsed context

##### `decode(input: string): DecodedTtaaii`

Decode a TTAAII string into human-readable format.

Returns:
- `dataType` - T1 decoded (code, label, priority)
- `dataSubtype` - T2 decoded (code, label, codeForm)
- `areaOrType1` - A1 decoded
- `areaOrTime2` - A2 decoded
- `level` - ii decoded

##### `getFieldSuggestions(field, context, options): { items, groups }`

Get suggestions for a specific field independently.

## TTAAII Format

```
T1 T2 A1 A2 ii
│  │  │  │  └── Level/sequence indicator (2 digits)
│  │  │  └───── Area or time indicator
│  │  └──────── Area or type indicator
│  └─────────── Data subtype (depends on T1)
└────────────── Data type (A-Z)
```

### Common T1 Values

| Code | Label | Description |
|------|-------|-------------|
| A | Analyses | Weather analyses |
| F | Forecasts | Weather forecasts |
| S | Surface data | Surface observations |
| U | Upper-air data | Upper-air observations |
| W | Warnings | Weather warnings |
| T | Satellite data | Satellite imagery |
| I | BUFR | Binary data (BUFR format) |
| K | CREX | Character data (CREX format) |

## Development

```bash
# Install dependencies
npm install

# Run tests
npm test

# Build library
npm run build

# Run demo (Angular)
npm start
```

## License

MIT
