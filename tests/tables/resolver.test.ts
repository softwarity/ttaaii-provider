import { describe, it, expect } from 'vitest';
import {
  parseContext,
  resolveTable,
  getFieldAtPosition,
  getT1Table,
  getT2Table,
  getA1Table,
  getA2Table,
  getIiTable,
} from '../../src/grammar/resolver';
import type { TtaaiiTables } from '../../src/types';
import defaultTables from '../../src/grammar/data/tables.en.json';

const tables = defaultTables as TtaaiiTables;

describe('resolver', () => {
  describe('parseContext()', () => {
    it('should parse empty string', () => {
      const context = parseContext('');
      expect(context.T1).toBeUndefined();
      expect(context.T2).toBeUndefined();
    });

    it('should parse T1 only', () => {
      const context = parseContext('A');
      expect(context.T1).toBe('A');
      expect(context.T2).toBeUndefined();
    });

    it('should parse T1T2', () => {
      const context = parseContext('AC');
      expect(context.T1).toBe('A');
      expect(context.T2).toBe('C');
      expect(context.A1).toBeUndefined();
    });

    it('should parse full TTAAII', () => {
      const context = parseContext('ACFR01');
      expect(context.T1).toBe('A');
      expect(context.T2).toBe('C');
      expect(context.A1).toBe('F');
      expect(context.A2).toBe('R');
      expect(context.ii).toBe('01');
    });
  });

  describe('getFieldAtPosition()', () => {
    it('should return T1 for position 0', () => {
      expect(getFieldAtPosition(0)).toBe('T1');
    });

    it('should return T2 for position 1', () => {
      expect(getFieldAtPosition(1)).toBe('T2');
    });

    it('should return A1 for position 2', () => {
      expect(getFieldAtPosition(2)).toBe('A1');
    });

    it('should return A2 for position 3', () => {
      expect(getFieldAtPosition(3)).toBe('A2');
    });

    it('should return ii for positions 4 and 5', () => {
      expect(getFieldAtPosition(4)).toBe('ii');
      expect(getFieldAtPosition(5)).toBe('ii');
    });
  });

  describe('getT1Table()', () => {
    it('should return Table A with all T1 entries', () => {
      const table = getT1Table(tables);

      expect(table.id).toBe('A');
      expect(table.entries.length).toBeGreaterThan(20);

      const codes = table.entries.map(e => e.code);
      expect(codes).toContain('A');
      expect(codes).toContain('F');
      expect(codes).toContain('S');
    });
  });

  describe('getT2Table()', () => {
    it('should return B1 entries for T1=A (Analyses)', () => {
      const table = getT2Table(tables, { T1: 'A' });

      expect(table).not.toBeNull();
      expect(table!.id).toBe('B1');

      const codes = table!.entries.map(e => e.code);
      expect(codes).toContain('C'); // Cyclone
      expect(codes).toContain('S'); // Surface
    });

    it('should return B1 entries for T1=F (Forecasts)', () => {
      const table = getT2Table(tables, { T1: 'F' });

      expect(table).not.toBeNull();
      const codes = table!.entries.map(e => e.code);
      expect(codes).toContain('A'); // Aviation area
      expect(codes).toContain('C'); // TAF
      expect(codes).toContain('Z'); // MAFOR
    });

    it('should return B2 entries for T1=D (GRID)', () => {
      const table = getT2Table(tables, { T1: 'D' });

      expect(table).not.toBeNull();
      expect(table!.id).toBe('B2');

      const codes = table!.entries.map(e => e.code);
      expect(codes).toContain('T'); // Temperature
      expect(codes).toContain('W'); // Wind
    });

    it('should return B3 entries for T1=I (BUFR)', () => {
      const table = getT2Table(tables, { T1: 'I' });

      expect(table).not.toBeNull();
      expect(table!.id).toBe('B3');

      const codes = table!.entries.map(e => e.code);
      expect(codes).toContain('S'); // Surface
      expect(codes).toContain('U'); // Upper-air
    });

    it('should return B4 entries for T1=O (Oceanographic GRIB)', () => {
      const table = getT2Table(tables, { T1: 'O' });

      expect(table).not.toBeNull();
      expect(table!.id).toBe('B4');

      const codes = table!.entries.map(e => e.code);
      expect(codes).toContain('T'); // Temperature
      expect(codes).toContain('S'); // Salinity
    });

    it('should return B5 entries for T1=E (Satellite imagery)', () => {
      const table = getT2Table(tables, { T1: 'E' });

      expect(table).not.toBeNull();
      expect(table!.id).toBe('B5');

      const codes = table!.entries.map(e => e.code);
      expect(codes).toContain('I'); // Infrared
      expect(codes).toContain('V'); // Visible
    });

    it('should return B6 entries for T1=P (Pictorial)', () => {
      const table = getT2Table(tables, { T1: 'P' });

      expect(table).not.toBeNull();
      expect(table!.id).toBe('B6');
    });

    it('should return B7 entries for T1=L (Aviation XML)', () => {
      const table = getT2Table(tables, { T1: 'L' });

      expect(table).not.toBeNull();
      expect(table!.id).toBe('B7');

      const codes = table!.entries.map(e => e.code);
      expect(codes).toContain('A'); // METAR
      expect(codes).toContain('S'); // SIGMET
    });

    it('should return C7_T2 entries for T1=K (CREX)', () => {
      const table = getT2Table(tables, { T1: 'K' });

      expect(table).not.toBeNull();
      expect(table!.id).toBe('C7_T2');

      const codes = table!.entries.map(e => e.code);
      expect(codes).toContain('S'); // Surface
      expect(codes).toContain('U'); // Upper-air
    });

    it('should return null for invalid T1', () => {
      const table = getT2Table(tables, { T1: 'Z' });
      expect(table).toBeNull();
    });

    it('should return B2 entries for T1=V (National data)', () => {
      const table = getT2Table(tables, { T1: 'V' });

      expect(table).not.toBeNull();
      expect(table!.id).toBe('B2');
    });

    it('should return B2 entries for T1=X (CAP messages)', () => {
      const table = getT2Table(tables, { T1: 'X' });

      expect(table).not.toBeNull();
      expect(table!.id).toBe('B2');
    });
  });

  describe('getA1Table()', () => {
    it('should return C1 (first chars of countries) for simple data types', () => {
      const table = getA1Table(tables, { T1: 'A', T2: 'C' });

      expect(table).not.toBeNull();
      expect(table!.id).toBe('C1');
      // Should return unique first characters of country codes (A-Z that have countries)
      expect(table!.entries.length).toBeGreaterThan(15);
      expect(table!.entries.length).toBeLessThan(27); // At most 26 letters
      // Each entry should be a single character
      expect(table!.entries.every(e => e.code.length === 1)).toBe(true);
    });

    it('should return C1/C2 combined entries for T1=S (surface obs)', () => {
      const table = getA1Table(tables, { T1: 'S', T2: 'A' });

      expect(table).not.toBeNull();
      expect(table!.id).toBe('C1/C2');

      const codes = table!.entries.map(e => e.code);
      // Should include C2 station types (W, V, F)
      expect(codes).toContain('W'); // Ocean weather stations
      expect(codes).toContain('V'); // Mobile ships
      expect(codes).toContain('F'); // Floats
      // Should also include country first chars (excluding W, V, F which are C2)
      expect(codes).toContain('A'); // Countries starting with A
      expect(codes).toContain('U'); // Countries starting with U
    });

    it('should return C1/C2 combined entries for T1=U (upper air)', () => {
      const table = getA1Table(tables, { T1: 'U', T2: 'A' });

      expect(table).not.toBeNull();
      expect(table!.id).toBe('C1/C2');

      const codes = table!.entries.map(e => e.code);
      // Should include C2 station types
      expect(codes).toContain('W');
      expect(codes).toContain('V');
    });

    it('should return C3 for GRID data', () => {
      const table = getA1Table(tables, { T1: 'D', T2: 'T' });

      expect(table).not.toBeNull();
      expect(table!.id).toBe('C3');

      const codes = table!.entries.map(e => e.code);
      expect(codes).toContain('A'); // NH quadrant
      expect(codes).toContain('X'); // Global
    });

    it('should return C6 for BUFR (contextual on T1T2)', () => {
      const table = getA1Table(tables, { T1: 'I', T2: 'S' });

      expect(table).not.toBeNull();
      expect(table!.id).toBe('C6');

      const codes = table!.entries.map(e => e.code);
      expect(codes).toContain('A'); // Automatic obs
      expect(codes).toContain('M'); // Main synoptic
    });

    it('should return C7 A1 for CREX (contextual on T2)', () => {
      const table = getA1Table(tables, { T1: 'K', T2: 'S' });

      expect(table).not.toBeNull();
      expect(table!.id).toBe('C7');

      const codes = table!.entries.map(e => e.code);
      expect(codes).toContain('A'); // Automatic obs
    });

    it('should return C3 for T1=X (CAP messages)', () => {
      const table = getA1Table(tables, { T1: 'X', T2: 'T' });

      expect(table).not.toBeNull();
      expect(table!.id).toBe('C3');

      const codes = table!.entries.map(e => e.code);
      expect(codes).toContain('A'); // NH quadrant
      expect(codes).toContain('X'); // Global
    });
  });

  describe('getA2Table()', () => {
    it('should return C1 (countries filtered by A1) for simple data types', () => {
      const table = getA2Table(tables, { T1: 'A', T2: 'C', A1: 'F' });

      expect(table).not.toBeNull();
      expect(table!.id).toBe('C1');
      // Should return countries starting with F
      expect(table!.entries.length).toBeGreaterThan(0);
      // Each entry code should be a single character (second char of country code)
      expect(table!.entries.every(e => e.code.length === 1)).toBe(true);
      // Check that we have FR (France) -> R
      const codes = table!.entries.map(e => e.code);
      expect(codes).toContain('R'); // FR = France
    });

    it('should return C4 for GRID reference time', () => {
      const table = getA2Table(tables, { T1: 'D', T2: 'T', A1: 'A' });

      expect(table).not.toBeNull();
      expect(table!.id).toBe('C4');

      const codes = table!.entries.map(e => e.code);
      expect(codes).toContain('A'); // Analysis
      expect(codes).toContain('E'); // 24h forecast
    });

    it('should return C5 for regional pictorial reference time', () => {
      const table = getA2Table(tables, { T1: 'Q', T2: 'T', A1: 'A' });

      expect(table).not.toBeNull();
      expect(table!.id).toBe('C5');

      const codes = table!.entries.map(e => e.code);
      expect(codes).toContain('A'); // Analysis
      expect(codes).toContain('Q'); // 48h forecast
    });

    it('should return C5 for T1=X (CAP messages)', () => {
      const table = getA2Table(tables, { T1: 'X', T2: 'T', A1: 'A' });

      expect(table).not.toBeNull();
      expect(table!.id).toBe('C5');

      const codes = table!.entries.map(e => e.code);
      expect(codes).toContain('A'); // Analysis
    });

    it('should return C3 for BUFR', () => {
      const table = getA2Table(tables, { T1: 'I', T2: 'S', A1: 'A' });

      expect(table).not.toBeNull();
      expect(table!.id).toBe('C3');
    });

    it('should return C1/C2 combined when A1 is ambiguous (W, V, F)', () => {
      // For T1=S with A1=W (could be ocean weather stations OR country prefix like WS=Samoa)
      const table = getA2Table(tables, { T1: 'S', T2: 'A', A1: 'W' });

      expect(table).not.toBeNull();
      expect(table!.id).toBe('C1/C2');

      const codes = table!.entries.map(e => e.code);
      // Should contain C2 ocean areas
      expect(codes).toContain('A'); // Ocean area A
      expect(codes).toContain('X'); // More than one area
      // Should also contain C1 countries starting with W
      expect(codes).toContain('S'); // Samoa (WS)
    });

    it('should return C1 countries when A1 is not a C2 station type for T1=S', () => {
      // For T1=S with A1=A (not a C2 station type, starts country codes like AG, AU)
      const table = getA2Table(tables, { T1: 'S', T2: 'A', A1: 'A' });

      expect(table).not.toBeNull();
      expect(table!.id).toBe('C1');

      // Should return countries starting with A
      const codes = table!.entries.map(e => e.code);
      expect(codes).toContain('G'); // AG = Argentina
      expect(codes).toContain('U'); // AU = Australia
    });
  });

  describe('getIiTable()', () => {
    it('should return D1 for oceanographic (T1=O)', () => {
      const table = getIiTable(tables, { T1: 'O', T2: 'T', A1: 'A', A2: 'A' });

      expect(table).not.toBeNull();
      expect(table!.id).toBe('D1');

      const codes = table!.entries.map(e => e.code);
      expect(codes).toContain('98'); // Surface
      expect(codes).toContain('52'); // 1000m
    });

    it('should return D2 for GRID (T1=D)', () => {
      const table = getIiTable(tables, { T1: 'D', T2: 'T', A1: 'A', A2: 'A' });

      expect(table).not.toBeNull();
      expect(table!.id).toBe('D2');

      const codes = table!.entries.map(e => e.code);
      expect(codes).toContain('50'); // 500 hPa
      expect(codes).toContain('85'); // 850 hPa
    });

    it('should return D2 for T1=X (CAP messages)', () => {
      const table = getIiTable(tables, { T1: 'X', T2: 'T', A1: 'A', A2: 'A' });

      expect(table).not.toBeNull();
      expect(table!.id).toBe('D2');
    });

    it('should return FA ii codes for T1T2=FA', () => {
      const table = getIiTable(tables, { T1: 'F', T2: 'A' });

      expect(table).not.toBeNull();
      expect(table!.id).toBe('D3_FA');

      const codes = table!.entries.map(e => e.code);
      expect(codes).toContain('01');
      expect(codes).toContain('50'); // GAMET
    });

    it('should return UA ii codes for T1T2=UA', () => {
      const table = getIiTable(tables, { T1: 'U', T2: 'A' });

      expect(table).not.toBeNull();
      expect(table!.id).toBe('D3_UA');

      const codes = table!.entries.map(e => e.code);
      expect(codes).toContain('01');
      expect(codes).toContain('70'); // Volcanic ash
    });

    it('should return generic ii for types without specific table', () => {
      const table = getIiTable(tables, { T1: 'S', T2: 'A', A1: 'F', A2: 'R' });

      expect(table).not.toBeNull();
      expect(table!.id).toBe('generic_ii');
      expect(table!.entries.length).toBe(100); // 00-99
    });
  });

  describe('resolveTable()', () => {
    it('should resolve T1 table for empty input', () => {
      const result = resolveTable(tables, '');

      expect(result.position).toBe(0);
      expect(result.field).toBe('T1');
      expect(result.table).not.toBeNull();
      expect(result.table!.id).toBe('A');
    });

    it('should resolve T2 table for single character input', () => {
      const result = resolveTable(tables, 'F');

      expect(result.position).toBe(1);
      expect(result.field).toBe('T2');
      expect(result.table).not.toBeNull();
    });

    it('should include context in result', () => {
      const result = resolveTable(tables, 'ACFR');

      expect(result.context.T1).toBe('A');
      expect(result.context.T2).toBe('C');
      expect(result.context.A1).toBe('F');
      expect(result.context.A2).toBe('R');
    });
  });
});
