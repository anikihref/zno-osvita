import { app } from './main.js'
import { questionsActions } from './functions/questionsActions.js';
import { htmlElements } from './htmlElements.js';
import { hideElement, showElement } from './functions/elementActions.js';
import { addClass } from './functions/attributes.js';

export const listeners = {
	buttonsListener(e) {
		//! проверяем количество неотвеченных вопросов
		app.questionsConfig.checkAnswersNumber();
		const target = e.target;
		// текущий вопрос
		let questionInfo = app.currentQuestionInfo;
		// получаем следующий вопрос
		const nextQuestion = app.questionsConfig.isLastUnanswered
			? questionInfo
			: questionsActions.findNextQuestion(questionInfo, "default");
	
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
				// пересоздаём обёртку вопроса
				app.recreateQuestionWrapper();
				// создаём текущий вопрос
				app.currentQuestion.render()

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
						const answer = app.currentQuestion.getAnswer();
	
						// проверяем дал ли пользователь ответ
						if (
							!answer.every((answer) => {
								return answer == "" || answer == null;
							})
						) {
							//! добавляем поле ответа в объект вопроса
							app.currentQuestionInfo.answer = answer;
						} else {
							return;
						}
						
						// если мы на последнем вопросе
						if (app.questionsConfig.isLastUnanswered) {
							//! Завершаем тест
							app.finishTest();
						}
	
						
						addClass(
							document.querySelector(".question__link_active"), 
							"question__link_done"
						);
					}
				
					//! переопределяем текущий вопрос
					app.currentQuestionInfo = nextQuestion;
					app.currentQuestion = questionsActions.getQuestionObj(nextQuestion)
					// переключаем вопрос
					app.currentQuestion.render()
					// questionsActions.turnQuestion(nextQuestion);
	
					
				} else if (target === htmlElements.$endBtn) {
					// если есть хоть один объект с полем answer
					if (app.allQuestionsList.find((obj) => obj.hasOwnProperty("answer"))) {
						// завершаем тест
						app.finishTest();
					} else {
						console.log('дайте відповідь хоча б на одне питання');
					}
				}
			}
	
			// если тест уже завершен
			if (app.questionsConfig.isFinished) {
				if (target === htmlElements.$nextBtn) {
					//! переопределяем текущий вопрос
					app.currentQuestionInfo = nextQuestion;
					app.currentQuestion = questionsActions.getQuestionObj(nextQuestion)

					app.currentQuestion.render()
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
    const target = e.target.closest(".question__link");
    if (target == null) {
      return;
    }

    // определяем вопрос на который нужно переключится
    const nextQuestionInfo = app.allQuestionsList[target.dataset.id];

    //! переопределяем текущий вопрос
    app.currentQuestionInfo = nextQuestionInfo;
		app.currentQuestion = questionsActions.getQuestionObj(nextQuestionInfo)

    if (app.questionsConfig.questionSwitchLogic === "single") {
			app.currentQuestion.render()

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
