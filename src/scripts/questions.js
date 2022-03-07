export let questions = {
  math: {
    year2021: {
      dodatkova: [
				{
					text: `
						У під'їзді шістнадцятиповерхового будинку на першому поверсі розташовано 6 квартир, а на кожному з решти поверхів – по 8. На 
						якому поверсі квартира № 31, якщо квартири від № 1 і далі пронумеровано послідовно від першого до останнього поверху?
					`,	
					type: "radio",
					variants: ['3', '4', '5', '6'],
					answerId: 2
				},
        {
          text: `
					<div class="question__text">
					Кількість відвідувачів ботанічного саду протягом червня становила чверть від їхньої сумарної кількості в травні й червні. На якій 
					із діаграм правильно зображено розподіл відвідувачів цього ботанічного саду впродовж цих двох місяців? <br>
					</div>
					<div class="zavdannia-5"><div class="zavdannia-5__img1"></div> <div> – кількість відвідувачів у травні</div></div>
					<div class="zavdannia-5"><div class="zavdannia-5__img2"></div> <div> – кількість відвідувачів у червні</div></div>
					`,
          type: "radio",
					answerId: 3,
          variants: [
						`<img src="/Other_pictures/Year_2021/Dodatkova/zavdannia-5-diagramma1.png">`, 
						`<img src="/Other_pictures/Year_2021/Dodatkova/zavdannia-5-diagramma2.png">`, 
						`<img src="/Other_pictures/Year_2021/Dodatkova/zavdannia-5-diagramma3.png">`, 
						`<img src="/Other_pictures/Year_2021/Dodatkova/zavdannia-5-diagramma4.png">`
					],
        },
        {
          text: `
					<div class="question__text">
						Точки <b>A</b> та <b>B</b> лежать на сфері радіуса 10 см. Укажіть найбільше можливе значення довжини відрізка <b>AB</b>.
					</div>
					`,
          type: "radio",
					variants: ['20 см', '100π см', '10 см', '20π см'],
          answerId: 0
        },
        {
          text: `
					<div class="question__text">
						Обчисліть суму коренів рівняння <b>x<sup>2</sup> + 3x - 4 = 0</b>
					</div>
					`,
          type: "radio",
          answerId: 1,
          variants: ["-4", "-3", "3", "5"],
        },
        {
          text: `
					<div class="question__text">
						У рівнобедреному трикутнику <b>ABC</b> з основою <b>AC ∠B = 40°</b> . Визначте градусну міру кута <b>A</b>. <br>
					</div>
					<div class="question__image">
						<img src="/Geometry_pictures/Year_2021/Dodatkova/zavdannia-5.png" alt='Triangle'>
					</div>
					`,
          type: "radio",
          answerId: 1,
          variants: ["80°", "70°", "60°", "50°", '40°'],
        },
        {
          text: `
					<div class="question__text">
						Укажіть функцію, графік якої проходить через початок координат.
					</div>
					`,
          type: "radio",
					variants: ['<b>y = x - 1</b>', '<b>y = 1 - x</b>', '<b>y = 1</b>', '<b>y = -1</b>', '<b>y = x</b>'],
          answerId: 4,
        },
        {
          text: `
					<div class="question__text">
						Спростіть вираз <b>2(x + 5y) - (4y - 7x)</b>.
					</div>
					`,
          type: "radio",
          variants: ["<b>9x + y</b>", "<b>9x + 14y</b>", "<b>-5x + 6y</b>", "<b>9x + 6y</b>", "<b>16x + 2y</b>"],
					answerId: 3
        },
        {
          text: `
					<div class="question__text">
						Точки <b>A, B, C</b> та <b>D</b> лежать в одній площині. Які з наведених тверджень є правильними? <br> <br>
						I. Якщо точка <b>B</b> належить відрізку <b>CD</b>, то <b>CB + BD = CD</b>. <br> <br>
						II. Якщо точка <b>A не</b> належить відрізку <b>CD</b>, то<b>CA + AD < CD</b>. <br> <br>
						III. Якщо відрізок <b>CD</b> перетинає відрізок <b>AB</b> в точці О під прямим кутом i <b>AO = OB</b>, то <b>AC = CB</b>.
					</div>
					`,
          type: "radio",
          answerId: 2,
          variants: ["лише І та ІІ", "лише І", "лише І та ІІІ", "лише ІІ", "І, ІІ та ІІІ"],
        },
        {
          text: `
					<div class="question__text">
						Із заглибленням у надра Землі температура порід підвищується в середньому на 3 °С щокожні 100 м. Прилад на першому рівні ствола шахти показує температуру породи +12 °С. За якою формулою можна визначити температуру <b>t</b> (у °C) породи на глибині, що на <b>h</b> м нижче від першого рівня?
					</div>
					`,
          type: "radio",
          answerId: 0,
          variants: [
					`<img src="/svg/algebra_rivniannia/Year2021/dodatkova/zavdannia-9-1.svg">`,
					`<img src="/svg/algebra_rivniannia/Year2021/dodatkova/zavdannia-9-2.svg">`, 
					`<img src="/svg/algebra_rivniannia/Year2021/dodatkova/zavdannia-9-3.svg">`,
					`<img src="/svg/algebra_rivniannia/Year2021/dodatkova/zavdannia-9-4.svg">`,
					`<img src="/svg/algebra_rivniannia/Year2021/dodatkova/zavdannia-9-5.svg">`],
        },
        {
					text: `
					<div class="question__image">
						<img src="/svg/algebra_rivniannia/Year2021/dodatkova/zavdannia-10.svg">
					</div>	
					`,
          type: "radio",
					answerId: 4,
					variants: [
						`<img src="/svg/algebra_rivniannia/Year2021/dodatkova/zavdannia-10-1.svg">`,
						`<img src="/svg/algebra_rivniannia/Year2021/dodatkova/zavdannia-10-2.svg">`,
						`<img src="/svg/algebra_rivniannia/Year2021/dodatkova/zavdannia-10-3.svg">`,
						`<b>12</b>`,
						`<b>2</b>`
					],
          answerId: 4,
        },
        {
          text:`
					<div class="question__text">
						Якому з наведених проміжків належить корінь рівняння <img src="/svg/algebra_rivniannia/Year2021/dodatkova/zavdannia-11.svg">?
					</div>
					`,
          type: "radio",
					answerId: 3,
					variants: ['(-∞; -5]', '(-5; -2]', '(-2; 2]', '(2; 5]', '(5; +∞)'],
          answerId: 3,
        },
				{
					text: `
					<div class="question__text">
						Укажіть правильну подвійну нерівність, якщо <b>a = 0,5<sup>-1</sup>, b = 0,2, c = log<sub>0,2</sub>5</b>.
					</div>
					`,
					type: 'radio',
					answerId: 0,
					variants: [
						`<b>c &lt; b &lt; a</b>`,
						`<b>b &lt; c &lt; a</b>`,
						`<b>a &lt; c &lt; b</b>`,
						`<b>c &lt; a &lt; b</b>`,
						`<b>b &lt; a &lt; c</b>` 
					],
					answerId: 0
				},
				{
					text: `
					<div class="question__text">
					У прямокутній системі координат на площині зображено план паркової зони, що має форму фігури, обмеженої графіками функцій <b>y = f(x)</b> і <b>y = 3</b> (див. рисунок). Укажіть формулу для обчислення площі <b>S</b> цієї фігури.
					</div>
					<div class="question__image">
						<img src="/Algebra_graphics/Year_2021/Dodatkova/13-zavdanniya.png">
					</div>
					`,
					type: 'radio',
					answerId: 4,
					variants: [
						`<img src="/svg/algebra_rivniannia/Year2021/dodatkova/zavdannia-13-1.svg">`,
						`<img src="/svg/algebra_rivniannia/Year2021/dodatkova/zavdannia-13-2.svg">`,
						`<img src="/svg/algebra_rivniannia/Year2021/dodatkova/zavdannia-13-3.svg">`,
						`<img src="/svg/algebra_rivniannia/Year2021/dodatkova/zavdannia-13-4.svg">`,
						`<img src="/svg/algebra_rivniannia/Year2021/dodatkova/zavdannia-13-5.svg">`,
					],
					answerId: 4
				},
				{
					text: `
					<div class="question__text">
						Визначте довжину апофеми правильної чотирикутної піраміди, якщо площа її повної поверхні дорівнює 208 см2, а довжина сторони основи - 8 см.
					</div>
					`,
					type: 'radio',
					variants: [
						`13 см`,
						`12 см`,
						`9 см`,
						`8 см`,
						`6 см` 
					],
					answerId: 2
				},
				{
					text: `
					<div class="question__text">
						Розв'яжіть нерівність <b>3<sup>x</sup> &lt; 27 • 3<sup>-x</sup></b>.
					</div>
					`,
					type: 'radio',
					variants: [
						`<img src="/svg/algebra_rivniannia/Year2021/dodatkova/zavdannia-15-1.svg">`,
						`<img src="/svg/algebra_rivniannia/Year2021/dodatkova/zavdannia-15-2.svg">`,
						`<img src="/svg/algebra_rivniannia/Year2021/dodatkova/zavdannia-15-3.svg">`,
						`<img src="/svg/algebra_rivniannia/Year2021/dodatkova/zavdannia-15-4.svg">`,
						`<img src="/svg/algebra_rivniannia/Year2021/dodatkova/zavdannia-15-5.svg">` 
					],
					answerId: 4
				}, 
				{
					text: `
					<div class="question__text">
					Заїзна кишеня для висадки пасажирів громадського (маршрутного) транспорту й таксі, облаштована перед входом у супермаркет, має форму рівнобічної трапеції <b>ABCD</b>. Довжина більшої основи <b>AD</b> становить 38 м, ширина кишені дорівнює 5 м. Уздовж меншої основи <b>BC</b> й бічних сторін <b>AB</b> й <b>CD</b> планують установити запобіжні стовпчики на відстані 1 м один від одного. Частину з них уже встановили (див. рисунок). Скільки всього стовпчиків має бути за планом уздовж сторін <b>AB, BC</b> й <b>CD</b> цієї кишені, якщо вздовж <b>BC</b> вже встановлено 15 стовпчиків?
					</div>
					<div class="question__image"> 
						<img src="/Geometry_pictures/Year_2021/Dodatkova/zavdannia-16.png">
					</div>
					`,
					type: 'radio',
					variants: [
						'39',
						'41',
						'42',
						'43',
						'45',
					],
					answerId: 1
				},
				{
					text: `
					<div class="question__image"> 
						<img src="/Other_pictures/Year_2021/Dodatkova/zavdannia-17.png">
					</div>`,
					questions: [
            " Визначте енергетичну (калорійну) цінність (у ккал) цього морозива масою 100 г, якщо енергетична цінність білків масою 1 г становить 4 ккал, жирів масою 1 г – 9 ккал, вуглеводів масою 1 г – 4 ккал.",
            `Морозиво, з'їдене Ладою, становило 30 % від усієї пачки (500 г). Визначте енергетичну цінність (у ккал) спожитого нею морозива.
						
						`,
          ],
					type: "write",
					expectedAnswer: ['206', '309']
				},
				{
					type: "write",
					text: `
					<div class="question__text">
						На рисунку зображено прямокутник <b>ABCD</b> й сектор <b>KAD</b>, у якому <b>∠KAD = 90°</b>. Площа сектора <b>KAD</b> дорівнює 100π см2. Дуга <b>KD</b> перетинає сторону <b>BC</b> в точці <b>M</b>, причому <b>BM = 16</b> см.
					</div>
					<div class="question__image"> 
						<img src="/Geometry_pictures/Year_2021/Dodatkova/zavdannia-18.png">
					</div>
					`,
					questions: [
						`Визначте довжину (у см) сторони <b>AD</b>.`,
						`Обчисліть площу (у см<sup>2</sup>) прямокутника <b>ABCD</b>.`
					],
					expectedAnswer: ['20', '240']
				},
				{
					type: "write",
					text: `
					<div class="question__text">
						У прямокутній системі координат у просторі задано вектор <b>a(2; -9; 3)</b> .
					</div>
					`,
					questions: [
						`Визначте координати вектора <b>b = -2a</b>. У відповіді запишіть їхню суму.`,
						`Обчисліть скалярний добуток векторів <b>a • b</b>.`
					],
					expectedAnswer: ['8', '-188']
				}, 
				{
					type: 'write',
					text: `
					<div class="question__text">
					Арифметичну прогресію <b>(a<sub>n</sub>)</b> задано формулою <b>n</b>-го члена: <b>a<sub>n</sub> = 5 - 3,6n</b>.
					</div>
					`,
					questions: [
						`Визначте <b>шостий</b> член цієї прогресії.`,
						`Визначте різницю <b>a<sub>4</sub> - a<sub>2</sub></b>.`
					],
					expectedAnswer: [
						'-16,6',
						'-7,2'
					],
				},
				{
					type: 'write',
					questions: [`
					<div class="question__text">
					На виборах президента школи балотуються три кандидати: Наталя, Микола й Антон. За результатами опитування ймовірність того, що переможе Антон, дорівнює ймовірності того, що переможе Микола, й вдвічі менша за ймовірність того, що переможе Наталя. Якою за результатами опитування є ймовірність того, що президентом школи оберуть Миколу?
					</div>
					`],
					expectedAnswer: [
						'0,25'
					],
				},
				{
					type: 'write',
					questions: [`
					<div class="question__text">
					Протягом 40 хвилин уроку учні виступили з трьома доповідями однакової тривалості й показали дві презентації. Показ кожної презентації тривав на 10 хвилин більше, ніж доповідь. Визначте тривалість однієї доповіді (у хв). Тривалістю пауз між доповідями й презентаціями знехтуйте.
					</div>
					`],
					expectedAnswer: [
						'4'
					],
				},
				{
					type: 'write',
					questions: [`
					<div class="question__text">
						Обчисліть <b>400<sup>1-log<sub>20</sub>4</sup></b>
					</div>
					`],
					expectedAnswer: [
						'25'
					],
				},
				{
					type: 'write',
					questions: [`
					<div class="question__text">
						Розв'яжіть нерівність <b>|x - 9| ≤ 3</b>. У відповіді запишіть суму всіх її цілих розв'язків на проміжку <b>[-15; 15]</b>.
					</div>
					`],
					expectedAnswer: [
						'63'
					],
				},
				{
					type: 'write',
					questions: [`
					<div class="question__text">
						Олег пише смс-повідомлення з трьох речень. У кінці кожного з них він прикріпить один із п'ятнадцяти веселих смайликів. Скільки всього є способів вибору таких смайликів для прикріплення, якщо всі смайлики в повідомленні мають бути різними?
					</div>
					`],
					expectedAnswer: [
						'2730'
					],
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
          type: "write",
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
				links: ["dodatkova", "osnovna", "probniyTest", "demonstration"],
			}
    },
  },
  'english-lang': {
    year2021: {
      dodatkova: [
        {
          questions: ["Сколько будет 122 + 10?", "Сколько будет 152 - 13?"],
          type: "write",
          expectedAnswer: ["132", "139"],
        },
        {
          text: "У тебя здохла a",
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
          type: "write",
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
          type: "write",
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
        links: ["dodatkova", "osnovna", "probniyTest", "demonstration"],
      },
    },
    year2020: {
      dodatkova: [
        {
          questions: ["Сколько будет 122 + 10?", "Сколько будет 152 - 13?"],
          type: "write",
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
          type: "write",
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
          type: "write",
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
        links: ["dodatkova", "osnovna", "probniyTest", "demonstration"],
      },
    },
  },
	'ukr-lang': {
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