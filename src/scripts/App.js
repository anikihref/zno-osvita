import { addClass } from "./functions/attributes.js";
import { createHtmlBlock } from "./functions/createElement.js";
import {
  appendElements,
  hideElement,
  prependElements,
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
    this.allQuestionsList = [];
    this.questionsConfig = {};
		this.result = {};
    this.$questionLinksBlock = createHtmlBlock("div");
		this.$resultingBlock = createHtmlBlock("div");
		this.startTime = Date.now();
		this.testTimeMinutes = 0;
  }

  finishTest() {
		this.testTimeMinutes = Math.trunc((Date.now() - this.startTime) / 1000 / 60)

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
				// записываем результат
        this.result = data
				// создаём блок с результатом
				this.createResultBlock()

        //! переопределяем значение
        this.questionsConfig.isFinished = true;

        showElement(htmlElements.$seeAllQuestionsBtn);
        // удаляем кнопки 'ответить' и 'завершить'
        [htmlElements.$btn, htmlElements.$endBtn].forEach((el) => el.remove());
				
        questionsActions.turnQuestion(
          this.questionsConfig.currentQuestion,
          htmlElements.$questionWrapper
        );

        // для проверяем правильный ответ или нет и в зависимости от этого добавляе класс
        [...document.querySelectorAll(".question__link")].forEach(
          (element, i) => {
            const question = data.allQuestions[i];

            if (!question.answer) {
              return;
            } else if (question.result === "mistake" || !question.result) {
              addClass(element, "question__link_mistake");
            } else if (question.result === "partiallySucces") {
              addClass(element, "question__link_partially");
            } else if (question.result === "succes") {
              addClass(element, "question__link_succes");
            }
          }
        );

				appendElements(htmlElements.$questionControls, [this.$resultingBlock])
      });
  }

  getQuestions() {
    return fetch(
      `/getQuestions?subject=${testPath.subject}&year=${testPath.year}&test=${testPath.test}`
    )
      .then((res) => res.json())
      .then((questions) => {
        const appContext = this;

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
          //количество неотвеченых вопросов
          unsweredQuestionsNum: this.allQuestionsList.length,
          // single по одному вопросу или
          // seeAll смотреть все сразу (только после завершения теста)
          questionSwitchLogic: "single",
          //			текущий вопрос
          currentQuestion: this.allQuestionsList[0],

          checkAnswersNumber() {
						// проверяем количество вопросов без ответа
            const unanseredNum = appContext.allQuestionsList.filter((obj) => {
              return !obj.answer;
            }).length;
						// записываем это количество в переменную
            this.unsweredQuestionsNum = unanseredNum;

            if (unanseredNum == 1) {
              this.isLastUnanswered = true;
            }
          },
        };
      });
  }

  run() {	
		// получаем вопросы
    this.getQuestions().then(() => {
			// создаём ссылки на вопросы
      this.createQuestionLinks();

			// добавляем слушатели для переключениям на вопросы
			this.addQuestionChangeListeners()

      // вставляем первый вопрос
      questionsActions.turnQuestion(
        this.questionsConfig.currentQuestion,
        htmlElements.$questionWrapper
      );

      // прячем кнопку смотреть все вопросы
      hideElement(htmlElements.$seeAllQuestionsBtn); // прячем кнопку смотреть все
    });
  }

	// создаёт ссылки на вопросы
  createQuestionLinks() {
    appendElements(htmlElements.$questionControls, [this.$questionLinksBlock]);
    addClass(this.$questionLinksBlock, "question__links-block");

    // создаём блоки-ссылки на вопросы
    for (let i = 1; i <= this.allQuestionsList.length; i++) {
      const $questionLink = createHtmlBlock("div", [`<span>${i}</span>`]);

      appendElements(this.$questionLinksBlock, [$questionLink]);
      addClass($questionLink, "question__link");
      $questionLink.dataset.id = i - 1;
    }

    // первой ссылке на вопрос добавляем активный класс
    addClass(
      document.querySelector(".question__link"),
      "question__link_active"
    );
  }

	createResultBlock() {
		//TODO: вычислить тестовый бал и макс количество этих балов и вычислить бал зно
		const $testScore = createHtmlBlock('div', `Ваш тестовий бал: <b>?</b> з <b>?</b> можливих.`)
		const $ratingScore = createHtmlBlock('div', 'Ваш рейтинговий бал: <b>?</b> з 200 можливих.')
		const $dpaScore = createHtmlBlock('div', `Ваш бал ДПА: <b>${Math.trunc(12 * this.result.percentage / 100)}</b> з 12 можливих.`)
		const $time = createHtmlBlock('div', `Витрачено часу: <b>${this.testTimeMinutes} хв.</b> з 180 запропонованих`)

		
		appendElements(this.$resultingBlock, [$testScore, $ratingScore, $dpaScore, $time])
		addClass(this.$resultingBlock, 'result')
	}

  // ставит слушатели для кнопок и ссылок на вопросы
  addQuestionChangeListeners() {
    this.$questionLinksBlock.addEventListener(
      "click",
      listeners.questionLinksListener
    );

    htmlElements.$btnBlock.addEventListener(
			"click", 
			listeners.buttonsListener
		);
  }

}

export default App;
