export function addClass(element, ...classNames) {
    classNames.forEach(className => {
        element.classList.add(className);
    });
}
export function removeClass(element, ...classNames) {
    classNames.forEach(className => {
        element.classList.remove(className);
    });
}

//# sourceMappingURL=../../typescript-maps/functions/attributes.js.map
