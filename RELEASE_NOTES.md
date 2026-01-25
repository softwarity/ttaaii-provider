# Release Notes


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
