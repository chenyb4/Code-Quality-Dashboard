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
    title: 'Duplicated blocks',
    key: 'duplicated_blocks',
    isIncreasePositive: false,
    formattingType: FormattingType.ABSOLUTE,
    hasMeasuresHistory:true
  },
  {
    title: 'Cyclomatic complexity',
    key: 'complexity',
    isIncreasePositive: false,
    formattingType: FormattingType.ABSOLUTE,
    hasMeasuresHistory:true
  },
  {
    title: 'maintainability Issues',
    key: 'code_smells',
    isIncreasePositive: false,
    formattingType: FormattingType.ABSOLUTE,
    hasMeasuresHistory:true
  },
  {
    title: 'Security Issues',
    key: 'vulnerabilities',
    isIncreasePositive: false,
    formattingType: FormattingType.ABSOLUTE,
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
