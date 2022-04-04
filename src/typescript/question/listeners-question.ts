import { addClass } from "../functions/attributes.js";
import { hideElement, showElement } from "../functions/elementActions.js";
import { htmlElements } from "../htmlElements.js";
import { test } from "../main.js";
import { recreateQuestionWrapper } from "./create_func-question.js";


export const questionLinksListener = (e): void => {
    const target = e.target.closest(".question__link");
    if (target == null) {
        return;
    }

    // определяем вопрос на который нужно переключится
    const nextQuestionInfo = test.allQuestionsList[target.dataset.id];

    //! переопределяем текущий вопрос
    test.info.currentInfo = nextQuestionInfo;
    test.info.question =
        test.questionActions.getQuestionObj(nextQuestionInfo);

    if (test.info.questionSwitchLogic === "single") {
        test.info.question.render();
    } else if (test.info.questionSwitchLogic === "seeAll") {
        // получаем data-id элемента по которому кликнули
        const targetId = target.dataset.id;
        // получаем html объект по этому же id
        const $targetQuestion = document.querySelector(
            `.question__wrapper${targetId}`
        )!;

        // получаем Y координаты html элемента вопроса
        const yPos =
            $targetQuestion.getBoundingClientRect().y +
            window.pageYOffset;
        // скроллим окно к этим координатам
        window.scrollTo(0, yPos);
        // изменяем номер вопроса
    }
}

export const buttonsListener = (e) => {
    //! проверяем количество неотвеченных вопросов
    test.info.checkAnswersNumber();
    const target = e.target;
    // текущий вопрос

    // получаем следующий вопрос
    const nextQuestion = test.info.isLastUnanswered
        ? test.info.currentInfo
        : test.questionActions.findNextQuestion(test.info.currentInfo);

    switch (target) {
        case htmlElements.$seeAllQuestionsBtn: {
            switch (test.info.questionSwitchLogic) {
                case "single": {
                    //! изменяем логику переключения между вопросами
                    test.info.questionSwitchLogic = "seeAll";

                    hideElement(htmlElements.$nextBtn!);
                    htmlElements.$seeAllQuestionsBtn!.textContent =
                        "Дивитись один";

                    test.questionActions.seeAllQuestions();

                    break;
                }

                case "seeAll": {
                    //! изменяем логику переключения между вопросами
                    test.info.questionSwitchLogic = "single";
                    // пересоздаём обёртку вопроса
                    recreateQuestionWrapper();
                    // создаём текущий вопрос
                    test.info.question.render();

                    htmlElements.$seeAllQuestionsBtn!.textContent =
                        "Дивитись усі";
                    // показываем кнопку "следующий"
                    showElement(htmlElements.$nextBtn!);
                    break;
                }
            }

            break;
        }

        case htmlElements.$btn: {
            // получаем объект формы и затем получаем ответ
            const answer = test.questionActions
                .getQuestionObj(test.info.currentInfo)
                .getAnswer();

            // проверяем дал ли пользователь ответ
            if (answer.some((answer) => answer)) {
                //! добавляем поле ответа в объект вопроса
                test.info.currentInfo.answer = answer;
            } else {
                return;
            }

            // если мы на последнем вопросе
            if (test.info.isLastUnanswered) {
                //! Завершаем тест
                test.finishTest();
            }

            addClass(
                document.querySelector(".question__link_active")!,
                "question__link_done"
            );

            // break не пишем чтобы сразу переключить вопрос
        }

        case htmlElements.$nextBtn: {
            //! переопределяем текущий вопрос
            test.info.currentInfo = nextQuestion;
            test.info.question =
                test.questionActions.getQuestionObj(nextQuestion);
            // переключаем вопрос
            test.info.question.render();

            break;
        }

        case htmlElements.$endBtn: {
            if (test.allQuestionsList.find((obj) => obj.answer)) {
                // завершаем тест
                test.finishTest();
            } else {
                console.log("дайте відповідь хоча б на одне питання");
            }

            break;
        }
    }
}
