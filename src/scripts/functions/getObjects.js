import { RadioForm, WriteForm } from "../formClass.js"; 
import { allQuestionsList } from "../currentQuestions.js"
import { htmlElements } from "../htmlElements.js";

const {
	$btn,
	$nextBtn,
	$endBtn,
	$btnBlock,
	$questionBlocks,
	$questionText,
	$form,
	$seeAllQuestionsBtn,
	$wrapper,
} = htmlElements;

	// создаёт instance класса формы
  export function getFormObj(obj) {
		const type = obj.type
    switch (type) {
      case "radio": {
        return new RadioForm(obj);
      }

      case "write": {
        return new WriteForm(obj);
      }

      default: {
        console.log(`Instance класса формы типа ${type} не создан `);
      }
    }
  }




