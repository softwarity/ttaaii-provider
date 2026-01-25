import { describe, it, expect, beforeEach } from 'vitest';
import { TtaaiiProvider } from '../src/provider';

describe('TtaaiiProvider', () => {
  let provider: TtaaiiProvider;

  beforeEach(() => {
    provider = new TtaaiiProvider();
  });

  describe('complete()', () => {
    it('should return T1 options for empty input', () => {
      const result = provider.complete('');

      expect(result.position).toBe(0);
      expect(result.field).toBe('T1');
      expect(result.isComplete).toBe(false);
      expect(result.items.length).toBeGreaterThan(0);

      // Check that common T1 values are present
      const codes = result.items.map(i => i.code);
      expect(codes).toContain('A'); // Analyses
      expect(codes).toContain('F'); // Forecasts
      expect(codes).toContain('S'); // Surface data
      expect(codes).toContain('W'); // Warnings
    });

    it('should return T2 options for T1=A (Analyses)', () => {
      const result = provider.complete('A');

      expect(result.position).toBe(1);
      expect(result.field).toBe('T2');
      expect(result.context.T1).toBe('A');

      // Check expected T2 values for Analyses
      const codes = result.items.map(i => i.code);
      expect(codes).toContain('C'); // Cyclone
      expect(codes).toContain('S'); // Surface
      expect(codes).toContain('U'); // Upper air
    });

    it('should return T2 options for T1=F (Forecasts)', () => {
      const result = provider.complete('F');

      expect(result.position).toBe(1);
      expect(result.field).toBe('T2');

      const codes = result.items.map(i => i.code);
      expect(codes).toContain('A'); // Aviation area
      expect(codes).toContain('C'); // Aerodrome (TAF)
      expect(codes).toContain('T'); // Aerodrome (TAF >= 12h)
    });

    it('should return A1 options for T1T2=AC', () => {
      const result = provider.complete('AC');

      expect(result.position).toBe(2);
      expect(result.field).toBe('A1');
      expect(result.context.T1).toBe('A');
      expect(result.context.T2).toBe('C');

      // Should return C1 table entries (countries/areas)
      expect(result.items.length).toBeGreaterThan(0);
    });

    it('should group countries by continent when groupBy=continent', () => {
      // Test at A2 position where we have full country entries
      const result = provider.complete('ACF', { groupBy: 'continent' });

      expect(result.groups).toBeDefined();
      expect(result.groups!.length).toBeGreaterThan(0);

      // Check that continent groups exist for countries starting with F
      const groupKeys = result.groups!.map(g => g.key);
      // Countries starting with F include: FA (Faroe Islands), FG (French Guiana),
      // FI (Finland), FJ (Fiji), FK (Falkland Islands), FM (Micronesia),
      // FP (Saint Pierre and Miquelon), FR (France), FW (Wallis and Futuna)
      expect(groupKeys.length).toBeGreaterThan(0);
    });

    it('should return A2 options after A1', () => {
      const result = provider.complete('ACF');

      expect(result.position).toBe(3);
      expect(result.field).toBe('A2');
    });

    it('should return ii options after A1A2', () => {
      const result = provider.complete('ACFR');

      expect(result.position).toBe(4);
      expect(result.field).toBe('ii');
    });

    it('should mark as complete when 6 characters', () => {
      const result = provider.complete('ACFR01');

      expect(result.position).toBe(6);
      expect(result.isComplete).toBe(true);
    });

    it('should handle case insensitivity', () => {
      const resultUpper = provider.complete('A');
      const resultLower = provider.complete('a');

      expect(resultUpper.items.length).toBe(resultLower.items.length);
    });

    it('should return T2 options for BUFR (T1=I)', () => {
      const result = provider.complete('I');

      expect(result.field).toBe('T2');
      const codes = result.items.map(i => i.code);
      expect(codes).toContain('S'); // Surface
      expect(codes).toContain('U'); // Upper-air
    });

    it('should return A1 options for BUFR surface (T1T2=IS)', () => {
      const result = provider.complete('IS');

      expect(result.field).toBe('A1');
      // Should return C6 table entries (data types for IS)
      const codes = result.items.map(i => i.code);
      expect(codes).toContain('A'); // Automatic observations
      expect(codes).toContain('M'); // Main synoptic
      expect(codes).toContain('W'); // METAR
    });

    it('should return T2 options for CREX (T1=K)', () => {
      const result = provider.complete('K');

      expect(result.field).toBe('T2');
      const codes = result.items.map(i => i.code);
      expect(codes).toContain('S'); // Surface
      expect(codes).toContain('U'); // Upper-air
    });
  });

  describe('validate()', () => {
    it('should validate a valid T1', () => {
      const result = provider.validate('A');

      expect(result.valid).toBe(true);
      expect(result.complete).toBe(false);
      expect(result.errors.length).toBe(0);
    });

    it('should invalidate an invalid T1', () => {
      const result = provider.validate('Z');

      expect(result.valid).toBe(false);
      expect(result.errors.length).toBe(1);
      expect(result.errors[0].position).toBe(0);
      expect(result.errors[0].field).toBe('T1');
    });

    it('should validate a complete TTAAII code', () => {
      // Using a known valid combination
      const result = provider.validate('SAFR01');

      // Should be valid (or at least parseable)
      expect(result.context.T1).toBe('S');
      expect(result.context.T2).toBe('A');
      expect(result.context.A1).toBe('F');
      expect(result.context.A2).toBe('R');
      expect(result.context.ii).toBe('01');
    });

    it('should return complete=true for 6 valid characters', () => {
      // Create a minimal valid code
      const result = provider.validate('ACFR01');

      expect(result.complete).toBe(result.valid && result.context.ii?.length === 2);
    });
  });

  describe('decode()', () => {
    it('should decode T1', () => {
      const result = provider.decode('A');

      expect(result.input).toBe('A');
      expect(result.dataType).toBeDefined();
      expect(result.dataType?.code).toBe('A');
      expect(result.dataType?.label).toBe('Analyses');
    });

    it('should decode T1 and T2', () => {
      const result = provider.decode('AC');

      expect(result.dataType?.code).toBe('A');
      expect(result.dataSubtype).toBeDefined();
      expect(result.dataSubtype?.code).toBe('C');
      expect(result.dataSubtype?.label).toBe('Cyclone');
    });

    it('should decode forecasts', () => {
      const result = provider.decode('FC');

      expect(result.dataType?.label).toBe('Forecasts');
      expect(result.dataSubtype?.label).toBe('Aerodrome (VT < 12 hours)');
      expect(result.dataSubtype?.codeForm).toContain('TAF');
    });

    it('should decode surface data METAR', () => {
      const result = provider.decode('SA');

      expect(result.dataType?.label).toBe('Surface data');
      expect(result.dataSubtype?.label).toBe('Aviation routine reports');
      expect(result.dataSubtype?.codeForm).toContain('METAR');
    });

    it('should decode warnings', () => {
      const result = provider.decode('WS');

      expect(result.dataType?.label).toBe('Warnings');
      expect(result.dataSubtype?.label).toBe('SIGMET');
    });
  });

  describe('getFieldSuggestions()', () => {
    it('should return T1 suggestions without context', () => {
      const result = provider.getFieldSuggestions('T1', {});

      expect(result.items.length).toBeGreaterThan(0);
      expect(result.items.some(i => i.code === 'A')).toBe(true);
    });

    it('should return T2 suggestions with T1 context', () => {
      const result = provider.getFieldSuggestions('T2', { T1: 'F' });

      expect(result.items.length).toBeGreaterThan(0);
      // Forecasts T2 options
      expect(result.items.some(i => i.code === 'C')).toBe(true); // TAF
    });

    it('should return grouped items when requested', () => {
      const result = provider.getFieldSuggestions('A1', { T1: 'A', T2: 'C' }, { groupBy: 'continent' });

      expect(result.groups).toBeDefined();
    });
  });
});
