/**
 * WMO-386 Table A Coverage Tests
 *
 * This file tests all T1 values from Table A to ensure correct table mappings
 * for T2, A1, A2, and ii according to the WMO-386 specification.
 *
 * Table A Reference:
 * | T1 | Data type                  | T2  | A1    | A2    | ii  |
 * |----|----------------------------|-----|-------|-------|-----|
 * | A  | Analyses                   | B1  | C1    | C1    | **  |
 * | B  | Addressed message          | *** | ***   | ***   | *** |
 * | C  | Climatic data              | B1  | C1    | C1    | **  |
 * | D  | Grid point (GRID)          | B2  | C3    | C4    | D2  |
 * | E  | Satellite imagery          | B5  | C1    | C1    | **  |
 * | F  | Forecasts                  | B1  | C1    | C1    | **  |
 * | G  | Grid point (GRID)          | B2  | C3    | C4    | D2  |
 * | H  | Grid point (GRIB)          | B2  | C3    | C4    | D2  |
 * | I  | Observational BUFR         | B3  | C6    | C3    | **  |
 * | J  | Forecast BUFR              | B3  | C6    | C4    | D2  |
 * | K  | CREX                       | C7  | C7    | C3    | **  |
 * | L  | Aviation XML               | B7  | C1    | C1    | **  |
 * | M  | (unused)                   | -   | -     | -     | -   |
 * | N  | Notices                    | B1  | C1    | C1    | **  |
 * | O  | Oceanographic GRIB         | B4  | C3    | C4    | D1  |
 * | P  | Pictorial (Binary)         | B6  | C3    | C4    | D2  |
 * | Q  | Pictorial regional         | B6  | C3    | C5    | D2  |
 * | R  | (unused)                   | -   | -     | -     | -   |
 * | S  | Surface data               | B1  | C1/C2 | C1/C2 | **  |
 * | T  | Satellite data             | B1  | C3    | C4    | **  |
 * | U  | Upper-air data             | B1  | C1/C2 | C1/C2 | **  |
 * | V  | National data              | B2  | C1    | C1    | **  |
 * | W  | Warnings                   | B1  | C1    | C1    | **  |
 * | X  | CAP messages               | B2  | C3    | C5    | D2  |
 * | Y  | GRIB regional              | B2  | C3    | C5    | D2  |
 * | Z  | (unused)                   | -   | -     | -     | -   |
 *
 * Notes:
 * - ** = generic ii (00-99 bulletin sequence)
 * - *** = special handling (B = addressed message)
 * - C1/C2 = countries OR marine stations (W, V, F)
 */

import { describe, it, expect } from 'vitest';
import {
  getT2Table,
  getA1Table,
  getA2Table,
  getIiTable,
} from '../../src/grammar/resolver';
import type { TtaaiiTables } from '../../src/types';
import defaultTables from '../../src/grammar/data/tables.en.json';

const tables = defaultTables as TtaaiiTables;

describe('WMO-386 Table A - Complete Coverage', () => {

  describe('T1=A (Analyses): T2=B1, A1=C1, A2=C1, ii=**', () => {
    it('T2 should use B1', () => {
      const table = getT2Table(tables, { T1: 'A' });
      expect(table).not.toBeNull();
      expect(table!.id).toBe('B1');
    });

    it('A1 should use C1 (country first char)', () => {
      const table = getA1Table(tables, { T1: 'A', T2: 'C' });
      expect(table).not.toBeNull();
      expect(table!.id).toBe('C1');
    });

    it('A2 should use C1 (country second char)', () => {
      const table = getA2Table(tables, { T1: 'A', T2: 'C', A1: 'F' });
      expect(table).not.toBeNull();
      expect(table!.id).toBe('C1');
    });

    it('ii should use generic (00-99)', () => {
      const table = getIiTable(tables, { T1: 'A', T2: 'C', A1: 'F', A2: 'R' });
      expect(table).not.toBeNull();
      expect(table!.id).toBe('generic_ii');
    });
  });

  describe('T1=B (Addressed message): special handling ***', () => {
    it('T2 should return null (special handling)', () => {
      const table = getT2Table(tables, { T1: 'B' });
      // B has special handling per paragraph 2.4.2
      expect(table).toBeNull();
    });
  });

  describe('T1=C (Climatic data): T2=B1, A1=C1, A2=C1, ii=**', () => {
    it('T2 should use B1', () => {
      const table = getT2Table(tables, { T1: 'C' });
      expect(table).not.toBeNull();
      expect(table!.id).toBe('B1');
    });

    it('A1 should use C1', () => {
      const table = getA1Table(tables, { T1: 'C', T2: 'S' });
      expect(table).not.toBeNull();
      expect(table!.id).toBe('C1');
    });

    it('A2 should use C1', () => {
      const table = getA2Table(tables, { T1: 'C', T2: 'S', A1: 'U' });
      expect(table).not.toBeNull();
      expect(table!.id).toBe('C1');
    });

    it('ii should use generic', () => {
      const table = getIiTable(tables, { T1: 'C', T2: 'S', A1: 'U', A2: 'S' });
      expect(table).not.toBeNull();
      expect(table!.id).toBe('generic_ii');
    });
  });

  describe('T1=D (Grid GRID): T2=B2, A1=C3, A2=C4, ii=D2', () => {
    it('T2 should use B2', () => {
      const table = getT2Table(tables, { T1: 'D' });
      expect(table).not.toBeNull();
      expect(table!.id).toBe('B2');
    });

    it('A1 should use C3 (geographical area)', () => {
      const table = getA1Table(tables, { T1: 'D', T2: 'T' });
      expect(table).not.toBeNull();
      expect(table!.id).toBe('C3');
    });

    it('A2 should use C4 (reference time)', () => {
      const table = getA2Table(tables, { T1: 'D', T2: 'T', A1: 'A' });
      expect(table).not.toBeNull();
      expect(table!.id).toBe('C4');
    });

    it('ii should use D2 (level designator)', () => {
      const table = getIiTable(tables, { T1: 'D', T2: 'T', A1: 'A', A2: 'A' });
      expect(table).not.toBeNull();
      expect(table!.id).toBe('D2');
    });
  });

  describe('T1=E (Satellite imagery): T2=B5, A1=C1, A2=C1, ii=**', () => {
    it('T2 should use B5', () => {
      const table = getT2Table(tables, { T1: 'E' });
      expect(table).not.toBeNull();
      expect(table!.id).toBe('B5');
    });

    it('A1 should use C1', () => {
      const table = getA1Table(tables, { T1: 'E', T2: 'I' });
      expect(table).not.toBeNull();
      expect(table!.id).toBe('C1');
    });

    it('A2 should use C1', () => {
      const table = getA2Table(tables, { T1: 'E', T2: 'I', A1: 'U' });
      expect(table).not.toBeNull();
      expect(table!.id).toBe('C1');
    });

    it('ii should use generic', () => {
      const table = getIiTable(tables, { T1: 'E', T2: 'I', A1: 'U', A2: 'S' });
      expect(table).not.toBeNull();
      expect(table!.id).toBe('generic_ii');
    });
  });

  describe('T1=F (Forecasts): T2=B1, A1=C1, A2=C1, ii=** (special FA)', () => {
    it('T2 should use B1', () => {
      const table = getT2Table(tables, { T1: 'F' });
      expect(table).not.toBeNull();
      expect(table!.id).toBe('B1');
    });

    it('A1 should use C1', () => {
      const table = getA1Table(tables, { T1: 'F', T2: 'C' });
      expect(table).not.toBeNull();
      expect(table!.id).toBe('C1');
    });

    it('A2 should use C1', () => {
      const table = getA2Table(tables, { T1: 'F', T2: 'C', A1: 'F' });
      expect(table).not.toBeNull();
      expect(table!.id).toBe('C1');
    });

    it('ii should use D3_FA for T1T2=FA (aviation area)', () => {
      const table = getIiTable(tables, { T1: 'F', T2: 'A' });
      expect(table).not.toBeNull();
      expect(table!.id).toBe('D3_FA');
    });

    it('ii should use generic for other T2 values', () => {
      const table = getIiTable(tables, { T1: 'F', T2: 'C', A1: 'F', A2: 'R' });
      expect(table).not.toBeNull();
      expect(table!.id).toBe('generic_ii');
    });
  });

  describe('T1=G (Grid GRID): T2=B2, A1=C3, A2=C4, ii=D2', () => {
    it('T2 should use B2', () => {
      const table = getT2Table(tables, { T1: 'G' });
      expect(table).not.toBeNull();
      expect(table!.id).toBe('B2');
    });

    it('A1 should use C3', () => {
      const table = getA1Table(tables, { T1: 'G', T2: 'T' });
      expect(table).not.toBeNull();
      expect(table!.id).toBe('C3');
    });

    it('A2 should use C4', () => {
      const table = getA2Table(tables, { T1: 'G', T2: 'T', A1: 'A' });
      expect(table).not.toBeNull();
      expect(table!.id).toBe('C4');
    });

    it('ii should use D2', () => {
      const table = getIiTable(tables, { T1: 'G', T2: 'T', A1: 'A', A2: 'A' });
      expect(table).not.toBeNull();
      expect(table!.id).toBe('D2');
    });
  });

  describe('T1=H (Grid GRIB): T2=B2, A1=C3, A2=C4, ii=D2', () => {
    it('T2 should use B2', () => {
      const table = getT2Table(tables, { T1: 'H' });
      expect(table).not.toBeNull();
      expect(table!.id).toBe('B2');
    });

    it('A1 should use C3', () => {
      const table = getA1Table(tables, { T1: 'H', T2: 'T' });
      expect(table).not.toBeNull();
      expect(table!.id).toBe('C3');
    });

    it('A2 should use C4', () => {
      const table = getA2Table(tables, { T1: 'H', T2: 'T', A1: 'A' });
      expect(table).not.toBeNull();
      expect(table!.id).toBe('C4');
    });

    it('ii should use D2', () => {
      const table = getIiTable(tables, { T1: 'H', T2: 'T', A1: 'A', A2: 'A' });
      expect(table).not.toBeNull();
      expect(table!.id).toBe('D2');
    });
  });

  describe('T1=I (Observational BUFR): T2=B3, A1=C6, A2=C3, ii=**', () => {
    it('T2 should use B3', () => {
      const table = getT2Table(tables, { T1: 'I' });
      expect(table).not.toBeNull();
      expect(table!.id).toBe('B3');
    });

    it('A1 should use C6 (BUFR data type)', () => {
      const table = getA1Table(tables, { T1: 'I', T2: 'S' });
      expect(table).not.toBeNull();
      expect(table!.id).toBe('C6');
    });

    it('A2 should use C3 (geographical area)', () => {
      const table = getA2Table(tables, { T1: 'I', T2: 'S', A1: 'A' });
      expect(table).not.toBeNull();
      expect(table!.id).toBe('C3');
    });

    it('ii should use generic', () => {
      const table = getIiTable(tables, { T1: 'I', T2: 'S', A1: 'A', A2: 'A' });
      expect(table).not.toBeNull();
      expect(table!.id).toBe('generic_ii');
    });
  });

  describe('T1=J (Forecast BUFR): T2=B3, A1=C6, A2=C4, ii=D2', () => {
    it('T2 should use B3', () => {
      const table = getT2Table(tables, { T1: 'J' });
      expect(table).not.toBeNull();
      expect(table!.id).toBe('B3');
    });

    it('A1 should use C6', () => {
      const table = getA1Table(tables, { T1: 'J', T2: 'S' });
      expect(table).not.toBeNull();
      expect(table!.id).toBe('C6');
    });

    it('A2 should use C4 (reference time)', () => {
      const table = getA2Table(tables, { T1: 'J', T2: 'S', A1: 'A' });
      expect(table).not.toBeNull();
      expect(table!.id).toBe('C4');
    });

    it('ii should use D2', () => {
      const table = getIiTable(tables, { T1: 'J', T2: 'S', A1: 'A', A2: 'A' });
      expect(table).not.toBeNull();
      expect(table!.id).toBe('D2');
    });
  });

  describe('T1=K (CREX): T2=C7, A1=C7, A2=C3, ii=**', () => {
    it('T2 should use C7_T2', () => {
      const table = getT2Table(tables, { T1: 'K' });
      expect(table).not.toBeNull();
      expect(table!.id).toBe('C7_T2');
    });

    it('A1 should use C7 (contextual on T2)', () => {
      const table = getA1Table(tables, { T1: 'K', T2: 'S' });
      expect(table).not.toBeNull();
      expect(table!.id).toBe('C7');
    });

    it('A2 should use C3', () => {
      const table = getA2Table(tables, { T1: 'K', T2: 'S', A1: 'A' });
      expect(table).not.toBeNull();
      expect(table!.id).toBe('C3');
    });

    it('ii should use generic', () => {
      const table = getIiTable(tables, { T1: 'K', T2: 'S', A1: 'A', A2: 'A' });
      expect(table).not.toBeNull();
      expect(table!.id).toBe('generic_ii');
    });
  });

  describe('T1=L (Aviation XML): T2=B7, A1=C1, A2=C1, ii=**', () => {
    it('T2 should use B7', () => {
      const table = getT2Table(tables, { T1: 'L' });
      expect(table).not.toBeNull();
      expect(table!.id).toBe('B7');
    });

    it('A1 should use C1', () => {
      const table = getA1Table(tables, { T1: 'L', T2: 'A' });
      expect(table).not.toBeNull();
      expect(table!.id).toBe('C1');
    });

    it('A2 should use C1', () => {
      const table = getA2Table(tables, { T1: 'L', T2: 'A', A1: 'F' });
      expect(table).not.toBeNull();
      expect(table!.id).toBe('C1');
    });

    it('ii should use generic', () => {
      const table = getIiTable(tables, { T1: 'L', T2: 'A', A1: 'F', A2: 'R' });
      expect(table).not.toBeNull();
      expect(table!.id).toBe('generic_ii');
    });
  });

  describe('T1=M (unused)', () => {
    it('should return null for all tables', () => {
      expect(getT2Table(tables, { T1: 'M' })).toBeNull();
      expect(getA1Table(tables, { T1: 'M', T2: 'X' })).toBeNull();
    });
  });

  describe('T1=N (Notices): T2=B1, A1=C1, A2=C1, ii=**', () => {
    it('T2 should use B1', () => {
      const table = getT2Table(tables, { T1: 'N' });
      expect(table).not.toBeNull();
      expect(table!.id).toBe('B1');
    });

    it('A1 should use C1', () => {
      const table = getA1Table(tables, { T1: 'N', T2: 'G' });
      expect(table).not.toBeNull();
      expect(table!.id).toBe('C1');
    });

    it('A2 should use C1', () => {
      const table = getA2Table(tables, { T1: 'N', T2: 'G', A1: 'F' });
      expect(table).not.toBeNull();
      expect(table!.id).toBe('C1');
    });

    it('ii should use generic', () => {
      const table = getIiTable(tables, { T1: 'N', T2: 'G', A1: 'F', A2: 'R' });
      expect(table).not.toBeNull();
      expect(table!.id).toBe('generic_ii');
    });
  });

  describe('T1=O (Oceanographic GRIB): T2=B4, A1=C3, A2=C4, ii=D1', () => {
    it('T2 should use B4', () => {
      const table = getT2Table(tables, { T1: 'O' });
      expect(table).not.toBeNull();
      expect(table!.id).toBe('B4');
    });

    it('A1 should use C3', () => {
      const table = getA1Table(tables, { T1: 'O', T2: 'T' });
      expect(table).not.toBeNull();
      expect(table!.id).toBe('C3');
    });

    it('A2 should use C4', () => {
      const table = getA2Table(tables, { T1: 'O', T2: 'T', A1: 'A' });
      expect(table).not.toBeNull();
      expect(table!.id).toBe('C4');
    });

    it('ii should use D1 (ocean depth)', () => {
      const table = getIiTable(tables, { T1: 'O', T2: 'T', A1: 'A', A2: 'A' });
      expect(table).not.toBeNull();
      expect(table!.id).toBe('D1');
    });
  });

  describe('T1=P (Pictorial Binary): T2=B6, A1=C3, A2=C4, ii=D2', () => {
    it('T2 should use B6', () => {
      const table = getT2Table(tables, { T1: 'P' });
      expect(table).not.toBeNull();
      expect(table!.id).toBe('B6');
    });

    it('A1 should use C3', () => {
      const table = getA1Table(tables, { T1: 'P', T2: 'T' });
      expect(table).not.toBeNull();
      expect(table!.id).toBe('C3');
    });

    it('A2 should use C4', () => {
      const table = getA2Table(tables, { T1: 'P', T2: 'T', A1: 'A' });
      expect(table).not.toBeNull();
      expect(table!.id).toBe('C4');
    });

    it('ii should use D2', () => {
      const table = getIiTable(tables, { T1: 'P', T2: 'T', A1: 'A', A2: 'A' });
      expect(table).not.toBeNull();
      expect(table!.id).toBe('D2');
    });
  });

  describe('T1=Q (Pictorial Regional): T2=B6, A1=C3, A2=C5, ii=D2', () => {
    it('T2 should use B6', () => {
      const table = getT2Table(tables, { T1: 'Q' });
      expect(table).not.toBeNull();
      expect(table!.id).toBe('B6');
    });

    it('A1 should use C3', () => {
      const table = getA1Table(tables, { T1: 'Q', T2: 'T' });
      expect(table).not.toBeNull();
      expect(table!.id).toBe('C3');
    });

    it('A2 should use C5 (regional reference time)', () => {
      const table = getA2Table(tables, { T1: 'Q', T2: 'T', A1: 'A' });
      expect(table).not.toBeNull();
      expect(table!.id).toBe('C5');
    });

    it('ii should use D2', () => {
      const table = getIiTable(tables, { T1: 'Q', T2: 'T', A1: 'A', A2: 'A' });
      expect(table).not.toBeNull();
      expect(table!.id).toBe('D2');
    });
  });

  describe('T1=R (unused)', () => {
    it('should return null for all tables', () => {
      expect(getT2Table(tables, { T1: 'R' })).toBeNull();
      expect(getA1Table(tables, { T1: 'R', T2: 'X' })).toBeNull();
    });
  });

  describe('T1=S (Surface data): T2=B1, A1=C1/C2, A2=C1/C2, ii=**', () => {
    it('T2 should use B1', () => {
      const table = getT2Table(tables, { T1: 'S' });
      expect(table).not.toBeNull();
      expect(table!.id).toBe('B1');
    });

    it('A1 should use C1/C2 combined', () => {
      const table = getA1Table(tables, { T1: 'S', T2: 'A' });
      expect(table).not.toBeNull();
      expect(table!.id).toBe('C1/C2');
      // Should include both country chars and C2 station types
      const codes = table!.entries.map(e => e.code);
      expect(codes).toContain('W'); // C2: Ocean weather stations
      expect(codes).toContain('V'); // C2: Mobile ships
      expect(codes).toContain('F'); // C2: Floats
      expect(codes).toContain('U'); // C1: Countries starting with U
    });

    it('A2 should use C2 when A1 is W (ocean weather stations)', () => {
      const table = getA2Table(tables, { T1: 'S', T2: 'A', A1: 'W' });
      expect(table).not.toBeNull();
      expect(table!.id).toBe('C2');
    });

    it('A2 should use C2 when A1 is V (mobile ships)', () => {
      const table = getA2Table(tables, { T1: 'S', T2: 'A', A1: 'V' });
      expect(table).not.toBeNull();
      expect(table!.id).toBe('C2');
    });

    it('A2 should use C2 when A1 is F (floats)', () => {
      const table = getA2Table(tables, { T1: 'S', T2: 'O', A1: 'F' });
      expect(table).not.toBeNull();
      expect(table!.id).toBe('C2');
    });

    it('A2 should use C1 when A1 is a country char', () => {
      const table = getA2Table(tables, { T1: 'S', T2: 'A', A1: 'U' });
      expect(table).not.toBeNull();
      expect(table!.id).toBe('C1');
    });

    it('ii should use generic', () => {
      const table = getIiTable(tables, { T1: 'S', T2: 'A', A1: 'F', A2: 'R' });
      expect(table).not.toBeNull();
      expect(table!.id).toBe('generic_ii');
    });
  });

  describe('T1=T (Satellite data): T2=B1, A1=C3, A2=C4, ii=**', () => {
    it('T2 should use B1', () => {
      const table = getT2Table(tables, { T1: 'T' });
      expect(table).not.toBeNull();
      expect(table!.id).toBe('B1');
    });

    it('A1 should use C3', () => {
      const table = getA1Table(tables, { T1: 'T', T2: 'C' });
      expect(table).not.toBeNull();
      expect(table!.id).toBe('C3');
    });

    it('A2 should use C4', () => {
      const table = getA2Table(tables, { T1: 'T', T2: 'C', A1: 'A' });
      expect(table).not.toBeNull();
      expect(table!.id).toBe('C4');
    });

    it('ii should use generic', () => {
      const table = getIiTable(tables, { T1: 'T', T2: 'C', A1: 'A', A2: 'A' });
      expect(table).not.toBeNull();
      expect(table!.id).toBe('generic_ii');
    });
  });

  describe('T1=U (Upper-air data): T2=B1, A1=C1/C2, A2=C1/C2, ii=** (special UA)', () => {
    it('T2 should use B1', () => {
      const table = getT2Table(tables, { T1: 'U' });
      expect(table).not.toBeNull();
      expect(table!.id).toBe('B1');
    });

    it('A1 should use C1/C2 combined', () => {
      const table = getA1Table(tables, { T1: 'U', T2: 'A' });
      expect(table).not.toBeNull();
      expect(table!.id).toBe('C1/C2');
    });

    it('A2 should use C2 when A1 is W', () => {
      const table = getA2Table(tables, { T1: 'U', T2: 'A', A1: 'W' });
      expect(table).not.toBeNull();
      expect(table!.id).toBe('C2');
    });

    it('A2 should use C1 when A1 is a country char (not W/V/F)', () => {
      // Note: F is a C2 code (Floats), so use a different char like 'U' (USA, Ukraine, etc.)
      const table = getA2Table(tables, { T1: 'U', T2: 'A', A1: 'U' });
      expect(table).not.toBeNull();
      expect(table!.id).toBe('C1');
    });

    it('ii should use D3_UA for T1T2=UA (aircraft reports)', () => {
      const table = getIiTable(tables, { T1: 'U', T2: 'A' });
      expect(table).not.toBeNull();
      expect(table!.id).toBe('D3_UA');
    });

    it('ii should use generic for other T2 values', () => {
      const table = getIiTable(tables, { T1: 'U', T2: 'S', A1: 'F', A2: 'R' });
      expect(table).not.toBeNull();
      expect(table!.id).toBe('generic_ii');
    });
  });

  describe('T1=V (National data): T2=B2, A1=C1, A2=C1, ii=**', () => {
    it('T2 should use B2 (or national)', () => {
      const table = getT2Table(tables, { T1: 'V' });
      expect(table).not.toBeNull();
      expect(table!.id).toBe('B2');
    });

    it('A1 should use C1', () => {
      const table = getA1Table(tables, { T1: 'V', T2: 'T' });
      expect(table).not.toBeNull();
      expect(table!.id).toBe('C1');
    });

    it('A2 should use C1', () => {
      const table = getA2Table(tables, { T1: 'V', T2: 'T', A1: 'F' });
      expect(table).not.toBeNull();
      expect(table!.id).toBe('C1');
    });

    it('ii should use generic', () => {
      const table = getIiTable(tables, { T1: 'V', T2: 'T', A1: 'F', A2: 'R' });
      expect(table).not.toBeNull();
      expect(table!.id).toBe('generic_ii');
    });
  });

  describe('T1=W (Warnings): T2=B1, A1=C1, A2=C1, ii=**', () => {
    it('T2 should use B1', () => {
      const table = getT2Table(tables, { T1: 'W' });
      expect(table).not.toBeNull();
      expect(table!.id).toBe('B1');
    });

    it('A1 should use C1', () => {
      const table = getA1Table(tables, { T1: 'W', T2: 'A' });
      expect(table).not.toBeNull();
      expect(table!.id).toBe('C1');
    });

    it('A2 should use C1', () => {
      const table = getA2Table(tables, { T1: 'W', T2: 'A', A1: 'F' });
      expect(table).not.toBeNull();
      expect(table!.id).toBe('C1');
    });

    it('ii should use generic', () => {
      const table = getIiTable(tables, { T1: 'W', T2: 'A', A1: 'F', A2: 'R' });
      expect(table).not.toBeNull();
      expect(table!.id).toBe('generic_ii');
    });
  });

  describe('T1=X (CAP messages): T2=B2, A1=C3, A2=C5, ii=D2', () => {
    it('T2 should use B2', () => {
      const table = getT2Table(tables, { T1: 'X' });
      expect(table).not.toBeNull();
      expect(table!.id).toBe('B2');
    });

    it('A1 should use C3', () => {
      const table = getA1Table(tables, { T1: 'X', T2: 'T' });
      expect(table).not.toBeNull();
      expect(table!.id).toBe('C3');
    });

    it('A2 should use C5', () => {
      const table = getA2Table(tables, { T1: 'X', T2: 'T', A1: 'A' });
      expect(table).not.toBeNull();
      expect(table!.id).toBe('C5');
    });

    it('ii should use D2', () => {
      const table = getIiTable(tables, { T1: 'X', T2: 'T', A1: 'A', A2: 'A' });
      expect(table).not.toBeNull();
      expect(table!.id).toBe('D2');
    });
  });

  describe('T1=Y (GRIB regional): T2=B2, A1=C3, A2=C5, ii=D2', () => {
    it('T2 should use B2', () => {
      const table = getT2Table(tables, { T1: 'Y' });
      expect(table).not.toBeNull();
      expect(table!.id).toBe('B2');
    });

    it('A1 should use C3', () => {
      const table = getA1Table(tables, { T1: 'Y', T2: 'T' });
      expect(table).not.toBeNull();
      expect(table!.id).toBe('C3');
    });

    it('A2 should use C5', () => {
      const table = getA2Table(tables, { T1: 'Y', T2: 'T', A1: 'A' });
      expect(table).not.toBeNull();
      expect(table!.id).toBe('C5');
    });

    it('ii should use D2', () => {
      const table = getIiTable(tables, { T1: 'Y', T2: 'T', A1: 'A', A2: 'A' });
      expect(table).not.toBeNull();
      expect(table!.id).toBe('D2');
    });
  });

  describe('T1=Z (unused)', () => {
    it('should return null for all tables', () => {
      expect(getT2Table(tables, { T1: 'Z' })).toBeNull();
      expect(getA1Table(tables, { T1: 'Z', T2: 'X' })).toBeNull();
    });
  });
});
