export function replaceElement(target, replacer) {
	target.replaceWith(replacer);
}

export function appendElements(parent, elements) {
	for (const $element of elements) {
		parent.append($element);
	}
}

export function prependElements(parent, elements) {
	for (const $element of elements) {
		parent.prepend($element);
	}
}

export function removeElements(elements) {
	elements.forEach($element => {
		if (!$element) { return }

		$element.remove(); 
		
	});
}

export function findHtmlElements(from = document, selector) {
	return from.querySelectorAll(selector);
}

export function findHtmlElement(from = document, selector) {
	return from.querySelector(selector);
}

export function removeInnerContent	(...elements) {
	elements.forEach(element => {
		element.innerHTML = '';
	})
}

// изменяет текст внутри элемента
export function changeTextContent(element, text) {
	element.textContent = text;
}

export function hideElement(element) {
	element.style.display = 'none'
}
export function showElement(element, display = 'block') {
	element.style.display = display
}