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

enum Colors {
    RED = "#9d0208",
    BlUE = "#00b4d8",
    GREEN = "#41a88a",
    YELLOW = "#fca311",
}

class Modal {
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
    ) {
        const modalStyle = this.$modal.style;

        // Style assigning
        [
            modalStyle.width,
            modalStyle.height,
            modalStyle.transitionDuration,
            this.$modalLayer.style.transitionDuration,
        ] = [
            this.modalConfig.width,
            this.modalConfig.height,
            `${this.modalConfig.transition}ms`,
            `${this.modalConfig.transition}ms`,
        ];
    }

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

                document.body.style.overflow = "visible";
                // execute callback
                if (deleteModal) {
                    Modal.modalsList[this.modalName].delete();
                }
            }, this.modalConfig.transition);
        }, time);
    }

    public delete(): void {
        setTimeout(() => {
            this.$modalLayer.remove();
            delete Modal.modalsList[this.modalName];
        }, this.modalConfig.transition);
    }
}

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

export class DangerModal extends Modal {
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

export class FatalModal extends Modal {
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

export class InfoModal extends Modal {
    constructor(public modalName: string, protected modalConfig: ModalConfig) {
        super(modalName, modalConfig);
    }

    public render(): ModalElements {
        const modalElements = super.render();

        modalElements.$modalTitle.style.backgroundColor = Colors.BlUE;

        return {
            $modalTitle: this.$modalTitle,
            $modal: this.$modal,
        };
    }
}

class AuthModal extends Modal {
    constructor(
        public modalName: string,
        protected $form: HTMLElement = document.createElement("div"),
        protected $seePasswordBtn: HTMLElement = document.createElement("div"),
        protected $buttonsBlock: HTMLElement = document.createElement("div"),
        protected $login = {} as AuthFieldElements,
        protected $password = {} as AuthFieldElements
    ) {
        super(modalName, {
            width: "500px",
            height: "500px",
            content: `The value will change`,
            title: `The value will change`,
            transition: 700,
            closable: true,
        });

        this.$seePasswordBtn.dataset.view = "false";
        this.$seePasswordBtn.innerHTML = '<img src="/img/svg/eye-crossed.svg">';

        this.$password = this.createField("password", "password", true);
        this.$login = this.createField("login", "text", true);

        this.$form.classList.add("auth__form");
        this.$seePasswordBtn.classList.add("auth-input__eye-img");
        this.$buttonsBlock.classList.add("auth__btn-block");

        this.$buttonsBlock.append(this.createButtons());
    }
    
    public render(): ModalElements {
        // make authorization modal blue color
        super.render().$modalTitle.style.backgroundColor = Colors.BlUE;

        
        return {
            $modal: this.$modal,
            $modalTitle: this.$modalTitle,
        };
    }

    protected createField(fieldName: string, type: string, required?: boolean): AuthFieldElements {
        const $fieldContainer = document.createElement("div");
        const $field = document.createElement("input") as HTMLInputElement;
        const capitalizedFieldName =
            fieldName[0].toUpperCase() + fieldName.substring(1);

        $field.classList.add(`auth-input__${fieldName}`, "auth-input");
        $fieldContainer.classList.add("auth-input__container");

        $fieldContainer.append($field);

        $field.placeholder = `${capitalizedFieldName}${required ? "*" : ""}`;
        $field.type = type;
        $field.dataset.fieldName = fieldName;
        return {
            $fieldContainer,
            $field,
        };
    }

    protected seePasswordListener = (e) => {
        const $img: HTMLImageElement = e.target;
        const $btn: HTMLElement = this.$seePasswordBtn;
        const $passwordField: HTMLInputElement = this.$password.$field
            

        if ($btn.dataset.view === "false") {
            $img.src = "/img/svg/eye.svg";
            $passwordField.type = "text";
            $btn.dataset.view = "true";
        } else {
            $img.src = "/img/svg/eye-crossed.svg";
            $passwordField.type = "password";
            $btn.dataset.view = "false";
        }
    };

    protected checkValidListener(e) {
        // console.log(e.target);
        const $target: HTMLInputElement = e.target;
        const $parent: HTMLElement = $target.closest("div")!;
        const value: string = $target.value;
        let $errorHint: HTMLElement = document.createElement('div');
        let pattern: RegExp;

        switch ($target.dataset.fieldName) {
            case "login": {
                pattern = /[\w\.]{3,16}/g;
                $errorHint.innerHTML = 'Validation error. You only may use Latin letters, numbers and _'
                
                break;
            }

            case "email": {
                /* 
                    any number of words and -
                    then @ 
                    then any number of words with dot in the end 
                    then any letter more than two
                */
                pattern = /[\w-]+@([\w]+\.)([a-zA-Z]){2,}/g;
                $errorHint.innerHTML = 'Validation error. Enter your email'

                break;
            }

            case "password": {
                pattern = /\w{8,20}/g;
                $errorHint.innerHTML = 'Validation error. You only may use Latin letters, numbers and _'

                break;
            }
        }

        const matched = value.match(pattern!);

        if (matched?.length === 1 && matched[0].length == value.length) {
            $parent.classList.add("green-border");
            $parent.classList.remove("red-border");

            $parent.querySelector(".auth__error-hint ")?.remove();
        } else if (!value) {
            $parent.classList.remove("red-border");
            $parent.classList.remove("green-border");

            $parent.querySelector(".auth__error-hint ")?.remove();
        } else {
            $errorHint!.classList.add("auth__error-hint");
            $parent.classList.add("red-border");

            $parent.classList.remove("green-border");

            !!$parent.querySelector(".auth__error-hint ")
                ? void 0
                : $parent.append($errorHint!);
        }
    }

    protected createButtons(): HTMLElement {
        const $sendBtn: HTMLElement = document.createElement("div");

        $sendBtn.innerHTML = "Send";
        $sendBtn.classList.add("auth-btn-block__send");
        $sendBtn.style.backgroundColor = Colors.BlUE;
        return $sendBtn;
    }
}

export class RegisterModal extends AuthModal {
    constructor(
        public modalName: string,
        private modalTitle: string = "Registration",
        protected $email = {} as AuthFieldElements
    ) {
        super(modalName);

        this.$email = super.createField("email", "email", true);
    }

    public close(time: number, deleteModal: boolean): void {
        super.close(time, deleteModal);
        
          // remove listeners
          [
            this.$email.$field,
            this.$login.$field,
            this.$password.$field
        ].forEach((el) => {
            el?.removeEventListener("blur", this.checkValidListener);
        });
    }

    public render(): ModalElements {
        // create modal body
        const $form = this.$form;
        const $content = this.createContent();


        // change modal content
        this.modalConfig.content = $form;
        this.modalConfig.title = this.modalTitle;
        // set listener to watch password text
        this.$seePasswordBtn.addEventListener(
            "click",
            this.seePasswordListener
        );

        // append content and buttons into block
        $form.append($content, this.$buttonsBlock);
        return super.render();
    }

    private createContent(): HTMLElement {
        // create modal & insert content
        const $content: HTMLElement = document.createElement("div");
        console.log(this.$email);
        
        $content.append(
            this.$login.$fieldContainer,
            this.$email.$fieldContainer,
            this.$password.$fieldContainer
        );
        // append button to see password into the password container
        this.$password.$fieldContainer.append(this.$seePasswordBtn);

        // set listeners
        [
            this.$email.$field,
            this.$login.$field,
            this.$password.$field,
        ].forEach((el) => {
            el?.addEventListener("blur", this.checkValidListener);
        });

        return $content;
    }
}

export class LogInModal extends AuthModal {
    constructor(public modalName: string, private modalTitle: string = "Log in") {
        super(modalName);
    }


    
    public close(time: number, deleteModal: boolean): void {
        super.close(time, deleteModal);
        
          // remove listeners
          [
            this.$login.$field,
            this.$password.$field,
        ].forEach((el) => {
            el?.removeEventListener("blur", this.checkValidListener);
        });
    }

    public render(): ModalElements {
        // create modal body
        const $form = this.$form;
        const $content = this.createContent();

        // change modal content
        this.modalConfig.content = $form;
        this.modalConfig.title = this.modalTitle;
        // set listener to watch password text
        this.$seePasswordBtn.addEventListener(
            "click",
            this.seePasswordListener
        );

        // append content and buttons into block
        $form.append($content, this.$buttonsBlock);

        return super.render();
    }

    private createContent(): HTMLElement {
        // create modal & insert content
        const $content: HTMLElement = document.createElement("div");
        
        $content.append(
            this.$login.$fieldContainer,
            this.$password.$fieldContainer
        );

        // set listeners
        [this.$login.$field, this.$password.$field].forEach(
            (el) => {
                el?.addEventListener("blur", this.checkValidListener);
            }
        );

        // append button to see password into the password container
        this.$password.$fieldContainer.append(this.$seePasswordBtn);
        return $content;
    }
}
