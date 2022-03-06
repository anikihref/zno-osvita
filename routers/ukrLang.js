import express from "express"
import { questions } from "../src/scripts/questions.js";

const testNames = {
  osnovna: "основна сесія",
  dodatkova: "додаткова сесія",
  probniyTest: "пробний тест",
  demonstration: "демонстраційний варіант",
};

const subjectNames = {
	name: "Українська мова",
  nameRodovuyVidminok: "Української мови",
	linkName: 'ukr-lang'
}

const jsonParser = express.json()
export const ukrLangRouter = express.Router()

ukrLangRouter.get("/", (req, res) => {
  const testObject = Object.keys(questions['ukr-lang']).map((key) => {
    return questions['ukr-lang'][key];
  });

  res.render("pages/subject.ejs", {
    // генерируем страницу с тестом
    title: "Ukrainian language",
    name: subjectNames.name,
    nameRodovuyVidminok: subjectNames.nameRodovuyVidminok,
    linkName: subjectNames.linkName,
    years: testObject.map((obj) => obj.options.year),
    links: testObject.map((obj) => obj.options.links),
    testNames: testNames,
  });
});



//* 2021 //// //// //// ////

ukrLangRouter.get("/2021osnovna", (req, res) => {
  const path = questions['ukr-lang'].year2021.osnovna;

	res.render("pages/test.ejs", {
		title: "Math",
		type: path[0].type,
		text: path[0].text,
		questionNum: path.length,
		pageName: "основна сесія",
		radio: {
			variants: path[0].variants || 0,
		},
		multipleWrite: {
      questions: path[0].questions || 0,
		},
		subjectNames: subjectNames
	})
});


ukrLangRouter.get("/2021dodatkova", (req, res) => {
  const path = questions['ukr-lang'].year2021.dodatkova;

	res.render("pages/test.ejs", {
		title: "Math",
		type: path[0].type,
		text: path[0].text,
		questionNum: path.length,
		pageName: "додаткова сесія",
		radio: {
			variants: path[0].variants || 0,
		},
		multipleWrite: {
      questions: path[0].questions || 0,
		},
		subjectNames: subjectNames
	})
});

//* 2020 //// //// //// ////

ukrLangRouter.get("/2020osnovna", (req, res) => {
  const path = questions['ukr-lang'].year2021.osnovna;

	res.render("pages/test.ejs", {
		title: "Math",
		type: path[0].type,
		text: path[0].text,
		questionNum: path.length,
		pageName: "основна сесія",
		radio: {
			variants: path[0].variants || 0,
		},
		multipleWrite: {
      questions: path[0].questions || 0,
		},
		subjectNames: subjectNames
	})
});


ukrLangRouter.get("/2020dodatkova", (req, res) => {
  const path = questions['ukr-lang'].year2021.dodatkova;

	res.render("pages/test.ejs", {
		title: "Math",
		type: path[0].type,
		text: path[0].text,
		questionNum: path.length,
		pageName: "додаткова сесія",
		radio: {
			variants: path[0].variants || 0,
		},
		multipleWrite: {
      questions: path[0].questions || 0,
		},
		subjectNames: subjectNames
	})
});

//* 2005 //// //// //// ////

ukrLangRouter.get("/2005osnovna", (req, res) => {
  const path = questions['ukr-lang'].year2021.osnovna;

	res.render("pages/test.ejs", {
		title: "Math",
		type: path[0].type,
		text: path[0].text,
		questionNum: path.length,
		pageName: "основна сесія",
		radio: {
			variants: path[0].variants || 0,
		},
		multipleWrite: {
      questions: path[0].questions || 0,
		},
		subjectNames: subjectNames
	})
});


ukrLangRouter.get("/2005dodatkova", (req, res) => {
  const path = questions['ukr-lang'].year2021.dodatkova;

	res.render("pages/test.ejs", {
		title: "Math",
		type: path[0].type,
		text: path[0].text,
		questionNum: path.length,
		pageName: "додаткова сесія",
		radio: {
			variants: path[0].variants || 0,
		},
		multipleWrite: {
      questions: path[0].questions || 0,
		},
		subjectNames: subjectNames
	})
});

ukrLangRouter.get("/2005demonstration", (req, res) => {
  const path = questions['ukr-lang'].year2021.demonstration;
	res.render("pages/test.ejs", {
		title: "Math",
		type: path[0].type,
		text: path[0].text,
		questionNum: path.length,
		pageName: "демонстраційний варіант",
		radio: {
			variants: path[0].variants || 0,
		},
		multipleWrite: {
      questions: path[0].questions || 0,
		},
		subjectNames: subjectNames
	})
});


// получаем результат, обрабатываем его и отправляем назад
ukrLangRouter.post("/result", jsonParser, (req, res) => {
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