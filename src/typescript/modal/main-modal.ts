export const enum Colors {
    RED = "#9d0208",
    BlUE = "#00b4d8",
    GREEN = "#41a88a",
    YELLOW = "#fca311",
}

export class Modal {
    static modalsList: Record<string, IModal> = {};
    static openedModal: IModal | null = null;

    constructor(
        public modalName: string,
        protected modalConfig: ModalConfig,
        protected $modalLayer: HTMLElement = document.createElement("div"),
        protected $modal: HTMLElement = document.createElement("div"),
        protected $modalTitle: HTMLElement = document.createElement("div"),
        protected $modalBody: HTMLElement = document.createElement("div"),
        protected $closeBtn: HTMLElement = document.createElement("div"),
        private initialized: boolean = false,
        protected listeners = {
            closeModal() {
                Modal.modalsList[modalName].close(0, false);
            },
        }
    ) {}

    public initialize(modal: IModal): void {
        this.initialized = true;
        Modal.modalsList[this.modalName] = modal;

        this.render()
    }

    protected render(): ModalElements {
        if (this.initialized) {
            // add classes for every element
            this.$modal.classList.add("modal");
            this.$modalLayer.classList.add("modal-layer");
            this.$modalTitle.classList.add("modal__title");
            this.$modalBody.classList.add("modal__body");

            this.$modalBody.append(this.modalConfig.content);
            this.$modal.append(this.$modalTitle, this.$modalBody);
            this.$modalLayer.append(this.$modal);


            this.$modalTitle.innerHTML = this.modalConfig.title;

        } else {
            console.error(
                "Initialize modal to start work: modal.initialize(modal) "
            );
        }

        return {
            $modalTitle: this.$modalTitle,
            $modal: this.$modal,
        };
    }

    public open(): void {
        document.body.prepend(this.$modalLayer);

        // if some modal is opened than we`ll close it
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
        // modal that we are opening is assigned to the openedModal
        Modal.openedModal = Modal.modalsList[this.modalName];

        this.$modalLayer.style.display = "block";

        setTimeout(() => {
            this.$modalLayer.classList.add("modal-layer_active");
            document.body.classList.add('body_hidden')
            document.body.style.overflow = "hidden";
        }, 0);
    }

    public close(time: number, deleteModal: boolean): void {
        Modal.openedModal = null;
        this.$closeBtn.removeEventListener("click", this.listeners.closeModal);

        // close modal after time(ms) arg
        setTimeout(() => {
            this.$modalLayer.classList.remove("modal-layer_active");

            // wait till the transition ends and hiding modal
            setTimeout(() => {
                this.$modalLayer.style.display = "none";
                document.body.classList.remove('body_hidden')
                document.body.style.overflow = '';
                // execute callback
                if (deleteModal) {
                    Modal.modalsList[this.modalName].delete();
                }
            }, 600);
        }, time);
    }

    public delete(): void {
        setTimeout(() => {
            this.$modalLayer.remove();
            delete Modal.modalsList[this.modalName];
        }, 600);
    }
}