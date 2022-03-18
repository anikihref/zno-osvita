import express from "express";
import { questions } from "../app.js";

export const mathRouter = express.Router();

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


mathRouter.get("/", (req, res) => {
	const years = Object.keys(questions.math).map((key) => key.split("_")[1]);
	const links = {};
	years.forEach((year) => {
		const currentLinks = Object.keys(questions.math[`year_${year}`]);
		links[year] = currentLinks;
	});

	res.render("pages/subject.ejs", {
		title: subjectNames.name,
		name: subjectNames.name,
		nameRodovuyVidminok: subjectNames.nameRodovuyVidminok,
		linkName: subjectNames.linkName,
		years: years,
		links: links,
		testNames: testNames,
		styleFile: 'subject.css'
	});
});

mathRouter.get("/2021_demonstration", (req, res) => {
  const testsPath = questions.math.year_2021.demonstration;
  res.render("pages/test.ejs", {
    title: "Math",
    questionNum: testsPath.length,
    pageName: "демонстраційний варіант",
    subjectNames: subjectNames,
		styleFile: 'test.css'
  });
});

mathRouter.get("/2021_probniyTest", (req, res) => {
  const testsPath = questions.math.year_2021.probniyTest;

  res.render("pages/test.ejs", {
    title: "Math",
    questionNum: testsPath.length,
    pageName: "пробний тест",
    subjectNames: subjectNames,
		styleFile: 'test.css'
  });
});

mathRouter.get("/2021_osnovna", (req, res) => {
  const testsPath = questions.math.year_2021.osnovna;

  res.render("pages/test.ejs", {
    title: "Math",
    questionNum: testsPath.length,
    pageName: "основна сесія",
    subjectNames: subjectNames,
		styleFile: 'test.css'
	});
});

mathRouter.get("/2021_dodatkova", (req, res) => {
  const testsPath = questions.math.year_2021.dodatkova;

  res.render("pages/test.ejs", {
    title: "Math",
    questionNum: testsPath.length,
    pageName: "додаткова сесія",
    subjectNames: subjectNames,
		styleFile: 'test.css'
  });
});
