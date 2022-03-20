// добавляет element класс className
export function addClass(element, ...classNames) {
	classNames.forEach(className => {
		element.classList.add(className);
	})
}

// удаляет element класс className
export function removeClass(element, ...classNames) {
	classNames.forEach(className => {
		element.classList.remove(className);
	})
}

