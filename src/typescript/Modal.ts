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

class Modal implements IModal {
    static modalsList: Record<string, IModal> = {};
    static openedModal: IModal | null = null;

    constructor(
        public modalName: string,
        protected modalConfig: ModalConfig,
        protected $modalLayer: HTMLElement = createHtmlBlock("div"),
        protected $modal: HTMLElement = createHtmlBlock("div"),
        protected $modalTitle: HTMLElement = createHtmlBlock("div"),
        protected $modalBody: HTMLElement = createHtmlBlock("div"),
        protected $closeBtn: HTMLElement = createHtmlBlock("div"),
        private initialized: boolean = false,
        protected listeners = {
            closeModal() {
                Modal.modalsList[modalName].close(0, false);
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

    public initialize(modal: IModal): void {
        this.initialized = true;
        Modal.modalsList[this.modalName] = modal;
    }

    public render(): ModalElements {
        if (this.initialized) {
            // add classes for every element
            addClass(this.$modal, "modal");
            addClass(this.$modalLayer, "modal-layer");
            addClass(this.$modalTitle, "modal__title");
            addClass(this.$modalBody, "modal__body");

            appendElements(
                this.$modalBody,
                this.modalConfig.content as HTMLElement
            );

            appendElements(this.$modal, this.$modalTitle, this.$modalBody);
            appendElements(this.$modalLayer, this.$modal);
            prependElements(document.body, this.$modalLayer);

            this.$modalTitle.innerHTML = this.modalConfig.title;

            // open modal
            this.open();
        } else {
            console.error(
                "Initialize modal to start work: modal.initialize(modal) "
            );
        }

        return {
            $modalTitle: this.$modalTitle,
            $modal: this.$modal,
        };
    }

    public open(): void {
        //TODO: if (!this.closed) { return }
        // if some modal is opened than we`ll close it
        if (Modal.openedModal) {
            Modal.openedModal.close(0, false);
            Modal.openedModal = null;
        }
        if (this.modalConfig.closable) {
            addClass(this.$closeBtn, "modal__close-btn");

            appendElements(this.$modalTitle, this.$closeBtn);

            this.$closeBtn.addEventListener("click", this.listeners.closeModal);
            this.$closeBtn.innerHTML = `<img src="/img/svg/close.svg">`;
        }
        // modal that we are opening is assigned to the openedModal
        Modal.openedModal = Modal.modalsList[this.modalName];

        showElement(this.$modalLayer);

        setTimeout(() => {
            addClass(this.$modalLayer, "modal-layer_active");
            document.body.style.overflow = "hidden";
        }, 0);
    }

    public close(time: number, deleteModal: boolean): void {
        Modal.openedModal = null;
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
                    Modal.modalsList[this.modalName].delete();
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
            delete Modal.modalsList[this.modalName];
        }, this.modalConfig.transition);
    }
}

export class SuccessModal extends Modal {
    constructor(public modalName: string, protected modalConfig: ModalConfig) {
        super(modalName, modalConfig);
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
    constructor(public modalName: string, protected modalConfig: ModalConfig) {
        super(modalName, modalConfig);
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
    constructor(public modalName: string, protected modalConfig: ModalConfig) {
        super(modalName, modalConfig);
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
    constructor(public modalName: string, protected modalConfig: ModalConfig) {
        super(modalName, modalConfig);
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
    constructor(
        public modalName: string,
        protected $form = createHtmlBlock("form") as HTMLFormElement,
        protected $passwordContainer: HTMLElement = createHtmlBlock("div"),
        protected $seePasswordBtn = createHtmlBlock(
            "div",
            `
            <img src="/img/svg/eye-crossed.svg">
        `
        ),
        protected $buttonsBlock: HTMLElement = createHtmlBlock("div")
    ) {
        super(modalName, {
            width: "500px",
            height: "500px",
            content: `The value will change`,
            title: `The value will change`,
            transition: 700,
            closable: true,
        });
        this.$passwordContainer = this.createField(
            "password",
            "password",
            true
        ).$fieldContainer;
        this.$seePasswordBtn.dataset.view = "false";

        addClass(this.$form, "auth__form");
        addClass(this.$seePasswordBtn, "auth-input__eye-img");
        addClass(this.$buttonsBlock, "auth__btn-block");

        appendElements(this.$buttonsBlock, this.createButtons());
    }

    public render(): ModalElements {
        // make authorization modal blue color
        super.render().$modalTitle.style.backgroundColor = Colors.BlUE;

        return {
            $modal: this.$modal,
            $modalTitle: this.$modalTitle,
        };
    }

    protected createField(fieldName: string, type: string, required?: boolean) {
        const $fieldContainer = createHtmlBlock("div");
        const $field = createHtmlBlock("input") as HTMLInputElement;
        const capitalizedFieldName =
            fieldName[0].toUpperCase() + fieldName.substring(1);

        addClass($field, `auth-input__${fieldName}`, "auth-input");
        addClass($fieldContainer, "auth-input__container");

        appendElements($fieldContainer, $field);

        $field.placeholder = `${capitalizedFieldName}${required ? "*" : ""}`;
        $field.type = type;
        $field.dataset.fieldName = fieldName;
        return {
            $fieldContainer,
            $field,
        };
    }

    protected seePasswordListener = (e) => {
        const $img: HTMLImageElement = e.target;
        const $btn: HTMLElement = this.$seePasswordBtn;
        const $passwordField: HTMLInputElement =
            this.$passwordContainer?.querySelector(
                "input.auth-input__password"
            )!;

        if ($btn.dataset.view === "false") {
            $img.src = "/img/svg/eye.svg";
            $passwordField.type = "text";
            $btn.dataset.view = "true";
        } else {
            $img.src = "/img/svg/eye-crossed.svg";
            $passwordField.type = "password";
            $btn.dataset.view = "false";
        }
    };

    protected checkValidListener(e) {
        // console.log(e.target);
        const $target: HTMLInputElement = e.target;
        const $parent: HTMLElement = $target.closest("div")!;
        const value: string = $target.value;
        let pattern: RegExp;
        let $errorHint: HTMLElement;

        switch ($target.dataset.fieldName) {
            case "login": {
                pattern = /[\w\.]{3,16}/g;
                $errorHint = createHtmlBlock(
                    "div",
                    `
                    Помилка валідації. Уведіть валідний логін: Латинські букви, цифри та _
                `
                );

                break;
            }

            case "email": {
                /* 
                    any number of words and -
                    then @ 
                    then any number of words with dot in the end 
                    then any letter more than two
                */
                pattern = /[\w-]+@([\w]+\.)([a-zA-Z]){2,}/g;
                $errorHint = createHtmlBlock(
                    "div",
                    `
                    Помилка валідації. Уведіть правильний email адрес
                `
                );

                break;
            }

            case "password": {
                pattern = /\w{8,16}/g;
                $errorHint = createHtmlBlock(
                    "div",
                    `
                    Помилка валідації. Уведіть валідний пароль: Латинські букви, цифри та _
                `
                );

                break;
            }
        }

        const matched = value.match(pattern!);

        if (matched?.length === 1 && matched[0].length == value.length) {
            addClass($parent, "green-border");
            removeClass($parent, "red-border");

            $parent.querySelector(".auth__error-hint ")?.remove();
        } else if (!value) {
            removeClass($parent, "red-border");
            removeClass($parent, "green-border");

            $parent.querySelector(".auth__error-hint ")?.remove();
        } else {
            addClass($errorHint!, "auth__error-hint");
            addClass($parent, "red-border");
            removeClass($parent, "green-border");

            !!$parent.querySelector(".auth__error-hint ") ?  void 0 : appendElements($parent, $errorHint!)
        }
    }

    protected createButtons(): HTMLElement {
        const $sendBtn = createHtmlBlock("div", "Відправити");
        addClass($sendBtn, "auth-btn-block__send");
        $sendBtn.style.backgroundColor = Colors.BlUE;
        return $sendBtn;
    }
}

export class RegisterModal extends AuthModal {
    constructor(
        public modalName: string,
        private modalTitle: string = "Реєстрація"
    ) {
        super(modalName);
    }

    public render(): ModalElements {
        // create modal body
        const $form = this.$form;
        const $content = this.createContent();

        // change modal content
        this.modalConfig.content = $form;
        this.modalConfig.title = this.modalTitle;
        // set listener to watch password text
        this.$seePasswordBtn.addEventListener(
            "click",
            this.seePasswordListener
        );

        // append content and buttons into block
        appendElements($form, $content, this.$buttonsBlock);
        return super.render();
    }

    private createContent(): HTMLElement {
        // create modal & insert content
        const $login = super.createField("login", "text", true);
        const $email = super.createField("email", "email", true);

        const $content = createHtmlBlock(
            "div",
            $login.$fieldContainer,
            $email.$fieldContainer,
            this.$passwordContainer!
        );
        // append button to see password into the password container
        appendElements(this.$passwordContainer!, this.$seePasswordBtn);

        // set listeners
        [
            $email.$field,
            $login.$field,
            this.$passwordContainer.querySelector("input"),
        ].forEach((el) => {
            el?.addEventListener("blur", this.checkValidListener);
        });

        return $content;
    }
}

export class LogInModal extends AuthModal {
    constructor(public modalName: string, private modalTitle: string = "Вхід") {
        super(modalName);
    }

    public render(): ModalElements {
        // create modal body
        const $form = this.$form;
        const $content = this.createContent();

        // change modal content
        this.modalConfig.content = $form;
        this.modalConfig.title = this.modalTitle;
        // set listener to watch password text
        this.$seePasswordBtn.addEventListener(
            "click",
            this.seePasswordListener
        );

        // append content and buttons into block
        appendElements($form, $content, this.$buttonsBlock);
        return super.render();
    }

    private createContent(): HTMLElement {
        // create modal & insert content
        const $login = super.createField("login", "text", true);
        const $content = createHtmlBlock(
            "div",
            $login.$fieldContainer,
            this.$passwordContainer
        );

        // set listeners
        [$login.$field, this.$passwordContainer.querySelector("input")].forEach(
            (el) => {
                el?.addEventListener("blur", this.checkValidListener);
            }
        );

        // append button to see password into the password container
        appendElements(this.$passwordContainer!, this.$seePasswordBtn);
        return $content;
    }
}
