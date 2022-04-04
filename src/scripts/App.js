import LogInModal from "./modal/log_in-moda.js";
import RegisterModal from "./modal/register-modal.js";
class App {
    constructor() {
        this.elements = {
            $authBlock: document.querySelector('.authorization')
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
            }
        };
    }
    run() {
        this.addQuestionChangeListeners();
        console.log('App started');
    }
    addQuestionChangeListeners() {
        var _a;
        (_a = this.elements.$authBlock) === null || _a === void 0 ? void 0 : _a.addEventListener('click', this.listeners.authBlock);
    }
}
export default App;
//# sourceMappingURL=App.js.map