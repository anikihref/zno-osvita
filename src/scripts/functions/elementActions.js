// вставляет в конец элемент parent все элементы из массива elements
export function appendElements(parent, ...elements) {
	for (const $element of elements) {
		parent.append($element);
	}
}

// вставляет в начало элемент parent все элементы из массива elements
export function prependElements(parent, ...elements) {
	for (const $element of elements) {
		parent.prepend($element);
	}
}

// прячет элемент
export function hideElement(element) {
	element.style.display = 'none'
}

// показывает элемент
export function showElement(element, display = 'block') {
	element.style.display = display
}