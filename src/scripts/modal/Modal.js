var Colors;
(function (Colors) {
    Colors["RED"] = "#9d0208";
    Colors["BlUE"] = "#00b4d8";
    Colors["GREEN"] = "#41a88a";
    Colors["YELLOW"] = "#fca311";
})(Colors || (Colors = {}));
class Modal {
    constructor(modalName, modalConfig, $modalLayer = document.createElement("div"), $modal = document.createElement("div"), $modalTitle = document.createElement("div"), $modalBody = document.createElement("div"), $closeBtn = document.createElement("div"), initialized = false, listeners = {
        closeModal() {
            Modal.modalsList[modalName].close(0, false);
        },
    }) {
        this.modalName = modalName;
        this.modalConfig = modalConfig;
        this.$modalLayer = $modalLayer;
        this.$modal = $modal;
        this.$modalTitle = $modalTitle;
        this.$modalBody = $modalBody;
        this.$closeBtn = $closeBtn;
        this.initialized = initialized;
        this.listeners = listeners;
        const modalStyle = this.$modal.style;
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
    initialize(modal) {
        this.initialized = true;
        Modal.modalsList[this.modalName] = modal;
        this.render();
    }
    render() {
        if (this.initialized) {
            this.$modal.classList.add("modal");
            this.$modalLayer.classList.add("modal-layer");
            this.$modalTitle.classList.add("modal__title");
            this.$modalBody.classList.add("modal__body");
            this.$modalBody.append(this.modalConfig.content);
            this.$modal.append(this.$modalTitle, this.$modalBody);
            this.$modalLayer.append(this.$modal);
            this.$modalTitle.innerHTML = this.modalConfig.title;
        }
        else {
            console.error("Initialize modal to start work: modal.initialize(modal) ");
        }
        return {
            $modalTitle: this.$modalTitle,
            $modal: this.$modal,
        };
    }
    open() {
        document.body.prepend(this.$modalLayer);
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
        Modal.openedModal = Modal.modalsList[this.modalName];
        this.$modalLayer.style.display = "block";
        setTimeout(() => {
            this.$modalLayer.classList.add("modal-layer_active");
            document.body.style.overflow = "hidden";
        }, 0);
    }
    close(time, deleteModal) {
        Modal.openedModal = null;
        this.$closeBtn.removeEventListener("click", this.listeners.closeModal);
        setTimeout(() => {
            this.$modalLayer.classList.remove("modal-layer_active");
            setTimeout(() => {
                this.$modalLayer.style.display = "none";
                document.body.style.overflow = "visible";
                if (deleteModal) {
                    Modal.modalsList[this.modalName].delete();
                }
            }, this.modalConfig.transition);
        }, time);
    }
    delete() {
        setTimeout(() => {
            this.$modalLayer.remove();
            delete Modal.modalsList[this.modalName];
        }, this.modalConfig.transition);
    }
}
Modal.modalsList = {};
Modal.openedModal = null;
export class SuccessModal extends Modal {
    constructor(modalName, modalConfig) {
        super(modalName, modalConfig);
        this.modalName = modalName;
        this.modalConfig = modalConfig;
    }
    render() {
        const modalElements = super.render();
        modalElements.$modalTitle.style.backgroundColor = Colors.GREEN;
        return {
            $modalTitle: this.$modalTitle,
            $modal: this.$modal,
        };
    }
}
export class DangerModal extends Modal {
    constructor(modalName, modalConfig) {
        super(modalName, modalConfig);
        this.modalName = modalName;
        this.modalConfig = modalConfig;
    }
    render() {
        const modalElements = super.render();
        modalElements.$modalTitle.style.backgroundColor = Colors.YELLOW;
        return {
            $modalTitle: this.$modalTitle,
            $modal: this.$modal,
        };
    }
}
export class FatalModal extends Modal {
    constructor(modalName, modalConfig) {
        super(modalName, modalConfig);
        this.modalName = modalName;
        this.modalConfig = modalConfig;
    }
    render() {
        const modalElements = super.render();
        modalElements.$modalTitle.style.backgroundColor = Colors.RED;
        return {
            $modalTitle: this.$modalTitle,
            $modal: this.$modal,
        };
    }
}
export class InfoModal extends Modal {
    constructor(modalName, modalConfig) {
        super(modalName, modalConfig);
        this.modalName = modalName;
        this.modalConfig = modalConfig;
    }
    render() {
        const modalElements = super.render();
        modalElements.$modalTitle.style.backgroundColor = Colors.BlUE;
        return {
            $modalTitle: this.$modalTitle,
            $modal: this.$modal,
        };
    }
}
class AuthModal extends Modal {
    constructor(modalName, $form = document.createElement("div"), $seePasswordBtn = document.createElement("div"), $buttonsBlock = document.createElement("div"), $login = {}, $password = {}) {
        super(modalName, {
            width: "500px",
            height: "500px",
            content: `The value will change`,
            title: `The value will change`,
            transition: 700,
            closable: true,
        });
        this.modalName = modalName;
        this.$form = $form;
        this.$seePasswordBtn = $seePasswordBtn;
        this.$buttonsBlock = $buttonsBlock;
        this.$login = $login;
        this.$password = $password;
        this.seePasswordListener = (e) => {
            const $img = e.target;
            const $btn = this.$seePasswordBtn;
            const $passwordField = this.$password.$field;
            if ($btn.dataset.view === "false") {
                $img.src = "/img/svg/eye.svg";
                $passwordField.type = "text";
                $btn.dataset.view = "true";
            }
            else {
                $img.src = "/img/svg/eye-crossed.svg";
                $passwordField.type = "password";
                $btn.dataset.view = "false";
            }
        };
        this.$seePasswordBtn.dataset.view = "false";
        this.$seePasswordBtn.innerHTML = '<img src="/img/svg/eye-crossed.svg">';
        this.$password = this.createField("password", "password", true);
        this.$login = this.createField("login", "text", true);
        this.$form.classList.add("auth__form");
        this.$seePasswordBtn.classList.add("auth-input__eye-img");
        this.$buttonsBlock.classList.add("auth__btn-block");
        this.$buttonsBlock.append(this.createButtons());
    }
    render() {
        super.render().$modalTitle.style.backgroundColor = Colors.BlUE;
        return {
            $modal: this.$modal,
            $modalTitle: this.$modalTitle,
        };
    }
    createField(fieldName, type, required) {
        const $fieldContainer = document.createElement("div");
        const $field = document.createElement("input");
        const capitalizedFieldName = fieldName[0].toUpperCase() + fieldName.substring(1);
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
    checkValidListener(e) {
        var _a, _b;
        const $target = e.target;
        const $parent = $target.closest("div");
        const value = $target.value;
        let $errorHint = document.createElement('div');
        let pattern;
        switch ($target.dataset.fieldName) {
            case "login": {
                pattern = /[\w\.]{3,16}/g;
                $errorHint.innerHTML = 'Validation error. You only may use Latin letters, numbers and _';
                break;
            }
            case "email": {
                pattern = /[\w-]+@([\w]+\.)([a-zA-Z]){2,}/g;
                $errorHint.innerHTML = 'Validation error. Enter your email';
                break;
            }
            case "password": {
                pattern = /\w{8,20}/g;
                $errorHint.innerHTML = 'Validation error. You only may use Latin letters, numbers and _';
                break;
            }
        }
        const matched = value.match(pattern);
        if ((matched === null || matched === void 0 ? void 0 : matched.length) === 1 && matched[0].length == value.length) {
            $parent.classList.add("green-border");
            $parent.classList.remove("red-border");
            (_a = $parent.querySelector(".auth__error-hint ")) === null || _a === void 0 ? void 0 : _a.remove();
        }
        else if (!value) {
            $parent.classList.remove("red-border");
            $parent.classList.remove("green-border");
            (_b = $parent.querySelector(".auth__error-hint ")) === null || _b === void 0 ? void 0 : _b.remove();
        }
        else {
            $errorHint.classList.add("auth__error-hint");
            $parent.classList.add("red-border");
            $parent.classList.remove("green-border");
            !!$parent.querySelector(".auth__error-hint ")
                ? void 0
                : $parent.append($errorHint);
        }
    }
    createButtons() {
        const $sendBtn = document.createElement("div");
        $sendBtn.innerHTML = "Send";
        $sendBtn.classList.add("auth-btn-block__send");
        $sendBtn.style.backgroundColor = Colors.BlUE;
        return $sendBtn;
    }
}
export class RegisterModal extends AuthModal {
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
        console.log(this.$email);
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
export class LogInModal extends AuthModal {
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
//# sourceMappingURL=Modal.js.map