import express from "express";
import path from "path";
import fs from "fs";
import { mathRouter } from "./routers/math.js";
import { engLangRouter } from "./routers/engLang.js";
import { ukrLangRouter } from "./routers/ukrLang.js";
import { log } from "console";

const PORT = 5000;
const __dirname = path.resolve();

const app = express();
const jsonParser = express.json();

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/src/scripts")); // делаем скрипты статичными
app.use(express.static(__dirname + "/src/styles")); // делаем стили статичными
app.use(express.static(__dirname + "/src/fonts")); // делаем шрифты статичными
app.use(express.static(__dirname + "/src/imgs")); // длеаем картинки статичными

app.use("/math", mathRouter);
app.use("/english-lang", engLangRouter);
app.use("/ukr-lang", ukrLangRouter);

app.get("/", (req, res) => {
  res.render("pages/main", {
    title: "ЗНО освіта ремейк",
  });
});

app.get("/getQuestions", (req, res) => {
  const queries = req.query;

  fs.readFile(path.join(__dirname, "questions.json"), { encoding: "utf-8" }, (err, data) => {
      if (err) {
        console.log(err);
      }

      const questions = JSON.parse(data)[queries.subject][`year${queries.year}`][queries.test];

			res.send(JSON.stringify(questions));
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
