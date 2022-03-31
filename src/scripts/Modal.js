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
export class Modal {
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
            console.error('Initialize modal to start work: modal.initialize(modal) ');
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
        return {
            $fieldContainer,
            $field,
        };
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
        const $login = super.createField("login", "text", true).$fieldContainer;
        const $email = super.createField("email", "email", true).$fieldContainer;
        const $content = createHtmlBlock("div", $login, $email, this.$passwordContainer);
        appendElements(this.$passwordContainer, this.$seePasswordBtn);
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
        const $login = super.createField("login", "text", true).$fieldContainer;
        const $content = createHtmlBlock("div", $login, this.$passwordContainer);
        appendElements(this.$passwordContainer, this.$seePasswordBtn);
        return $content;
    }
}
//# sourceMappingURL=Modal.js.map