import { addAttributes, addClass } from './functions/attributes.js';
import { createHtmlBlock,  createTextBlock } from './functions/createElement.js'
import { appendElements } from './functions/elementActions.js';

export class Form {
	constructor(questionObj) {
		this.questionObj = questionObj;
	}

	// должен возвращать массив элементов которые будут в вопросе
	createQuestionWrapper() {
		const elements = []
		const $questionWrapper = createHtmlBlock('div')
		addClass($questionWrapper, 'question__text-wrapper')

		if (this.questionObj.text) {
			elements.push(this.createQuestionText())
		}
		if (this.questionObj.questions) {
			elements.push(this.createQuestions())
		}
		if (this.questionObj.questionImage) {
			elements.push(this.createQuestionImageBlock())
		}

		appendElements($questionWrapper, elements)
		return $questionWrapper
	}

	createAnswerWrapper() {
		const $qestionAnswerWrapper = createHtmlBlock("div", [
			// создаём элемент с правильными ответами
			this.createExpectedAnswerBlock(), 
			// создаём элемент с ответами пользователя если ответы есть
			this.createAnswerBlock()
		]);

		addClass($qestionAnswerWrapper, "question__answer-wrapper")

		return $qestionAnswerWrapper;
	}

	createQuestionText() {
		const $questionTextWrapper = createHtmlBlock('div', `<p>${this.questionObj.text}</p>`)
		addClass($questionTextWrapper, 'question__text')

		return $questionTextWrapper
	}
	
	createQuestionImageBlock() {
		const $imageWrapper = createHtmlBlock('div', `<img src="${this.questionObj.questionImage}">`)
		addClass($imageWrapper, 'question__wrapper-image')
	
		return $imageWrapper
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
	createAnswerForm() {
		const $form = createHtmlBlock('div', this.createFormInnerHtml(), {
			id: 'question'
		})

		$form.classList.add('form__radio', `form${this.questionObj.id}`)

		return $form;
	}

	createQuestionText() {
		const $question = createHtmlBlock('p', this.questionObj.text)

		addClass('question__text-radio')

		return $question
	}
}

export class WriteForm extends Form {
	constructor(questionObj) {
		super(questionObj);
	}

	getAnswer() {
		const inputs = [...document.querySelectorAll(`.form__inputText > input`)];
		const values = inputs.map((elem) => elem.value);

		return values;
	}

	createFormInnerHtml() {
		let innerHtml = "<div class='question__write-text'>Впишіть відповідь:</div>";
		
	
			for (let i = 1; i <= this.questionObj.questions.length; i++) {
				innerHtml += `
				<div class="form__inputText">
					<p class="form__write-num">${i}.</p>
					<input type="text" class="writeInput" id="input${i}">
				</div>`
			}
		

		return innerHtml;
	}

	createAnswerForm() {
		const $form = createHtmlBlock('div', this.createFormInnerHtml(), {
			id: 'question'
		})

		$form.classList.add('form__multipleWrite', `form${this.questionObj.id}`)

		return $form;
	}


	createQuestions() {
		let outerHtml = "";


		if (this.questionObj.questions.length === 1) {
			outerHtml = `
				<p class="question__text-multiple"> ${this.questionObj.questions[0]}</p>
			`;
		} else {
			this.questionObj.questions.forEach((question, i) => {
				outerHtml += `
					<p class="question__text-multiple"> ${i}. ${question}</p>
				`
			})
		}

		const $questions = createHtmlBlock('div', outerHtml)
		addClass($questions, 'question__write-questions')
		return $questions
	}


	createQuestionText() {
		const $questionTextWrapper = createHtmlBlock('div', `<p>${this.questionObj.text}</p>`)
		addClass($questionTextWrapper, 'question__text')
		
		return $questionTextWrapper;
	}
}

export class MultipleRadio extends Form {
	constructor(questionObj) {
		super(questionObj);
	}

	getAnswer() {
		const checkedInputs = []
		const answers = []
		const $answersBlock = document.querySelector('.multiple-radio__variants-block')

		this.questionObj.questions.forEach((question, i) => {
			const $parent = document.querySelector(`.multipleRadio__form-row${i + 1}`)
			const currentInputs = [...$parent.querySelectorAll(`input.radio__input`)]; // из коллекции делаем массив
			checkedInputs.push(currentInputs.find((el) => el.checked)	)
		})
		console.log(checkedInputs);

		checkedInputs.forEach(input => {
			if (!input) { return }
			
			const result = $answersBlock.querySelector(
				`div[id=${input.getAttribute("id")}]`
			).innerHTML; 
			answers.push(result)
		})

		return answers
	}

	createQuestion() {
		let resultingHtml = `
		<div class="multiple-radio__questions-block">
			<div class="question__form-text_help">Початок речення:</div>
		`

		this.questionObj.questions.forEach((question, i) => {
			resultingHtml += `
			<div class="multiple-radio__question">
				<div class="multiple-radio__question-num">${i + 1}</div>
				<div class="multiple-radio__question-text">${question}</div>
			</div>`
		})

		resultingHtml += `</div>`
		return resultingHtml
	}
	
	createFormVariants() {
		const letters = ['А', 'Б', 'В', 'Г', 'Ґ', 'Д', 'Є']

		let resultingHtml = `
		<div class="multiple-radio__variants-block">
			<div class="question__form-text_help">Закінчення речення:</div>
		`

		this.questionObj.variants.forEach((variant, i) => {
			
			resultingHtml += `
			<div class="multiple-radio__variant">
				<div class="multiple-radio__variant-letter">${letters[i]}</div>
				<div class="multiple-radio__variant-text" id="answer${i}">${variant}</div>
			</div>`
		})

		resultingHtml += `</div>`
		return resultingHtml
	}

	// создаёт блок с вопросами и вариантами ответа
	createQuestions() {
		const $questions = createHtmlBlock('div', [this.createQuestion(), this.createFormVariants()]) 
		addClass($questions, 'question__multipleRadio-questions')

		return $questions
	}




	createAnswerForm() {
		const letters = ['А', 'Б', 'В', 'Г', 'Ґ', 'Д', 'Є']
		let resultingHtml = ``

		this.questionObj.questions.forEach((question, i) => {
			resultingHtml += `
				<div class="multipleRadio__form-row multipleRadio__form-row${i + 1}">
					<div class="multipleRadio__form-num">${i+1}</div>
			`
			

			this.questionObj.variants.forEach((variant, j) => {
				
				resultingHtml += `
				<label class="radio__button-label">
				`
				if (i === 0) {
					resultingHtml += `<div class="multipleRadio__form-letter">${letters[j]}</div>`
				}
				resultingHtml += `
					<input class="radio__input" type="radio" name="answer${i}" id="answer${j}" data-id="${j + 1}">
					<div class="radio__button"></div>
				</label>
				`
			}) 

			resultingHtml += `</div>`
		})


		const $form = createHtmlBlock('div', resultingHtml)
		addClass($form, 'question__multipleRadio')
		return $form
	}
}
