import { addClass } from "../functions/attributes.js";
import { createHtmlBlock } from "../functions/createElements.js";
import { appendElements } from "../functions/elementActions.js";
import { test } from "../main.js";
class Question {
    constructor(question) {
        this.question = question;
    }
    render() {
        const formObj = test.questionActions.getQuestionObj(this.question);
        const questionProgress = ((test.info.currentInfo.id + 1) / test.allQuestionsList.length) *
            100;
        test.elements.$progressBar.style.width = `${questionProgress}%`;
        test.elements.$questionWrapper.innerHTML = "";
        appendElements(test.elements.$questionWrapper, this.createQuestionNumber(this.question.id + 1), this.createQuestionWrapper());
        if (test.info.isFinished) {
            appendElements(test.elements.$questionWrapper, this.createAnswerWrapper());
        }
        else {
            appendElements(test.elements.$questionWrapper, formObj.createAnswerForm());
            formObj.insertAnswer();
        }
        test.questionActions.moveActiveLink(this.question.id);
    }
    createQuestionWrapper() {
        const formObj = test.questionActions.getQuestionObj(this.question);
        const $questionWrapper = createHtmlBlock("div");
        addClass($questionWrapper, "question__text-wrapper");
        if (this.question.text) {
            appendElements($questionWrapper, this.createQuestionText());
        }
        if (this.question.questionImage) {
            appendElements($questionWrapper, this.createQuestionImageBlock());
        }
        appendElements($questionWrapper, formObj.createQuestions());
        return $questionWrapper;
    }
    createQuestionText() {
        const $questionTextWrapper = createHtmlBlock("div", `<p>${this.question.text}</p>`);
        addClass($questionTextWrapper, "question__text");
        return $questionTextWrapper;
    }
    createQuestionImageBlock() {
        const $imageWrapper = createHtmlBlock("div", `<img src="${this.question.questionImage}">`);
        addClass($imageWrapper, "question__wrapper-image");
        return $imageWrapper;
    }
    createQuestionNumber(questionNum) {
        const $questionNumber = createHtmlBlock("div", `Завдання ${questionNum} з ${test.allQuestionsList.length}`);
        addClass($questionNumber, "question__num_all");
        return $questionNumber;
    }
    createAnswerWrapper() {
        const $qestionAnswerWrapper = createHtmlBlock("div", this.createExpectedAnswerBlock(), this.createAnswerBlock());
        addClass($qestionAnswerWrapper, "question__answer-wrapper");
        return $qestionAnswerWrapper;
    }
    createAnswerBlock() {
        if (!this.question.answer) {
            return createHtmlBlock("div");
        }
        let answerHtml = "";
        this.question.answer.forEach((answer, i) => {
            answerHtml += `<p>${++i}. ${answer !== null && answer !== void 0 ? answer : "нет ответа"}</p> `;
        });
        const $answerBlockTitle = createHtmlBlock("h3", "Ваш ответ:");
        const $answerBlock = createHtmlBlock("div", answerHtml);
        addClass($answerBlockTitle, "question__answer-title");
        addClass($answerBlock, "question__answer");
        $answerBlock.prepend($answerBlockTitle);
        return $answerBlock;
    }
    createExpectedAnswerBlock() {
        let answerHtml = "";
        this.question.expectedAnswer.forEach((answer, i) => {
            answerHtml += `<p>${++i}. ${answer}</p> `;
        });
        const $answerBlockTitle = createHtmlBlock("h3", "Ответ:");
        const $answerBlock = createHtmlBlock("div", answerHtml);
        $answerBlockTitle.classList.add("question__answer-title");
        $answerBlock.classList.add("question__answer");
        $answerBlock.prepend($answerBlockTitle);
        return $answerBlock;
    }
}
export default Question;
//# sourceMappingURL=main-question.js.map