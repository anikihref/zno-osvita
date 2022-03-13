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

mathRouter.get("/2021_demonstration", (req, res) => {
  const path = questions.math.year2021.demonstration;
  res.render("pages/test.ejs", {
    title: "Math",
    questionNum: path.length,
    pageName: "демонстраційний варіант",
    subjectNames: subjectNames,
  });
});

mathRouter.get("/2021_probniyTest", (req, res) => {
  const path = questions.math.year2021.probniyTest;

  res.render("pages/test.ejs", {
    title: "Math",
    questionNum: path.length,
    pageName: "пробний тест",
    subjectNames: subjectNames,
  });
});

mathRouter.get("/2021_osnovna", (req, res) => {
  const path = questions.math.year2021.osnovna;

  res.render("pages/test.ejs", {
    title: "Math",
    questionNum: path.length,
    pageName: "основна сесія",
    subjectNames: subjectNames,
  });
});

mathRouter.get("/2021_dodatkova", (req, res) => {
  const filePath = questions.math.year2021.dodatkova;

  res.render("pages/test.ejs", {
    title: "Math",
    questionNum: filePath.length,
    pageName: "додаткова сесія",
    subjectNames: subjectNames,
  });
});
