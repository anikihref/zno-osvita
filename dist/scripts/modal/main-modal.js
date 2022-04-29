export class Modal {
    constructor(modalName, modalConfig, $modalLayer = document.createElement("div"), $modal = document.createElement("div"), $modalTitle = document.createElement("div"), $modalBody = document.createElement("div"), $closeBtn = document.createElement("div"), initialized = false, listeners = {
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
        this.render();
    }
    render() {
        if (this.initialized) {
            this.$modal.classList.add("modal");
            this.$modalLayer.classList.add("modal-layer");
            this.$modalTitle.classList.add("modal__title");
            this.$modalBody.classList.add("modal__body");
            this.$modalBody.append(this.modalConfig.content);
            this.$modal.append(this.$modalTitle, this.$modalBody);
            this.$modalLayer.append(this.$modal);
            this.$modalTitle.innerHTML = this.modalConfig.title;
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
        document.body.prepend(this.$modalLayer);
        if (Modal.openedModal) {
            Modal.openedModal.close(0, false);
            Modal.openedModal = null;
        }
        if (this.modalConfig.closable) {
            this.$closeBtn.classList.add("modal__close-btn");
            this.$modalTitle.append(this.$closeBtn);
            this.$closeBtn.addEventListener("click", this.listeners.closeModal);
            this.$closeBtn.innerHTML = `<img src="/img/svg/close.svg">`;
        }
        Modal.openedModal = Modal.modalsList[this.modalName];
        this.$modalLayer.style.display = "block";
        setTimeout(() => {
            this.$modalLayer.classList.add("modal-layer_active");
            document.body.style.overflow = "hidden";
        }, 0);
    }
    close(time, deleteModal) {
        Modal.openedModal = null;
        this.$closeBtn.removeEventListener("click", this.listeners.closeModal);
        setTimeout(() => {
            this.$modalLayer.classList.remove("modal-layer_active");
            setTimeout(() => {
                this.$modalLayer.style.display = "none";
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
//# sourceMappingURL=main-modal.js.map