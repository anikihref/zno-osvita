import { Modal } from "./main-modal.js";
class InfoModal extends Modal {
    constructor(modalName, modalConfig) {
        super(modalName, modalConfig);
        this.modalName = modalName;
        this.modalConfig = modalConfig;
    }
    render() {
        const modalElements = super.render();
        modalElements.$modalTitle.style.backgroundColor = "#00b4d8";
        return {
            $modalTitle: this.$modalTitle,
            $modal: this.$modal,
        };
    }
}
export default InfoModal;
//# sourceMappingURL=info-moda.js.map