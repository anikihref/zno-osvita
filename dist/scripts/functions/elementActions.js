export function appendElements(parent, ...elements) {
    for (const $element of elements) {
        parent.append($element);
    }
}
export function prependElements(parent, ...elements) {
    for (const $element of elements) {
        parent.prepend($element);
    }
}
export function hideElement(element) {
    element.style.display = 'none';
}
export function showElement(element, display = 'block') {
    element.style.display = display;
}
//# sourceMappingURL=elementActions.js.map