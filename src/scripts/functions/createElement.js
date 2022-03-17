import { app } from "../main.js";
import { htmlElements } from "../htmlElements.js";
import { addClass } from "./attributes.js";
import { appendElements } from "./elementActions.js";
import { questionsActions } from "./questionsActions.js";	

/*
создаёт элемент parent c Html контентом - content(может быть и html элементом и простым текстом) внутри. 
*/
export function createHtmlBlock(parent, content) {
  const $element = document.createElement(parent);
	if (!content && content != 0) { return $element }



	// если content не массив то делаем его массивом
	if (!(content instanceof Array)) {
		content = [content]
	}

	//вставляем контент
	for (const elem of content) {
		let type = 'object/html'

		// если content - html объект или если передали массив с аналогичным первым элементом
		if (elem instanceof HTMLElement) {
			type = 'object/html'
		}
		else {
			type = 'text/html'
		}

		// вставляем в созданный элемент контент если передан текст
		if (type === 'text/html') {
			$element.innerHTML += elem;
		} 
		// всавляем в созданный элемент контент если передан html элемент
		else if (type === 'object/html') {
			appendElements($element, [elem])
		}
	}

  return $element;
}

// пересоздаёт обёртку для вопроса, нужно присвоить переменной $questionWrapper
export function recreateQuestionWrapper(question) {
	const $questionWrapper = createHtmlBlock('div')
	addClass($questionWrapper, 'question__wrapper')
	// удаляем контент
	htmlElements.$answerForm.innerHTML = ''
	appendElements(htmlElements.$answerForm, [$questionWrapper])
  // переключаем на этот же вопрос
  questionsActions.turnQuestion(question, $questionWrapper);

	return $questionWrapper
}

export function createQuestionNumber(questionNum) {
	const $questionNumber = createHtmlBlock("div", `
		Завдання ${questionNum} з ${app.allQuestionsList.length}
	`);

	addClass($questionNumber, 'question__num_all')

	return $questionNumber
}