// проверяет element на наличие класса className
export function hasClass(element, className) {
	return element.classList.contains(className);
}

// добавляет element класс className
export function addClass(element, ...classNames) {
	classNames.forEach(className => {
		element.classList.add(className);
	})
}

// удаляет element класс className
export function removeClass(element, className) {
	element.classList.remove(className);
}

// добавляет element стили вида {color: "#fff"}
export function addStyles(element, obj) {
	for (const styleName of Object.keys(obj)) {
		element.style[styleName] = obj[styleName]
	}
}

// добавляет element атрибуты вида { someAttribute: attributeValue }
export function addAttributes(element, attributeObj) {
	for (const key of Object.keys(attributeObj)) {
		element.setAttribute(key, attributeObj[key]);
	}
}

