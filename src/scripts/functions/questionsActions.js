import { allQuestionsList } from "../main.js";
import {
  addAttributes,
  addClass,
  removeClass,
} from "./attributes.js";
import { htmlElements } from "../htmlElements.js";

import {
  appendElements,
  removeInnerContent,
  changeTextContent,
  prependElements,
} from "./elementActions.js";

import { createHtmlBlock, createQuestionNumber } from "./createElement.js";
import { getFormObj } from "./getObjects.js";

const { $questionBlocks, $questionNum, $answerForm, $questionWrapper } =
  htmlElements;

/* 
ищет следующий вопрос
есть два режима функции:
	> default: просто ищет след вопрос
	> smart: пропускает уже отвеченные вопросы
*/
export function findNextQuestion(question, logic = "default") {
  // делаем копию массива вопросов
  const allQuesitonsCopy = [...allQuestionsList];
  // вырезаем все объекты от текущего (не включая текущий) до конца
  const remainingObjects = allQuesitonsCopy.slice(question.id + 1);

  if (logic === "smart") {
    // если мы на последнем вопросе то ищем неотвеченный
    if (allQuestionsList.length - 1 == question.id) {
      return allQuesitonsCopy.find((obj) => !obj.answer);
    } else {
      // ищем первый неотвеченый вопрос от текущего до последнего(не включая текущий)
      return remainingObjects.find((obj) => !obj.answer);
    }
  } else if (logic === "default") {
    // если мы на последнем вопросе то переходим на первый
    if (allQuestionsList.length - 1 == question.id) {
      return allQuesitonsCopy[0];
    } else {
      return allQuesitonsCopy[question.id + 1];
    }
  }
}

// перемещает активную ссылку на вопрост
export function moveActiveLink(nextQuestionId) {
  // элемент ссылки на вопрос который станет активным
  const $nextActiveBlock = $questionBlocks.querySelector(
    `[data-id="${nextQuestionId}"]`
  );
  // текущий активный элемент ссылки на вопрос
  const $activeBlock = $questionBlocks.querySelector(".question__block_active");

  if ($nextActiveBlock.dataset.id === $activeBlock.dataset.id) {
    return;
  }

  addClass($nextActiveBlock, "question__block_active");
  removeClass($activeBlock, "question__block_active");
}

// добавляет класс для отвеченных вопросов
export function makeDoneLink() {
  const $doneQuestionLink = document.querySelector(".question__block_active");
  addClass($doneQuestionLink, "question__block_done");
}

// создаёт блоки-ссылки на вопросы
export function createQuestionLinks(num) {
  for (let i = 1; i <= num; i++) {
    const $questionLink = createHtmlBlock("div", [`<span>${i}</span>`]);

    addClass($questionLink, "question__block");
    appendElements($questionBlocks, [$questionLink]);
    addAttributes($questionLink, {
      "data-id": i - 1,
    });
  }
}

// увидеть сразу все вопросы (только после завершения теста)
export function seeAllQuestions() {
  removeInnerContent($answerForm);

  allQuestionsList.forEach((question) => {
    const formObj = getFormObj(question);
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
    appendElements($answerForm, [$question]);

    // добавляем класс для блока с ответом
    addClass(
      $question.querySelector(".question__answer-wrapper"),
      "question__answer-wrapper_all"
    );
  });
}

// вставляет ответ если он уже был дан
export function insertAnswer(question) {
  if (!question.answer) {
    return;
  }

  const $answerWrapper = document.querySelector(`.form${question.id}`);

  switch (question.type) {
    case "write": {
      // получаем массив input'ов типа type="text"
      const inputs = [...$answerWrapper.querySelectorAll(".writeInput")];
      // вставляем каждый ответ в соответствующую форму
      question.answer.forEach((answer, i) => {
        inputs[i].value = answer;
      });

      break;
    }

    case "radio": {
      const answers = question.answer;

      answers.forEach((answer, i) => {
        if (!answer) {
          return;
        }

        const $parent = document.querySelector(`.radio__form-row${i + 1}`);

        const inputs = [...$parent.querySelectorAll(".radio__input")];
        const id = question.variants.findIndex((variant) => variant === answer);

        inputs[id].checked = true;
      });
    }
  }
}

// переключатель вопроса (когда тест не завершён)
export function turnQuestion(question, parent = $questionWrapper) {
  const formObj = getFormObj(question);
  // удаляем контент родительского блока
  removeInnerContent(parent);

  // вставляем html вопроса в родительский блок
  appendElements(parent, [
    createQuestionNumber(question.id + 1),
    formObj.createQuestionWrapper(),
    formObj.createAnswerForm(),
  ]);

  // если ранее ответ был дан то вставляем этот ответ
  if (question.hasOwnProperty("answer")) {
    insertAnswer(question);
  }
  // перемещаем активную ссылку на вопрос
  moveActiveLink(question.id);
}

// переключатель вопроса (когда тест завершён)
export function turnQuestionFinished(question, parent = $questionWrapper) {
  const formObj = getFormObj(question);
  // удаляем контент родительского блока
  removeInnerContent(parent);
  // вставляем html вопроса в родительский блок
  appendElements(parent, [
    createQuestionNumber(question.id + 1),
    formObj.createQuestionWrapper(),
    formObj.createAnswerWrapper(),
  ]);
  // перемещаем активную ссылку на вопрос
  moveActiveLink(question.id);
}
