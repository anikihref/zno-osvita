import { addClass } from "../functions/attributes.js";
import { createHtmlBlock } from "../functions/createElements.js";
import Question from "./main-question.js";
class WriteQuestion extends Question {
    constructor(question) {
        super(question);
        this.question = question;
    }
    insertAnswer() {
        if (!this.question.answer) {
            return;
        }
        const inputs = [
            ...document.querySelectorAll(`.form${this.question.id} .writeInput`),
        ];
        this.question.answer.forEach((answer, i) => {
            inputs[i].value = answer;
        });
    }
    getAnswer() {
        const inputs = [
            ...document.querySelectorAll(`.form__inputText > input`),
        ];
        const values = inputs.map((elem) => elem.value);
        return values;
    }
    createQuestions() {
        let outerHtml = "";
        if (!this.question.questions) {
            return createHtmlBlock("div");
        }
        this.question.questions.forEach((question, i) => {
            outerHtml += `
					<p class="question__text-multiple"> ${i + 1}. ${question}</p>
				`;
        });
        const $questions = createHtmlBlock("div", outerHtml);
        addClass($questions, "question__write-questions");
        return $questions;
    }
    createAnswerForm() {
        let innerHtml = "<div class='question__write-text'>Впишіть відповідь:</div>";
        if (!this.question.questions) {
            return createHtmlBlock("div");
        }
        for (let i = 1; i <= this.question.questions.length; i++) {
            innerHtml += `
				<div class="form__inputText">
					<p class="form__write-num">${i}.</p>
					<input type="text" class="writeInput" id="input${i}">
				</div>`;
        }
        const $form = createHtmlBlock("div", innerHtml);
        $form.id = "question";
        addClass($form, "form__multipleWrite", `form${this.question.id}`);
        return $form;
    }
}
export default WriteQuestion;

//# sourceMappingURL=../../typescript-maps/question/write-question.js.map
