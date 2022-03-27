export function addClass(element: HTMLElement, ...classNames: string[]): void {
    classNames.forEach(className => {
		element.classList.add(className);
	})
}

export function removeClass(element: HTMLElement, ...classNames: string[]): void {
	classNames.forEach(className => {
		element.classList.remove(className);
	})
}