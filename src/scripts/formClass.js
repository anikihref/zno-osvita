import { addAttributes, addClass } from './functions/attributes.js';
import { createHtmlBlock, createTextBlock } from './functions/createElement.js'

export class Form {
	constructor(questionObj) {
		this.questionObj = questionObj;
	}

	createExpectedAnswerBlock() {
		let answerHtml = ''
		if (typeof this.questionObj.expectedAnswer === 'object') {
			this.questionObj.expectedAnswer.forEach((answer, i) => {
				answerHtml += `<p>${++i}. ${answer}</p> `
			}) 
		} else if (this.questionObj.type = 'radio') {
			answerHtml += `<p>${this.questionObj.variants[this.questionObj.answerId]}</p>`
		} else {
			answerHtml += `<p>${this.questionObj.expectedAnswer}</p>`
		}
		const $answerBlockTitle = createTextBlock('h3', 'Ответ:')
		const $answerBlock = createHtmlBlock('div', answerHtml)

		$answerBlockTitle.classList.add('question__answer-title')
		$answerBlock.classList.add('question__answer')

		$answerBlock.prepend($answerBlockTitle)
		return $answerBlock
	}

	createAnswerBlock() {
		if (!this.questionObj.answer) { return ' ' }
		
		let answerHtml = ''
		if (typeof this.questionObj.answer === 'object') {
			this.questionObj.answer.forEach((answer, i) => {
				answerHtml += `<p>${++i}. ${answer}</p> `
			}) 
		} else {
			answerHtml += `<p>${this.questionObj.answer}</p>`
		}
		const $answerBlockTitle = createTextBlock('h3', 'Ваш ответ:')
		const $answerBlock = createHtmlBlock('div', answerHtml)

		addClass($answerBlockTitle, 'question__answer-title')
		addClass($answerBlock, 'question__answer')
		// $answerBlockTitle.classList.add('question__answer-title')
		// $answerBlock.classList.add('question__answer')

		$answerBlock.prepend($answerBlockTitle)
		return $answerBlock
	}
	createForm() {
		const form = createHtmlBlock("div");
		return form;
	}
}

export class RadioForm extends Form {
	constructor(questionObj) {
		super(questionObj);
	}

	getAnswer() {
		const inputs = [...document.querySelectorAll(`input.radio__input`)]; // из коллекции делаем массив
		const resultInput = inputs.find((el) => el.checked);
		
		if (!resultInput) {
			return;
		}
		return document.querySelector(
			`span[id=${resultInput.getAttribute("id")}]`
		).innerHTML;
	}

	// генерирует внутреннее содержимое формы
	createFormInnerHtml() {
		let resultingHtml = "";
		const variants = this.questionObj.variants;

		for (const variant of Object.values(variants)) {
			const num = Object.values(variants).indexOf(variant) + 1;

			resultingHtml += `
			<div class="form__answer form__answer${num}">
				<label class="radio__button-label">
					<input class="radio__input" type="radio" name="answer${this.questionObj.id}" id="answer${num}" data-id="${num}">
					
					<div class="radio__button"></div>
				</label>
				<span class="radioAnswer" id="answer${num}">${variant}</span>
			</div>
			`;
		}

		return resultingHtml;
	}

	// создаёт форму и заполняет её
	createFormWithContent() {
		const form = super.createForm();
		form.classList.add('form__radio', `form${this.questionObj.id}`)
		addAttributes(form, {
			id: 'question'
		})
		form.innerHTML = this.createFormInnerHtml();
		return form;
	}

	createQuestionText() {
		const $question = createHtmlBlock('p', this.questionObj.text)

		addClass('question__text-radio')

		return $question
	}
}

export class writeForm extends Form {
	constructor(questionObj) {
		super(questionObj);
	}

	getAnswer() {
		const inputs = [...document.querySelectorAll(`.form__inputText > input`)];
		const values = inputs.map((elem) => elem.value);

		return values;
	}

	createFormInnerHtml() {
		let innerHtml = "";
		
		if (this.questionObj.questions.length === 1) {
			innerHtml += `
			<div class="form__inputText">
				<input type="text" class="writeInput" id="input1">
			</div>`
		} else {
			for (let i = 1; i <= this.questionObj.questions.length; i++) {
				innerHtml += `
				<div class="form__inputText">
					<p class="form__write-num">${i}.</p>
					<input type="text" class="writeInput" id="input${i}">
				</div>`
			}
		}

		return innerHtml;
	}

	createFormWithContent() {
		const form = super.createForm();
		form.classList.add("form__multipleWrite", `form${this.questionObj.id}`);
		addAttributes(form, {
			id: 'question'
		})
		form.innerHTML = this.createFormInnerHtml();
		return form;
	}

	createQuestionText() {
		let num = 1;
		let outerHtml = "";
		if (this.questionObj.text) {
			outerHtml += 	`<p>${this.questionObj.text}</p>`
		}

		if (this.questionObj.questions.length === 1) {
			outerHtml = `
				<p class="question__text-multiple"> ${this.questionObj.questions[0]}</p>
			`;
		} else {
			for (const question of this.questionObj.questions) {
				outerHtml += `
					<p class="question__text-multiple"> ${num}. ${question}</p>
				`;
	
				num++;
			}
		}
		
		return outerHtml;
	}
}

