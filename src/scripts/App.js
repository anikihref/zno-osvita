import { addClass } from "./functions/attributes.js";
import { createHtmlBlock } from "./functions/createElement.js";
import {
	appendElements,
  hideElement,
  showElement,
} from "./functions/elementActions.js";
import { questionsActions } from "./functions/questionsActions.js";
import { htmlElements } from "./htmlElements.js";
import { listeners } from "./listeners.js";


const pathName = document.location.pathname.split("/");
const testPath = {
	subject: pathName[1],
	year: pathName[2].split("_")[0],
	test: pathName[2].split("_")[1],
};

class App {
  constructor() {
    this.allQuestionsList = 0;
    this.questionsConfig = {};
  }

  finishTest() {
    fetch("/result", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(this.allQuestionsList),
    })
      .then((res) => res.json())
      .then((data) => {
        //! переопределяем значение
        this.questionsConfig.isFinished = true;

        showElement(htmlElements.$seeAllQuestionsBtn);
				// удаляем кнопки 'ответить' и 'завершить'
				[htmlElements.$btn, htmlElements.$endBtn].forEach(el => el.remove())

        questionsActions.turnQuestion(
          this.questionsConfig.currentQuestion,
          htmlElements.$questionWrapper
        );

        // для проверяем правильный ответ или нет и в зависимости от этого добавляе класс
        [...document.querySelectorAll(".question__block")].forEach(
          (element, i) => {
            const question = data.allQuestions[i];

            if (!question.answer) {
              return;
            } else if (question.result === "mistake" || !question.result) {
              addClass(element, "question__block_mistake");
            } else if (question.result === "partiallySucces") {
              addClass(element, "question__block_partially");
            } else if (question.result === "succes") {
              addClass(element, "question__block_succes");
            }
          }
        );
        console.log(data);
      });
  }
	
  getQuestions() {
    return fetch(
      `/getQuestions?subject=${testPath.subject}&year=${testPath.year}&test=${testPath.test}`
    )
      .then((res) => res.json())
      .then((questions) => {
				const appContext = this
				
        //! записываем полученые вопросы в переменную
        this.allQuestionsList = questions;

        // добавляем поле id с его index'ом каждому вопросу
        this.allQuestionsList.forEach((question, index) => {
          question.id = index;
        });

        //! определяем объект со вспомагательными методами и переменными
        this.questionsConfig = {
          // закончен ли тест
          isFinished: false,
          isLastUnanswered: false,
          //			количество неотвеченых вопросов
          unsweredQuestionsNum: this.allQuestionsList.length,
          // 			single (по одному вопросу) или
          // 			seeAll (смотреть все сразу) только после завершения теста
          questionSwitchLogic: "single",
          //			текущий вопрос
          currentQuestion: this.allQuestionsList[0],

          checkAnswersNumber() {
            const unanseredNum = appContext.allQuestionsList.filter((obj) => {
              return !obj.answer;
            }).length;
            this.unsweredQuestionsNum = unanseredNum;

            if (unanseredNum == 1) {
              this.isLastUnanswered = true;
            }
          },
        };
      });
  }

  run() {
    this.getQuestions().then(() => {
     	// создаём блоки-ссылки на вопросы
			for (let i = 1; i <= this.allQuestionsList.length; i++) {
				const $questionLink = createHtmlBlock("div", [`<span>${i}</span>`]);
		
				addClass($questionLink, "question__block");
				appendElements(htmlElements.$questionBlocks, [$questionLink]);
				$questionLink.dataset.id = i - 1
			}

			addClass(
        document.querySelector(".question__block"), // получаем первый блок ссылку и делаем её активной
        "question__block_active"
      );
			
      // ставим слушатели
      htmlElements.$questionBlocks.addEventListener(
        "click",
        listeners.questionLinksListener
      );
      htmlElements.$btnBlock.addEventListener(
        "click",
        listeners.buttonsListener
      );

      questionsActions.turnQuestion(
        this.questionsConfig.currentQuestion,
        htmlElements.$questionWrapper
      ); // вставляем первый вопрос

      hideElement(htmlElements.$seeAllQuestionsBtn); // прячем кнопку смотреть все
    });
  }
}

export default App;
