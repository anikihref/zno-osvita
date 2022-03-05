import { RadioForm, WriteForm, MultipleWriteForm } from "../formClass.js"; 
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
      case "write": {
        return new WriteForm(obj);
      }

      case "radio": {
        return new RadioForm(obj);
      }

      case "multipleWrite": {
        return new MultipleWriteForm(obj);
      }

      default: {
        console.log(`Instance класса формы типа ${type} не создан `);
      }
    }
  }

	 // из массива объектов всех вопросов выбирает элемент по переданому id
	export function getQuestionObj(id) {
		
    return allQuestionsList[id];
  }


