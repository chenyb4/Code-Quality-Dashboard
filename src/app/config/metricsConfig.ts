import { FormattingType } from '@/app/utils/FormattingType';
import { rule } from 'postcss';

// interface Metrics {
//   codeCoverage: MetricsDefinition;
//   cognitiveComplexity: MetricsDefinition;
//   technicalDebt: MetricsDefinition;
//   numberOfDeprecations: MetricsDefinition;
// }

interface MetricsDefinition {
  title: string;
  key: string;
  isIncreasePositive: boolean;
  formattingType: FormattingType;
  hasMeasuresHistory:boolean;
}

export const metrics:MetricsDefinition[] = [
  {
    title: 'Code Coverage',
    key: 'coverage',
    isIncreasePositive: true,
    formattingType: FormattingType.PERCENTAGE,
    hasMeasuresHistory:true
  },
  {
    title: 'Cognitive Complexity',
    key: 'cognitive_complexity',
    isIncreasePositive: false,
    formattingType: FormattingType.ABSOLUTE,
    hasMeasuresHistory:true
  },
{
    title: 'Technical Debt',
    key: 'sqale_index',
    isIncreasePositive: false,
    formattingType: FormattingType.HOURSANDMINUTES,
    hasMeasuresHistory:true
  },
 {
    title: 'Number of Deprecations',
    key: 'deprecation',
    isIncreasePositive: false,
    formattingType: FormattingType.ABSOLUTE,
    hasMeasuresHistory:false
  },
];
