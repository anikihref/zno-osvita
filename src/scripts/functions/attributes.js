export function hasClass(element, className) {
	return element.classList.contains(className);
}

export function addClass(element, ...classNames) {
	classNames.forEach(className => {
		element.classList.add(className);
	})
}

export function removeClass(element, className) {
	element.classList.remove(className);
}

export function addStyles(element, obj) {
	for (const styleName of Object.keys(obj)) {
		element.style[styleName] = obj[styleName]
	}
}


export function addAttributes(element, attributeObj) {
	for (const key of Object.keys(attributeObj)) {
		element.setAttribute(key, attributeObj[key]);
	}
}

