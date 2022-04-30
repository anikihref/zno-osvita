import AuthModal from "./auth-modal.js";
class RegisterModal extends AuthModal {
    constructor(modalName, modalTitle = "Registration", $email = {}) {
        super(modalName);
        this.modalName = modalName;
        this.modalTitle = modalTitle;
        this.$email = $email;
        this.$email = super.createField("email", "email", true);
    }
    close(time, deleteModal) {
        super.close(time, deleteModal);
        [
            this.$email.$field,
            this.$login.$field,
            this.$password.$field
        ].forEach((el) => {
            el === null || el === void 0 ? void 0 : el.removeEventListener("blur", this.checkValidListener);
        });
    }
    render() {
        this.modalConfig.content = this.$form;
        ;
        this.modalConfig.title = this.modalTitle;
        this.$seePasswordBtn.addEventListener("click", this.seePasswordListener);
        this.$form.append(this.createContent(), this.$buttonsBlock);
        return super.render();
    }
    createContent() {
        const $content = document.createElement("div");
        $content.append(this.$login.$fieldContainer, this.$email.$fieldContainer, this.$password.$fieldContainer);
        this.$password.$fieldContainer.append(this.$seePasswordBtn);
        [
            this.$email.$field,
            this.$login.$field,
            this.$password.$field,
        ].forEach((el) => {
            el === null || el === void 0 ? void 0 : el.addEventListener("blur", this.checkValidListener);
        });
        return $content;
    }
}
export default RegisterModal;

//# sourceMappingURL=../../typescript-maps/modal/register-modal.js.map
