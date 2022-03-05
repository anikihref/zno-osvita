import { allQuestionsList } from "../currentQuestions.js";
import {
  addAttributes,
  addClass,
  addStyles,
  removeClass,
} from "./attributes.js";
import { htmlElements } from "../htmlElements.js";

import {
  appendElements,
  removeInnerContent,
  changeTextContent,
} from "./elementActions.js";

import {
  createHtmlBlock,
	createQuestion,
	createQuestionFinished
} from "./createElement.js";

const { $questionBlocks, $questionNum, $answerForm } = htmlElements;

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

export function makeDoneLink() {
	const $doneQuestionLink = document.querySelector('.question__block_active')
	addClass($doneQuestionLink, 'question__block_done')
}

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

export function seeAllQuestions() {
  removeInnerContent($answerForm);

  allQuestionsList.forEach((question) => {
    // создаём html вопроса
    const $question = createQuestionFinished(question);
    // создаём div с номером вопроса
    const $questionNumber = createHtmlBlock("div", question.id + 1);
    // вставляем div с номером вопроса в блок вопроса
    appendElements($question, [$questionNumber]);
    // добавляем классы блоку вопроса
    addClass(
      $question,
      "question__wrapper_all",
      `question__wrapper${question.id}`
    );
    // добавляем блок вопроса в блок со всеми вопросами
    appendElements($answerForm, [$question]);
    // стилизируем div номер вопроса
    addStyles($questionNumber, {
      position: "absolute",
      fontSize: "12rem",
      right: "30px",
      top: "50%",
      transform: "translateY(-50%)",
      opacity: ".2",
      color: "#fff",
    });
    // добавляем класс для блока с ответом
    addClass(
      $question.querySelector(".question__answer-wrapper"),
      "question__answer-wrapper_all"
    );
  });
}

// arg1 объект вопроса
export function insertAnswer(question) {
  if (!question.answer) {
    return;
  }

  const $answerWrapper = document.querySelector(`.form${question.id}`);

  switch (question.type) {
    case "write": {
      $answerWrapper.querySelector("#writeInput").value = question.answer;

      break;
    }

    case "radio": {
      // массив из всех радио кнопок
      const inputs = [...$answerWrapper.querySelectorAll("input.radio__input")];
      // массив из всех span'ов вариантов ответа
      const $answerElement = [...document.querySelectorAll("span.radioAnswer")]
        // ищем среди span'ов тот span у которого текст совпадает с ответом пользователя
        .find((element) => element.textContent === question.answer);

      // среди радио кнопок ищем ту кнопку у которой id совпадает с id span'а
      // делаем кнопку выбраной
      inputs.find((input) => {
        return input.getAttribute("id") === $answerElement.getAttribute("id");
      }).checked = true;

      break;
    }

    case "multipleWrite": {
      // получаем массив input'ов типа type="text"
      const inputs = [
        ...$answerWrapper.querySelectorAll("input.multipleWriteInput"),
      ];
      // вставляем каждый ответ в соответствующую форму
      question.answer.forEach((answer, i) => {
        inputs[i].value = answer;
      });

      break;
    }
  }
}

export function changeQuestionNumber(num) {
  changeTextContent($questionNum, num);
}

export function turnQuestion(question, parent = $answerForm) {
	// создаём html элемент вопроса
	const $questionWrapper = createQuestion(question)

	// удаляем контент родительского блока
	removeInnerContent(parent)

  // вставляем html вопроса в родительский блок
	appendElements(parent, [$questionWrapper])

  // если ранее ответ был дан то вставляем этот ответ
  if (question.hasOwnProperty("answer")) {
    insertAnswer(question);
  }
	// перемещаем активную ссылку на вопрос
  moveActiveLink(question.id);
	// переключаем номер вопроса
  changeQuestionNumber(question.id + 1);

  return $questionWrapper;
}

export function turnQuestionFinished(question, parent = $answerForm) {
	// создаём html элемент вопроса
	const $questionWrapper = createQuestionFinished(question)

	// удаляем контент родительского блока
	removeInnerContent(parent)

	// перемещаем активную ссылку на вопрос
  moveActiveLink(question.id);
	// переключаем номер вопроса
  changeQuestionNumber(question.id + 1);

  // вставляем html вопроса в родительский блок
  appendElements(parent, [$questionWrapper]);

	return $questionWrapper
}
