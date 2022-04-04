import { htmlElements } from "./htmlElements.js";
import LogInModal from "./modal/log_in-moda.js";
import RegisterModal from "./modal/register-modal.js";


class App {

    static listeners = {
        authBlock(e) {
            e.preventDefault()
            const $target = e.target
            const $loginLink = document.querySelector('.authorization__log-in')
            const $registerLink = document.querySelector('.authorization__register')
            
            if ($target === $registerLink) {
                const modal = new RegisterModal('registerModal');
                modal.initialize(modal);        
                modal.open();
            } else if ($target === $loginLink) {
                const modal = new LogInModal('logInModal');
                modal.initialize(modal);        
                modal.open();
            }
        }
    };

    run() {
        this.addQuestionChangeListeners()
    }

    // ставит слушатели для кнопок и ссылок на вопросы
    addQuestionChangeListeners(): void {
        htmlElements.$authBlock?.addEventListener('click', App.listeners.authBlock)
    }
}

export default App;
