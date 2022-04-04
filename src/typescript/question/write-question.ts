import { addClass } from "../functions/attributes.js";
import { createHtmlBlock } from "../functions/createElements.js";
import Question from "./main-question.js"


class WriteQuestion extends Question {
    constructor(public question: QuestionInfo) {
        super(question);
    }

    insertAnswer(): void {
        if (!this.question.answer) {
            return;
        }
        // получаем массив input'ов
        const inputs = [
            ...document.querySelectorAll(
                `.form${this.question.id} .writeInput`
            ),
        ] as HTMLInputElement[];

        // вставляем каждый ответ в соответствующую форму
        this.question.answer.forEach((answer, i) => {
            inputs[i].value = answer;
        });
    }

    getAnswer(): string[] {
        const inputs = [
            ...document.querySelectorAll(`.form__inputText > input`),
        ] as HTMLInputElement[];
        const values = inputs.map((elem) => elem.value);

        return values;
    }

    createQuestions(): HTMLElement {
        let outerHtml: string = "";

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

    createAnswerForm(): HTMLElement {
        let innerHtml: string =
            "<div class='question__write-text'>Впишіть відповідь:</div>";

        if (!this.question.questions) {
            return createHtmlBlock("div");
        }

        // создаёт элементы input для ответа на вопрос
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

export default WriteQuestion