import { addClass } from "../functions/attributes.js";
import { createHtmlBlock } from "../functions/createElements.js";
import { appendElements } from "../functions/elementActions.js";
import { test } from "../main.js";

export function createQuestionLinks(): void {
    appendElements(
        test.elements.$questionControls!,
        test.elements.$questionLinksBlock!
    );
    addClass(test.elements.$questionLinksBlock!, "question__links-block");

    // создаём блоки-ссылки на вопросы
    for (let i = 1; i <= test.allQuestionsList.length; i++) {
        let $questionLink: HTMLElement = createHtmlBlock("div");
        let number: HTMLElement;

        if (
            !test.info.isFinished ||
            test.allQuestionsList[i - 1].vrahovyietiaDpa
        ) {
            number = createHtmlBlock("b", i);
        } else {
            number = createHtmlBlock("span", i);
        }

        appendElements($questionLink, number);
        appendElements(test.elements.$questionLinksBlock!, $questionLink);

        addClass($questionLink, "question__link");
        $questionLink.dataset.id = i - 1 + "";
    }

    // первой ссылке на вопрос добавляем активный класс
    addClass(
        document.querySelector(".question__link")!,
        "question__link_active"
    );
}

export function createResultBlock(): void {
    const $dpaScore = createHtmlBlock(
        "div",
        `Ваш бал ДПА: <b>${Math.trunc(
            (12 * test.result.dpaPercentage) / 100
        )}</b> з 12 можливих.`
    );

    const $dpaQuestionHint = createHtmlBlock(
        "div",
        `Завдання виділені жирним враховуються в бал ДПА`
    );

    const $time = createHtmlBlock(
        "div",
        `Витрачено часу: <b>${test.info.testMinutes} хв.</b> з 180 запропонованих`
    );

    addClass(test.elements.$resultingBlock!, "result");
    addClass($dpaQuestionHint, "hint");

    appendElements(
        test.elements.$resultingBlock!,
        $dpaScore,
        $dpaQuestionHint,
        $time
    );
}

export function recreateQuestionWrapper(): void {
    test.elements.$questionWrapper = createHtmlBlock("div");
    addClass(test.elements.$questionWrapper, "question__wrapper");
    // удаляем контент
    test.elements.$answerForm!.innerHTML = "";
    appendElements(test.elements.$answerForm!, test.elements.$questionWrapper);
}
