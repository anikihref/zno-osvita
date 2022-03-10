import { allQuestionsList } from "./currentQuestions.js"; // объект содержащий все вопросы
import { htmlElements } from "./htmlElements.js"; // объект содержащий все нужные html элементы
// import { RadioForm, WriteForm, MultipleWriteForm } from "./formClass.js"; // Классы для создания формы
import { getFormObj } from "./functions/getObjects.js";
import { addClass, addStyles, hasClass } from "./functions/attributes.js";
import { addField, validateEmpty, addStyle } from "./functions/other.js";

import {
  removeElements,
  findHtmlElement,
  changeTextContent,
  removeInnerContent,
  appendElements,
  hideElement,
  showElement,
} from "./functions/elementActions.js";

import {
  findNextQuestion,
  moveActiveLink,
  createQuestionLinks,
  insertAnswer,
  turnQuestion,
  seeAllQuestions,
  changeQuestionNumber,
  turnQuestionFinished,
	makeDoneLink,
} from "./functions/questionsActions.js";
import { createHtmlBlock, createTextBlock, recreateQuestionWrapper } from "./functions/createElement.js";

document.addEventListener("DOMContentLoaded", (e) => {
  //* //// //// //// //// //// //// //// //// //// //// //
  //														 												//
  //														 												//
  //														 												//
  //* ////			Основные константы и переменные				////
	
  let {
    $btn,
    $nextBtn,
    $endBtn,
    $btnBlock,
    $questionBlocks,
    $questionText,
    $form,
    $seeAllQuestionsBtn,
    $wrapper,
    $questionNum,
    $answerForm,
		$questionWrapper
  } = htmlElements;

  // вспомагательные данные о вопросах
  const questionsConfig = {
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

    if (
      target == null ||
      hasClass(target, "question__block_active") // если кликнули на текущий вопрос
    ) {
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
      changeQuestionNumber(+targetId + 1);
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
				$questionWrapper = recreateQuestionWrapper(question)

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
							finishTest()
						}
						
						makeDoneLink()
						
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

  //* //// //// //// //// //// //// //// ///
  //                                      //
  //                                      //
  //                                      //
  //* //// ////			 I I F E			 //// ////

  let start = function () {
    (function insertQuestionLinks() {
      createQuestionLinks(allQuestionsList.length); // создаём блоки-ссылки на вопросы

      addClass(
        findHtmlElement(document, ".question__block"), // получаем первый блок ссылку
        "question__block_active"
      );
    })();

    (function addListeners() {
      $questionBlocks.addEventListener("click", questionLinksListener);

      $btnBlock.addEventListener("click", buttonsListener);
    })();

		(function createFirstQuestion() {
			turnQuestion(questionsConfig.currentQuestion, $questionWrapper)
		})()

    addStyle($seeAllQuestionsBtn, "display", "none");

    start = null;
  };

  start();

  function finishTest() {
    fetch("result", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(allQuestionsList),
    })
      .then((res) => res.json())
      //// //// //// //// ////

      .then((data) => {
        //! переопределяем значение
        questionsConfig.isFinished = true;

        addStyle($seeAllQuestionsBtn, "display", "block");

        removeElements([$btn, $endBtn]);

				
        turnQuestionFinished(questionsConfig.currentQuestion, $questionWrapper);

				// для проверяем правильный ответ или нет и в зависимости от этого добавляе класс
				[...document.querySelectorAll('.question__block')].forEach((element, i) => {
					const question = data.allQuesitons[i]
					
					if (!question.answer) {
						return
					}
					else if (question.result === 'mistake' || !question.result) {
						addClass(element, 'question__block_mistake')
					} else if (question.result === 'partiallySucces') {
						addClass(element, 'question__block_partially')
					}
					else if (question.result === 'succes') {
						addClass(element, 'question__block_succes')
					}
				})
        console.log(data);
      });
  }

  //* //// ////			 I I F E			 //// ////
  //                                      //
  //                                      //
  //                                      //
  //* //// //// //// //// //// //// //// ///
});
