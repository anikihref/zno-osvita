import { Modal } from "./main-modal.js";
class AuthModal extends Modal {
    constructor(modalName, $form = document.createElement("div"), $seePasswordBtn = document.createElement("div"), $buttonsBlock = document.createElement("div"), $login = {}, $password = {}) {
        super(modalName, {
            content: `Do not create this modal`,
            title: `You can create LogInModal or RegisterModal instead`,
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
        super.render().$modalTitle.style.backgroundColor = "#00b4d8";
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
        $sendBtn.style.backgroundColor = "#00b4d8";
        return $sendBtn;
    }
}
export default AuthModal;

//# sourceMappingURL=../../typescript-maps/modal/auth-modal.js.map
