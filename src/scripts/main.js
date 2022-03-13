// // import { allQuestionsList } from "./currentQuestions.js"; // объект содержащий все вопросы
import { htmlElements } from "./htmlElements.js"; // объект содержащий все нужные html элементы
import { getFormObj } from "./functions/getObjects.js";
import { addClass, hasClass } from "./functions/attributes.js";
import { validateEmpty, addStyle } from "./functions/other.js";

import {
  removeElements,
  findHtmlElement,
  changeTextContent,
  hideElement,
  showElement,
} from "./functions/elementActions.js";

import {
  findNextQuestion,
  createQuestionLinks,
  turnQuestion,
  seeAllQuestions,
  turnQuestionFinished,
  makeDoneLink,
} from "./functions/questionsActions.js";
import { recreateQuestionWrapper } from "./functions/createElement.js";

export let allQuestionsList = {};

document.addEventListener("DOMContentLoaded", (e) => {
  //* //// //// //// //// //// //// //// //// //// //// //
  //														 												//
  //														 												//
  //														 												//
  //* ////			Основные константы и переменные				////

  const pathName = document.location.pathname.split("/");

  const urlPath = {
    subject: pathName[1],
    year: pathName[2].split("_")[0],
    test: pathName[2].split("_")[1],
  };

  let {
    $btn,
    $nextBtn,
    $endBtn,
    $btnBlock,
    $questionBlocks,
    $seeAllQuestionsBtn,
    $questionWrapper,
  } = htmlElements;
  // вспомагательные данные о вопросах
  let questionsConfig = {};

  //* ////			Основные константы и переменные				////
  //														 												//
  //														 												//
  //														 												//
  //* //// //// //// //// //// //// //// //// //// //// //

  //* //// //// //// //// //// //// //// /
  //														 				//
  //														 				//
  //														 				//
  //* ////			Cлушатели событий			////

  const questionLinksListener = (e) => {
    const target = e.target.closest(".question__block");
    if (target == null) {
      return;
    }

    // определяем вопрос на который нужно переключится
    const nextQuestion = allQuestionsList[target.dataset.id];

    //! переопределяем текущий вопрос
    questionsConfig.currentQuestion = nextQuestion;

    if (questionsConfig.questionSwitchLogic === "single") {
      // если тест не завершён
      if (!questionsConfig.isFinished) {
        // переключаем вопрос
        turnQuestion(nextQuestion, $questionWrapper);
      }
      // если тест завершён
      if (questionsConfig.isFinished) {
        // переключаем вопрос
        turnQuestionFinished(nextQuestion, $questionWrapper);
      }
    } else if (questionsConfig.questionSwitchLogic === "seeAll") {
      // получаем data-id элемента по которому кликнули
      const targetId = target.dataset.id;
      // получаем html объект по этому же id
      const $targetQuestion = findHtmlElement(
        document,
        `.question__wrapper${targetId}`
      );
      // получаем Y координаты html элемента вопроса
      const yPos =
        $targetQuestion.getBoundingClientRect().y + window.pageYOffset;
      // скроллим окно к этим координатам
      window.scrollTo(0, yPos);
      // изменяем номер вопроса
    }
  };

  const buttonsListener = (e) => {
    //! проверяем количество неотвеченных вопросов
    questionsConfig.checkAnswersNumber();

    // либо пропускаем вопрос, либо отвечаем на него, либо завершаем тест
    const target = e.target;
    // текущий вопрос
    let question = questionsConfig.currentQuestion;
    // получаем следующий вопрос
    const nextQuestion = questionsConfig.isLastUnanswered
      ? question
      : findNextQuestion(question, "default");

    if (target === $seeAllQuestionsBtn) {
      // если логика переключения - одие вопрос
      if (questionsConfig.questionSwitchLogic === "single") {
        //! изменяем логику переключения между вопросами
        questionsConfig.questionSwitchLogic = "seeAll";

        hideElement($nextBtn);
        changeTextContent($seeAllQuestionsBtn, "Смотреть один");
      }
      // если логика переключения - все вопросы
      else if (questionsConfig.questionSwitchLogic === "seeAll") {
        //! изменяем логику переключения между вопросами
        questionsConfig.questionSwitchLogic = "single";
        // обновляем значение обёртки вопроса
        $questionWrapper = recreateQuestionWrapper(question);

        changeTextContent($seeAllQuestionsBtn, "Смотреть все");
        // показываем кнопку "следующий"
        showElement($nextBtn);
      }
    }

    if (questionsConfig.questionSwitchLogic === "single") {
      // если тест ещё не завершен
      if (!questionsConfig.isFinished) {
        if (target === $nextBtn || target === $btn) {
          if (target === $btn) {
            // получаем ответ
            const answer =
              // получаем объект формы
              getFormObj(question)
                // получаем ответ
                .getAnswer();
						console.log(answer);
            // проверяем дал ли пользователь ответ
            if (validateEmpty(answer)) {
              //! добавляем поле ответа в объект вопроса
              questionsConfig.currentQuestion.answer = answer;
            } else {
              return;
            }

            // если мы на последнем вопросе
            if (questionsConfig.isLastUnanswered) {
              //! Завершаем тест
              finishTest();
            }

            makeDoneLink();
          }

          // переключаем вопрос
          turnQuestion(nextQuestion, $questionWrapper);

          //! переопределяем текущий вопрос
          questionsConfig.currentQuestion = nextQuestion;
        } else if (target === $endBtn) {
          // если есть хоть один объект с полем answer
          if (!!allQuestionsList.find((obj) => obj.hasOwnProperty("answer"))) {
            // завершаем тест
            finishTest();
          }
        }
      }

      // если тест уже завершен
      if (questionsConfig.isFinished) {
        if (target === $nextBtn) {
          // переключаем вопрос
          turnQuestionFinished(nextQuestion, $questionWrapper);

          //! переопределяем текущий вопрос
          questionsConfig.currentQuestion = nextQuestion;
        }
      }
    }

    if (questionsConfig.questionSwitchLogic === "seeAll") {
      if (target === $seeAllQuestionsBtn) {
        seeAllQuestions();
      }
    }
  };

  //* ////			Cлушатели событий			////
  //														 				//
  //														 				//
  //														 				//
  //* //// //// //// //// //// //// //// /

  //* //// //// //// //// //// //// //// ////
  //                                       //
  //                                       //
  //                                       //
  //* //// //// 	 Начало работы 		//// ////
	
  function getQuestions() {
    fetch(
      `/getQuestions?subject=${urlPath.subject}&year=${urlPath.year}&test=${urlPath.test}`
    )
      .then((res) => res.json())
      .then((questions) => {
        //! записываем полученые вопросы в переменную
        allQuestionsList = questions;

				// добавляем поле id с его index'ом каждому вопросу 
				allQuestionsList.forEach((question, index) => {
					question.id = index
				})
        //! определяем объект со вспомагательными методами и переменными
        questionsConfig = {
          // закончен ли тест
          isFinished: false,
          isLastUnanswered: false,
          //			количество неотвеченых вопросов
          unsweredQuestionsNum: allQuestionsList.length,
          // 			single (по одному вопросу) или
          // 			seeAll (смотреть все сразу) только после завершения теста
          questionSwitchLogic: "single",
          //			текущий вопрос
          currentQuestion: allQuestionsList[0],

          checkAnswersNumber() {
            const unanseredNum = allQuestionsList.filter((obj) => {
              return !obj.answer;
            }).length;
            this.unsweredQuestionsNum = unanseredNum;

            if (unanseredNum == 1) {
              this.isLastUnanswered = true;
            }
          },
        };

        createQuestionLinks(allQuestionsList.length); // создаём блоки-ссылки на вопросы
        addClass(
          findHtmlElement(document, ".question__block"), // получаем первый блок ссылку и делаем её активной
          "question__block_active"
        );

        // ставим слушатели
        $questionBlocks.addEventListener("click", questionLinksListener);
        $btnBlock.addEventListener("click", buttonsListener);

        turnQuestion(questionsConfig.currentQuestion, $questionWrapper); // вставляем первый вопрос

        hideElement($seeAllQuestionsBtn); // прячем кнопку смотреть все
      });
  }

  getQuestions();

  function finishTest() {
    fetch("/result", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(allQuestionsList),
    })
      .then((res) => res.json())

      .then((data) => {
        //! переопределяем значение
        questionsConfig.isFinished = true;

        addStyle($seeAllQuestionsBtn, "display", "block");

        removeElements([$btn, $endBtn]);

        turnQuestionFinished(questionsConfig.currentQuestion, $questionWrapper);

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

  //* //// //// 	 Начало работы 		//// ////
  //                                       //
  //                                       //
  //                                       //
  //* //// //// //// //// //// //// //// ////
});
