interface ModalConfig {
    width: string;
    height: string;
    content: string | HTMLElement;
    title: string;
    transition: number;
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