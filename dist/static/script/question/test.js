var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { addClass, removeClass } from "../functions/attributes.js";
import { createHtmlBlock } from "../functions/createElements.js";
import { appendElements, hideElement, prependElements, showElement } from "../functions/elementActions.js";
import * as listeners from "./listeners-question.js";
import * as createTestElements from "./create_func-question.js";
import RadioQuestion from "./radio-question.js";
import WriteQuestion from "./write-question.js";
import SuccessModal from "../modal/success-modal.js";
const pathName = document.location.pathname.split("/");
const testPath = {
    subject: pathName[1],
    year: pathName[2].split("_")[0],
    test: pathName[2].split("_")[1],
};
class Test {
    constructor(info = {}, elements = {
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
    }, allQuestionsList = [], result = {}, finishTimeout = setTimeout(() => {
        this.finishTest();
    }, 1000 * 60 * 60 * 3)) {
        this.info = info;
        this.elements = elements;
        this.allQuestionsList = allQuestionsList;
        this.result = result;
        this.finishTimeout = finishTimeout;
        this.questionActions = {
            getQuestionObj(obj) {
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
            moveActiveLink: (questionId) => {
                var _a, _b;
                const $nextActiveBlock = (_a = this.elements.$questionLinksBlock) === null || _a === void 0 ? void 0 : _a.querySelector(`[data-id="${questionId}"]`);
                const $activeBlock = (_b = this.elements.$questionLinksBlock) === null || _b === void 0 ? void 0 : _b.querySelector(".question__link_active");
                if ($nextActiveBlock.dataset.id === $activeBlock.dataset.id) {
                    return;
                }
                addClass($nextActiveBlock, "question__link_active");
                removeClass($activeBlock, "question__link_active");
            },
            findNextQuestion: (question) => {
                if (this.allQuestionsList.length - 1 == question.id) {
                    return this.allQuestionsList[0];
                }
                else {
                    return this.allQuestionsList[question.id + 1];
                }
            },
            seeAllQuestions: () => {
                (this.elements.$answerForm).innerHTML = "";
                this.allQuestionsList.forEach((question) => {
                    const formObj = this.questionActions.getQuestionObj(question);
                    const $question = createHtmlBlock("div", formObj.createQuestionWrapper(), formObj.createAnswerWrapper());
                    prependElements($question, formObj.createQuestionNumber(question.id + 1));
                    addClass($question, "question__wrapper", "question__wrapper_all", `question__wrapper${question.id}`);
                    appendElements(this.elements.$answerForm, $question);
                    addClass($question.querySelector(".question__answer-wrapper"), "question__answer-wrapper_all");
                });
            },
        };
    }
    getQuestions() {
        return __awaiter(this, void 0, void 0, function* () {
            const appContext = this;
            const res = yield fetch(`/getQuestions?subject=${testPath.subject}&year=${testPath.year}&test=${testPath.test}`);
            this.allQuestionsList = yield res.json();
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
                    const unanseredNum = appContext.allQuestionsList.filter((obj) => {
                        return !obj.answer;
                    }).length;
                    this.unsweredQuestionsNum = unanseredNum;
                    if (unanseredNum == 1) {
                        this.isLastUnanswered = true;
                    }
                },
            };
        });
    }
    finishTest() {
        clearTimeout(this.finishTimeout);
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
            this.result = data;
            this.info.isFinished = true;
            createTestElements.createResultBlock();
            this.elements.$questionLinksBlock.innerHTML = "";
            createTestElements.createQuestionLinks();
            this.info.testMinutes = Math.trunc((Date.now() - this.info.startTime) / 1000 / 60);
            showElement(this.elements.$seeAllQuestionsBtn);
            [this.elements.$btn, this.elements.$endBtn].forEach((el) => el.remove());
            this.info.question.render();
            [
                ...document.querySelectorAll(".question__link"),
            ].forEach((element, i) => {
                const question = data.allQuestions[i];
                if (!question.answer) {
                    return;
                }
                else if (question.result === "mistake" ||
                    !question.result) {
                    addClass(element, "question__link_mistake");
                }
                else if (question.result === "partiallySucces") {
                    addClass(element, "question__link_partially");
                }
                else if (question.result === "succes") {
                    addClass(element, "question__link_succes");
                }
            });
            appendElements(this.elements.$questionControls, this.elements.$resultingBlock);
        });
        const modal = new SuccessModal('finishModal', {
            title: 'Ви завершили тест',
            content: 'Тест завершився. Перегляньте результат.',
            closable: false
        });
        modal.initialize(modal);
        modal.open();
        modal.close(3000, true);
    }
    run() {
        this.getQuestions().then(() => {
            console.log(1);
            createTestElements.createQuestionLinks();
            this.setListeners();
            addClass(this.elements.$questionWrapper, "question__wrapper");
            appendElements(this.elements.$answerForm, this.elements.$questionWrapper);
            this.info.question.render();
            hideElement(this.elements.$seeAllQuestionsBtn);
        });
        const modal = new SuccessModal('startModal', {
            title: 'Вітаю!',
            content: 'Тест завершиться через 180 хв. Щасти!',
            closable: false
        });
        modal.initialize(modal);
        modal.open();
        modal.close(3000, true);
    }
    setListeners() {
        var _a;
        (_a = this.elements.$questionLinksBlock) === null || _a === void 0 ? void 0 : _a.addEventListener("click", listeners.questionLinksListener);
        this.elements.$btnBlock.addEventListener("click", listeners.buttonsListener);
    }
}
export default Test;

//# sourceMappingURL=../../typescript-maps/question/test.js.map
