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

interface IModal {
    close: (time: number, deleteModal: boolean) => void;
    delete: () => void
    open: () => void
    render: (color: string) => void
}

