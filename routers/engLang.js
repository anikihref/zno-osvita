import express from "express"
import { questions } from "../src/scripts/questions.js";

const testNames = {
  osnovna: "основна сесія",
  dodatkova: "додаткова сесія",
  'probniy-test': "пробний тест",
  demonstration: "демонстраційний варіант",
};

export const engLangRouter = express.Router()

engLangRouter.get("/", (req, res) => {
  const testObject = Object.keys(questions.english).map((key) => {
    return questions.english[key];
  });

  res.render("pages/subject.ejs", {
    // генерируем страницу с тестом
    title: "English language",
    name: "Англійська мова",
    nameRodovuyVidminok: "Англійської мови",
    linkName: "english-lang",
    years: testObject.map((obj) => obj.options.year),
    links: testObject.map((obj) => obj.options.links),
    testNames: testNames,
  });
});