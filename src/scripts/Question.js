import { addClass, removeClass } from "./functions/attributes.js";
import { createHtmlBlock } from "./functions/createElements.js";
import { appendElements, prependElements } from "./functions/elementActions.js";
import { htmlElements } from "./htmlElements.js";
import { app } from "./main.js";
export class Question {
    constructor(question) {
        this.question = question;
    }
    render() {
        const formObj = Question.questionActions.getQuestionObj(this.question);
        app.$questionWrapper.innerHTML = "";
        appendElements(app.$questionWrapper, this.createQuestionNumber(this.question.id + 1), this.createQuestionWrapper());
        if (app.questionsConfig.isFinished) {
            appendElements(app.$questionWrapper, this.createAnswerWrapper());
        }
        else {
            appendElements(app.$questionWrapper, formObj.createAnswerForm());
            formObj.insertAnswer();
        }
        Question.questionActions.moveActiveLink(this.question.id);
    }
    createQuestionWrapper() {
        const formObj = Question.questionActions.getQuestionObj(this.question);
        const $questionWrapper = createHtmlBlock("div");
        addClass($questionWrapper, "question__text-wrapper");
        if (this.question.text) {
            appendElements($questionWrapper, this.createQuestionText());
        }
        if (this.question.questions) {
            appendElements($questionWrapper, formObj.createQuestions());
        }
        if (this.question.questionImage) {
            appendElements($questionWrapper, this.createQuestionImageBlock());
        }
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
        const $questionNumber = createHtmlBlock("div", `Завдання ${questionNum} з ${app.allQuestionsList.length}`);
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
Question.questionActions = {
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
    moveActiveLink(questionId) {
        const $nextActiveBlock = app.$questionLinksBlock.querySelector(`[data-id="${questionId}"]`);
        const $activeBlock = app.$questionLinksBlock.querySelector(".question__link_active");
        if ($nextActiveBlock.dataset.id === $activeBlock.dataset.id) {
            return;
        }
        addClass($nextActiveBlock, "question__link_active");
        removeClass($activeBlock, "question__link_active");
    },
    findNextQuestion(question) {
        if (app.allQuestionsList.length - 1 == question.id) {
            return app.allQuestionsList[0];
        }
        else {
            return app.allQuestionsList[question.id + 1];
        }
    },
    seeAllQuestions() {
        htmlElements.$answerForm.innerHTML = "";
        app.allQuestionsList.forEach((question) => {
            const formObj = Question.questionActions.getQuestionObj(question);
            const $question = createHtmlBlock("div", formObj.createQuestionWrapper(), formObj.createAnswerWrapper());
            prependElements($question, formObj.createQuestionNumber(question.id + 1));
            addClass($question, "question__wrapper", "question__wrapper_all", `question__wrapper${question.id}`);
            appendElements(htmlElements.$answerForm, $question);
            addClass($question.querySelector(".question__answer-wrapper"), "question__answer-wrapper_all");
        });
    },
};
export class RadioQuestion extends Question {
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
            return createHtmlBlock('div');
        }
        const $questionBlocksText = createHtmlBlock("div", "Початок речення:");
        const $questionBlocks = createHtmlBlock("div", $questionBlocksText);
        addClass($questionBlocks, "radio__questions-block");
        addClass($questionBlocksText, "question__form-text_help");
        this.question.questions.forEach((question, i) => {
            const $questionRow = createHtmlBlock("div", `
					<div class="radio__question-num">${i + 1}</div>
					<div class="radio__question-text">${question}</div>
				`);
            appendElements($questionBlocks, $questionRow);
            addClass($questionRow, "radio__question");
        });
        return $questionBlocks;
    }
    createFormVariants() {
        const $questionBlocksText = createHtmlBlock("div", "Закінчення речення:");
        const $variantBlocks = createHtmlBlock("div", $questionBlocksText);
        addClass($variantBlocks, "radio__variants-block");
        addClass($questionBlocksText, "question__form-text_help");
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
export class WriteQuestion extends Question {
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
//# sourceMappingURL=Question.js.map