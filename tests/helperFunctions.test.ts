import { formatCurrentValue } from '@/app/utils/helperFucntions';
import { FormattingType } from '@/app/utils/FormattingType';
import { describe, expect, test } from '@jest/globals';

describe('formatting value', () => {
  test('should be formatted to hours and mintues', () => {
    expect(formatCurrentValue(2356, FormattingType.HOURSANDMINUTES)).toBe('39h 16m');
  });
});
