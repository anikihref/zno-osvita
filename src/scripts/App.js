var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { addClass } from "./functions/attributes.js";
import { createHtmlBlock } from "./functions/createElements.js";
import { appendElements, hideElement, showElement, } from "./functions/elementActions.js";
import { htmlElements } from "./htmlElements.js";
import { app } from "./main.js";
import { Question } from "./Question.js";
const pathName = document.location.pathname.split("/");
const testPath = {
    subject: pathName[1],
    year: pathName[2].split("_")[0],
    test: pathName[2].split("_")[1],
};
class App {
    constructor() {
        this.allQuestionsList = [];
        this.questionsConfig = {};
        this.questionInfo = {};
        this.question = {};
        this.result = {};
        this.$questionLinksBlock = createHtmlBlock('div');
        this.$resultingBlock = createHtmlBlock('div');
        this.$questionWrapper = createHtmlBlock('div');
        this.startTime = Date.now();
        this.testMinutes = 0;
    }
    run() {
        this.getQuestions().then(() => {
            this.createQuestionLinks();
            this.addQuestionChangeListeners();
            addClass(this.$questionWrapper, "question__wrapper");
            appendElements(htmlElements.$answerForm, this.$questionWrapper);
            this.question.render();
            hideElement(htmlElements.$seeAllQuestionsBtn);
        });
    }
    finishTest() {
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
            this.questionsConfig.isFinished = true;
            this.createResultBlock();
            this.$questionLinksBlock.innerHTML = "";
            this.createQuestionLinks();
            this.testMinutes = Math.trunc((Date.now() - this.startTime) / 1000 / 60);
            showElement(htmlElements.$seeAllQuestionsBtn);
            [htmlElements.$btn, htmlElements.$endBtn].forEach((el) => el.remove());
            this.question.render();
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
            appendElements(htmlElements.$questionControls, this.$resultingBlock);
        });
    }
    getQuestions() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield fetch(`/getQuestions?subject=${testPath.subject}&year=${testPath.year}&test=${testPath.test}`);
            const questions = yield res.json();
            const appContext = this;
            this.allQuestionsList = questions;
            this.allQuestionsList.forEach((question, index) => {
                question.id = index;
            });
            this.questionsConfig = {
                isFinished: false,
                isLastUnanswered: false,
                unsweredQuestionsNum: this.allQuestionsList.length,
                questionSwitchLogic: "single",
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
            this.questionInfo = this.allQuestionsList[0];
            this.question = Question.questionActions.getQuestionObj(this.allQuestionsList[0]);
        });
    }
    createQuestionLinks() {
        appendElements(htmlElements.$questionControls, this.$questionLinksBlock);
        addClass(this.$questionLinksBlock, "question__links-block");
        for (let i = 1; i <= this.allQuestionsList.length; i++) {
            let $questionLink = createHtmlBlock("div");
            let number;
            if (!this.questionsConfig.isFinished ||
                this.allQuestionsList[i - 1].vrahovyietiaDpa) {
                number = createHtmlBlock("b", i);
            }
            else {
                number = createHtmlBlock("span", i);
            }
            appendElements($questionLink, number);
            appendElements(this.$questionLinksBlock, $questionLink);
            addClass($questionLink, "question__link");
            $questionLink.dataset.id = i - 1 + "";
        }
        addClass(document.querySelector(".question__link"), "question__link_active");
    }
    createResultBlock() {
        const $dpaScore = createHtmlBlock('div', `Ваш бал ДПА: <b>${Math.trunc((12 * this.result.dpaPercentage) / 100)}</b> з 12 можливих.`);
        const $dpaQuestionHint = createHtmlBlock('div', `Завдання виділені жирним враховуються в бал ДПА`);
        const $time = createHtmlBlock('div', `Витрачено часу: <b>${this.testMinutes} хв.</b> з 180 запропонованих`);
        addClass(this.$resultingBlock, "result");
        addClass($dpaQuestionHint, 'hint');
        appendElements(this.$resultingBlock, $dpaScore, $dpaQuestionHint, $time);
    }
    recreateQuestionWrapper() {
        this.$questionWrapper = createHtmlBlock("div");
        addClass(this.$questionWrapper, "question__wrapper");
        htmlElements.$answerForm.innerHTML = "";
        appendElements(htmlElements.$answerForm, this.$questionWrapper);
    }
    addQuestionChangeListeners() {
        this.$questionLinksBlock.addEventListener("click", App.listeners.questionLinksListener);
        htmlElements.$btnBlock.addEventListener("click", App.listeners.buttonsListener);
    }
}
App.listeners = {
    questionLinksListener(e) {
        const target = e.target.closest(".question__link");
        if (target == null) {
            return;
        }
        const nextQuestionInfo = app.allQuestionsList[target.dataset.id];
        app.questionInfo = nextQuestionInfo;
        app.question =
            Question.questionActions.getQuestionObj(nextQuestionInfo);
        if (app.questionsConfig.questionSwitchLogic === "single") {
            app.question.render();
        }
        else if (app.questionsConfig.questionSwitchLogic === "seeAll") {
            const targetId = target.dataset.id;
            const $targetQuestion = document.querySelector(`.question__wrapper${targetId}`);
            const yPos = $targetQuestion.getBoundingClientRect().y +
                window.pageYOffset;
            window.scrollTo(0, yPos);
        }
    },
    buttonsListener(e) {
        app.questionsConfig.checkAnswersNumber();
        const target = e.target;
        let questionInfo = app.questionInfo;
        const nextQuestion = app.questionsConfig.isLastUnanswered
            ? questionInfo
            : Question.questionActions.findNextQuestion(questionInfo);
        switch (target) {
            case htmlElements.$seeAllQuestionsBtn: {
                switch (app.questionsConfig.questionSwitchLogic) {
                    case "single": {
                        app.questionsConfig.questionSwitchLogic = "seeAll";
                        hideElement(htmlElements.$nextBtn);
                        htmlElements.$seeAllQuestionsBtn.textContent =
                            "Дивитись один";
                        Question.questionActions.seeAllQuestions();
                        break;
                    }
                    case "seeAll": {
                        app.questionsConfig.questionSwitchLogic = "single";
                        app.recreateQuestionWrapper();
                        app.question.render();
                        htmlElements.$seeAllQuestionsBtn.textContent =
                            "Дивитись усі";
                        showElement(htmlElements.$nextBtn);
                        break;
                    }
                }
                break;
            }
            case htmlElements.$btn: {
                const answer = Question.questionActions
                    .getQuestionObj(app.questionInfo)
                    .getAnswer();
                if (answer.some((answer) => answer)) {
                    app.questionInfo.answer = answer;
                }
                else {
                    return;
                }
                if (app.questionsConfig.isLastUnanswered) {
                    app.finishTest();
                }
                addClass(document.querySelector(".question__link_active"), "question__link_done");
            }
            case htmlElements.$nextBtn: {
                app.questionInfo = nextQuestion;
                app.question =
                    Question.questionActions.getQuestionObj(nextQuestion);
                app.question.render();
                break;
            }
            case htmlElements.$endBtn: {
                if (app.allQuestionsList.find((obj) => obj.answer)) {
                    app.finishTest();
                }
                else {
                    console.log("дайте відповідь хоча б на одне питання");
                }
                break;
            }
        }
    },
};
export default App;
//# sourceMappingURL=App.js.map