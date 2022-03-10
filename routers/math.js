import express from "express";
import { questions } from "../src/scripts/questions.js";

const testNames = {
  osnovna: "основна сесія",
  dodatkova: "додаткова сесія",
  probniyTest: "пробний тест",
  demonstration: "демонстраційний варіант",
};

const subjectNames = {
  name: "Математика",
  nameRodovuyVidminok: "Математики",
  linkName: "math",
};

const jsonParser = express.json();
export const mathRouter = express.Router();

mathRouter.get("/", (req, res) => {
  const testObject = Object.keys(questions.math).map((key) => {
    return questions.math[key];
  });

  res.render("pages/subject.ejs", {
    title: "Math",
    name: subjectNames.name,
    nameRodovuyVidminok: subjectNames.nameRodovuyVidminok,
    linkName: subjectNames.linkName,
    years: testObject.map((obj) => obj.options.year),
    links: testObject.map((obj) => obj.options.links),
    testNames: testNames,
  });
});

mathRouter.get("/2021demonstration", (req, res) => {
  const path = questions.math.year2021.demonstration;
  res.render("pages/test.ejs", {
    title: "Math",
    questionNum: path.length,
    pageName: "демонстраційний варіант",
    subjectNames: subjectNames,
  });
});

mathRouter.get("/2021probniyTest", (req, res) => {
  const path = questions.math.year2021.probniyTest;

  res.render("pages/test.ejs", {
    title: "Math",
    questionNum: path.length,
    pageName: "пробний тест",
    subjectNames: subjectNames,
  });
});

mathRouter.get("/2021osnovna", (req, res) => {
  const path = questions.math.year2021.osnovna;

  res.render("pages/test.ejs", {
    title: "Math",
    questionNum: path.length,
    pageName: "основна сесія",
    subjectNames: subjectNames,
  });
});

mathRouter.get("/2021dodatkova", (req, res) => {
  const path = questions.math.year2021.dodatkova;

  res.render("pages/test.ejs", {
    title: "Math",
    questionNum: path.length,
    pageName: "додаткова сесія",
    subjectNames: subjectNames,
  });
});

mathRouter.post("/result", jsonParser, (req, res) => {
  const allQuesitons = req.body;

  const answers = allQuesitons.reduce((acc, obj) => {
		if (!obj.answer) { 
			obj.result = "mistake"
			return acc += 0
		}
    // вычисляем какую часть массива занимает 1 элемент
    const part = 1 / obj.expectedAnswer.length;
    // пробегаемся по каждому элементу массива ответов и массива правильных ответов
    for (let i = 0; i < obj.answer.length; i++) {
      // и если элементы равны добавляем частичку бала
      if (obj.answer[i] === obj.expectedAnswer[i]) {
        acc += part;
      } else {
        acc += 0;
      }
    }

    if (acc === 1) {
      obj.result = "succes";
    } else if (acc < 1 && acc > 0) {
      obj.result = "partiallySucces";
    } else {
      obj.result = "mistake";
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
