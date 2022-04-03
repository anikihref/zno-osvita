import AuthModal from "./auth-modal.js";


class LogInModal extends AuthModal {
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

export default LogInModal