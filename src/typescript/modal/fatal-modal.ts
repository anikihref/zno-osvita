import { Modal, Colors } from "./main-modal.js";

class FatalModal extends Modal {
    constructor(public modalName: string, protected modalConfig: ModalConfig) {
        super(modalName, modalConfig);
    }

    public render(): ModalElements {
        const modalElements = super.render();

        modalElements.$modalTitle.style.backgroundColor = Colors.RED;

        return {
            $modalTitle: this.$modalTitle,
            $modal: this.$modal,
        };
    }
}

export default FatalModal 