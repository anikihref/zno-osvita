import { appendElements } from "./elementActions.js";
export function createHtmlBlock(parent, ...content) {
    const $element = document.createElement(parent);
    if (!content) {
        return $element;
    }
    for (const elem of content) {
        if (typeof elem === "string" || typeof elem === "number") {
            $element.innerHTML += elem;
        }
        else {
            appendElements($element, elem);
        }
    }
    return $element;
}

//# sourceMappingURL=../../typescript-maps/functions/createElements.js.map
