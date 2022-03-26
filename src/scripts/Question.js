import { addClass, removeClass } from "./functions/attributes.js";
import {
  createHtmlBlock,
} from "./functions/createElement.js";
import { appendElements, prependElements } from "./functions/elementActions.js";
import { htmlElements } from "./htmlElements.js";
import { app } from "./main.js";


export class Question {
	static questionActions = {
		seeAllQuestions() {
			htmlElements.$answerForm.innerHTML = "";
	
			app.allQuestionsList.forEach((question) => {
				const formObj = Question.questionActions.getQuestionObj(question);
				// создаём html вопроса
				const $question = createHtmlBlock("div", 
					formObj.createQuestionWrapper(),
					formObj.createAnswerWrapper(),
				);
				// вставляем div с номером вопроса в блок вопроса
				prependElements($question, 
					formObj.createQuestionNumber(question.id + 1),
				);
				// добавляем классы блоку вопроса
				addClass(
					$question,
					"question__wrapper",
					"question__wrapper_all",
					`question__wrapper${question.id}`
				);
				// добавляем блок вопроса в блок со всеми вопросами
				appendElements(htmlElements.$answerForm, $question);
	
				// добавляем класс для блока с ответом
				addClass(
					$question.querySelector(".question__answer-wrapper"),
					"question__answer-wrapper_all"
				);
			});
		},
		getQuestionObj(obj) {
			const type = obj.type;
			switch (type) {
				case "radio": {
					return new RadioQuestion(obj);
				}
	
				case "write": {
					return new WriteQuestion(obj);
				}
	
				default: {
					console.log(`Instance класса формы типа ${type} не создан `);
				}
			}
		},
		findNextQuestion(question) {
			// делаем копию массива вопросов
			const allQuesitonsCopy = [...app.allQuestionsList];
	
			// если мы на последнем вопросе то переходим на первый
			if (app.allQuestionsList.length - 1 == question.id) {
				return allQuesitonsCopy[0];
			} else {
				return allQuesitonsCopy[question.id + 1];
			}
		},
		moveActiveLink(questionId) {
			// элемент ссылки на вопрос который станет активным
			const $nextActiveBlock = app.$questionLinksBlock.querySelector(
				`[data-id="${questionId}"]`
			);
			// текущий активный элемент ссылки на вопрос
			const $activeBlock = app.$questionLinksBlock.querySelector(
				".question__link_active"
			);
	
			if ($nextActiveBlock.dataset.id === $activeBlock.dataset.id) {
				return;
			}
	
			addClass($nextActiveBlock, "question__link_active");
			removeClass($activeBlock, "question__link_active");
		}
	} 

  constructor(questionObj) {
    this.questionObj = questionObj;
  }



  // создаёт блок с текстом вопроса
  // должен возвращать массив элементов которые будут в вопросе
  createQuestionWrapper() {
    const elements = [];
    const $questionWrapper = createHtmlBlock("div");
    addClass($questionWrapper, "question__text-wrapper");

    if (this.questionObj.text) {
      appendElements($questionWrapper, this.createQuestionText());
    }
    if (this.questionObj.questions) {
      appendElements($questionWrapper, this.createQuestions());
    }
    if (this.questionObj.questionImage) {
      appendElements($questionWrapper, this.createQuestionImageBlock());
    }
    
    return $questionWrapper;
  }

  // создаёт блок с ответами правильными ответами и ответами пользователя
  createAnswerWrapper() {
    const $qestionAnswerWrapper = createHtmlBlock("div", 
      // создаём элемент с правильными ответами
      this.createExpectedAnswerBlock(),
      // создаём элемент с ответами пользователя если ответы есть
      this.createAnswerBlock(),
    );

    addClass($qestionAnswerWrapper, "question__answer-wrapper");

    return $qestionAnswerWrapper;
  }

  // создаёт блок с ответами пользователя (если ответы были)
  createAnswerBlock() {
    if (!this.questionObj.answer) {
      return " ";
    }

    let answerHtml = "";
    this.questionObj.answer.forEach((answer, i) => {
      answerHtml += `<p>${++i}. ${answer ?? "нет ответа"}</p> `;
    });

    const $answerBlockTitle = createHtmlBlock("h3", "Ваш ответ:");
    const $answerBlock = createHtmlBlock("div", answerHtml);

    addClass($answerBlockTitle, "question__answer-title");
    addClass($answerBlock, "question__answer");

    $answerBlock.prepend($answerBlockTitle);
    return $answerBlock;
  }

  // создаёт блок с правильными ответами
  createExpectedAnswerBlock() {
    let answerHtml = "";

    this.questionObj.expectedAnswer.forEach((answer, i) => {
      answerHtml += `<p>${++i}. ${answer}</p> `;
    });

    const $answerBlockTitle = createHtmlBlock("h3", "Ответ:");
    const $answerBlock = createHtmlBlock("div", answerHtml);

    $answerBlockTitle.classList.add("question__answer-title");
    $answerBlock.classList.add("question__answer");

    $answerBlock.prepend($answerBlockTitle);
    return $answerBlock;
  }

  // создаёт текста вопроса
  createQuestionText() {
    const $questionTextWrapper = createHtmlBlock(
      "div",
      `<p>${this.questionObj.text}</p>`
    );
    addClass($questionTextWrapper, "question__text");

    return $questionTextWrapper;
  }

  // создаёт блок с картинкой для вопроса
  createQuestionImageBlock() {
    const $imageWrapper = createHtmlBlock(
      "div",
      `<img src="${this.questionObj.questionImage}">`
    );
    addClass($imageWrapper, "question__wrapper-image");

    return $imageWrapper;
  }

  createQuestionNumber(questionNum) {
    const $questionNumber = createHtmlBlock("div", `Завдання ${questionNum} з ${app.allQuestionsList.length}`);

    addClass($questionNumber, "question__num_all");
    return $questionNumber;
  }

  render() {
    app.$questionWrapper.innerHTML = "";

    appendElements(app.$questionWrapper, 
      this.createQuestionNumber(this.questionObj.id + 1),
      this.createQuestionWrapper(),
    );

    if (app.questionsConfig.isFinished) {
      appendElements(app.$questionWrapper, this.createAnswerWrapper());
    } else {
      appendElements(app.$questionWrapper, this.createAnswerForm());
      // вставляем ответ
      this.insertAnswer();
    }

    // перемещаем активную ссылку на вопрос
    Question.questionActions.moveActiveLink(this.questionObj.id);
  }
}

// для type: 'write'
export class WriteQuestion extends Question {
  constructor(questionObj) {
    super(questionObj);
  }

  // вставляет ответ если он был ранее дан
  insertAnswer() {
    if (!this.questionObj.hasOwnProperty("answer")) {
      return;
    }
    // получаем массив input'ов
    const inputs = [
      ...document.querySelectorAll(`.form${this.questionObj.id} .writeInput`),
    ];

    // вставляем каждый ответ в соответствующую форму
    this.questionObj.answer.forEach((answer, i) => {
      inputs[i].value = answer;
    });
  }

  // получает ответ пользователя
  getAnswer() {
    const inputs = [...document.querySelectorAll(`.form__inputText > input`)];
    const values = inputs.map((elem) => elem.value);

    return values;
  }

  // создаёт блок с нумероваными вопросами
  createQuestions() {
    let outerHtml = "";

    if (this.questionObj.questions.length === 1) {
      outerHtml = `
				<p class="question__text-multiple"> ${this.questionObj.questions[0]}</p>
			`;
    } else {
      this.questionObj.questions.forEach((question, i) => {
        outerHtml += `
					<p class="question__text-multiple"> ${i + 1}. ${question}</p>
				`;
      });
    }

    const $questions = createHtmlBlock("div", outerHtml);

    addClass($questions, "question__write-questions");
    return $questions;
  }

  // создаёт блок с формой для ответа
  createAnswerForm() {
    let innerHtml =
      "<div class='question__write-text'>Впишіть відповідь:</div>";
    // создаёт элементы input для ответа на вопрос
    for (let i = 1; i <= this.questionObj.questions.length; i++) {
      innerHtml += `
				<div class="form__inputText">
					<p class="form__write-num">${i}.</p>
					<input type="text" class="writeInput" id="input${i}">
				</div>`;
    }

    const $form = createHtmlBlock("div", innerHtml);

    $form.id = "question";
    addClass($form, "form__multipleWrite", `form${this.questionObj.id}`);

    return $form;
  }
}

// для type: 'radio'
export class RadioQuestion extends Question {
  constructor(questionObj) {
    super(questionObj);
    this.letters = ["А", "Б", "В", "Г", "Д", "Є"];
  }

  // если ранее ответ был дан то вставляем этот ответ
  insertAnswer() {
    if (!this.questionObj.hasOwnProperty("answer")) {
      return;
    }
    const answers = this.questionObj.answer;

    answers.forEach((answer, i) => {
      if (!answer) {
        return;
      }

      const $parent = document.querySelector(`.radio__form-row${i + 1}`);

      const inputs = [...$parent.querySelectorAll("input.radio__input")];
      const id = this.questionObj.variants.findIndex(
        (variant) => variant === answer
      );

      inputs[id].checked = true;
    });
  }

  // получает ответ пользователя
  getAnswer() {
    const checkedInputs = [];
    const answers = [];
    const inputs = {};

    if (this.questionObj.questions) {
      this.questionObj.questions.forEach((question, i) => {
        const $parent = document.querySelector(`.radio__form-row${i + 1}`);
        const currentInputs = [
          ...$parent.querySelectorAll(`input.radio__input`),
        ]; // из коллекции делаем массив инпутов
        inputs[`row${i + 1}`] = currentInputs;
        checkedInputs.push(currentInputs.find((el) => el.checked));
      });
    } else if (this.questionObj.text) {
      const $parent = document.querySelector(`.radio__form-row1`);
      const currentInputs = [...$parent.querySelectorAll(`input.radio__input`)]; // из коллекции делаем массив
      inputs[`row1`] = currentInputs;
      checkedInputs.push(currentInputs.find((el) => el.checked));
    }

    checkedInputs.forEach((input, i) => {
      // если ответа нет то ответ null
      if (!input) {
        return answers.push(null);
      }

      // получаем из ряда инпутов index выдбраного инпута
      const id = inputs[`row${i + 1}`].indexOf(input);
      // получаем ответ по индексу из массива ответов
      const result = this.questionObj.variants[id];

      answers.push(result);
    });

    return answers;
  }

  // создаёт блок с вопросами и вариантами ответа (если есть поле questions)
  createQuestions() {
    if (!this.questionObj.questions) {
      return "";
    }

    const $questions = createHtmlBlock("div", 
      this._createQuestion(),
      this._createFormVariants(),
    );
    addClass($questions, "question__radio-questions");

    return $questions;
  }

  // создаёт форму для ответа
  createAnswerForm() {
    let resultingHtml = ``;

    if (this.questionObj.questions) {
      this.questionObj.questions.forEach((question, i) => {
        resultingHtml += `
					<div class="radio__form-row radio__form-row${i + 1}">
						<div class="radio__form-num">${i + 1}</div>
				`;

        this.questionObj.variants.forEach((variant, j) => {
          resultingHtml += `
					<label class="radio__button-label">
					`;
          if (i === 0) {
            resultingHtml += `<div class="radio__form-letter">${this.letters[j]}</div>`;
          }
          resultingHtml += `
						<input class="radio__input" type="radio" name="answer${i}" id="answer${j}" data-id="${
            j + 1
          }">
						<div class="radio__button"></div>
					</label>
					`;
        });

        resultingHtml += `</div>`;
      });
    } else {
      resultingHtml += `<div class="radio__form-row radio__form-row1 radio__form-row_single">`;

      this.questionObj.variants.forEach((variant, j) => {
        resultingHtml += `
				<div class="radio__form-input_single">
					<label class="radio__button-label">
						<input class="radio__input" type="radio" name="answer0" id="answer${j}" data-id="${
          j + 1
        }">
						<div class="radio__button"></div>
					</label>
					<div class="radio__form-answer_single">${variant}</div>
				</div>
				`;
      });
      resultingHtml += `</div>`;
    }

    const $form = createHtmlBlock("div", resultingHtml);
    addClass($form, "question__multipleRadio");
    return $form;
  }

  // создаёт блок с вопросами ответов
  _createQuestion() {
    const $questionBlocksText = createHtmlBlock("div", "Початок речення:");
    const $questionBlocks = createHtmlBlock("div", $questionBlocksText);

    addClass($questionBlocks, "radio__questions-block");
    addClass($questionBlocksText, "question__form-text_help");

    this.questionObj.questions.forEach((question, i) => {
      const $questionRow = createHtmlBlock(
        "div",
        `
				<div class="radio__question-num">${i + 1}</div>
				<div class="radio__question-text">${question}</div>
			`
      );
      appendElements($questionBlocks, $questionRow);
      addClass($questionRow, "radio__question");
    });

    return $questionBlocks;
  }

  // создаёт блок с вариантами ответов
  _createFormVariants() {
    const $questionBlocksText = createHtmlBlock("div", "Закінчення речення:");
    const $variantBlocks = createHtmlBlock("div", $questionBlocksText);

    addClass($variantBlocks, "radio__variants-block");
    addClass($questionBlocksText, "question__form-text_help");

    this.questionObj.variants.forEach((variant, i) => {
      const $questionRow = createHtmlBlock(
        "div",
        `
				<div class="radio__variant-letter">${this.letters[i]}</div>
				<div class="radio__variant-text">${variant}</div>
			`
      );

      appendElements($variantBlocks, $questionRow);
      addClass($questionRow, "radio__variant");
    });

    return $variantBlocks;
  }
}
