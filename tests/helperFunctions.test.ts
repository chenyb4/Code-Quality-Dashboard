import { formatCurrentValue } from '@/app/utils/helperFucntions';
import { FormattingType } from '@/app/utils/FormattingType';
import { describe, expect, test } from '@jest/globals';

describe('formatting value', () => {
    test('should be formatted to hours and mintues', () => {
        expect(formatCurrentValue(2356, FormattingType.HOURSANDMINUTES)).toBe('39h 16m');
    });

    test('should be formatted to percentage', () => {
        expect(formatCurrentValue(20, FormattingType.PERCENTAGE)).toBe('20%');
    });

    test('should be formatted to absolute value with seperator', () => {
        expect(formatCurrentValue(2356, FormattingType.ABSOLUTE)).toBe('2,356');
    });

    test('should throw error', () => {
        expect(() => formatCurrentValue(NaN, FormattingType.ABSOLUTE)).toThrowError('value is not accepted');
    });

    test('should throw error', () => {
        expect(() => formatCurrentValue(Infinity, FormattingType.ABSOLUTE)).toThrowError('value is not accepted');
    });

    test('should throw error', () => {
        expect(() => formatCurrentValue(-Infinity, FormattingType.ABSOLUTE)).toThrowError('value is not accepted');
    });

    test('should throw error', () => {
        expect(() => formatCurrentValue(-4, FormattingType.ABSOLUTE)).toThrowError('value is not accepted');
    });
});

