import { appendElements } from "./elementActions.js";

/*
создаёт элемент parent c Html контентом - content(может быть и html элементом и простым текстом) внутри. 
*/
export function createHtmlBlock(parent, ...content) {
  	const $element = document.createElement(parent);
	if (!content) { return $element }


	//вставляем контент
	for (const elem of content) {

		// вставляем в созданный элемент контент если передан текст
		if (typeof elem === 'string') {

			$element.innerHTML += elem;
		} 
		// всавляем в созданный элемент контент если передан html элемент
		else {
			appendElements($element, elem)
		}
	}

  	return $element;
}

