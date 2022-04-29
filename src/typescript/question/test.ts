import { addClass, removeClass } from "../functions/attributes.js";
import { createHtmlBlock } from "../functions/createElements.js";
import { appendElements, hideElement, prependElements, showElement } from "../functions/elementActions.js";
import * as listeners from "./listeners-question.js"
import * as createTestElements from "./create_func-question.js"
import RadioQuestion from "./radio-question.js";
import WriteQuestion from "./write-question.js";
import SuccessModal from "../modal/success-modal.js";




type TestInfo = {
    currentInfo: QuestionInfo;
    questionSwitchLogic: 'single' | 'seeAll';
    isFinished: boolean;
    question: RadioQuestion | WriteQuestion;
    startTime: number,
    testMinutes: number,
    [key: string]: any;
}



const pathName = document.location.pathname.split("/");
const testPath = {
    subject: pathName[1],
    year: pathName[2].split("_")[0],
    test: pathName[2].split("_")[1],
};

class Test {
    constructor(
        public info = {} as TestInfo,
        public elements: Record<string, HTMLElement | null> = {
            $questionLinksBlock: createHtmlBlock('div'),
            $resultingBlock: createHtmlBlock('div'),
            $questionWrapper: createHtmlBlock('div'),
            $btn: document.querySelector('#submitBtn'),
            $nextBtn: document.querySelector('#nextBtn'),
            $endBtn: document.querySelector('.form__end-btn'),
            $seeAllQuestionsBtn: document.querySelector('.question__seeall-btn'),
            $btnBlock: document.querySelector('.form__btn-block'),
            $answerForm: document.querySelector('#answer-form'),
            $questionControls: document.querySelector('.question__controls'),
            $questionForm: document.querySelector('.question__form'),
            $progressBar: createHtmlBlock('div')
        },
        public allQuestionsList: QuestionInfo[] = [],
        public result = {} as { dpaPercentage: number },
        public finishTimeout = setTimeout(() => {
            this.finishTest()
        }, 1000 * 60 * 60 * 3)
    ) {}

    public questionActions = {
        getQuestionObj(obj: QuestionInfo): RadioQuestion | WriteQuestion {
            
            const type = obj.type;
            switch (type) {
                case "radio": {
                    return new RadioQuestion(obj);
                }
    
                case "write": {
                    return new WriteQuestion(obj);
                }
            }
        },
    
        moveActiveLink: (questionId: number) => {
            // элемент ссылки на вопрос который станет активным
            const $nextActiveBlock: HTMLElement =
                this.elements.$questionLinksBlock?.querySelector(
                    `[data-id="${questionId}"]`
                )!;
            // текущий активный элемент ссылки на вопрос
            const $activeBlock: HTMLElement =
                this.elements.$questionLinksBlock?.querySelector(
                    ".question__link_active"
                )!;
    
            if ($nextActiveBlock.dataset.id === $activeBlock.dataset.id) {
                return;
            }
    
            addClass($nextActiveBlock, "question__link_active");
            removeClass($activeBlock, "question__link_active");
        },

        findNextQuestion: (question: QuestionInfo): QuestionInfo => {
            // если мы на последнем вопросе то переходим на первый
            if (this.allQuestionsList.length - 1 == question.id) {
                return this.allQuestionsList[0];
            } else {
                return this.allQuestionsList[question.id + 1];
            }
        },

        seeAllQuestions: () => {
            (this.elements.$answerForm!).innerHTML = "";

            this.allQuestionsList.forEach((question) => {
                const formObj =
                    this.questionActions.getQuestionObj(question);
                // создаём html вопроса
                const $question = createHtmlBlock(
                    "div",
                    formObj.createQuestionWrapper(),
                    formObj.createAnswerWrapper()
                );
                // вставляем div с номером вопроса в блок вопроса
                prependElements(
                    $question,
                    formObj.createQuestionNumber(question.id + 1)
                );
                // добавляем классы блоку вопроса
                addClass(
                    $question,
                    "question__wrapper",
                    "question__wrapper_all",
                    `question__wrapper${question.id}`
                );
                // добавляем блок вопроса в блок со всеми вопросами
                appendElements(this.elements.$answerForm!, $question);

                // добавляем класс для блока с ответом
                addClass(
                    $question.querySelector(".question__answer-wrapper")!,
                    "question__answer-wrapper_all"
                );
            });
        },
    }
    
    async getQuestions(): Promise<void> {
        const appContext = this;
        const res = await fetch(
            `/getQuestions?subject=${testPath.subject}&year=${testPath.year}&test=${testPath.test}`
        );

        this.allQuestionsList = await res.json();

        // добавляем поле id с его index'ом каждому вопросу
        this.allQuestionsList.forEach((question, index) => {
            question.id = index;
        });

        this.info = {
            currentInfo: this.allQuestionsList[0],
            isFinished: false,
            isLastUnanswered: false,
            unsweredQuestionsNum: this.allQuestionsList.length,
            questionSwitchLogic: "single",
            startTime: Date.now(),
            testMinutes: 0,
            question: this.questionActions.getQuestionObj(this.allQuestionsList[0]),
            checkAnswersNumber() {
                // проверяем количество вопросов без ответа
                const unanseredNum = appContext.allQuestionsList.filter(
                    (obj) => {
                        return !obj.answer;
                    }
                ).length;
                // записываем это количество в переменную
                this.unsweredQuestionsNum = unanseredNum;

                if (unanseredNum == 1) {
                    this.isLastUnanswered = true;
                }
            },
            
        }
    }

    finishTest() {
        clearTimeout(this.finishTimeout)
        
        fetch("/result", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(this.allQuestionsList),
        })
            .then((res) => res.json())
            .then((data) => {
                // записываем результат
                this.result = data;

                //! переопределяем значение
                this.info.isFinished = true;

                // создаём блок с результатом
                createTestElements.createResultBlock();
                // удаляем содержимое ссылок на вопросы
                this.elements.$questionLinksBlock!.innerHTML = "";
                // создаём ссылки на вопросы
                createTestElements.createQuestionLinks();

                // определяем врема потраченое на тест
                this.info.testMinutes = Math.trunc(
                    (Date.now() - this.info.startTime) / 1000 / 60
                );

                showElement(this.elements.$seeAllQuestionsBtn!);
                // удаляем кнопки 'ответить' и 'завершить'
                [this.elements.$btn!, this.elements.$endBtn!].forEach((el) =>
                    el.remove()
                );

                this.info.question.render();

                // для проверяем правильный ответ или нет и в зависимости от этого добавляе класс
                (
                    [
                        ...document.querySelectorAll(".question__link"),
                    ] as HTMLElement[]
                ).forEach((element, i) => {
                    const question = data.allQuestions[i];

                    if (!question.answer) {
                        return;
                    } else if (
                        question.result === "mistake" ||
                        !question.result
                    ) {
                        addClass(element, "question__link_mistake");
                    } else if (question.result === "partiallySucces") {
                        addClass(element, "question__link_partially");
                    } else if (question.result === "succes") {
                        addClass(element, "question__link_succes");
                    }
                });

                appendElements(
                    this.elements.$questionControls!,
                    this.elements.$resultingBlock!
                );
            });

        const modal = new SuccessModal('finishModal', {
            width: '500px',
            height: '500px',
            transition: 800,
            title: 'Ви завершили тест',
            content: 'Тест завершився. Перегляньте результат.',
            closable: false
        })
        modal.initialize(modal)
        modal.open()
        modal.close(3000, true)
    }

    run() {
        this.getQuestions().then(() => {
            // создаём ссылки на вопросы
            console.log(1)
            createTestElements.createQuestionLinks();

            // добавляем слушатели для переключениям на вопросы
            this.setListeners();

            addClass(this.elements.$questionWrapper!, "question__wrapper");
            appendElements(this.elements.$answerForm!, this.elements.$questionWrapper!);
            // вставляем первый вопрос
            this.info.question.render();

            // прячем кнопку смотреть все вопросы
            hideElement(this.elements.$seeAllQuestionsBtn!); // прячем кнопку смотреть все
        });

        // const modal = new SuccessModal('startModal', {
        //     width: '500px',
        //     height: '500px',
        //     transition: 800,
        //     title: 'Вітаю!',
        //     content: 'Тест завершиться через 180 хв. Щасти!',
        //     closable: false
        // })
        // modal.initialize(modal)
        // modal.open()
        // modal.close(3000, true)
    }


    setListeners(): void {
        this.elements.$questionLinksBlock?.addEventListener(
            "click",
            listeners.questionLinksListener
        );

        this.elements.$btnBlock!.addEventListener(
            "click",
            listeners.buttonsListener
        );

    }
}

export default Test