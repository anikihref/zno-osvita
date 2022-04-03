import AuthModal from "./auth-modal.js";
class LogInModal extends AuthModal {
    constructor(modalName, modalTitle = "Log in") {
        super(modalName);
        this.modalName = modalName;
        this.modalTitle = modalTitle;
    }
    close(time, deleteModal) {
        super.close(time, deleteModal);
        [
            this.$login.$field,
            this.$password.$field,
        ].forEach((el) => {
            el === null || el === void 0 ? void 0 : el.removeEventListener("blur", this.checkValidListener);
        });
    }
    render() {
        const $form = this.$form;
        const $content = this.createContent();
        this.modalConfig.content = $form;
        this.modalConfig.title = this.modalTitle;
        this.$seePasswordBtn.addEventListener("click", this.seePasswordListener);
        $form.append($content, this.$buttonsBlock);
        return super.render();
    }
    createContent() {
        const $content = document.createElement("div");
        $content.append(this.$login.$fieldContainer, this.$password.$fieldContainer);
        [this.$login.$field, this.$password.$field].forEach((el) => {
            el === null || el === void 0 ? void 0 : el.addEventListener("blur", this.checkValidListener);
        });
        this.$password.$fieldContainer.append(this.$seePasswordBtn);
        return $content;
    }
}
export default LogInModal;
//# sourceMappingURL=log_in-moda.js.map