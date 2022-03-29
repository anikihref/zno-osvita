import App from "./App.js";
import { addClass, removeClass } from "./functions/attributes.js";
import { createHtmlBlock } from "./functions/createElements.js";
import { appendElements, hideElement, prependElements, showElement, } from "./functions/elementActions.js";
var Colors;
(function (Colors) {
    Colors["RED"] = "#9d0208";
    Colors["BlUE"] = "#00b4d8";
    Colors["GREEN"] = "#208b3a";
    Colors["YELLOW"] = "#fca311";
})(Colors || (Colors = {}));
class Modal {
    constructor(modalConfig, $modalLayer = createHtmlBlock('div'), $modal = createHtmlBlock('div'), $modalTitle = createHtmlBlock('div', modalConfig.title), $modalBody = createHtmlBlock('div', modalConfig.content), $closeBtn = createHtmlBlock('div'), listeners = {
        closeModal() {
            App.modals[modalConfig.modalName].close(0, false);
        }
    }, closed = false) {
        this.modalConfig = modalConfig;
        this.$modalLayer = $modalLayer;
        this.$modal = $modal;
        this.$modalTitle = $modalTitle;
        this.$modalBody = $modalBody;
        this.$closeBtn = $closeBtn;
        this.listeners = listeners;
        this.closed = closed;
        const modalStyle = this.$modal.style;
        addClass(this.$modal, "modal");
        addClass(this.$modalLayer, "modal-layer");
        addClass(this.$modalTitle, 'modal__title');
        addClass(this.$modalBody, 'modal__body');
        addClass(this.$closeBtn, 'modal__close-btn');
        this.$closeBtn.dataset.modal = this.modalConfig.modalName;
        appendElements($modalLayer, $modal);
        ([
            modalStyle.width,
            modalStyle.height,
            modalStyle.transitionDuration,
            this.$modalLayer.style.transitionDuration,
        ] = [
            this.modalConfig.width,
            this.modalConfig.height,
            `${this.modalConfig.transition}ms`,
            `${this.modalConfig.transition}ms`,
        ]);
    }
    render(color) {
        this.$modalTitle.style.backgroundColor = color;
        appendElements(this.$modal, this.$modalTitle, this.$modalBody);
        prependElements(document.body, this.$modalLayer);
        this.open();
    }
    open() {
        if (this.modalConfig.closable) {
            this.$closeBtn.addEventListener('click', this.listeners.closeModal);
            appendElements(this.$modalTitle, this.$closeBtn);
        }
        showElement(this.$modalLayer);
        setTimeout(() => {
            addClass(this.$modalLayer, "modal-layer_active");
            document.body.style.overflow = 'hidden';
        }, 0);
    }
    close(time = 0, deleteModal = false) {
        this.$closeBtn.removeEventListener('click', this.listeners.closeModal);
        this.closed = true;
        setTimeout(() => {
            removeClass(this.$modalLayer, "modal-layer_active");
            setTimeout(() => {
                hideElement(this.$modalLayer);
                document.body.style.overflow = 'visible';
                if (deleteModal) {
                    App.modals[this.modalConfig.modalName].delete();
                }
            }, this.modalConfig.transition);
        }, time);
    }
    delete() {
        if (!this.closed) {
            App.modals[this.modalConfig.modalName].close(0, false);
        }
        setTimeout(() => {
            this.$modalLayer.remove();
            delete App.modals[this.modalConfig.modalName];
        }, this.modalConfig.transition);
    }
}
export class SuccessModal extends Modal {
    constructor(modalConfig, color = Colors.GREEN) {
        super(modalConfig);
        this.modalConfig = modalConfig;
        this.color = color;
    }
}
export class DangerModal extends Modal {
    constructor(modalConfig, color = Colors.YELLOW) {
        super(modalConfig);
        this.modalConfig = modalConfig;
        this.color = color;
    }
}
export class FatalModal extends Modal {
    constructor(modalConfig, color = Colors.RED) {
        super(modalConfig);
        this.modalConfig = modalConfig;
        this.color = color;
    }
}
export class InfoModal extends Modal {
    constructor(modalConfig, color = Colors.BlUE) {
        super(modalConfig);
        this.modalConfig = modalConfig;
        this.color = color;
    }
}
//# sourceMappingURL=Modal.js.map