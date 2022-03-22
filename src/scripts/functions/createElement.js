import { appendElements } from "./elementActions.js";

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

