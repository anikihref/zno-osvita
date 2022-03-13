import express from "express";
import path from "path";
import fs from "fs";
import { mathRouter } from "./routers/math.js";
import { engLangRouter } from "./routers/engLang.js";
import { ukrLangRouter } from "./routers/ukrLang.js";

const PORT = 5000;
const __dirname = path.resolve();

const app = express();
const jsonParser = express.json();

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/src")); // делаем папку исходников статичной


app.use("/math", mathRouter);
app.use("/english-lang", engLangRouter);
app.use("/ukr-lang", ukrLangRouter);

app.get("/", (req, res) => {
  res.render("pages/main", {
    title: "ЗНО освіта ремейк",
  });
});

// получаем вопросы
app.get("/getQuestions", (req, res) => {
  const queries = req.query;

  fs.readFile(path.join(__dirname, "src", "questions.json"), { encoding: "utf-8" }, (err, data) => {
      if (err) {
        console.log(err);
      }

      const questions = JSON.parse(data)[queries.subject][`year${queries.year}`][queries.test];

			res.send(JSON.stringify(questions));
    }
  );
});

// получаем результат, обрабатываем его и отправляем назад
app.post("/result", jsonParser, (req, res) => {
	const allQuestions = req.body;

  const answers = allQuestions.reduce((acc, obj) => {
		// если нет ответа на вопрос
		if (!obj.answer) { 
			obj.result = "mistake"
			return acc += 0
		}

    // вычисляем какую часть массива занимает 1 элемент
    const part = 1 / obj.expectedAnswer.length;
		// баллы за текущий вопрос
		let mark = 0;

    // пробегаемся по каждому элементу массива ответов и массива правильных ответов
    for (let i = 0; i < obj.answer.length; i++) {
      // и если элементы равны добавляем частичку бала
      if (obj.answer[i] === obj.expectedAnswer[i]) {
        mark += part;
      } else {
        mark += 0;
      }
    }

    if (mark === 1) {
      obj.result = "succes";
    } else if (mark < 1 && mark > 0) {
      obj.result = "partiallySucces";
    } else {
      obj.result = "mistake";
    }

    return acc += mark;
  }, 0);

  res.send({
    allQuestions: allQuestions,
    succesfulAnswersNum: answers.toFixed(0), // количество правильных ответов
    allQuestionsNum: allQuestions.length, // количество вопросов
    percentage: ((answers.toFixed(0) / allQuestions.length) * 100).toFixed(1), // процент правильных ответов
  });
})

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
