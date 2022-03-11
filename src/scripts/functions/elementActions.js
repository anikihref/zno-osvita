// заменяет элемент target на replacer
export function replaceElement(target, replacer) {
	target.replaceWith(replacer);
}

// вставляет в конец элемент parent все элементы из массива elements
export function appendElements(parent, elements) {
	for (const $element of elements) {
		parent.append($element);
	}
}

// вставляет в начало элемент parent все элементы из массива elements
export function prependElements(parent, elements) {
	for (const $element of elements) {
		parent.prepend($element);
	}
}

// удаляет элемент
export function removeElements(elements) {
	elements.forEach($element => {
		if (!$element) { return }

		$element.remove(); 
		
	});
}

// ищет html элементы из точки from по селектору selector
export function findHtmlElements(from = document, selector) {
	return from.querySelectorAll(selector);
}

// ищет html элемент из точки from по селектору selector
export function findHtmlElement(from = document, selector) {
	return from.querySelector(selector);
}

// удаляет внутренний контент elements
export function removeInnerContent(...elements) {
	elements.forEach(element => {
		element.innerHTML = '';
	})
}

// изменяет текст внутри элемента
export function changeTextContent(element, text) {
	element.textContent = text;
}

// прячет элемент
export function hideElement(element) {
	element.style.display = 'none'
}

// показывает элемент
export function showElement(element, display = 'block') {
	element.style.display = display
}