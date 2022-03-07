import express from "express"
import { questions } from "../src/scripts/questions.js";

const testNames = {
  osnovna: "основна сесія",
  dodatkova: "додаткова сесія",
  probniyTest: "пробний тест",
  demonstration: "демонстраційний варіант",
};

const subjectNames = {
	name: "Англійська мова",
  nameRodovuyVidminok: "Англійської мови",
	linkName: 'english-lang'
}

const jsonParser = express.json();
export const engLangRouter = express.Router()

engLangRouter.get("/", (req, res) => {
  const testObject = Object.keys(questions['english-lang']).map((key) => {
    return questions['english-lang'][key];
  });

  res.render("pages/subject.ejs", {
    title: "English language",
    name: subjectNames.name,
    nameRodovuyVidminok: subjectNames.nameRodovuyVidminok,
    linkName: subjectNames.linkName,
    years: testObject.map((obj) => obj.options.year),
    links: testObject.map((obj) => obj.options.links),
    testNames: testNames,
  });
});

engLangRouter.get("/2021demonstration", (req, res) => {
  const path = questions['english-lang'].year2021.demonstration;
	res.render("pages/test.ejs", {
		title: "Math",
		questionNum: path.length,
		pageName: "демонстраційний варіант",
		subjectNames: subjectNames
	})
});


engLangRouter.get("/2021probniyTest", (req, res) => {
  const path = questions['english-lang'].year2021.probniyTest;
	
	res.render("pages/test.ejs", {
		title: "Math",
		questionNum: path.length,
		pageName: "пробний тест",
		subjectNames: subjectNames
	})
});


engLangRouter.get("/2021osnovna", (req, res) => {
  const path = questions['english-lang'].year2021.osnovna;

	res.render("pages/test.ejs", {
		title: "Math",
		questionNum: path.length,
		pageName: "основна сесія",
		subjectNames: subjectNames
	})
});


engLangRouter.get("/2021dodatkova", (req, res) => {
  const path = questions['english-lang'].year2021.dodatkova;

	res.render("pages/test.ejs", {
		title: "Math",
		questionNum: path.length,
		pageName: "додаткова сесія",
		subjectNames: subjectNames
	})
});


//* 2020 //// //// //// ////


engLangRouter.get("/2020demonstration", (req, res) => {
  const path = questions['english-lang'].year2021.demonstration;
	res.render("pages/test.ejs", {
		title: "Math",
		questionNum: path.length,
		pageName: "демонстраційний варіант",
		subjectNames: subjectNames
	})
});


engLangRouter.get("/2020probniyTest", (req, res) => {
  const path = questions['english-lang'].year2021.probniyTest;
	
	res.render("pages/test.ejs", {
		title: "Math",
		questionNum: path.length,
		pageName: "пробний тест",
		subjectNames: subjectNames
	})
});


engLangRouter.get("/2020osnovna", (req, res) => {
  const path = questions['english-lang'].year2021.osnovna;

	res.render("pages/test.ejs", {
		title: "Math",
		questionNum: path.length,
		pageName: "основна сесія",
		subjectNames: subjectNames
	})
});


engLangRouter.get("/2020dodatkova", (req, res) => {
  const path = questions['english-lang'].year2021.dodatkova;

	res.render("pages/test.ejs", {
		title: "Math",
		questionNum: path.length,
		pageName: "додаткова сесія",
		subjectNames: subjectNames
	})
});

// получаем результат, обрабатываем его и отправляем назад
engLangRouter.post("/result", jsonParser, (req, res) => {
  const allQuesitons = req.body;

  const answers = allQuesitons.reduce((acc, obj) => {
    // если тип ответа массив
    if (typeof obj.answer === "object") {
      // вычисляем какую часть массива занимает 1 элемент
      const part = 1 / obj.expectedAnswer.length;

      // пробегаемся по каждому элементу массива ответов и массива правильных ответов
      for (let i = 0; i < obj.answer.length; i++) {
        // и элементы равны добавляем частичку бала
        
				if (obj.answer[i] === obj.expectedAnswer[i]) {
					acc += part
				}
				else {
					acc += 0
				}
      }
    } else {
      // если ответ равен правильному ответу то добавляем 1 бал
			if (obj.answer === obj.expectedAnswer) {
				acc++
				obj.result = 'succes'
			}
			else {
				acc += 0
				obj.result = 'mistake'
			}
    }

    return acc;
  }, 0);


  const data = {
		allQuesitons: allQuesitons,
    succesfulAnswersNum: answers.toFixed(0), // количество правильных ответов
    allQuesitonsNum: allQuesitons.length, // количество вопросов
    percentage: ((answers.toFixed(0) / allQuesitons.length) * 100).toFixed(1), // процент правильных ответов
  };

  res.send(data);
});