import { Modal } from "./main-modal.js";
class DangerModal extends Modal {
    constructor(modalName, modalConfig) {
        super(modalName, modalConfig);
        this.modalName = modalName;
        this.modalConfig = modalConfig;
    }
    render() {
        const modalElements = super.render();
        modalElements.$modalTitle.style.backgroundColor = "#fca311";
        return {
            $modalTitle: this.$modalTitle,
            $modal: this.$modal,
        };
    }
}
export default DangerModal;
//# sourceMappingURL=danger-modal.js.map