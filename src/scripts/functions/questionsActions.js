import { app } from "../main.js";
import { addClass, removeClass } from "./attributes.js";
import { htmlElements } from "../htmlElements.js";
import { RadioQuestion, WriteQuestion } from "../Question.js";

import {
  appendElements,
  
  prependElements,
} from "./elementActions.js";

import { createHtmlBlock, createQuestionNumber } from "./createElement.js";

export const questionsActions = {
	getQuestionObj(obj) {
		const type = obj.type;
		switch (type) {
			case "radio": {
				return new RadioQuestion(obj);
			}
	
			case "write": {
				return new WriteQuestion(obj);
			}
	
			default: {
				console.log(`Instance класса формы типа ${type} не создан `);
			}
		}
	},
  // ищет следующий вопрос
  /* 
	есть два режима функции:
		> default: просто ищет след вопрос
		> smart: пропускает уже отвеченные вопросы
	*/
  findNextQuestion(question, logic = "default") {
    // делаем копию массива вопросов
    const allQuesitonsCopy = [...app.allQuestionsList];
    // вырезаем все объекты от текущего (не включая текущий) до конца
    const remainingObjects = allQuesitonsCopy.slice(question.id + 1);

    if (logic === "smart") {
      // если мы на последнем вопросе то ищем неотвеченный
      if (app.allQuestionsList.length - 1 == question.id) {
        return allQuesitonsCopy.find((obj) => !obj.answer);
      } else {
        // ищем первый неотвеченый вопрос от текущего до последнего(не включая текущий)
        return remainingObjects.find((obj) => !obj.answer);
      }
    } else if (logic === "default") {
      // если мы на последнем вопросе то переходим на первый
      if (app.allQuestionsList.length - 1 == question.id) {
        return allQuesitonsCopy[0];
      } else {
        return allQuesitonsCopy[question.id + 1];
      }
    }
  },

  // перемещает активную ссылку на вопрост
  moveActiveLink(nextQuestionId) {
    // элемент ссылки на вопрос который станет активным
    const $nextActiveBlock = htmlElements.$questionBlocks.querySelector(
      `[data-id="${nextQuestionId}"]`
    );
    // текущий активный элемент ссылки на вопрос
    const $activeBlock = htmlElements.$questionBlocks.querySelector(
      ".question__block_active"
    );

    if ($nextActiveBlock.dataset.id === $activeBlock.dataset.id) {
      return;
    }

    addClass($nextActiveBlock, "question__block_active");
    removeClass($activeBlock, "question__block_active");
  },

  // увидеть сразу все вопросы (только после завершения теста)
  seeAllQuestions() {
    htmlElements.$answerForm.innerHTML = ''

    app.allQuestionsList.forEach((question) => {
      const formObj = this.getQuestionObj(question);
      // создаём html вопроса
      const $question = createHtmlBlock("div", [
        formObj.createQuestionWrapper(),
        formObj.createAnswerWrapper(),
      ]);
      // создаём div с номером вопроса
      const $questionNumber = createQuestionNumber(question.id + 1);
      // вставляем div с номером вопроса в блок вопроса
      prependElements($question, [$questionNumber]);
      // добавляем классы блоку вопроса
      addClass(
        $question,
        "question__wrapper",
        "question__wrapper_all",
        `question__wrapper${question.id}`
      );
      // добавляем блок вопроса в блок со всеми вопросами
      appendElements(htmlElements.$answerForm, [$question]);

      // добавляем класс для блока с ответом
      addClass(
        $question.querySelector(".question__answer-wrapper"),
        "question__answer-wrapper_all"
      );
    });
  },

  // переключатель вопроса
  turnQuestion(question, parent = htmlElements.$questionWrapper) {
    const formObj = this.getQuestionObj(question);
    // удаляем контент родительского блока
    parent.innerHTML = ''

    appendElements(parent, [
      createQuestionNumber(question.id + 1),
      formObj.createQuestionWrapper(),
    ]);
    // вставляем html вопроса в родительский блок
		
    if (app.questionsConfig.isFinished) {
      appendElements(parent, [
        formObj.createAnswerWrapper(),
      ]);
    } else {
      appendElements(parent, [
        formObj.createAnswerForm(),
      ]);
      // вставляем ответ
      formObj.insertAnswer();
    }

    // перемещаем активную ссылку на вопрос
    questionsActions.moveActiveLink(question.id);
  },
};
