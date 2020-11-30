import fs from 'fs';
import assert from 'assert';
import parse from '../src/parse.js';

const use = name => fs.readFileSync(`./test/assets/${name}.txt`, { encoding: 'utf-8' });

describe('Простые структуры', () => {
    it('Пустая строка', () => {
        assert.deepStrictEqual(parse(use(1)), []);
    });

    it('Структура без вложенных элементов', () => {
        assert.deepStrictEqual(parse(use(2)), [
            {
                name: 'Элемент 1',
                children: []
            },
            {
                name: 'Элемент 2',
                children: []
            }
        ]);
    });

    it('Структура с одним вложенным элементом', () => {
        assert.deepStrictEqual(parse(use(3)), [
            {
                name: 'Элемент 1',
                children: [
                    {
                        name: 'Элемент 2',
                        children: []
                    }
                ]
            }
        ]);
    });

    it('Структура с двумя корневыми элементами, в первом из которых имеется вложенный элемент', () => {
        assert.deepStrictEqual(parse(use(4)), [
            {
                name: 'Элемент 1',
                children: [
                    {
                        name: 'Элемент 2',
                        children: []
                    }
                ]
            },
            {
                name: 'Элемент 3',
                children: []
            },
        ]);
    });

    it('Структура с двумя корневыми элементами, каждый из которых имеет вложенный элемент', () => {
        assert.deepStrictEqual(parse(use(5)), [
            {
                name: 'Элемент 1',
                children: [
                    {
                        name: 'Элемент 2',
                        children: []
                    }
                ]
            },
            {
                name: 'Элемент 3',
                children: [
                    {
                        name: 'Элемент 4',
                        children: []
                    }
                ]
            },
        ]);
    });

    it('Структура с двумя корневыми элементами, во втором из которых имеется вложенный элемент', () => {
        assert.deepStrictEqual(parse(use(6)), [
            {
                name: 'Элемент 1',
                children: []
            },
            {
                name: 'Элемент 2',
                children: [
                    {
                        name: 'Элемент 3',
                        children: []
                    }
                ]
            },
        ]);
    });
});

describe('Сложныe структуры', () => {
    it('Структура с большим количество вложений', () => {
        assert.deepStrictEqual(parse(use(7)), [
            {
                name: '1',
                children: [
                    {
                        name: '1.1',
                        children: [
                            {
                                name: '1.1.1',
                                children: []
                            },
                            {
                                name: '1.1.2',
                                children: []
                            },
                            {
                                name: '1.1.3',
                                children: []
                            }
                        ]
                    },
                    {
                        name: '1.2',
                        children: []
                    }
                ]
            },
            {
                name: '2',
                children: [
                    {
                        name: '2.1',
                        children: [
                            {
                                name: '2.1.1',
                                children: []
                            },
                            {
                                name: '2.1.2',
                                children: [
                                    {
                                        name: '2.1.2.1',
                                        children: []
                                    }
                                ]
                            },
                            {
                                name: '2.1.3',
                                children: []
                            }
                        ]
                    }
                ]
            },
            {
                name: '3',
                children: [
                    {
                        name: '3.1',
                        children: []
                    },
                    {
                        name: '3.2',
                        children: []
                    },
                    {
                        name: '3.3',
                        children: [
                            {
                                name: '3.3.1',
                                children: [
                                    {
                                        name: '3.3.1.1',
                                        children: []
                                    },
                                    {
                                        name: '3.3.1.2',
                                        children: []
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                name: '4',
                children: [
                    {
                        name: '4.1',
                        children: []
                    },
                    {
                        name: '4.2',
                        children: []
                    }
                ]
            }
        ]);
    });
});

describe('Структуры с пустыми строками', () => {
    it('Пустые строки в элементах структуры', () => {
        assert.deepStrictEqual(parse(use(8)), [
            {
                name: 'A',
                children: [
                    {
                        name: 'A1',
                        children: []
                    },
                    {
                        name: 'A2',
                        children: []
                    }
                ]
            },
            {
                name: 'B',
                children: [
                    {
                        name: 'B1',
                        children: []
                    }
                ]
            },
            {
                name: 'C',
                children: [
                    {
                        name: 'C1',
                        children: []
                    }
                ]
            }
        ]);
    });

    it('Пустые строки между корневыми элементами структуры', () => {
        assert.deepStrictEqual(parse(use(9)), [
            {
                name: 'A',
                children: [
                    {
                        name: 'A1',
                        children: []
                    },
                    {
                        name: 'A2',
                        children: []
                    }
                ]
            },
            {
                name: 'B',
                children: [
                    {
                        name: 'B1',
                        children: []
                    }
                ]
            },
            {
                name: 'C',
                children: [
                    {
                        name: 'C1',
                        children: []
                    }
                ]
            }
        ]);
    });

    it('Пустые в различных частях структуры,', () => {
        assert.deepStrictEqual(parse(use(10)), [
            {
                name: 'A',
                children: [
                    {
                        name: 'A1',
                        children: []
                    },
                    {
                        name: 'A2',
                        children: []
                    }
                ]
            },
            {
                name: 'B',
                children: [
                    {
                        name: 'B1',
                        children: []
                    }
                ]
            },
            {
                name: 'C',
                children: [
                    {
                        name: 'C1',
                        children: []
                    }
                ]
            }
        ]);
    });
});

describe('Структуры с нарушениями табуляции', () => {
    it('Неверные табуляции в дочерних элементах структуры', () => {
        assert.deepStrictEqual(parse(use(11)), [
            {
                name: 'А1',
                children: [
                    {
                        name: 'А1.1',
                        children: [
                            {
                                name: 'А1.2',
                                children: [
                                    {
                                        name: 'А1.2.1',
                                        children: [
                                            {
                                                name: 'А1.2.1.1',
                                                children: []
                                            },
                                            {
                                                name: 'А1.2.1.2',
                                                children: []
                                            }
                                        ]
                                    },
                                    {
                                        name: 'А1.2.2',
                                        children: []
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                name: 'Б1',
                children: [
                    {
                        name: 'Б1.1',
                        children: []
                    },
                    {
                        name: 'Б1.2',
                        children: [
                            {
                                name: 'Б1.2.1',
                                children: []
                            }
                        ]
                    }
                ]
            },
            {
                name: 'В1',
                children: [
                    {
                        name: 'В1.1',
                        children: []
                    },
                    {
                        name: 'В1.2',
                        children: [
                            {
                                name: 'В1.2.1',
                                children: [
                                    {
                                        name: 'В1.2.1.1',
                                        children: []
                                    }
                                ]
                            },
                            {
                                name: 'В1.2.2',
                                children: []
                            }
                        ]
                    }
                ]
            }
        ]);
    });
});

describe('Структуры с использоваением пробелов, вместо табуляции', () => {
    it('Одинарные пробелы', () => {
        assert.deepStrictEqual(parse(use(12)), [
            {
                name: '1',
                children: [
                    {
                        name: '1.1',
                        children: [
                            {
                                name: '1.1.1',
                                children: []
                            }
                        ]
                    },
                    {
                        name: '1.2',
                        children: []
                    }
                ]
            },
            {
                name: '2',
                children: [
                    {
                        name: '2.1',
                        children: []
                    },
                    {
                        name: '2.2',
                        children: [
                            {
                                name: '2.2.1',
                                children: []
                            }
                        ]
                    },
                    {
                        name: '2.3',
                        children: [
                            {
                                name: '2.3.1',
                                children: []
                            },
                            {
                                name: '2.3.2',
                                children: [
                                    {
                                        name: '2.3.2.1',
                                        children: []
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]);
    });
});