export function appendElements(parent: HTMLElement, ...elements: HTMLElement[]) {
	for (const $element of elements) {
		parent.append($element);
	}
}

export function prependElements(parent: HTMLElement, ...elements: HTMLElement[]) {
	for (const $element of elements) {
		parent.prepend($element);
	}
}

export function hideElement(element: HTMLElement) {
	element.style.display = 'none'
}

// показывает элемент
export function showElement(element: HTMLElement, display: string = 'block') {
	element.style.display = display
}