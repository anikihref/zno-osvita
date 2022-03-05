export let questions = {
  math: {
    year2021: {
      dodatkova: [
        {
          questions: ["Сколько будет 122 + 10?", "Сколько будет 152 - 13?"],
          type: "multipleWrite",
          expectedAnswer: ["132", "139"],
        },
        {
          text: "2^6",
          type: "radio",
          expectedAnswer: "64",
          variants: ["64", "32", "128", "12"],
        },
        {
          text: "Сколько будет 2 * 15?",
          type: "write",
          expectedAnswer: "30",
        },
        {
          text: "Сколько будет 3 * 2?",
          type: "radio",
          expectedAnswer: "6",
          variants: ["8", "6", "2", "1,5"],
        },
        {
          text: "Сколько будет 51 - 11?",
          type: "radio",
          expectedAnswer: "40",
          variants: ["40", "51", "41", "Нету правильного ответа"],
        },
        {
          text: "Сколько будет 2 + 10?",
          type: "write",
          expectedAnswer: "12",
        },
        {
          text: "Сколько будет 2 + 10?",
          type: "radio",
          expectedAnswer: "12",
          variants: ["15", "12", "123", "124"],
        },
        {
          text: "Сколько будет 21 + 10?",
          type: "radio",
          expectedAnswer: "12",
          variants: ["15", "12", "31", "124"],
        },
        {
          text: "Сколько будет 2 / 10?",
          type: "radio",
          expectedAnswer: "12",
          variants: ["1", "0,2", "12", "14"],
        },
        {
          text: "Сколько будет 362 + 15?",
          type: "write",
          expectedAnswer: "377",
        },
        {
          questions: ["Сколько будет 2 + 10?", "Сколько будет 15 + 10?"],
          type: "multipleWrite",
          expectedAnswer: ["12", "25"],
        },
      ],
      osnovna: [
        {
          text: "Сколько будет 10 * 11?",
          type: "write",
          expectedAnswer: "100",
        },
        {
          text: "Про мать было лишнее",
          type: "radio",
          expectedAnswer: "110",
          variants: ["15", "12", "123", "124"],
        },
        {
          text: "Сколько будет 2 * 15?",
          type: "write",
          expectedAnswer: "30",
        },
        {
          text: "Сколько будет 3 * 2?",
          type: "radio",
          expectedAnswer: "6",
          variants: ["15", "12", "123", "124"],
        },
        {
          text: "Сколько будет 51 - 11?",
          type: "radio",
          expectedAnswer: "40",
          variants: ["15", "12", "123", "124"],
        },
        {
          text: "Сколько будет 2 + 10?",
          type: "write",
          expectedAnswer: "12",
        },
        {
          text: "Сколько будет 2 + 10?",
          type: "radio",
          expectedAnswer: "12",
          variants: ["15", "12", "123", "124"],
        },
      ],
      probniyTest: [
        {
          questions: [
            "Сколько будет 2 + 10?",
            "Сколько будет 15 + 10?",
            "asda",
          ],
          type: "multipleWrite",
          expectedAnswer: ["12", "25", "asd"],
        },
        {
          text: "Про мать было лишнее",
          type: "radio",
          expectedAnswer: "110",
          variants: ["15", "12", "123", "124"],
        },
        {
          text: "Сколько будет 2 * 15?",
          type: "write",
          expectedAnswer: "30",
        },
        {
          text: "Сколько будет 3 * 2?",
          type: "radio",
          expectedAnswer: "6",
          variants: ["15", "12", "123", "124"],
        },
        {
          text: "Сколько будет 51 - 11?",
          type: "radio",
          expectedAnswer: "40",
          variants: ["15", "12", "123", "124"],
        },
        {
          text: "Сколько будет 2 + 10?",
          type: "write",
          expectedAnswer: "12",
        },
        {
          text: "Сколько будет 2 + 10?",
          type: "radio",
          expectedAnswer: "12",
          variants: ["15", "12", "123", "124"],
        },
      ],
      demonstration: [
        {
          text: "Про мать было лишнее",
          type: "radio",
          expectedAnswer: "110",
          variants: ["15", "12", "123", "124"],
        },
        {
          text: "Про мать было лишнее",
          type: "radio",
          expectedAnswer: "110",
          variants: ["15", "12", "123", "124"],
        },
        {
          text: "Сколько будет 2 * 15?",
          type: "write",
          expectedAnswer: "30",
        },
        {
          text: "Сколько будет 3 * 2?",
          type: "radio",
          expectedAnswer: "6",
          variants: ["15", "12", "123", "124"],
        },
        {
          text: "Сколько будет 51 - 11?",
          type: "radio",
          expectedAnswer: "40",
          variants: ["15", "12", "123", "124"],
        },
        {
          text: "Сколько будет 2 + 10?",
          type: "write",
          expectedAnswer: "12",
        },
        {
          text: "Сколько будет 2 + 10?",
          type: "radio",
          expectedAnswer: "12",
          variants: ["15", "12", "123", "124"],
        },
      ],
			options: {
				year: "2021",
				links: ["dodatkova", "osnovna", "probniy-test", "demonstration"],
			}
    },
  },
  english: {
    year2021: {
      dodatkova: [
        {
          questions: ["Сколько будет 122 + 10?", "Сколько будет 152 - 13?"],
          type: "multipleWrite",
          expectedAnswer: ["132", "139"],
        },
        {
          text: "У тебя здохла мать",
          type: "radio",
          expectedAnswer: "Голова Тишка",
          variants: ["мне некого больше ебать", "1000-7", "Голова Тишка", ":)"],
        },
        {
          text: "Сколько будет 2 * 15?",
          type: "write",
          expectedAnswer: "30",
        },
        {
          text: "Сколько будет 3 * 2?",
          type: "radio",
          expectedAnswer: "6",
          variants: ["8", "6", "2", "1,5"],
        },
        {
          text: "Сколько будет 51 - 11?",
          type: "radio",
          expectedAnswer: "40",
          variants: ["40", "51", "41", "Нету правильного ответа"],
        },
        {
          text: "Сколько будет 2 + 10?",
          type: "write",
          expectedAnswer: "12",
        },
        {
          text: "Сколько будет 2 + 10?",
          type: "radio",
          expectedAnswer: "12",
          variants: ["15", "12", "123", "124"],
        },
        {
          text: "Сколько будет 21 + 10?",
          type: "radio",
          expectedAnswer: "12",
          variants: ["15", "12", "31", "124"],
        },
        {
          text: "Сколько будет 2 / 10?",
          type: "radio",
          expectedAnswer: "12",
          variants: ["1", "0,2", "12", "14"],
        },
        {
          text: "Сколько будет 362 + 15?",
          type: "write",
          expectedAnswer: "377",
        },
        {
          questions: ["Сколько будет 2 + 10?", "Сколько будет 15 + 10?"],
          type: "multipleWrite",
          expectedAnswer: ["12", "25"],
        },
      ],
      osnovna: [
        {
          text: "Сколько будет 10 * 11?",
          type: "write",
          expectedAnswer: "100",
        },
        {
          text: "Про мать было лишнее",
          type: "radio",
          expectedAnswer: "110",
          variants: ["15", "12", "123", "124"],
        },
        {
          text: "Сколько будет 2 * 15?",
          type: "write",
          expectedAnswer: "30",
        },
        {
          text: "Сколько будет 3 * 2?",
          type: "radio",
          expectedAnswer: "6",
          variants: ["15", "12", "123", "124"],
        },
        {
          text: "Сколько будет 51 - 11?",
          type: "radio",
          expectedAnswer: "40",
          variants: ["15", "12", "123", "124"],
        },
        {
          text: "Сколько будет 2 + 10?",
          type: "write",
          expectedAnswer: "12",
        },
        {
          text: "Сколько будет 2 + 10?",
          type: "radio",
          expectedAnswer: "12",
          variants: ["15", "12", "123", "124"],
        },
      ],
      probniyTest: [
        {
          questions: [
            "Сколько будет 2 + 10?",
            "Сколько будет 15 + 10?",
            "asda",
          ],
          type: "multipleWrite",
          expectedAnswer: ["12", "25", "asd"],
        },
        {
          text: "Про мать было лишнее",
          type: "radio",
          expectedAnswer: "110",
          variants: ["15", "12", "123", "124"],
        },
        {
          text: "Сколько будет 2 * 15?",
          type: "write",
          expectedAnswer: "30",
        },
        {
          text: "Сколько будет 3 * 2?",
          type: "radio",
          expectedAnswer: "6",
          variants: ["15", "12", "123", "124"],
        },
        {
          text: "Сколько будет 51 - 11?",
          type: "radio",
          expectedAnswer: "40",
          variants: ["15", "12", "123", "124"],
        },
        {
          text: "Сколько будет 2 + 10?",
          type: "write",
          expectedAnswer: "12",
        },
        {
          text: "Сколько будет 2 + 10?",
          type: "radio",
          expectedAnswer: "12",
          variants: ["15", "12", "123", "124"],
        },
      ],
      demonstration: [
        {
          text: "Про мать было лишнее",
          type: "radio",
          expectedAnswer: "110",
          variants: ["15", "12", "123", "124"],
        },
        {
          text: "Про мать было лишнее",
          type: "radio",
          expectedAnswer: "110",
          variants: ["15", "12", "123", "124"],
        },
        {
          text: "Сколько будет 2 * 15?",
          type: "write",
          expectedAnswer: "30",
        },
        {
          text: "Сколько будет 3 * 2?",
          type: "radio",
          expectedAnswer: "6",
          variants: ["15", "12", "123", "124"],
        },
        {
          text: "Сколько будет 51 - 11?",
          type: "radio",
          expectedAnswer: "40",
          variants: ["15", "12", "123", "124"],
        },
        {
          text: "Сколько будет 2 + 10?",
          type: "write",
          expectedAnswer: "12",
        },
        {
          text: "Сколько будет 2 + 10?",
          type: "radio",
          expectedAnswer: "12",
          variants: ["15", "12", "123", "124"],
        },
      ],
      options: {
        year: "2021",
        links: ["dodatkova", "osnovna", "probniy-test", "demonstration"],
      },
    },
    year2020: {
      dodatkova: [
        {
          questions: ["Сколько будет 122 + 10?", "Сколько будет 152 - 13?"],
          type: "multipleWrite",
          expectedAnswer: ["132", "139"],
        },
        {
          text: "У тебя здохла мать",
          type: "radio",
          expectedAnswer: "Голова Тишка",
          variants: ["мне некого больше ебать", "1000-7", "Голова Тишка", ":)"],
        },
        {
          text: "Сколько будет 2 * 15?",
          type: "write",
          expectedAnswer: "30",
        },
        {
          text: "Сколько будет 3 * 2?",
          type: "radio",
          expectedAnswer: "6",
          variants: ["8", "6", "2", "1,5"],
        },
        {
          text: "Сколько будет 51 - 11?",
          type: "radio",
          expectedAnswer: "40",
          variants: ["40", "51", "41", "Нету правильного ответа"],
        },
        {
          text: "Сколько будет 2 + 10?",
          type: "write",
          expectedAnswer: "12",
        },
        {
          text: "Сколько будет 2 + 10?",
          type: "radio",
          expectedAnswer: "12",
          variants: ["15", "12", "123", "124"],
        },
        {
          text: "Сколько будет 21 + 10?",
          type: "radio",
          expectedAnswer: "12",
          variants: ["15", "12", "31", "124"],
        },
        {
          text: "Сколько будет 2 / 10?",
          type: "radio",
          expectedAnswer: "12",
          variants: ["1", "0,2", "12", "14"],
        },
        {
          text: "Сколько будет 362 + 15?",
          type: "write",
          expectedAnswer: "377",
        },
        {
          questions: ["Сколько будет 2 + 10?", "Сколько будет 15 + 10?"],
          type: "multipleWrite",
          expectedAnswer: ["12", "25"],
        },
      ],
      osnovna: [
        {
          text: "Сколько будет 10 * 11?",
          type: "write",
          expectedAnswer: "100",
        },
        {
          text: "Про мать было лишнее",
          type: "radio",
          expectedAnswer: "110",
          variants: ["15", "12", "123", "124"],
        },
        {
          text: "Сколько будет 2 * 15?",
          type: "write",
          expectedAnswer: "30",
        },
        {
          text: "Сколько будет 3 * 2?",
          type: "radio",
          expectedAnswer: "6",
          variants: ["15", "12", "123", "124"],
        },
        {
          text: "Сколько будет 51 - 11?",
          type: "radio",
          expectedAnswer: "40",
          variants: ["15", "12", "123", "124"],
        },
        {
          text: "Сколько будет 2 + 10?",
          type: "write",
          expectedAnswer: "12",
        },
        {
          text: "Сколько будет 2 + 10?",
          type: "radio",
          expectedAnswer: "12",
          variants: ["15", "12", "123", "124"],
        },
      ],
      probniyTest: [
        {
          questions: [
            "Сколько будет 2 + 10?",
            "Сколько будет 15 + 10?",
            "asda",
          ],
          type: "multipleWrite",
          expectedAnswer: ["12", "25", "asd"],
        },
        {
          text: "Про мать было лишнее",
          type: "radio",
          expectedAnswer: "110",
          variants: ["15", "12", "123", "124"],
        },
        {
          text: "Сколько будет 2 * 15?",
          type: "write",
          expectedAnswer: "30",
        },
        {
          text: "Сколько будет 3 * 2?",
          type: "radio",
          expectedAnswer: "6",
          variants: ["15", "12", "123", "124"],
        },
        {
          text: "Сколько будет 51 - 11?",
          type: "radio",
          expectedAnswer: "40",
          variants: ["15", "12", "123", "124"],
        },
        {
          text: "Сколько будет 2 + 10?",
          type: "write",
          expectedAnswer: "12",
        },
        {
          text: "Сколько будет 2 + 10?",
          type: "radio",
          expectedAnswer: "12",
          variants: ["15", "12", "123", "124"],
        },
      ],
      demonstration: [
        {
          text: "Про мать было лишнее",
          type: "radio",
          expectedAnswer: "110",
          variants: ["15", "12", "123", "124"],
        },
        {
          text: "Про мать было лишнее",
          type: "radio",
          expectedAnswer: "110",
          variants: ["15", "12", "123", "124"],
        },
        {
          text: "Сколько будет 2 * 15?",
          type: "write",
          expectedAnswer: "30",
        },
        {
          text: "Сколько будет 3 * 2?",
          type: "radio",
          expectedAnswer: "6",
          variants: ["15", "12", "123", "124"],
        },
        {
          text: "Сколько будет 51 - 11?",
          type: "radio",
          expectedAnswer: "40",
          variants: ["15", "12", "123", "124"],
        },
        {
          text: "Сколько будет 2 + 10?",
          type: "write",
          expectedAnswer: "12",
        },
        {
          text: "Сколько будет 2 + 10?",
          type: "radio",
          expectedAnswer: "12",
          variants: ["15", "12", "123", "124"],
        },
      ],
      options: {
        year: "2020",
        links: ["dodatkova", "osnovna", "probniy-test", "demonstration"],
      },
    },
  },
	ukrLanguage: {
		year2021: {
			osnovna: [
				{
          text: "Росія чмо",
          type: "radio",
          expectedAnswer: "110",
          variants: ["15", "12", "123", "124"],
        },
        {
          text: "Сколько будет 2 * 15?",
          type: "write",
          expectedAnswer: "30",
        },
        {
          text: "Сколько будет 3 * 2?",
          type: "radio",
          expectedAnswer: "6",
          variants: ["15", "12", "123", "124"],
        },
				{
          text: "Росія чмо",
          type: "write",
          expectedAnswer: "110",
        },
			],
			dodatkova: [
				{
          text: "Про мать было лишнее",
          type: "radio",
          expectedAnswer: "110",
          variants: ["15", "12", "123", "124"],
        },
        {
          text: "Сколько будет 2 * 15?",
          type: "write",
          expectedAnswer: "30",
        },
        {
          text: "Сколько будет 3 * 2?",
          type: "radio",
          expectedAnswer: "6",
          variants: ["15", "12", "123", "124"],
        },
			],
			
			options: {
        year: "2021",
        links: ["dodatkova", "osnovna"],
      },
		},
		year2020: {
			dodatkova: [
				{
          text: "Про мать было лишнее",
          type: "radio",
          expectedAnswer: "110",
          variants: ["15", "12", "123", "124"],
        },
        {
          text: "Сколько будет 2 * 15?",
          type: "write",
          expectedAnswer: "30",
        },
        {
          text: "Сколько будет 3 * 2?",
          type: "radio",
          expectedAnswer: "6",
          variants: ["15", "12", "123", "124"],
        },
			],
			osnovna: [
				{
          text: "Росія чмо",
          type: "radio",
          expectedAnswer: "110",
          variants: ["15", "12", "123", "124"],
        },
        {
          text: "Сколько будет 2 * 15?",
          type: "write",
          expectedAnswer: "30",
        },
        {
          text: "Сколько будет 3 * 2?",
          type: "radio",
          expectedAnswer: "6",
          variants: ["15", "12", "123", "124"],
        },
				{
          text: "Росія чмо",
          type: "write",
          expectedAnswer: "110",
        },
			],
			options: {
        year: "2020",
        links: ["dodatkova", "osnovna"],
      },
		},
		year2005: {
			dodatkova: [
				{
          text: "Про мать было лишнее",
          type: "radio",
          expectedAnswer: "110",
          variants: ["15", "12", "123", "124"],
        },
        {
          text: "Сколько будет 2 * 15?",
          type: "write",
          expectedAnswer: "30",
        },
        {
          text: "Сколько будет 3 * 2?",
          type: "radio",
          expectedAnswer: "6",
          variants: ["15", "12", "123", "124"],
        },
			],
			osnovna: [
				{
          text: "Росія чмо",
          type: "radio",
          expectedAnswer: "110",
          variants: ["15", "12", "123", "124"],
        },
        {
          text: "Сколько будет 2 * 15?",
          type: "write",
          expectedAnswer: "30",
        },
        {
          text: "Сколько будет 3 * 2?",
          type: "radio",
          expectedAnswer: "6",
          variants: ["15", "12", "123", "124"],
        },
				{
          text: "Росія чмо",
          type: "write",
          expectedAnswer: "110",
        },
			],
			demonstration: [
				{
          text: "Росія чмо",
          type: "radio",
          expectedAnswer: "110",
          variants: ["15", "12", "123", "124"],
        },
        {
          text: "Сколько будет 2 * 15?",
          type: "write",
          expectedAnswer: "30",
        },
        {
          text: "Сколько будет 3 * 2?",
          type: "radio",
          expectedAnswer: "6",
          variants: ["15", "12", "123", "124"],
        },
				{
          text: "Росія чмо",
          type: "write",
          expectedAnswer: "110",
        },
				{
          text: "Росія чмо",
          type: "radio",
          expectedAnswer: "110",
          variants: ["15", "12", "123", "124"],
        },
				{
          text: "Росія чмо",
          type: "radio",
          expectedAnswer: "110",
          variants: ["15", "12", "123", "124"],
        },
				{
          text: "Росія чмо",
          type: "radio",
          expectedAnswer: "110",
          variants: ["15", "12", "123", "124"],
        },
			],
			options: {
        year: "2005",
        links: ["dodatkova", "osnovna", "demonstration"],
      },
		}
	}
};