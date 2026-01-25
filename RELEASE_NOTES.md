# Release Notes

## 1.0.10

---

## 1.0.9

---

## 1.0.8

### Features

- **VERSION export**: Library version is now accessible via API
  - `import { VERSION } from '@softwarity/ttaaii-provider'`
  - Version is injected at build time from package.json
  - Demo playground displays current version

### Improvements

- **Cleaner CDN URLs for table files**:
  - Tables are now published at package root: `@softwarity/ttaaii-provider@x.x.x/tables.{lang}.json`
  - No longer requires `/dist/` in the path
  - Both jsDelivr and unpkg CDNs supported

---

## 1.0.7

### Features

- **Localization support for generated labels**:
  - Added `localization` section to tables.json files
  - `countriesStartingWith`: template for A1 country prefix labels (e.g., "Pays commençant par {char} ({count} entrées)")
  - `countriesOrOceanAreas`: template for combined A2 labels
  - `continents`: localized continent names for groupBy feature
  - French and English tables now include full localization

### Improvements

- All generated labels (country prefixes, continents) now use localized strings from tables
- Fallback to English defaults when localization is missing

---

## 1.0.6

### Bug Fixes

- **Fixed ambiguous A1 codes (F, V, W) handling**:
  - F, V, W are now available as BOTH country prefixes AND C2 station types
  - When A1 is F/V/W, A2 options include both country codes and ocean areas
  - Decoding uses smart detection: checks if A2 is a valid country before assuming C2 interpretation
  - Example: "SAFR01" now correctly decodes as Surface/Aviation/France (not Floats)

- **Fixed ii validation for second digit**:
  - `parseContext` now captures partial ii (5 characters) for proper validation
  - Validation of "SAFR01" now works correctly

### Tests

- **Added regression tests for country codes with ambiguous A1**:
  - Tests for SAFR completion (France)
  - Tests for SAFR01 validation and decoding
  - Tests for F as country prefix in A1 options
  - Tests for combined C1/C2 options in A2 when A1=F

### Documentation

- **Improved groupBy explanation**:
  - README now explains that WMO country list has 200+ entries
  - Demo playground includes explanation for groupBy feature
  - Better code examples showing flat vs grouped display

---

## 1.0.5

### Features

- **CDN-based table loading**:
  - Tables (`tables.en.json`, `tables.fr.json`) are now loaded dynamically via CDN in production
  - Development mode uses local assets, production mode uses jsDelivr CDN
  - Enables lazy loading of localization resources
  - CDN URLs: `https://cdn.jsdelivr.net/npm/@softwarity/ttaaii-provider/dist/tables.{lang}.json`

### Documentation

- **Updated README with i18n section**:
  - Pre-built localized tables (EN, FR) available via CDN
  - CDN URLs (jsDelivr, unpkg)
  - Simple custom tables workflow: download, edit labels, host

### Improvements

- **Demo playground**:
  - Dynamic table loading with environment-based URLs
  - Loading state handling during table fetch

---

## 1.0.4

### Features

- **WMO-386 table reference in responses**:
  - All `CompletionItem` now include a `table` field indicating which WMO-386 table the entry comes from
  - `decode()` results include `table` field in each decoded field (dataType, dataSubtype, areaOrType1, areaOrTime2, level)
  - Autocomplete dropdown displays table ID as watermark (top-right corner)

- **Complete T1=X (CAP messages) mapping**:
  - Added T2 → B2 (GRIB data types)
  - Added A1 → C3 (geographical area)
  - Added A2 → C5 (regional reference time)
  - Added ii → D2 (level designator)

- **Complete T1=V (National data) mapping**:
  - Added T2 → B2 (or national table)
  - A1/A2 use C1 (country codes)

### Tests

- **WMO-386 Table A comprehensive coverage**:
  - Added 98 tests covering all T1 values (A-Z)
  - Tests verify correct T2, A1, A2, and ii table mappings
  - Includes special cases: C1/C2 combined tables for S and U, D3_FA/D3_UA for aviation
  - Validates unused T1 values (B, M, R, Z) return null

### Improvements

- Added tooltips on truncated text in decoded field display
- Improved mat-chip icon vertical alignment using `matChipAvatar`

---

## 1.0.3

### Features

- **C2 table support for ships and oceanographic data**:
  - Added station type handling (W = Ocean weather stations, V = Mobile ships, F = Floats)
  - For T1=S (Surface) and T1=U (Upper-air), A1 now supports both C1 (countries) and C2 (station types)
  - A2 dynamically uses C2 (ocean areas) when A1 is a C2 station type, otherwise C1 (countries)
  - `isC2StationType()` helper function exported

- **Table metadata in entries**:
  - C1/C2 combined entries include `metadata.table` to indicate source table
  - Enables proper display of which WMO-386 table each option comes from

- **i18n improvements**:
  - Tables now exported as separate files: `tables.en.json` and `tables.fr.json`
  - C2 table entries (A1 and A2) added to both language files
  - Build process copies JSON tables to dist

### Improvements

- **Demo playground enhancements**:
  - Integrated PrismJS for JSON syntax highlighting in code display
  - Added interactive code examples with framework tabs (Angular, React, Vue)
  - Improved visual feedback for filtering state

### Bug Fixes

- Fixed C2 A1 codes not being available for T1=S and T1=U data types
- Fixed ocean area designators (C2 A2) not showing when A1 is W, V, or F

---

## 1.0.2

### Bug Fixes

- **Fixed A1A2 country code handling**: Country codes (Table C1) are now properly treated as 2-character combined codes
  - A1 position returns first character options (e.g., "F" for countries starting with F)
  - A2 position returns countries filtered by A1 (e.g., "FR" → France)
  - `decode()` now combines A1A2 into `areaOrType1` for country codes
  - Non-country tables (BUFR, GRID, etc.) continue to use separate A1/A2 values

- **Fixed table mappings per WMO-386 specification**:
  - Corrected T1 → A1/A2 table mappings for T (Satellite), P (Pictorial), O (Oceanographic), J (BUFR forecast)
  - Added proper ii table references for J, P, Q data types

### Improvements

- Updated demo to display combined country codes correctly
- Improved documentation with A1A2 interpretation details

---


## 1.0.1

### Features

- **TtaaiiProvider class**: UI-agnostic provider for WMO TTAAII code handling
  - `complete(input, options)`: Context-aware completion suggestions
  - `validate(input)`: Full validation with detailed error messages
  - `decode(input)`: Human-readable decoding of TTAAII codes
  - `getFieldSuggestions(field, context)`: Field-specific suggestions

- **Completion system**:
  - Position-aware suggestions based on current input
  - Support for all TTAAII fields (T1, T2, A1, A2, ii)
  - `groupBy: 'continent'` option for country grouping
  - Returns `isComplete` flag when code reaches 6 characters

- **Validation**:
  - Character-by-character validation
  - Context-sensitive rules (T2 depends on T1, etc.)
  - Detailed error reporting with position and field info

- **Decoding**:
  - Translates codes to human-readable labels
  - Includes data type, subtype, area, and level information
  - Code form references (FM codes, TEXT, etc.)

- **Custom tables support**:
  - Override default WMO tables for i18n/localization
  - `defaultTables` export for customization base
  - Full TypeScript types for table structure

- **Grammar module exports**:
  - `parseContext`, `resolveTable`, `validateCharacter`
  - `getT1Table`, `getT2Table`, `getA1Table`, `getA2Table`, `getIiTable`
  - For advanced usage and custom implementations

### Documentation

- Angular, React, and Vue.js usage examples
- Interactive playground demo (Angular)
- Complete API documentation in README
