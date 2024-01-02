import { FormattingType } from '@/app/utils/FormattingType';

export const metrics = {
  codeCoverage: {
    title: 'Code Coverage',
    key: 'coverage',
    isIncreasePositive: true,
    formatting: FormattingType.PERCENTAGE,
  },
  cognitiveComplexity: {
    title: 'Cognitive Complexity',
    key: 'cognitive_complexity',
    isIncreasePositive: false,
    formatting: FormattingType.ABSOLUTE,
  },
  technicalDebt: {
    title: 'Technical Debt',
    key: 'sqale_index',
    isIncreasePositive: false,
    formatting: FormattingType.HOURSANDMINUTES,
  },
  numberOfDeprecations: {
    title: 'Number of Deprecations',
    key: 'deprecation',
    isIncreasePositive: false,
    formatting: FormattingType.ABSOLUTE,
  },
};
