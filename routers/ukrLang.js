import express from "express"
import { questions } from "../app.js";

export const ukrLangRouter = express.Router()

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



ukrLangRouter.get("/", (req, res) => {
	const years = Object.keys(questions['ukr-lang']).map((key) => key.split('_')[1])
	const links = {}
	years.forEach(year => {
		const currentLinks = Object.keys(questions['ukr-lang'][`year_${year}`])
		links[year] = currentLinks
	})
	
  // генерируем страницу с тестом
  res.render("pages/subject.ejs", {
    title: subjectNames.name,
    name: subjectNames.name,
    nameRodovuyVidminok: subjectNames.nameRodovuyVidminok,
    linkName: subjectNames.linkName,
    years: years,
    links: links,
    testNames: testNames,
  });
});


//* 2021 //// //// //// ////

ukrLangRouter.get("/2021_osnovna", (req, res) => {
  const testsPath = questions['ukr-lang'].year_2021.osnovna;

	res.render("pages/test.ejs", {
		title: subjectNames.name,
		questionNum: testsPath.length,
		pageName: "основна сесія",
		subjectNames: subjectNames,

	})
});


ukrLangRouter.get("/2021_dodatkova", (req, res) => {
  const testsPath = questions['ukr-lang'].year_2021.dodatkova;

	res.render("pages/test.ejs", {
		title: subjectNames.name,
		questionNum: testsPath.length,
		pageName: "додаткова сесія",
		subjectNames: subjectNames,

	})
});

//* 2020 //// //// //// ////

ukrLangRouter.get("/2020_osnovna", (req, res) => {
  const testsPath = questions['ukr-lang'].year_2020.osnovna;

	res.render("pages/test.ejs", {
		title: subjectNames.name,
		questionNum: testsPath.length,
		pageName: "основна сесія",
		subjectNames: subjectNames,

	})
});


ukrLangRouter.get("/2020_dodatkova", (req, res) => {
  const testsPath = questions['ukr-lang'].year_2020.dodatkova;

	res.render("pages/test.ejs", {
		title: subjectNames.name,
		questionNum: testsPath.length,
		pageName: "додаткова сесія",
		subjectNames: subjectNames,

	})
});

//* 2005 //// //// //// ////

ukrLangRouter.get("/2005_osnovna", (req, res) => {
  const testsPath = questions['ukr-lang'].year_2005.osnovna;

	res.render("pages/test.ejs", {
		title: subjectNames.name,
		questionNum: testsPath.length,
		pageName: "основна сесія",
		subjectNames: subjectNames,

	})
});


ukrLangRouter.get("/2005_dodatkova", (req, res) => {
  const testsPath = questions['ukr-lang'].year_2005.dodatkova;

	res.render("pages/test.ejs", {
		title: subjectNames.name,
		questionNum: testsPath.length,
		pageName: "додаткова сесія",
		subjectNames: subjectNames,

	})
});

ukrLangRouter.get("/2005_demonstration", (req, res) => {
  const testsPath = questions['ukr-lang'].year_2005.demonstration;

	res.render("pages/test.ejs", {
		title: subjectNames.name,
		questionNum: testsPath.length,
		pageName: "демонстраційний варіант",
		subjectNames: subjectNames,

	})
});


