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

interface QuestionForm {
    insertAnswer: () => void;
    getAnswer: () =>  string[];
    createAnswerForm: () => HTMLElement;  
    createQuestions: () => HTMLElement;
}

interface QuestionsConfig {
    isFinished: boolean;
    isLastUnanswered: boolean;
    unsweredQuestionsNum: number;
    questionSwitchLogic: 'seeAll' | 'single';
    checkAnswersNumber: () => void
}