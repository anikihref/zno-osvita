// добавляет поле в объект
export function addField(obj, fieldName, value) {
	obj[fieldName] = value;
}

// добавляет 1 стиль для элемента
export function addStyle(elem, styleKey, value) {
  elem.style[styleKey] = value;
}

// Валидирует value. Если значение null undefined или ''
export function validateEmpty(value) {
	if (typeof value === "object") {
		const isInvalid = value.every((answer) => {
			return answer == "" || answer == null;
		});

		return isInvalid ? void 0 : value;
	}
	//// //// //// ////
	else if (value == null || value == "") {
		return;
	}
	//// //// //// ////
	else {
		return value;
	}
}