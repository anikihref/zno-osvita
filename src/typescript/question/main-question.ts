import { addClass } from "../functions/attributes.js";
import { createHtmlBlock } from "../functions/createElements.js";
import { appendElements } from "../functions/elementActions.js";
import { test } from "../pages/test.js";

class Question {
    constructor(public question: QuestionInfo) {}

    render(): void {
        const formObj = test.questionActions.getQuestionObj(this.question);
        const questionProgress: number =
            ((test.info.currentInfo.id + 1) / test.allQuestionsList.length) *
            100;

        // move progress bar forward or backward 
        test.elements.$progressBar!.style.width = `${questionProgress}%`
        test.elements.$questionWrapper!.innerHTML = "";
        appendElements(
            test.elements.$questionWrapper!,
            this.createQuestionNumber(this.question.id + 1),
            this.createQuestionWrapper()
        );

        if (test.info.isFinished) {
            appendElements(
                test.elements.$questionWrapper!,
                this.createAnswerWrapper()
            );
        } else {
            appendElements(
                test.elements.$questionWrapper!,
                formObj.createAnswerForm()
            );
            // вставляем ответ
            formObj.insertAnswer();
        }

        // перемещаем активную ссылку на вопрос
        test.questionActions.moveActiveLink(this.question.id);
    }

    createQuestionWrapper(): HTMLElement {
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
            `Завдання ${questionNum} з ${test.allQuestionsList.length}`
        );

        addClass($questionNumber, "question__num_all");
        return $questionNumber;
    }

    // создаёт блок с ответами правильными ответами и ответами пользователя
    createAnswerWrapper(): HTMLElement {
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

export default Question;
