import express from "express"
import { questions } from "../src/scripts/questions.js";

const testNames = {
  osnovna: "основна сесія",
  dodatkova: "додаткова сесія",
  'probniy-test': "пробний тест",
  demonstration: "демонстраційний варіант",
};

export const ukrLangRouter = express.Router()

ukrLangRouter.get("/", (req, res) => {
  const testObject = Object.keys(questions.ukrLanguage).map((key) => {
    return questions.ukrLanguage[key];
  });

  res.render("pages/subject.ejs", {
    // генерируем страницу с тестом
    title: "Ukrainian language",
    name: "Українська мова",
    nameRodovuyVidminok: "Української мови",
    linkName: "ukr-lang",
    years: testObject.map((obj) => obj.options.year),
    links: testObject.map((obj) => obj.options.links),
    testNames: testNames,
  });
});