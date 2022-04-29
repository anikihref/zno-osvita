import { Modal, Colors } from "./main-modal.js";

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
            content: `Do not create this modal`,
            title: `You can create LogInModal or RegisterModal instead`,
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

export default AuthModal