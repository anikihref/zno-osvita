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

ukrLangRouter.get("/2021_osnovna", (req, res) => {
  const path = questions['ukr-lang'].year2021.osnovna;

	res.render("pages/test.ejs", {
		title: "Math",
		questionNum: path.length,
		pageName: "основна сесія",
		subjectNames: subjectNames
	})
});


ukrLangRouter.get("/2021_dodatkova", (req, res) => {
  const path = questions['ukr-lang'].year2021.dodatkova;

	res.render("pages/test.ejs", {
		title: "Math",
		questionNum: path.length,
		pageName: "додаткова сесія",
		subjectNames: subjectNames
	})
});

//* 2020 //// //// //// ////

ukrLangRouter.get("/2020_osnovna", (req, res) => {
  const path = questions['ukr-lang'].year2021.osnovna;

	res.render("pages/test.ejs", {
		title: "Math",
		questionNum: path.length,
		pageName: "основна сесія",
		subjectNames: subjectNames
	})
});


ukrLangRouter.get("/2020_dodatkova", (req, res) => {
  const path = questions['ukr-lang'].year2021.dodatkova;

	res.render("pages/test.ejs", {
		title: "Math",
		questionNum: path.length,
		pageName: "додаткова сесія",
		subjectNames: subjectNames
	})
});

//* 2005 //// //// //// ////

ukrLangRouter.get("/2005_osnovna", (req, res) => {
  const path = questions['ukr-lang'].year2021.osnovna;

	res.render("pages/test.ejs", {
		title: "Math",
		questionNum: path.length,
		pageName: "основна сесія",
		subjectNames: subjectNames
	})
});


ukrLangRouter.get("/2005_dodatkova", (req, res) => {
  const path = questions['ukr-lang'].year2021.dodatkova;

	res.render("pages/test.ejs", {
		title: "Math",
		questionNum: path.length,
		pageName: "додаткова сесія",
		subjectNames: subjectNames
	})
});

ukrLangRouter.get("/2005_demonstration", (req, res) => {
  const path = questions['ukr-lang'].year2021.demonstration;
	res.render("pages/test.ejs", {
		title: "Math",
		questionNum: path.length,
		pageName: "демонстраційний варіант",
		subjectNames: subjectNames
	})
});


