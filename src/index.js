import parse from './parse.js';

const text = `
Компания
	Филиал 1
		Отдел 1
			Вася Пупкин
			Пуся Пускин
		Отдел 2
			Валерий Меладзе
	Филиал 2
		Отдел 1
			Иванов Иван
`;

console.log(JSON.stringify(parse(text), null, 4));
/*
[
    {
        "name": "Компания",
        "children": [
            {
                "name": "Филиал 1",
                "children": [
                    {
                        "name": "Отдел 1",
                        "children": [
                            {
                                "name": "Вася Пупкин",
                                "children": []
                            },
                            {
                                "name": "Пуся Пускин",
                                "children": []
                            }
                        ]
                    },
                    {
                        "name": "Отдел 2",
                        "children": [
                            {
                                "name": "Валерий Меладзе",
                                "children": []
                            }
                        ]
                    }
                ]
            },
            {
                "name": "Филиал 2",
                "children": [
                    {
                        "name": "Отдел 1",
                        "children": [
                            {
                                "name": "Иванов Иван",
                                "children": []
                            }
                        ]
                    }
                ]
            }
        ]
    }
]
*/