import { addClass } from "../functions/attributes.js";
import { hideElement, showElement } from "../functions/elementActions.js";
import { test } from "../pages/test.js";
import { recreateQuestionWrapper } from "./create_func-question.js";
export const questionLinksListener = (e) => {
    const target = e.target.closest(".question__link");
    if (target == null) {
        return;
    }
    const nextQuestionInfo = test.allQuestionsList[target.dataset.id];
    test.info.currentInfo = nextQuestionInfo;
    test.info.question =
        test.questionActions.getQuestionObj(nextQuestionInfo);
    if (test.info.questionSwitchLogic === "single") {
        test.info.question.render();
    }
    else if (test.info.questionSwitchLogic === "seeAll") {
        const targetId = target.dataset.id;
        const $targetQuestion = document.querySelector(`.question__wrapper${targetId}`);
        const yPos = $targetQuestion.getBoundingClientRect().y +
            window.pageYOffset;
        window.scrollTo(0, yPos);
    }
};
export const buttonsListener = (e) => {
    test.info.checkAnswersNumber();
    const target = e.target;
    const nextQuestion = test.info.isLastUnanswered
        ? test.info.currentInfo
        : test.questionActions.findNextQuestion(test.info.currentInfo);
    switch (target) {
        case test.elements.$seeAllQuestionsBtn: {
            switch (test.info.questionSwitchLogic) {
                case "single": {
                    test.info.questionSwitchLogic = "seeAll";
                    hideElement(test.elements.$nextBtn);
                    test.elements.$seeAllQuestionsBtn.textContent =
                        "Дивитись один";
                    test.questionActions.seeAllQuestions();
                    break;
                }
                case "seeAll": {
                    test.info.questionSwitchLogic = "single";
                    recreateQuestionWrapper();
                    test.info.question.render();
                    test.elements.$seeAllQuestionsBtn.textContent =
                        "Дивитись усі";
                    showElement(test.elements.$nextBtn);
                    break;
                }
            }
            break;
        }
        case test.elements.$btn: {
            const answer = test.questionActions
                .getQuestionObj(test.info.currentInfo)
                .getAnswer();
            if (answer.some((answer) => answer)) {
                test.info.currentInfo.answer = answer;
            }
            else {
                return;
            }
            if (test.info.isLastUnanswered) {
                test.finishTest();
            }
            addClass(document.querySelector(".question__link_active"), "question__link_done");
        }
        case test.elements.$nextBtn: {
            test.info.currentInfo = nextQuestion;
            test.info.question =
                test.questionActions.getQuestionObj(nextQuestion);
            test.info.question.render();
            break;
        }
        case test.elements.$endBtn: {
            if (test.allQuestionsList.find((obj) => obj.answer)) {
                test.finishTest();
            }
            else {
                console.log("дайте відповідь хоча б на одне питання");
            }
            break;
        }
    }
};
//# sourceMappingURL=listeners-question.js.map