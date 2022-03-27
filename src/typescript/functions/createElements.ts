import {appendElements} from "./elementActions.js"

export function createHtmlBlock(parent: string, ...content: string[] | HTMLElement[] | number[]) {
  const $element = document.createElement(parent);

  if (!content) { return $element }

  //вставляем контент
  for (const elem of content) {
    // вставляем в созданный элемент контент если передан текст
    if (typeof elem === "string" || typeof elem === "number") {
      $element.innerHTML += elem;
    }
    // всавляем в созданный элемент контент если передан html элемент
    else {
      appendElements($element, elem);
    }
  }

  return $element;
}
