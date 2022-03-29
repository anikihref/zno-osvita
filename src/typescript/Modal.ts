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
    content: string;
    title: string;
    transition: number;
    closable: boolean;
    modalName: string;
}

enum Colors {
    RED = '#9d0208',
    BlUE = '#00b4d8',
    GREEN = '#208b3a',
    YELLOW = '#fca311'
}

class Modal implements IModal {

    constructor(
        protected modalConfig: ModalConfig,
        protected $modalLayer: HTMLElement = createHtmlBlock('div'),
        protected $modal: HTMLElement = createHtmlBlock('div'),
        protected $modalTitle: HTMLElement = createHtmlBlock('div', modalConfig.title),
        protected $modalBody: HTMLElement = createHtmlBlock('div', modalConfig.content),
        protected $closeBtn: HTMLElement = createHtmlBlock('div'),
        private listeners = {
            closeModal() {
                App.modals[modalConfig.modalName].close(0, false)
            }
        },
        private closed: boolean = false,
    ) {
        const modalStyle = this.$modal.style;

        addClass(this.$modal, "modal");
        addClass(this.$modalLayer, "modal-layer");
        addClass(this.$modalTitle, 'modal__title')
        addClass(this.$modalBody, 'modal__body')
        addClass(this.$closeBtn, 'modal__close-btn')



        this.$closeBtn.dataset.modal = this.modalConfig.modalName


        appendElements($modalLayer, $modal);

        // Style assigning
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
        ])
    }

    render(color: string): void {
    

        this.$modalTitle.style.backgroundColor = color

        appendElements(this.$modal, this.$modalTitle, this.$modalBody)
        
        prependElements(document.body, this.$modalLayer);

        this.open();
    }

    open(): void {
        if (this.modalConfig.closable) {
            this.$closeBtn.addEventListener('click', this.listeners.closeModal)
            appendElements(this.$modalTitle, this.$closeBtn)
        }

        showElement(this.$modalLayer)

        setTimeout(() => {
            addClass(this.$modalLayer, "modal-layer_active");
            document.body.style.overflow = 'hidden'
        }, 0);

    }

    close(time: number = 0, deleteModal: boolean = false): void {
        this.$closeBtn.removeEventListener('click', this.listeners.closeModal)
        
        this.closed = true


         // close modal after time(ms) arg
         setTimeout(() => {
            removeClass(this.$modalLayer, "modal-layer_active");
            // wait till the transition ends and hiding modal
            setTimeout(() => {
                hideElement(this.$modalLayer);
                document.body.style.overflow = 'visible'
                // execute callback
                if (deleteModal) {
                    App.modals[this.modalConfig.modalName].delete()
                }
            }, this.modalConfig.transition);
        }, time);
       
    }

    delete(): void {
        if (!this.closed) {
            App.modals[this.modalConfig.modalName].close(0, false)
        }

        setTimeout(() => {
            this.$modalLayer.remove()
            delete App.modals[this.modalConfig.modalName];
            
        }, this.modalConfig.transition); 
    }
}

export class SuccessModal extends Modal {
    constructor(
        protected modalConfig: ModalConfig,
        public color: string = Colors.GREEN
    ) {
        super(modalConfig);
        
    }
}

export class DangerModal extends Modal {
    constructor(
        protected modalConfig: ModalConfig,
        public color: string = Colors.YELLOW
    ) {
        super(modalConfig);
    }
}

export class FatalModal extends Modal {
    constructor(
        protected modalConfig: ModalConfig,
        public color: string = Colors.RED
    ) {
        super(modalConfig);
    }
}

export class InfoModal extends Modal {
    constructor(
        protected modalConfig: ModalConfig,
        public color: string = Colors.BlUE
    ) {
        super(modalConfig);
    }
}
