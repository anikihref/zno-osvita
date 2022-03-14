import express from "express"
import { questions } from "../app.js";

export const engLangRouter = express.Router()

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


engLangRouter.get("/", (req, res) => {
	const years = Object.keys(questions['english-lang']).map((key) => key.split('_')[1])
	const links = {}
	years.forEach(year => {
		const currentLinks = Object.keys(questions['english-lang'][`year_${year}`])
		links[year] = currentLinks
	})

  res.render("pages/subject.ejs", {
    title: "English language",
    name: subjectNames.name,
    nameRodovuyVidminok: subjectNames.nameRodovuyVidminok,
    linkName: subjectNames.linkName,
    years: years,
    links: links,
    testNames: testNames,
  });
});

engLangRouter.get("/2021_demonstration", (req, res) => {
  const testsPath = questions['english-lang'].year_2021.demonstration;
	res.render("pages/test.ejs", {
		title: "Math",
		questionNum: testsPath.length,
		pageName: "демонстраційний варіант",
		subjectNames: subjectNames
	})
});


engLangRouter.get("/2021_probniyTest", (req, res) => {
  const testsPath = questions['english-lang'].year_2021.probniyTest;
	
	res.render("pages/test.ejs", {
		title: "Math",
		questionNum: testsPath.length,
		pageName: "пробний тест",
		subjectNames: subjectNames
	})
});


engLangRouter.get("/2021_osnovna", (req, res) => {
  const testsPath = questions['english-lang'].year_2021.osnovna;

	res.render("pages/test.ejs", {
		title: "Math",
		questionNum: testsPath.length,
		pageName: "основна сесія",
		subjectNames: subjectNames
	})
});


engLangRouter.get("/2021_dodatkova", (req, res) => {
  const testsPath = questions['english-lang'].year_2021.dodatkova;

	res.render("pages/test.ejs", {
		title: "Math",
		questionNum: testsPath.length,
		pageName: "додаткова сесія",
		subjectNames: subjectNames
	})
});


//* 2020 //// //// //// ////


engLangRouter.get("/2020_demonstration", (req, res) => {
  const testsPath = questions['english-lang'].year_2020.demonstration;
	res.render("pages/test.ejs", {
		title: "Math",
		questionNum: testsPath.length,
		pageName: "демонстраційний варіант",
		subjectNames: subjectNames
	})
});


engLangRouter.get("/2020_probniyTest", (req, res) => {
  const testsPath = questions['english-lang'].year_2020.probniyTest;
	
	res.render("pages/test.ejs", {
		title: "Math",
		questionNum: testsPath.length,
		pageName: "пробний тест",
		subjectNames: subjectNames
	})
});


engLangRouter.get("/2020_osnovna", (req, res) => {
  const testsPath = questions['english-lang'].year_2020.osnovna;

	res.render("pages/test.ejs", {
		title: "Math",
		questionNum: testsPath.length,
		pageName: "основна сесія",
		subjectNames: subjectNames
	})
});


engLangRouter.get("/2020_dodatkova", (req, res) => {
  const testsPath = questions['english-lang'].year_2020.dodatkova;

	res.render("pages/test.ejs", {
		title: "Math",
		questionNum: testsPath.length,
		pageName: "додаткова сесія",
		subjectNames: subjectNames
	})
});

