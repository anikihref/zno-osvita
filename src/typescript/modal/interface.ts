interface ModalConfig {
    content: string | HTMLElement;
    title: string;
    closable: boolean;
}

interface IModal {
    close: (time: number, deleteModal: boolean) => void;
    delete: () => void;
    open: () => void;
    initialize: (modal: IModal) => void
}

type ModalElements = {
    $modal: HTMLElement;
    $modalTitle: HTMLElement;
    [key: string]: HTMLElement;
};

type AuthFieldElements = {
    $fieldContainer: HTMLElement,
    $field: HTMLInputElement,
}