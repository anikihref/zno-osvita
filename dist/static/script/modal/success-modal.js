import { Modal } from "./main-modal.js";
export class SuccessModal extends Modal {
    constructor(modalName, modalConfig) {
        super(modalName, modalConfig);
        this.modalName = modalName;
        this.modalConfig = modalConfig;
    }
    render() {
        const modalElements = super.render();
        modalElements.$modalTitle.style.backgroundColor = "#41a88a";
        return {
            $modalTitle: this.$modalTitle,
            $modal: this.$modal,
        };
    }
}
export default SuccessModal;

//# sourceMappingURL=../../typescript-maps/modal/success-modal.js.map
