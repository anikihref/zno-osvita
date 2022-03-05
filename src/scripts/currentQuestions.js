import { addField } from "./functions/other.js";
import { questions } from "./questions.js";


const pagePathParts = document.location.pathname.split('/')

const subject = pagePathParts[1] // math or engLang etc.
const testName = pagePathParts[2] // 2021dodatkova or 2018osnovna

const year = testName.substring(0, 4)
const test = testName.substring(4)

export const allQuestionsList = (
	questions[subject][`year${year}`][test]
	// добавляем поле id с индексом элемента каждому объекту
	.map((question, index) => {
		
		addField(question, "id", index);
		return question
	})
)  




