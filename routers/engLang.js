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

engLangRouter.get("/2021_demonstration", (req, res) => {
  const path = questions['english-lang'].year2021.demonstration;
	res.render("pages/test.ejs", {
		title: "Math",
		questionNum: path.length,
		pageName: "демонстраційний варіант",
		subjectNames: subjectNames
	})
});


engLangRouter.get("/2021_probniyTest", (req, res) => {
  const path = questions['english-lang'].year2021.probniyTest;
	
	res.render("pages/test.ejs", {
		title: "Math",
		questionNum: path.length,
		pageName: "пробний тест",
		subjectNames: subjectNames
	})
});


engLangRouter.get("/2021_osnovna", (req, res) => {
  const path = questions['english-lang'].year2021.osnovna;

	res.render("pages/test.ejs", {
		title: "Math",
		questionNum: path.length,
		pageName: "основна сесія",
		subjectNames: subjectNames
	})
});


engLangRouter.get("/2021_dodatkova", (req, res) => {
  const path = questions['english-lang'].year2021.dodatkova;

	res.render("pages/test.ejs", {
		title: "Math",
		questionNum: path.length,
		pageName: "додаткова сесія",
		subjectNames: subjectNames
	})
});


//* 2020 //// //// //// ////


engLangRouter.get("/2020_demonstration", (req, res) => {
  const path = questions['english-lang'].year2021.demonstration;
	res.render("pages/test.ejs", {
		title: "Math",
		questionNum: path.length,
		pageName: "демонстраційний варіант",
		subjectNames: subjectNames
	})
});


engLangRouter.get("/2020_probniyTest", (req, res) => {
  const path = questions['english-lang'].year2021.probniyTest;
	
	res.render("pages/test.ejs", {
		title: "Math",
		questionNum: path.length,
		pageName: "пробний тест",
		subjectNames: subjectNames
	})
});


engLangRouter.get("/2020_osnovna", (req, res) => {
  const path = questions['english-lang'].year2021.osnovna;

	res.render("pages/test.ejs", {
		title: "Math",
		questionNum: path.length,
		pageName: "основна сесія",
		subjectNames: subjectNames
	})
});


engLangRouter.get("/2020_dodatkova", (req, res) => {
  const path = questions['english-lang'].year2021.dodatkova;

	res.render("pages/test.ejs", {
		title: "Math",
		questionNum: path.length,
		pageName: "додаткова сесія",
		subjectNames: subjectNames
	})
});

