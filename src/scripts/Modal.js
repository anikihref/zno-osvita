import App from "./App.js";
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
    constructor(modalConfig, $modalLayer = createHtmlBlock("div"), $modal = createHtmlBlock("div"), $modalTitle = createHtmlBlock("div", modalConfig.title), $modalBody = createHtmlBlock("div"), $closeBtn = createHtmlBlock("div"), listeners = {
        closeModal() {
            console.log(1);
            App.modals[modalConfig.modalName].close(0, false);
        },
    }) {
        this.modalConfig = modalConfig;
        this.$modalLayer = $modalLayer;
        this.$modal = $modal;
        this.$modalTitle = $modalTitle;
        this.$modalBody = $modalBody;
        this.$closeBtn = $closeBtn;
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
    render() {
        addClass(this.$modal, "modal");
        addClass(this.$modalLayer, "modal-layer");
        addClass(this.$modalTitle, "modal__title");
        addClass(this.$modalBody, "modal__body");
        appendElements(this.$modalBody, this.modalConfig.content);
        appendElements(this.$modal, this.$modalTitle, this.$modalBody);
        appendElements(this.$modalLayer, this.$modal);
        prependElements(document.body, this.$modalLayer);
        this.open();
        return {
            $modalTitle: this.$modalTitle,
            $modal: this.$modal,
        };
    }
    open() {
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
    close(time, deleteModal) {
        this.$closeBtn.removeEventListener("click", this.listeners.closeModal);
        setTimeout(() => {
            removeClass(this.$modalLayer, "modal-layer_active");
            setTimeout(() => {
                hideElement(this.$modalLayer);
                document.body.style.overflow = "visible";
                if (deleteModal) {
                    App.modals[this.modalConfig.modalName].delete();
                }
            }, this.modalConfig.transition);
        }, time);
    }
    delete() {
        setTimeout(() => {
            this.$modalLayer.remove();
            delete App.modals[this.modalConfig.modalName];
        }, this.modalConfig.transition);
    }
}
export class SuccessModal extends Modal {
    constructor(modalConfig) {
        super(modalConfig);
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
    constructor(modalConfig) {
        super(modalConfig);
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
    constructor(modalConfig) {
        super(modalConfig);
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
    constructor(modalConfig) {
        super(modalConfig);
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
    constructor(modalName) {
        super({
            width: "500px",
            height: "500px",
            content: `abc`,
            title: `АВТОРИЗАЦІЯ`,
            transition: 700,
            closable: true,
            modalName,
        });
        this.modalName = modalName;
    }
    render() {
        super.render().$modalTitle.style.backgroundColor = Colors.BlUE;
        return {
            $modal: createHtmlBlock("div"),
            $modalTitle: createHtmlBlock("div"),
        };
    }
    createForm() {
        const $form = createHtmlBlock("form");
        return $form;
    }
}
export class RegisterModal extends AuthModal {
    constructor(modalName) {
        super(modalName);
        this.modalName = modalName;
    }
    render() {
        const $form = super.createForm();
        const $content = this.createContent();
        this.modalConfig.content = $form;
        console.log(this.modalConfig.content);
        const modalElements = super.render();
        appendElements($form, $content);
        return modalElements;
    }
    createContent() {
        const $content = createHtmlBlock("div", `
            Register
        `);
        return $content;
    }
}
export class LogInModal extends AuthModal {
    constructor(modalName) {
        super(modalName);
        this.modalName = modalName;
    }
    render() {
        const $form = super.createForm();
        const $content = this.createContent();
        this.modalConfig.content = $form;
        console.log(this.modalConfig.content);
        const modalElements = super.render();
        appendElements($form, $content);
        return modalElements;
    }
    createContent() {
        const $content = createHtmlBlock("div", `
            Log In
        `);
        return $content;
    }
}
//# sourceMappingURL=Modal.js.map