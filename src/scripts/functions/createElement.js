import { htmlElements } from "../htmlElements.js";
import { addAttributes, addClass } from "./attributes.js";
import { appendElements, removeInnerContent } from "./elementActions.js";
import { getFormObj } from "./getObjects.js";
import { turnQuestionFinished } from "./questionsActions.js";

const { $answerForm } = htmlElements

// создаёт элемент parent c Html контентом - content внутри
export function createHtmlBlock(parent, content, attributesObj) {
  const $element = document.createElement(parent);
	let contentArray = content;
	let type = 'object/html'

	if (!content && content != 0) { return $element }

	// если content - html объект или если передали массив с аналогичным первым элементом
	if (content instanceof HTMLElement || content[0] instanceof HTMLElement) {
		type = 'object/html'
	}
	else {
		type = 'text/html'
	}

	// если content не массив то делаем его массивом
	if (!(content instanceof Array)) {
		contentArray = [content]
	}

	

	// всавляем в созданный элемент контент если передан текст
	if (type === 'text/html') {
		contentArray.forEach(htmlElement => {
			$element.innerHTML += htmlElement;
		})
		
	} 
	// всавляем в созданный элемент контент если передан html элемент
	else if (type === 'object/html') {
		appendElements($element, contentArray)
	}

	// если передан объект атрибутов то вставляем в объект аттрибуты
	if (typeof attributesObj === 'object') {
		addAttributes($element, attributesObj)
	}


  return $element;
}



// создаёт элемент parent c текстовым контентом - text внутри
export function createTextBlock(parent, text) {
  const $element = document.createElement(parent);

  $element.textContent = text;
  return $element;
}

// передаём строку с именем html тега и объект с любыми названиями атрибутов которые будут вставлены в элемент
// arg2 типа { someAttribute: attributeValue }
export function createElementWithAttribute(elem, attributeObj) {
  // создаём блок
  const $element = document.createElement(elem);

  // вставляем в элемнт атрибуты со значениями
  for (const key of Object.keys(attributeObj)) {
    $element.setAttribute(key, attributeObj[key]);
  }

  return $element;
}

// создаёт html формы
export function createAnswerForm(questionObj) {
    const formObj = getFormObj(questionObj, questionObj.type); // создаём объект на основе нового
    return formObj.createFormWithContent(); // создаём html
}

export function createAnswerWrapper(question) {
	const $qestionAnswerWrapper = document.createElement("div");

	// создаём элемент с правильными ответами
	const $expectedAnswerBlock = getFormObj(
		question,
		question.type
	).createExpectedAnswerBlock();
	// создаём элемент с ответами пользователя
	const $answerBlock = getFormObj(
		question,
		question.type
	).createAnswerBlock();


	addClass($qestionAnswerWrapper, "question__answer-wrapper")
	appendElements($qestionAnswerWrapper, [
		$expectedAnswerBlock,
		$answerBlock
	])
	
	return $qestionAnswerWrapper;
}

export function createQuestionTextWrapper(question) {
  const $questionText = getFormObj(question).createQuestionText()
  const $questionTextWrapper = createHtmlBlock("div", $questionText);
	
	addClass($questionTextWrapper, 'question__text-wrapper')

  return $questionTextWrapper;
}

export function createQuestion(question) {
  const $answerForm = createAnswerForm(question);
  const $questionTextWrapper = createQuestionTextWrapper(question);

  return  [$questionTextWrapper, $answerForm];
}

export function createQuestionFinished(question) {
  const $answerWrapper = createAnswerWrapper(question)
  const $questionTextWrapper = createQuestionTextWrapper(question);

  return [$questionTextWrapper, $answerWrapper];
}

export function recreateQuestionWrapper(question) {
	const $questionWrapper = createHtmlBlock('div')
	addClass($questionWrapper, 'question__wrapper')
	removeInnerContent($answerForm)
	appendElements($answerForm, [$questionWrapper])
  // переключаем на этот же вопрос
  turnQuestionFinished(question, $questionWrapper);

	return $questionWrapper
}