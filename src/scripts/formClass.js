import { addClass } from './functions/attributes.js';
import { createHtmlBlock,  createTextBlock } from './functions/createElement.js'
import { appendElements } from './functions/elementActions.js';

export class Form {
	constructor(questionObj) {
		this.questionObj = questionObj;
	}

	// создаёт блок с текстом вопроса
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

	// создаёт блок с ответами пользователя (если ответы были)
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

	// создаёт блок с правильными ответами
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
	
	// создаёт оболочку для текста вопроса
	createQuestionText() {
		const $questionTextWrapper = createHtmlBlock('div', `<p>${this.questionObj.text}</p>`)
		addClass($questionTextWrapper, 'question__text')

		return $questionTextWrapper
	}
	
	// создаёт блок с картинкой для вопроса
	createQuestionImageBlock() {
		const $imageWrapper = createHtmlBlock('div', `<img src="${this.questionObj.questionImage}">`)
		addClass($imageWrapper, 'question__wrapper-image')
	
		return $imageWrapper
	}

	// создаёт блок с создаёт блок с правильными ответами и ответами пользователя (если ответы были)
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

// для type: 'write'
export class WriteForm extends Form {
	constructor(questionObj) {
		super(questionObj);
	}
	// получает ответ пользователя
	getAnswer() {
		const inputs = [...document.querySelectorAll(`.form__inputText > input`)];
		const values = inputs.map((elem) => elem.value);

		return values;
	}

	// создаёт элементы формы ответа
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

	// создаёт оболочку для формы ответа и вставляет результат выполнения функции createFormInnerHtml
	createAnswerForm() {
		const $form = createHtmlBlock('div', this.createFormInnerHtml(), {
			id: 'question'
		})

		$form.classList.add('form__multipleWrite', `form${this.questionObj.id}`)

		return $form;
	}

	// создаёт блок с вопросами
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
				`
			})
		}

		const $questions = createHtmlBlock('div', outerHtml)
		addClass($questions, 'question__write-questions')
		return $questions
	}
}

// для type: 'radio'
export class RadioForm extends Form {
	constructor(questionObj) {
		super(questionObj);
	}
	// получает ответ пользователя
	getAnswer() {
		const checkedInputs = []
		const answers = []

		if (this.questionObj.questions) {
			this.questionObj.questions.forEach((question, i) => {
				const $parent = document.querySelector(`.radio__form-row${i + 1}`)
				const currentInputs = [...$parent.querySelectorAll(`input.radio__input`)]; // из коллекции делаем массив
				checkedInputs.push(currentInputs.find((el) => el.checked)	)
			})
		} else if (this.questionObj.text) {
			const $parent = document.querySelector(`.radio__form-row1`)
			const currentInputs = [...$parent.querySelectorAll(`input.radio__input`)]; // из коллекции делаем массив
			checkedInputs.push(currentInputs.find((el) => el.checked)	)
		}

		// console.log(checkedInputs);

		checkedInputs.forEach(input => {
			// если ответа нет то ответ null
			if (!input) { return answers.push(null) }
			// поскольку у каждого инпута последний символ id его индекс то вытаскивем его оттуда
			const id = input.id.split('').at(-1)
			// получаем ответ по индексу из массива ответов
			const result = this.questionObj.variants[id]
	
			answers.push(result)
		})

		return answers
	}
	// создаёт блок с вопросами ответов
	createQuestion() {
		let resultingHtml = `
		<div class="radio__questions-block">
			<div class="question__form-text_help">Початок речення:</div>
		`

		this.questionObj.questions.forEach((question, i) => {
			resultingHtml += `
			<div class="radio__question">
				<div class="radio__question-num">${i + 1}</div>
				<div class="radio__question-text">${question}</div>
			</div>`
		})

		resultingHtml += `</div>`
		return resultingHtml
	}
	
	// создаёт блок с вариантами ответов
	createFormVariants() {
		const letters = ['А', 'Б', 'В', 'Г', 'Д', 'Є']

		let resultingHtml = `
		<div class="radio__variants-block">
			<div class="question__form-text_help">Закінчення речення:</div>
		`

		this.questionObj.variants.forEach((variant, i) => {
			
			resultingHtml += `
			<div class="radio__variant">
				<div class="radio__variant-letter">${letters[i]}</div>
				<div class="radio__variant-text" id="answer${i}">${variant}</div>
			</div>`
		})

		resultingHtml += `</div>`
		return resultingHtml
	}

	// создаёт блок с вопросами и вариантами ответа (если есть поле questions)
	createQuestions() {
		if (!this.questionObj.questions) { return '' }

		const $questions = createHtmlBlock('div', [this.createQuestion(), this.createFormVariants()]) 
		addClass($questions, 'question__radio-questions')

		return $questions
	}

	// создаёт форму для ответа
	createAnswerForm() {
		const letters = ['А', 'Б', 'В', 'Г', 'Д', 'Є']
		let resultingHtml = ``

		if (this.questionObj.questions) {
			this.questionObj.questions.forEach((question, i) => {
				resultingHtml += `
					<div class="radio__form-row radio__form-row${i + 1}">
						<div class="radio__form-num">${i+1}</div>
				`
	
				this.questionObj.variants.forEach((variant, j) => {
					
					resultingHtml += `
					<label class="radio__button-label">
					`
					if (i === 0) {
						resultingHtml += `<div class="radio__form-letter">${letters[j]}</div>`
					}
					resultingHtml += `
						<input class="radio__input" type="radio" name="answer${i}" id="answer${j}" data-id="${j + 1}">
						<div class="radio__button"></div>
					</label>
					`
				}) 
	
				resultingHtml += `</div>`
			})
		} else if (this.questionObj.text) {
			resultingHtml += `<div class="radio__form-row radio__form-row1 radio__form-row_single">`

			this.questionObj.variants.forEach((variant, j) => {	
				resultingHtml += `
				<div class="radio__form-input_single">
					<label class="radio__button-label">
						<input class="radio__input" type="radio" name="answer0" id="answer${j}" data-id="${j + 1}">
						<div class="radio__button"></div>
					</label>
					<div class="radio__form-answer_single">${variant}</div>
				</div>
				`
			}) 
			resultingHtml += `</div>`
		}
	


		const $form = createHtmlBlock('div', resultingHtml)
		addClass($form, 'question__multipleRadio')
		return $form
	}
}
