import express from "express"
import { questions } from "../src/scripts/questions.js";

const testNames = {
  osnovna: "основна сесія",
  dodatkova: "додаткова сесія",
  'probniy-test': "пробний тест",
  demonstration: "демонстраційний варіант",
};

const jsonParser = express.json();
export const mathRouter = express.Router()

mathRouter.get("/", (req, res) => {
  const testObject = Object.keys(questions.math).map((key) => {
    return questions.math[key];
  });

  res.render("pages/subject.ejs", {
    title: "Math",
    name: "Математика",
    nameRodovuyVidminok: "Математики",
    linkName: "math",
    years: testObject.map((obj) => obj.options.year),
    links: testObject.map((obj) => obj.options.links),
    testNames: testNames,
  });
});



mathRouter.get("/2021demonstration", (req, res) => {
  const path = questions.math.year2021.demonstration;

  if (path[0].type === "radio") {
    res.render("pages/test.ejs", {
      title: "Math",
      text: path[0].text,
      type: path[0].type,
      variants: path[0].variants,
      questionNum: path.length,
      pageName: "демонстраційний варіант",
    });
  } 
	else if (path[0].type === "multipleWrite") {
    res.render("pages/test.ejs", {
      title: "Math",
      type: path[0].type,
      questionNum: path.length,
      questionsNum: path[0].questions.length,
      questions: path[0].questions,
      pageName: "демонстраційний варіант",
    });
  } 
	else {
    res.render("pages/test.ejs", {
      title: "Math",
      text: path[0].text,
      type: path[0].type,
      questionNum: path.length,
      pageName: "демонстраційний варіант",
    });
  }
});

mathRouter.get("/2021demonstration/:questions", (req, res) => {
  res.send(questions.math.year2021.demonstration);
});



mathRouter.get("/2021probniy-test", (req, res) => {
  const path = questions.math.year2021.probniyTest;

  if (path[0].type === "radio") {
    res.render("pages/test.ejs", {
      title: "Math",
      text: path[0].text,
      type: path[0].type,
      variant1: pathpath[0].variants.first,
      variant2: path[0].variants.second,
      variant3: path[0].variants.third,
      variant4: path[0].variants.fourth,
      questionNum: path.length,
      pageName: "пробний тест",
    });
  } 
	else if (path[0].type === "multipleWrite") {
    res.render("pages/test.ejs", {
      title: "Math",
      type: path[0].type,
      questionNum: path.length,
      questionsNum: path[0].questions.length,
      questions: path[0].questions,
      pageName: "пробний тест",
    });
  } 
	else {
    res.render("pages/test.ejs", {
      title: "Math",
      text: path[0].text,
      type: path[0].type,
      questionNum: path.length,
      pageName: "пробний тест",
    });
  }
});

mathRouter.get("/2021probniy-test/:questions", (req, res) => {
  res.send(questions.math.year2021.probniyTest);
});



mathRouter.get("/2021osnovna", (req, res) => {
  const path = questions.math.year2021.osnovna;

  if (path[0].type === "radio") {
    res.render("pages/test.ejs", {
      title: "Math",
      text: path[0].text,
      type: path[0].type,
      variant1: path[0].variants.first,
      variant2: path[0].variants.second,
      variant3: path[0].variants.third,
      variant4: path[0].variants.fourth,
      questionNum: path.length,
      pageName: "основна сесія",
    });
  } 
	else if (path[0].type === "multipleWrite") {
    res.render("pages/test.ejs", {
      title: "Math",
      type: path[0].type,
      questionNum: path.length,
      questionsNum: path[0].questions.length,
      questions: path[0].questions,
      pageName: "основна сесія",
    });
  } 
	else {
    res.render("pages/test.ejs", {
      title: "Math",
      text: path[0].text,
      type: path[0].type,
      questionNum: path.length,
      pageName: "основна сесія",
    });
  }
});

mathRouter.get("/2021osnovna/:questions", (req, res) => {
  res.send(questions.math.year2021.osnovna);
});



mathRouter.get("/2021dodatkova", (req, res) => {
	const path = questions.math.year2021.dodatkova;

  if (path[0].type === "radio") {
    res.render("pages/test.ejs", {
      title: "Math",
      text: path[0].text,
      type: path[0].type,
      variant1: path[0].variants.first,
      variant2: path[0].variants.second,
      variant3: path[0].variants.third,
      variant4: path[0].variants.fourth,
      questionNum: path.length,
      pageName: "додаткова сесія",
    });
  } 
	else if (path[0].type === "multipleWrite") {
    res.render("pages/test.ejs", {
      title: "Math",
      type: path[0].type,
      questionNum: path.length,
      questionsNum: path[0].questions.length,
      questions: path[0].questions,
      pageName: "основна сесія",
    });
  } 
	else {
    res.render("pages/test.ejs", {
      title: "Math",
      text: path[0].text,
      type: path[0].type,
      questionNum: path.length,
      pageName: "додаткова сесія",
    });
  }
});

mathRouter.get("/2021dodatkova/:questions", (req, res) => {
  res.send(questions.math.year2021.dodatkova);
});


mathRouter.post("/result", jsonParser, (req, res) => {
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