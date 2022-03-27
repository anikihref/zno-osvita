import { addClass } from "./functions/attributes.js";
import { createHtmlBlock } from "./functions/createElement.js";
import {
  appendElements,
  hideElement,
  showElement,
} from "./functions/elementActions.js";
import { htmlElements } from "./htmlElements.js";
import { app } from "./main.js";
import { Question } from "./Question.js";

const pathName = document.location.pathname.split("/");
const testPath = {
  subject: pathName[1],
  year: pathName[2].split("_")[0],
  test: pathName[2].split("_")[1],
};


class App {
  static listeners = {
    buttonsListener(e) {
      //! проверяем количество неотвеченных вопросов
      app.questionsConfig.checkAnswersNumber();
      const target = e.target;
      // текущий вопрос
      let questionInfo = app.currentQuestionInfo;
      // получаем следующий вопрос
      const nextQuestion = app.questionsConfig.isLastUnanswered
        ? questionInfo
        : Question.questionActions.findNextQuestion(questionInfo);
  
  
      switch (target) {
        case htmlElements.$seeAllQuestionsBtn: {
          switch (app.questionsConfig.questionSwitchLogic) {
            case 'single': {
              //! изменяем логику переключения между вопросами
              app.questionsConfig.questionSwitchLogic = "seeAll";
  
              hideElement(htmlElements.$nextBtn);
              htmlElements.$seeAllQuestionsBtn.textContent = "Дивитись один"
  
              Question.questionActions.seeAllQuestions()
  
              break;
            }
  
            case 'seeAll': {
              //! изменяем логику переключения между вопросами
              app.questionsConfig.questionSwitchLogic = "single";
              // пересоздаём обёртку вопроса
              app.recreateQuestionWrapper();
              // создаём текущий вопрос
              app.currentQuestion.render()
  
              htmlElements.$seeAllQuestionsBtn.textContent = "Дивитись усі"
              // показываем кнопку "следующий"
              showElement(htmlElements.$nextBtn);
              break;
            }
          }
  
          break;
        }
  
        case htmlElements.$btn: {
          // получаем объект формы и затем получаем ответ
          const answer = app.currentQuestion.getAnswer();
  
          // проверяем дал ли пользователь ответ
          if (answer.some(answer => answer)) {
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
  
          // break не пишем чтобы сразу переключить вопрос
        }
  
        case htmlElements.$nextBtn: {
          //! переопределяем текущий вопрос
          app.currentQuestionInfo = nextQuestion;
          app.currentQuestion = Question.questionActions.getQuestionObj(nextQuestion)
          // переключаем вопрос
          app.currentQuestion.render()
  
          break;
        }
  
        case htmlElements.$endBtn: {
          if (app.allQuestionsList.find((obj) => obj.answer)) {
            // завершаем тест
            app.finishTest();
          } else {
            console.log('дайте відповідь хоча б на одне питання');
          }
  
          break;
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
      app.currentQuestion = Question.questionActions.getQuestionObj(nextQuestionInfo)
  
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

  constructor() {
    this.allQuestionsList = [];
    this.questionsConfig = {};
		this.currentQuestion = {};
		this.currentQuestionInfo = {}
		this.result = {};
    this.$questionLinksBlock = createHtmlBlock('div');
		this.$resultingBlock = createHtmlBlock('div');
		this.$questionWrapper = createHtmlBlock('div');
		this.startTime = Date.now();
		this.testMinutes = 0;

  }

  finishTest() {
    console.log(this.currentQuestionInfo);

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

				//! переопределяем значение
				this.questionsConfig.isFinished = true;

				// создаём блок с результатом
				this.createResultBlock()
				// удаляем содержимое ссылок на вопросы
				this.$questionLinksBlock.innerHTML = ''
				// создаём ссылки на вопросы
				this.createQuestionLinks()
      
				// определяем врема потраченое на тест
				this.testMinutes = Math.trunc((Date.now() - this.startTime) / 1000 / 60)
				
        showElement(htmlElements.$seeAllQuestionsBtn);
        // удаляем кнопки 'ответить' и 'завершить'
        [htmlElements.$btn, htmlElements.$endBtn].forEach((el) => el.remove());
				
				this.currentQuestion.render();

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

				appendElements(htmlElements.$questionControls, this.$resultingBlock)
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
				this.currentQuestionInfo = this.allQuestionsList[0]
				this.currentQuestion = Question.questionActions.getQuestionObj(this.allQuestionsList[0])
      });
  }

  run() {	
		// получаем вопросы
    this.getQuestions().then(() => {
			// создаём ссылки на вопросы
      this.createQuestionLinks();

			// добавляем слушатели для переключениям на вопросы
			this.addQuestionChangeListeners()

			addClass(this.$questionWrapper, 'question__wrapper')
			appendElements(htmlElements.$answerForm, this.$questionWrapper)
      // вставляем первый вопрос
			this.currentQuestion.render()

      // прячем кнопку смотреть все вопросы
      hideElement(htmlElements.$seeAllQuestionsBtn); // прячем кнопку смотреть все
    });
  }

	// создаёт ссылки на вопросы
  createQuestionLinks() {
    appendElements(htmlElements.$questionControls, this.$questionLinksBlock);
    addClass(this.$questionLinksBlock, "question__links-block");
    // console.log(this.$questionLinksBlock);
    // создаём блоки-ссылки на вопросы
    for (let i = 1; i <= this.allQuestionsList.length; i++) {
      let $questionLink = createHtmlBlock("div");
			let number;

			if (!this.questionsConfig.isFinished || this.allQuestionsList[i - 1].vrahovyietiaDpa) {
				number = createHtmlBlock('b', i)
			} else {
				number = createHtmlBlock('span', i)
			}

			appendElements($questionLink, number)
      appendElements(this.$questionLinksBlock, $questionLink);

      addClass($questionLink, "question__link");
      $questionLink.dataset.id = i - 1;
    }

    // первой ссылке на вопрос добавляем активный класс
    addClass(
      document.querySelector(".question__link"),
      "question__link_active"
    );
  }

	recreateQuestionWrapper() {
		this.$questionWrapper = createHtmlBlock('div')
		addClass(this.$questionWrapper, 'question__wrapper')
		// удаляем контент
		htmlElements.$answerForm.innerHTML = ''
		appendElements(htmlElements.$answerForm, this.$questionWrapper)
	}
	
	createResultBlock() {
		//TODO: вычислить тестовый бал и макс количество этих балов и вычислить бал зно
		const $testScore = createHtmlBlock('div', `Ваш тестовий бал: <b>?</b> з <b>?</b> можливих.`)
		const $ratingScore = createHtmlBlock('div', 'Ваш рейтинговий бал: <b>?</b> з 200 можливих.')
		const $dpaScore = createHtmlBlock('div', `Ваш бал ДПА: <b>${Math.trunc(12 * this.result.dpaPercentage / 100)}</b> з 12 можливих.`)
		const $time = createHtmlBlock('div', `Витрачено часу: <b>${this.testMinutes} хв.</b> з 180 запропонованих`)

		
		appendElements(this.$resultingBlock, $testScore, $ratingScore, $dpaScore, $time)
		addClass(this.$resultingBlock, 'result')
	}

  // ставит слушатели для кнопок и ссылок на вопросы
  addQuestionChangeListeners() {
    this.$questionLinksBlock.addEventListener(
      "click",
      App.listeners.questionLinksListener
    );

    htmlElements.$btnBlock.addEventListener(
			"click", 
			App.listeners.buttonsListener
		);
  }

}

export default App;
