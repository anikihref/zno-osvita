import { Modal } from "./main-modal.js";
class FatalModal extends Modal {
    constructor(modalName, modalConfig) {
        super(modalName, modalConfig);
        this.modalName = modalName;
        this.modalConfig = modalConfig;
    }
    render() {
        const modalElements = super.render();
        modalElements.$modalTitle.style.backgroundColor = "#9d0208";
        return {
            $modalTitle: this.$modalTitle,
            $modal: this.$modal,
        };
    }
}
export default FatalModal;
//# sourceMappingURL=fatal-modal.js.map