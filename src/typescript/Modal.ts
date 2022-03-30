import App from "./App.js";
import { addClass, removeClass } from "./functions/attributes.js";
import { createHtmlBlock } from "./functions/createElements.js";
import {
    appendElements,
    hideElement,
    prependElements,
    showElement,
} from "./functions/elementActions.js";

interface ModalConfig {
    width: string;
    height: string;
    content: string | HTMLElement;
    title: string;
    transition: number;
    closable: boolean;
    modalName: string;
}

type ModalElements = {
    $modal: HTMLElement;
    $modalTitle: HTMLElement;
    [key: string]: HTMLElement;
};

enum Colors {
    RED = "#9d0208",
    BlUE = "#00b4d8",
    GREEN = "#41a88a",
    YELLOW = "#fca311",
}

export class Modal implements IModal {
    constructor(
        protected modalConfig: ModalConfig,
        protected $modalLayer: HTMLElement = createHtmlBlock("div"),
        protected $modal: HTMLElement = createHtmlBlock("div"),
        protected $modalTitle: HTMLElement = createHtmlBlock(
            "div",
            modalConfig.title
        ),
        protected $modalBody: HTMLElement = createHtmlBlock("div"),
        protected $closeBtn: HTMLElement = createHtmlBlock("div"),
        private listeners = {
            closeModal() {
                console.log(1);

                App.modals[modalConfig.modalName].close(0, false);
            },
        } //TODO: private closed: boolean = false,
    ) {
        const modalStyle = this.$modal.style;

        // Style assigning
        [
            modalStyle.width,
            modalStyle.height,
            modalStyle.transitionDuration,
            this.$modalLayer.style.transitionDuration,
        ] = [
            this.modalConfig.width,
            this.modalConfig.height,
            `${this.modalConfig.transition}ms`,
            `${this.modalConfig.transition}ms`,
        ];
    }

    public render(): ModalElements {
        // add classes for every element
        addClass(this.$modal, "modal");
        addClass(this.$modalLayer, "modal-layer");
        addClass(this.$modalTitle, "modal__title");
        addClass(this.$modalBody, "modal__body");

        appendElements(this.$modalBody, this.modalConfig.content as HTMLElement)
        appendElements(this.$modal, this.$modalTitle, this.$modalBody);
        appendElements(this.$modalLayer, this.$modal);
        prependElements(document.body, this.$modalLayer);

        // open modal
        this.open();

        return {
            $modalTitle: this.$modalTitle,
            $modal: this.$modal,
        };
    }

    public open(): void {
        //TODO: if (!this.closed) { return }

        if (this.modalConfig.closable) {
            addClass(this.$closeBtn, "modal__close-btn");

            appendElements(this.$modalTitle, this.$closeBtn);

            this.$closeBtn.addEventListener("click", this.listeners.closeModal);
            this.$closeBtn.innerHTML = `<img src="/img/svg/close.svg">`;
        }

        showElement(this.$modalLayer);

        setTimeout(() => {
            addClass(this.$modalLayer, "modal-layer_active");
            document.body.style.overflow = "hidden";
        }, 0);
    }

    public close(time: number, deleteModal: boolean): void {
        this.$closeBtn.removeEventListener("click", this.listeners.closeModal);
        //TODO: this.closed = true

        // close modal after time(ms) arg
        setTimeout(() => {
            removeClass(this.$modalLayer, "modal-layer_active");
            // wait till the transition ends and hiding modal
            setTimeout(() => {
                hideElement(this.$modalLayer);
                document.body.style.overflow = "visible";
                // execute callback
                if (deleteModal) {
                    App.modals[this.modalConfig.modalName].delete();
                }
            }, this.modalConfig.transition);
        }, time);
    }

    public delete(): void {
        //TODO: if (!this.closed) {
        //TODO:     App.modals[this.modalConfig.modalName].close(0, false)
        //TODO: }

        setTimeout(() => {
            this.$modalLayer.remove();
            delete App.modals[this.modalConfig.modalName];
        }, this.modalConfig.transition);
    }
}

export class SuccessModal extends Modal {
    constructor(protected modalConfig: ModalConfig) {
        super(modalConfig);
    }

    public render(): ModalElements {
        const modalElements = super.render();

        modalElements.$modalTitle.style.backgroundColor = Colors.GREEN;

        return {
            $modalTitle: this.$modalTitle,
            $modal: this.$modal,
        };
    }
}

export class DangerModal extends Modal {
    constructor(protected modalConfig: ModalConfig) {
        super(modalConfig);
    }

    public render(): ModalElements {
        const modalElements = super.render();

        modalElements.$modalTitle.style.backgroundColor = Colors.YELLOW;

        return {
            $modalTitle: this.$modalTitle,
            $modal: this.$modal,
        };
    }
}

export class FatalModal extends Modal {
    constructor(protected modalConfig: ModalConfig) {
        super(modalConfig);
    }

    public render(): ModalElements {
        const modalElements = super.render();

        modalElements.$modalTitle.style.backgroundColor = Colors.RED;

        return {
            $modalTitle: this.$modalTitle,
            $modal: this.$modal,
        };
    }
}

export class InfoModal extends Modal {
    constructor(protected modalConfig: ModalConfig) {
        super(modalConfig);
    }

    public render(): ModalElements {
        const modalElements = super.render();

        modalElements.$modalTitle.style.backgroundColor = Colors.BlUE;

        return {
            $modalTitle: this.$modalTitle,
            $modal: this.$modal,
        };
    }
}

class AuthModal extends Modal {
    constructor(public modalName: string) {
        super({
            width: "500px",
            height: "500px",
            content: `abc`,
            title: `АВТОРИЗАЦІЯ`,
            transition: 700,
            closable: true,
            modalName,
        });
    }

    public render(): ModalElements {
        // make authorization modal blue color
        super.render().$modalTitle.style.backgroundColor = Colors.BlUE;

        return {
            $modal: createHtmlBlock("div"),
            $modalTitle: createHtmlBlock("div"),
        };
    }

    // create form
    protected createForm(): HTMLFormElement {
        const $form = createHtmlBlock("form") as HTMLFormElement;
        return $form;
    }
}

export class RegisterModal extends AuthModal {
    constructor(public modalName: string) {
        super(modalName)
    }

    public render(): ModalElements {
        // create modal body
        const $form = super.createForm();
        const $content = this.createContent();

        this.modalConfig.content = $form;
        console.log(this.modalConfig.content);
        
        // inherit modal
        const modalElements = super.render();

        appendElements($form, $content);

        return modalElements;
    }

    private createContent(): HTMLElement {
        const $content = createHtmlBlock(
            "div",
            `
            Register
        `
        );

        return $content;
    }
}

export class LogInModal extends AuthModal {
    constructor(public modalName: string) {
        super(modalName)
    }

    public render(): ModalElements {
        // create modal body
        const $form = super.createForm();
        const $content = this.createContent();

        this.modalConfig.content = $form;
        console.log(this.modalConfig.content);
        
        // inherit modal
        const modalElements = super.render();

        appendElements($form, $content);

        return modalElements;
    }

    private createContent(): HTMLElement {
        const $content = createHtmlBlock(
            "div",
            `
            Log In
        `
        );

        return $content;
    }
}
