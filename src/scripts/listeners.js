import { app } from './main.js'
import { questionsActions } from './functions/questionsActions.js';
import { htmlElements } from './htmlElements.js';
import { hideElement, showElement } from './functions/elementActions.js';
import { recreateQuestionWrapper } from './functions/createElement.js';
import { addClass } from './functions/attributes.js';

export const listeners = {
	buttonsListener(e) {
		//! проверяем количество неотвеченных вопросов
		app.questionsConfig.checkAnswersNumber();
		// либо пропускаем вопрос, либо отвечаем на него, либо завершаем тест
		const target = e.target;
		// текущий вопрос
		let question = app.questionsConfig.currentQuestion;
		// получаем следующий вопрос
		const nextQuestion = app.questionsConfig.isLastUnanswered
			? question
			: questionsActions.findNextQuestion(question, "default");
	
		if (target === htmlElements.$seeAllQuestionsBtn) {
			// если логика переключения - одие вопрос
			if (app.questionsConfig.questionSwitchLogic === "single") {
				//! изменяем логику переключения между вопросами
				app.questionsConfig.questionSwitchLogic = "seeAll";
	
				hideElement(htmlElements.$nextBtn);
				htmlElements.$seeAllQuestionsBtn.textContent =  "Смотреть один"
			}
			// если логика переключения - все вопросы
			else if (app.questionsConfig.questionSwitchLogic === "seeAll") {
				//! изменяем логику переключения между вопросами
				app.questionsConfig.questionSwitchLogic = "single";
				// обновляем значение обёртки вопроса
				htmlElements.$questionWrapper = recreateQuestionWrapper(question);
	
				htmlElements.$seeAllQuestionsBtn.textContent = "Смотреть все"
				// показываем кнопку "следующий"
				showElement(htmlElements.$nextBtn);
			}
		}
	
		if (app.questionsConfig.questionSwitchLogic === "single") {
			// если тест ещё не завершен
			if (!app.questionsConfig.isFinished) {
				if (target === htmlElements.$nextBtn || target === htmlElements.$btn) {
					if (target === htmlElements.$btn) {
						// получаем объект формы и затем получаем ответ
						const answer = questionsActions.getQuestionObj(question).getAnswer();
	
						// проверяем дал ли пользователь ответ
						if (
							!answer.every((answer) => {
								return answer == "" || answer == null;
							})
						) {
							//! добавляем поле ответа в объект вопроса
							app.questionsConfig.currentQuestion.answer = answer;
						} else {
							return;
						}
						
						// если мы на последнем вопросе
						if (app.questionsConfig.isLastUnanswered) {
							//! Завершаем тест
							app.finishTest();
						}
	
						
						addClass(
							document.querySelector(".question__block_active"), 
							"question__block_done"
						);
					}
	
					// переключаем вопрос
					questionsActions.turnQuestion(nextQuestion, htmlElements.$questionWrapper);
	
					//! переопределяем текущий вопрос
					app.questionsConfig.currentQuestion = nextQuestion;
				} else if (target === htmlElements.$endBtn) {
					// если есть хоть один объект с полем answer
					if (!!app.allQuestionsList.find((obj) => obj.hasOwnProperty("answer"))) {
						// завершаем тест
						app.finishTest();
					}
				}
			}
	
			// если тест уже завершен
			if (app.questionsConfig.isFinished) {
				if (target === htmlElements.$nextBtn) {
					// переключаем вопрос
					questionsActions.turnQuestion(nextQuestion, htmlElements.$questionWrapper);
	
					//! переопределяем текущий вопрос
					app.questionsConfig.currentQuestion = nextQuestion;
				}
			}
		}
	
		if (app.questionsConfig.questionSwitchLogic === "seeAll") {
			if (target === htmlElements.$seeAllQuestionsBtn) {
				questionsActions.seeAllQuestions();
			}
		}
	},
	questionLinksListener(e) {
    const target = e.target.closest(".question__block");
    if (target == null) {
      return;
    }

    // определяем вопрос на который нужно переключится
    const nextQuestion = app.allQuestionsList[target.dataset.id];

    //! переопределяем текущий вопрос
    app.questionsConfig.currentQuestion = nextQuestion;

    if (app.questionsConfig.questionSwitchLogic === "single") {
      // переключаем вопрос
      questionsActions.turnQuestion(nextQuestion, htmlElements.$questionWrapper);
    } else if (app.questionsConfig.questionSwitchLogic === "seeAll") {
      // получаем data-id элемента по которому кликнули
      const targetId = target.dataset.id;
      // получаем html объект по этому же id
      const $targetQuestion = document.querySelector(`.question__wrapper${targetId}`)
      

      // получаем Y координаты html элемента вопроса
      const yPos =
        $targetQuestion.getBoundingClientRect().y + window.pageYOffset;
      // скроллим окно к этим координатам
      window.scrollTo(0, yPos);
      // изменяем номер вопроса
    }
  }

}
