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
console.log(result.items);  // [{ code: 'A', label: 'Countries starting with A' }, ...]

// For country codes, A1 gives first letter options, A2 gives countries
const a2Result = provider.complete('SAF');
console.log(a2Result.field);  // 'A2'
console.log(a2Result.items);  // [{ code: 'A', label: 'Faroe Islands' }, { code: 'R', label: 'France' }, ...]

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

## Grouped Completions (Countries by Continent)

The WMO country list contains **200+ entries**, making it difficult to navigate in a flat autocomplete. The `groupBy: 'continent'` option organizes countries into geographical sections for better UX:

```typescript
// Without grouping: flat list of all countries starting with 'F'
const flat = provider.complete('SAF');
// flat.items = [
//   { code: 'A', label: 'South Africa' },
//   { code: 'G', label: 'French Guiana' },
//   { code: 'I', label: 'Fiji' },
//   { code: 'R', label: 'France' },
//   ... (many more)
// ]

// With grouping: countries organized by continent
const grouped = provider.complete('SAF', { groupBy: 'continent' });
// grouped.groups = [
//   { key: 'EU', label: 'Europe', items: [
//     { code: 'L', label: 'Finland' },
//     { code: 'N', label: 'Faroe Islands' },
//     { code: 'R', label: 'France' },
//   ]},
//   { key: 'AF', label: 'Africa', items: [
//     { code: 'A', label: 'South Africa' },
//   ]},
//   { key: 'OC', label: 'Oceania', items: [
//     { code: 'I', label: 'Fiji' },
//   ]},
//   { key: 'SA', label: 'South America', items: [
//     { code: 'G', label: 'French Guiana' },
//     { code: 'K', label: 'Falkland Islands' },
//   ]},
// ]
```

Use `result.groups` for grouped display (e.g., `<mat-optgroup>` in Angular Material) or `result.items` for flat list.

## Internationalization (i18n)

### Pre-built Localized Tables

The library provides pre-built tables in English and French, available via CDN:

```typescript
// Using dynamic import (recommended for lazy loading)
// Replace @x.x.x with the version you want (e.g., @1.0.8)
const tables = await fetch('https://cdn.jsdelivr.net/npm/@softwarity/ttaaii-provider@1.0.8/tables.fr.json')
  .then(r => r.json());

const provider = new TtaaiiProvider(tables);
```

Available table files:
- `tables.en.json` - English labels
- `tables.fr.json` - French labels

CDN URLs (replace `@x.x.x` with the desired version):
- jsDelivr: `https://cdn.jsdelivr.net/npm/@softwarity/ttaaii-provider@x.x.x/tables.{lang}.json`
- unpkg: `https://unpkg.com/@softwarity/ttaaii-provider@x.x.x/tables.{lang}.json`

> **Note**: Without a version (e.g., `@softwarity/ttaaii-provider/tables.fr.json`), the CDN will serve the latest version. For production, always pin to a specific version to ensure compatibility.

### Bundled Import (static)

For bundlers that support JSON imports:

```typescript
import tables from '@softwarity/ttaaii-provider/tables.fr.json';
import { TtaaiiProvider } from '@softwarity/ttaaii-provider';

const provider = new TtaaiiProvider(tables);
```

### Custom Tables

To create a custom translation or modify labels:

1. Download a table file (e.g., `tables.en.json`) from CDN
2. Edit the `label` fields as needed
3. Use it in your application

```typescript
import customTables from './my-tables.json';
const provider = new TtaaiiProvider(customTables);
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
- `areaOrType1` - A1 decoded (for country codes, contains combined A1A2 country info)
- `areaOrTime2` - A2 decoded (for non-country tables only, e.g., reference time)
- `level` - ii decoded

**Note on Country Codes**: For most T1 values (A, C, E, F, L, N, S, U, V, W), A1A2 forms a 2-character ISO country code (e.g., "FR" for France). In this case, `areaOrType1` contains the combined country code and name. For other T1 values (BUFR, GRID, etc.), A1 and A2 are decoded separately.

##### `getFieldSuggestions(field, context, options): { items, groups }`

Get suggestions for a specific field independently.

## TTAAII Format

```
T1 T2 A1 A2 ii
│  │  │  │  └── Level/sequence indicator (2 digits)
│  │  └──┴───── A1A2: Country code (FR, US, etc.) OR
│  │            A1: Area/type, A2: Time reference (for BUFR, GRID)
│  └─────────── Data subtype (depends on T1)
└────────────── Data type (A-Z)
```

**A1A2 Interpretation**:
- **Country codes** (T1 = A, C, E, F, L, N, S, U, V, W): A1A2 forms a 2-character ISO country/territory code
- **BUFR/CREX** (T1 = I, J, K): A1 = data type, A2 = geographical area
- **GRID/GRIB** (T1 = D, G, H, O, P, Q, T, Y): A1 = geographical area, A2 = reference time

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
