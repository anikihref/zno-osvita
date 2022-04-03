import { addClass, removeClass } from "./functions/attributes.js";
import { createHtmlBlock } from "./functions/createElements.js";
import { appendElements, hideElement, prependElements, showElement, } from "./functions/elementActions.js";
var Colors;
(function (Colors) {
    Colors["RED"] = "#9d0208";
    Colors["BlUE"] = "#00b4d8";
    Colors["GREEN"] = "#41a88a";
    Colors["YELLOW"] = "#fca311";
})(Colors || (Colors = {}));
class Modal {
    constructor(modalName, modalConfig, $modalLayer = createHtmlBlock("div"), $modal = createHtmlBlock("div"), $modalTitle = createHtmlBlock("div"), $modalBody = createHtmlBlock("div"), $closeBtn = createHtmlBlock("div"), initialized = false, listeners = {
        closeModal() {
            Modal.modalsList[modalName].close(0, false);
        },
    }) {
        this.modalName = modalName;
        this.modalConfig = modalConfig;
        this.$modalLayer = $modalLayer;
        this.$modal = $modal;
        this.$modalTitle = $modalTitle;
        this.$modalBody = $modalBody;
        this.$closeBtn = $closeBtn;
        this.initialized = initialized;
        this.listeners = listeners;
        const modalStyle = this.$modal.style;
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
    initialize(modal) {
        this.initialized = true;
        Modal.modalsList[this.modalName] = modal;
    }
    render() {
        if (this.initialized) {
            addClass(this.$modal, "modal");
            addClass(this.$modalLayer, "modal-layer");
            addClass(this.$modalTitle, "modal__title");
            addClass(this.$modalBody, "modal__body");
            appendElements(this.$modalBody, this.modalConfig.content);
            appendElements(this.$modal, this.$modalTitle, this.$modalBody);
            appendElements(this.$modalLayer, this.$modal);
            prependElements(document.body, this.$modalLayer);
            this.$modalTitle.innerHTML = this.modalConfig.title;
            this.open();
        }
        else {
            console.error("Initialize modal to start work: modal.initialize(modal) ");
        }
        return {
            $modalTitle: this.$modalTitle,
            $modal: this.$modal,
        };
    }
    open() {
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
        Modal.openedModal = Modal.modalsList[this.modalName];
        showElement(this.$modalLayer);
        setTimeout(() => {
            addClass(this.$modalLayer, "modal-layer_active");
            document.body.style.overflow = "hidden";
        }, 0);
    }
    close(time, deleteModal) {
        Modal.openedModal = null;
        this.$closeBtn.removeEventListener("click", this.listeners.closeModal);
        setTimeout(() => {
            removeClass(this.$modalLayer, "modal-layer_active");
            setTimeout(() => {
                hideElement(this.$modalLayer);
                document.body.style.overflow = "visible";
                if (deleteModal) {
                    Modal.modalsList[this.modalName].delete();
                }
            }, this.modalConfig.transition);
        }, time);
    }
    delete() {
        setTimeout(() => {
            this.$modalLayer.remove();
            delete Modal.modalsList[this.modalName];
        }, this.modalConfig.transition);
    }
}
Modal.modalsList = {};
Modal.openedModal = null;
export class SuccessModal extends Modal {
    constructor(modalName, modalConfig) {
        super(modalName, modalConfig);
        this.modalName = modalName;
        this.modalConfig = modalConfig;
    }
    render() {
        const modalElements = super.render();
        modalElements.$modalTitle.style.backgroundColor = Colors.GREEN;
        return {
            $modalTitle: this.$modalTitle,
            $modal: this.$modal,
        };
    }
}
export class DangerModal extends Modal {
    constructor(modalName, modalConfig) {
        super(modalName, modalConfig);
        this.modalName = modalName;
        this.modalConfig = modalConfig;
    }
    render() {
        const modalElements = super.render();
        modalElements.$modalTitle.style.backgroundColor = Colors.YELLOW;
        return {
            $modalTitle: this.$modalTitle,
            $modal: this.$modal,
        };
    }
}
export class FatalModal extends Modal {
    constructor(modalName, modalConfig) {
        super(modalName, modalConfig);
        this.modalName = modalName;
        this.modalConfig = modalConfig;
    }
    render() {
        const modalElements = super.render();
        modalElements.$modalTitle.style.backgroundColor = Colors.RED;
        return {
            $modalTitle: this.$modalTitle,
            $modal: this.$modal,
        };
    }
}
export class InfoModal extends Modal {
    constructor(modalName, modalConfig) {
        super(modalName, modalConfig);
        this.modalName = modalName;
        this.modalConfig = modalConfig;
    }
    render() {
        const modalElements = super.render();
        modalElements.$modalTitle.style.backgroundColor = Colors.BlUE;
        return {
            $modalTitle: this.$modalTitle,
            $modal: this.$modal,
        };
    }
}
class AuthModal extends Modal {
    constructor(modalName, $form = createHtmlBlock("form"), $passwordContainer = createHtmlBlock("div"), $seePasswordBtn = createHtmlBlock("div", `
            <img src="/img/svg/eye-crossed.svg">
        `), $buttonsBlock = createHtmlBlock("div")) {
        super(modalName, {
            width: "500px",
            height: "500px",
            content: `The value will change`,
            title: `The value will change`,
            transition: 700,
            closable: true,
        });
        this.modalName = modalName;
        this.$form = $form;
        this.$passwordContainer = $passwordContainer;
        this.$seePasswordBtn = $seePasswordBtn;
        this.$buttonsBlock = $buttonsBlock;
        this.seePasswordListener = (e) => {
            var _a;
            const $img = e.target;
            const $btn = this.$seePasswordBtn;
            const $passwordField = (_a = this.$passwordContainer) === null || _a === void 0 ? void 0 : _a.querySelector("input.auth-input__password");
            if ($btn.dataset.view === "false") {
                $img.src = "/img/svg/eye.svg";
                $passwordField.type = "text";
                $btn.dataset.view = "true";
            }
            else {
                $img.src = "/img/svg/eye-crossed.svg";
                $passwordField.type = "password";
                $btn.dataset.view = "false";
            }
        };
        this.$passwordContainer = this.createField("password", "password", true).$fieldContainer;
        this.$seePasswordBtn.dataset.view = "false";
        addClass(this.$form, "auth__form");
        addClass(this.$seePasswordBtn, "auth-input__eye-img");
        addClass(this.$buttonsBlock, "auth__btn-block");
        appendElements(this.$buttonsBlock, this.createButtons());
    }
    render() {
        super.render().$modalTitle.style.backgroundColor = Colors.BlUE;
        return {
            $modal: this.$modal,
            $modalTitle: this.$modalTitle,
        };
    }
    createField(fieldName, type, required) {
        const $fieldContainer = createHtmlBlock("div");
        const $field = createHtmlBlock("input");
        const capitalizedFieldName = fieldName[0].toUpperCase() + fieldName.substring(1);
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
    checkValidListener(e) {
        var _a, _b;
        const $target = e.target;
        const $parent = $target.closest("div");
        const value = $target.value;
        let pattern;
        let $errorHint;
        switch ($target.dataset.fieldName) {
            case "login": {
                pattern = /[\w\.]{3,16}/g;
                $errorHint = createHtmlBlock("div", `
                    Помилка валідації. Уведіть валідний логін: Латинські букви, цифри та _
                `);
                break;
            }
            case "email": {
                pattern = /[\w-]+@([\w]+\.)([a-zA-Z]){2,}/g;
                $errorHint = createHtmlBlock("div", `
                    Помилка валідації. Уведіть правильний email адрес
                `);
                break;
            }
            case "password": {
                pattern = /\w{8,16}/g;
                $errorHint = createHtmlBlock("div", `
                    Помилка валідації. Уведіть валідний пароль: Латинські букви, цифри та _
                `);
                break;
            }
        }
        const matched = value.match(pattern);
        if ((matched === null || matched === void 0 ? void 0 : matched.length) === 1 && matched[0].length == value.length) {
            addClass($parent, "green-border");
            removeClass($parent, "red-border");
            (_a = $parent.querySelector(".auth__error-hint ")) === null || _a === void 0 ? void 0 : _a.remove();
        }
        else if (!value) {
            removeClass($parent, "red-border");
            removeClass($parent, "green-border");
            (_b = $parent.querySelector(".auth__error-hint ")) === null || _b === void 0 ? void 0 : _b.remove();
        }
        else {
            addClass($errorHint, "auth__error-hint");
            addClass($parent, "red-border");
            removeClass($parent, "green-border");
            !!$parent.querySelector(".auth__error-hint ") ? void 0 : appendElements($parent, $errorHint);
        }
    }
    createButtons() {
        const $sendBtn = createHtmlBlock("div", "Відправити");
        addClass($sendBtn, "auth-btn-block__send");
        $sendBtn.style.backgroundColor = Colors.BlUE;
        return $sendBtn;
    }
}
export class RegisterModal extends AuthModal {
    constructor(modalName, modalTitle = "Реєстрація") {
        super(modalName);
        this.modalName = modalName;
        this.modalTitle = modalTitle;
    }
    render() {
        const $form = this.$form;
        const $content = this.createContent();
        this.modalConfig.content = $form;
        this.modalConfig.title = this.modalTitle;
        this.$seePasswordBtn.addEventListener("click", this.seePasswordListener);
        appendElements($form, $content, this.$buttonsBlock);
        return super.render();
    }
    createContent() {
        const $login = super.createField("login", "text", true);
        const $email = super.createField("email", "email", true);
        const $content = createHtmlBlock("div", $login.$fieldContainer, $email.$fieldContainer, this.$passwordContainer);
        appendElements(this.$passwordContainer, this.$seePasswordBtn);
        [
            $email.$field,
            $login.$field,
            this.$passwordContainer.querySelector("input"),
        ].forEach((el) => {
            el === null || el === void 0 ? void 0 : el.addEventListener("blur", this.checkValidListener);
        });
        return $content;
    }
}
export class LogInModal extends AuthModal {
    constructor(modalName, modalTitle = "Вхід") {
        super(modalName);
        this.modalName = modalName;
        this.modalTitle = modalTitle;
    }
    render() {
        const $form = this.$form;
        const $content = this.createContent();
        this.modalConfig.content = $form;
        this.modalConfig.title = this.modalTitle;
        this.$seePasswordBtn.addEventListener("click", this.seePasswordListener);
        appendElements($form, $content, this.$buttonsBlock);
        return super.render();
    }
    createContent() {
        const $login = super.createField("login", "text", true);
        const $content = createHtmlBlock("div", $login.$fieldContainer, this.$passwordContainer);
        [$login.$field, this.$passwordContainer.querySelector("input")].forEach((el) => {
            el === null || el === void 0 ? void 0 : el.addEventListener("blur", this.checkValidListener);
        });
        appendElements(this.$passwordContainer, this.$seePasswordBtn);
        return $content;
    }
}
//# sourceMappingURL=Modal.js.map