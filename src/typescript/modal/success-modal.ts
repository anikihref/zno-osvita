import { Modal, Colors } from "./main-modal.js";

export class SuccessModal extends Modal {
    constructor(public modalName: string, protected modalConfig: ModalConfig) {
        super(modalName, modalConfig);
    }

    public render(): ModalElements {
        const modalElements = super.render();

        modalElements.$modalTitle.style.backgroundColor = Colors.GREEN;

        return {
            $modalTitle: this.$modalTitle,
            $modal: this.$modal,
        };
    }
}

export default SuccessModal