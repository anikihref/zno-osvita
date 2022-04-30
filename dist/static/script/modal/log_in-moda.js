import AuthModal from "./auth-modal.js";
class LogInModal extends AuthModal {
    constructor(modalName, modalTitle = "Log in") {
        super(modalName);
        this.modalName = modalName;
        this.modalTitle = modalTitle;
    }
    close(time, deleteModal) {
        super.close(time, deleteModal);
        [this.$login.$field, this.$password.$field].forEach((el) => {
            el === null || el === void 0 ? void 0 : el.removeEventListener("blur", this.checkValidListener);
        });
    }
    render() {
        this.modalConfig.content = this.$form;
        this.modalConfig.title = this.modalTitle;
        this.$seePasswordBtn.addEventListener("click", this.seePasswordListener);
        this.$form.append(this.createContent(), this.$buttonsBlock);
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

//# sourceMappingURL=../../typescript-maps/modal/log_in-moda.js.map
