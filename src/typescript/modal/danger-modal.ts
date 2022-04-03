import { Modal, Colors } from "./main-modal.js";

class DangerModal extends Modal {
    constructor(public modalName: string, protected modalConfig: ModalConfig) {
        super(modalName, modalConfig);
    }

    public render(): ModalElements {
        const modalElements = super.render();

        modalElements.$modalTitle.style.backgroundColor = Colors.YELLOW;

        return {
            $modalTitle: this.$modalTitle,
            $modal: this.$modal,
        };
    }
}

export default DangerModal