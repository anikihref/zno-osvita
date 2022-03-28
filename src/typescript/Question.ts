import { addClass, removeClass } from "./functions/attributes.js";
import { createHtmlBlock } from "./functions/createElements.js";
import { appendElements, prependElements } from "./functions/elementActions.js";
import { htmlElements } from "./htmlElements.js";
import { app } from "./main.js";

export class Question {
    constructor(protected question: QuestionInfo) {}

    static questionActions = {
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
        moveActiveLink(questionId: number) {
            // элемент ссылки на вопрос который станет активным
            const $nextActiveBlock: HTMLElement =
                app.$questionLinksBlock.querySelector(
                    `[data-id="${questionId}"]`
                )!;
            // текущий активный элемент ссылки на вопрос
            const $activeBlock: HTMLElement =
                app.$questionLinksBlock.querySelector(
                    ".question__link_active"
                )!;

            if ($nextActiveBlock.dataset.id === $activeBlock.dataset.id) {
                return;
            }

            addClass($nextActiveBlock, "question__link_active");
            removeClass($activeBlock, "question__link_active");
        },
        findNextQuestion(question: QuestionInfo): QuestionInfo {
            // если мы на последнем вопросе то переходим на первый
            if (app.allQuestionsList.length - 1 == question.id) {
                return app.allQuestionsList[0];
            } else {
                return app.allQuestionsList[question.id + 1];
            }
        },
        seeAllQuestions() {
            htmlElements.$answerForm!.innerHTML = "";

            app.allQuestionsList.forEach((question) => {
                const formObj =
                    Question.questionActions.getQuestionObj(question);
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
                appendElements(htmlElements.$answerForm!, $question);

                // добавляем класс для блока с ответом
                addClass(
                    $question.querySelector(".question__answer-wrapper")!,
                    "question__answer-wrapper_all"
                );
            });
        },
    };

    render(): void {
        const formObj = Question.questionActions.getQuestionObj(this.question);
        app.$questionWrapper.innerHTML = "";

        appendElements(
            app.$questionWrapper,
            this.createQuestionNumber(this.question.id + 1),
            this.createQuestionWrapper()
        );

        if (app.questionsConfig.isFinished) {
            appendElements(app.$questionWrapper, this.createAnswerWrapper());
        } else {
            appendElements(app.$questionWrapper, formObj.createAnswerForm());
            // вставляем ответ
            formObj.insertAnswer();
        }

        // перемещаем активную ссылку на вопрос
        Question.questionActions.moveActiveLink(this.question.id);
    }

    createQuestionWrapper() {
        const formObj = Question.questionActions.getQuestionObj(this.question);
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

    // создаёт текста вопроса
    createQuestionText(): HTMLElement {
        const $questionTextWrapper = createHtmlBlock(
            "div",
            `<p>${this.question.text}</p>`
        );
        addClass($questionTextWrapper, "question__text");

        return $questionTextWrapper;
    }

    // создаёт блок с картинкой для вопроса
    createQuestionImageBlock(): HTMLElement {
        const $imageWrapper = createHtmlBlock(
            "div",
            `<img src="${this.question.questionImage}">`
        );
        addClass($imageWrapper, "question__wrapper-image");

        return $imageWrapper;
    }

    createQuestionNumber(questionNum: number): HTMLElement {
        const $questionNumber = createHtmlBlock(
            "div",
            `Завдання ${questionNum} з ${app.allQuestionsList.length}`
        );

        addClass($questionNumber, "question__num_all");
        return $questionNumber;
    }

    // создаёт блок с ответами правильными ответами и ответами пользователя
    createAnswerWrapper() {
        const $qestionAnswerWrapper = createHtmlBlock(
            "div",
            // создаём элемент с правильными ответами
            this.createExpectedAnswerBlock(),
            // создаём элемент с ответами пользователя если ответы есть
            this.createAnswerBlock()
        );

        addClass($qestionAnswerWrapper, "question__answer-wrapper");

        return $qestionAnswerWrapper;
    }

    // создаёт блок с ответами пользователя (если ответы были)
    createAnswerBlock(): HTMLElement {
        if (!this.question.answer) {
            return createHtmlBlock("div");
        }

        let answerHtml = "";
        this.question.answer.forEach((answer, i) => {
            answerHtml += `<p>${++i}. ${answer ?? "нет ответа"}</p> `;
        });

        const $answerBlockTitle = createHtmlBlock("h3", "Ваш ответ:");
        const $answerBlock = createHtmlBlock("div", answerHtml);

        addClass($answerBlockTitle, "question__answer-title");
        addClass($answerBlock, "question__answer");

        $answerBlock.prepend($answerBlockTitle);
        return $answerBlock;
    }

    // создаёт блок с правильными ответами
    createExpectedAnswerBlock(): HTMLElement {
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

export class RadioQuestion extends Question {
    constructor(
        protected question: QuestionInfo,
        private letters: string[] = ["А", "Б", "В", "Г", "Д", "Є"]
    ) {
        super(question);
    }

    // если ранее ответ был дан то вставляем этот ответ
    insertAnswer(): void {
        if (!this.question.answer) {
            return;
        }

        const answers = this.question.answer;

        answers.forEach((answer, i) => {
            if (!answer) {
                return;
            }

            const $parent = document.querySelector(`.radio__form-row${i + 1}`)!;

            const inputs = [
                ...$parent.querySelectorAll("input.radio__input"),
            ] as HTMLInputElement[];

            const id = this.question.variants!.findIndex(
                (variant) => variant === answer
            );

            inputs[id].checked = true;
        });
    }

    // получает ответ пользователя
    getAnswer() {
        const checkedInputs: HTMLInputElement[] = [];
        const answers: string[] = [];
        const inputs = {};
        let questionsNum: number;

        if (this.question.questions) {
            questionsNum = this.question.questions.length;
        } else {
            questionsNum = 1;
        }

        for (let i = 0; i < questionsNum; i++) {
            const $parent = document.querySelector(`.radio__form-row${i + 1}`)!;

            const currentInputs = [
                ...$parent.querySelectorAll(`input.radio__input`),
            ] as HTMLInputElement[]; // из коллекции делаем массив инпутов
            inputs[`row${i + 1}`] = currentInputs;
            checkedInputs.push(
                currentInputs.find((el) => el.checked) as HTMLInputElement
            );
        }

        checkedInputs.forEach((input, i) => {
            // если ответа нет то ответ ''
            if (!input) {
                return answers.push("");
            }

            // получаем из ряда инпутов index выдбраного инпута
            const id = inputs[`row${i + 1}`].indexOf(input);
            // получаем ответ по индексу из массива ответов
            const result = this.question.variants![id];

            answers.push(result);
        });

        return answers;
    }

    createAnswerForm(): HTMLElement {
        let resultingHtml: string = ``;
        let questionsNum: number;

        if (this.question.questions) {
            questionsNum = this.question.questions.length;
        } else {
            questionsNum = 1;
        }

        for (let i = 0; i < questionsNum; i++) {
            resultingHtml += `
						<div class="radio__form-row radio__form-row${i + 1}">
							<div class="radio__form-num">${i + 1}</div>
					`;

            this.question.variants!.forEach((variant, j) => {
                resultingHtml += `
						<label class="radio__button-label">
						`;
                if (i === 0) {
                    resultingHtml += `<div class="radio__form-letter">${this.letters[j]}</div>`;
                }
                resultingHtml += `
							<input class="radio__input" type="radio" name="answer${i}" id="answer${j}" data-id="${
                    j + 1
                }">
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

    createQuestions(): HTMLElement {
        const $questions = createHtmlBlock(
            "div",
            this.createQuestion(),
            this.createFormVariants()
        );
        addClass($questions, "question__radio-questions");

        return $questions;
    }

    // создаёт блок с вопросами ответов
    private createQuestion(): HTMLElement {
        if (!this.question.questions) {
            this.question.questions = [];
            this.question.questions.push(this.question.text!);
        }

        const $questionBlocksText = createHtmlBlock("div", "Початок речення:");
        const $questionBlocks = createHtmlBlock("div", $questionBlocksText);

        addClass($questionBlocks, "radio__questions-block");
        addClass($questionBlocksText, "question__form-text_help");

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

    // создаёт блок с вариантами ответов
    private createFormVariants() {
        const $questionBlocksText = createHtmlBlock(
            "div",
            "Закінчення речення:"
        );
        const $variantBlocks = createHtmlBlock("div", $questionBlocksText);

        addClass($variantBlocks, "radio__variants-block");
        addClass($questionBlocksText, "question__form-text_help");

        this.question.variants!.forEach((variant, i) => {
            const $questionRow = createHtmlBlock(
                "div",
                `
					<div class="radio__variant-letter">${this.letters[i]}</div>
					<div class="radio__variant-text">${variant}</div>
				`
            );

            appendElements($variantBlocks, $questionRow);
            addClass($questionRow, "radio__variant");
        });

        return $variantBlocks;
    }
}

export class WriteQuestion extends Question implements QuestionForm {
    constructor(protected question: QuestionInfo) {
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
