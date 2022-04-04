interface QuestionInfo {
    type: 'write' | 'radio';
    expectedAnswer: string[];
    answer?: string[];
    id: number;
    text?: string;
    vrahovyietiaDpa: boolean;
    questions?: string[];
    variants?: string[];
    questionImage?: string
}