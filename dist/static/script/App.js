import LogInModal from "./modal/log_in-moda.js";
import RegisterModal from "./modal/register-modal.js";
class App {
    constructor() {
        this.elements = {
            $authBlock: document.querySelector('.authorization'),
        };
        this.listeners = {
            authBlock(e) {
                e.preventDefault();
                const $target = e.target;
                const $loginLink = document.querySelector('.authorization__log-in');
                const $registerLink = document.querySelector('.authorization__register');
                if ($target === $registerLink) {
                    const modal = new RegisterModal('registerModal');
                    modal.initialize(modal);
                    modal.open();
                }
                else if ($target === $loginLink) {
                    const modal = new LogInModal('logInModal');
                    modal.initialize(modal);
                    modal.open();
                }
            },
            dropdownBtn(e) {
                e.target.closest('.header__dropdown').classList.toggle('header__dropdown_active');
            }
        };
    }
    run() {
        this.addQuestionChangeListeners();
    }
    addQuestionChangeListeners() {
        var _a;
        const dropdownBtn = document.querySelector('.header__dropdown-btn');
        (_a = this.elements.$authBlock) === null || _a === void 0 ? void 0 : _a.addEventListener('click', this.listeners.authBlock);
        dropdownBtn === null || dropdownBtn === void 0 ? void 0 : dropdownBtn.addEventListener('click', this.listeners.dropdownBtn);
    }
}
export default App;

//# sourceMappingURL=../typescript-maps/App.js.map
