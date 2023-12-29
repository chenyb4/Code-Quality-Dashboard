import {FormattingType} from "@/app/utils/FormattingType";

interface Metrics {
    codeCoverage: MetricsDefinition;
    cognitiveComplexity: MetricsDefinition;
    technicalDebt: MetricsDefinition;
    numberOfDeprecations: MetricsDefinition;
}

interface MetricsDefinition {
    title: string;
    key: string;
    isIncreasePositive: boolean;
    formatting: FormattingType;
}

export const metrics: Metrics = {
    "codeCoverage": {
        title: "Code Coverage",
        key: "coverage",
        isIncreasePositive: true,
        formatting: FormattingType.PERCENTAGE,
    },
    "cognitiveComplexity": {
        title: "Cognitive Complexity",
        key: "cognitive_complexity",
        isIncreasePositive: false,
        formatting: FormattingType.ABSOLUTE,
    },
    "technicalDebt": {
        title: "Technical Debt",
        key: "sqale_index",
        isIncreasePositive: false,
        formatting: FormattingType.HOURSANDMINUTES,
    },
    "numberOfDeprecations": {
        title: "Number of Deprecations",
        key: "deprecation",
        isIncreasePositive: false,
        formatting: FormattingType.ABSOLUTE,
    }
}