import { addClass } from "../functions/attributes.js";
import { createHtmlBlock } from "../functions/createElements.js";
import { appendElements } from "../functions/elementActions.js";
import Question from "./main-question.js";
class RadioQuestion extends Question {
    constructor(question, letters = ["А", "Б", "В", "Г", "Д", "Є"]) {
        super(question);
        this.question = question;
        this.letters = letters;
    }
    insertAnswer() {
        if (!this.question.answer) {
            return;
        }
        const answers = this.question.answer;
        answers.forEach((answer, i) => {
            if (!answer) {
                return;
            }
            const $parent = document.querySelector(`.radio__form-row${i + 1}`);
            const inputs = [
                ...$parent.querySelectorAll("input.radio__input"),
            ];
            const id = this.question.variants.findIndex((variant) => variant === answer);
            inputs[id].checked = true;
        });
    }
    getAnswer() {
        const checkedInputs = [];
        const answers = [];
        const inputs = {};
        let questionsNum;
        if (this.question.questions) {
            questionsNum = this.question.questions.length;
        }
        else {
            questionsNum = 1;
        }
        for (let i = 0; i < questionsNum; i++) {
            const $parent = document.querySelector(`.radio__form-row${i + 1}`);
            const currentInputs = [
                ...$parent.querySelectorAll(`input.radio__input`),
            ];
            inputs[`row${i + 1}`] = currentInputs;
            checkedInputs.push(currentInputs.find((el) => el.checked));
        }
        checkedInputs.forEach((input, i) => {
            if (!input) {
                return answers.push("");
            }
            const id = inputs[`row${i + 1}`].indexOf(input);
            const result = this.question.variants[id];
            answers.push(result);
        });
        return answers;
    }
    createAnswerForm() {
        let resultingHtml = ``;
        let questionsNum;
        if (this.question.questions) {
            questionsNum = this.question.questions.length;
        }
        else {
            questionsNum = 1;
        }
        for (let i = 0; i < questionsNum; i++) {
            resultingHtml += `
						<div class="radio__form-row radio__form-row${i + 1}">
							<div class="radio__form-num">${i + 1}</div>
					`;
            this.question.variants.forEach((variant, j) => {
                resultingHtml += `
						<label class="radio__button-label">
						`;
                if (i === 0) {
                    resultingHtml += `<div class="radio__form-letter">${this.letters[j]}</div>`;
                }
                resultingHtml += `
							<input class="radio__input" type="radio" name="answer${i}" id="answer${j}" data-id="${j + 1}">
							<div class="radio__button"></div>
						</label>
						`;
            });
            resultingHtml += `</div>`;
        }
        const $form = createHtmlBlock("div", resultingHtml);
        addClass($form, "question__multipleRadio");
        return $form;
    }
    createQuestions() {
        const $questions = createHtmlBlock("div", this.createQuestion(), this.createFormVariants());
        addClass($questions, "question__radio-questions");
        return $questions;
    }
    createQuestion() {
        if (!this.question.questions) {
            this.question.questions = [];
            this.question.questions.push(this.question.text);
        }
        const $questionHint = createHtmlBlock("div", "Початок речення:");
        const $questionBlocks = createHtmlBlock("div", $questionHint);
        addClass($questionBlocks, "radio__questions-block");
        addClass($questionHint, "hint");
        this.question.questions.forEach((question, i) => {
            const $questionRow = createHtmlBlock("div");
            const $radioQuestionNum = createHtmlBlock("div", i + 1);
            const $radioQuestionText = createHtmlBlock("div", question);
            addClass($radioQuestionNum, "radio__question-num");
            addClass($radioQuestionText, "radio__question-text");
            addClass($questionRow, "radio__question");
            appendElements($questionRow, $radioQuestionNum, $radioQuestionText);
            appendElements($questionBlocks, $questionRow);
        });
        return this.question.questions[0] === this.question.text ? createHtmlBlock('div') : $questionBlocks;
    }
    createFormVariants() {
        const $questionBlocksText = createHtmlBlock("div", "Закінчення речення:");
        const $variantBlocks = createHtmlBlock("div", $questionBlocksText);
        addClass($variantBlocks, "radio__variants-block");
        addClass($questionBlocksText, "hint");
        this.question.variants.forEach((variant, i) => {
            const $questionRow = createHtmlBlock("div", `
					<div class="radio__variant-letter">${this.letters[i]}</div>
					<div class="radio__variant-text">${variant}</div>
				`);
            appendElements($variantBlocks, $questionRow);
            addClass($questionRow, "radio__variant");
        });
        return $variantBlocks;
    }
}
export default RadioQuestion;
//# sourceMappingURL=radio-question.js.map