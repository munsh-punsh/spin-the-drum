export interface Question {
  id: number;
  question: string;
  answer: string;
  options?: string[];
  imageUrl?: string;
  isUsed?: boolean;
}

export const COLORS = {
  ACTIVE: {
    PRIMARY: '#FF6B6B',
    SECONDARY: '#4ECDC4'
  },
  USED: {
    PRIMARY: '#95A5A6',
    SECONDARY: '#BDC3C7'
  }
};

export const questions: Question[] = [
  {
    id: 1,
    question: "Какая столица России?",
    answer: "Москва",
    options: ["Санкт-Петербург", "Москва", "Новосибирск", "Казань"],
    imageUrl: "https://image.fonwall.ru/o/ok/kreml-moskva-rossiya-z7zh.jpg",
    isUsed: false
  },
  {
    id: 2,
    question: "Сколько планет в Солнечной системе?",
    answer: "8",
    options: ["7", "8", "9", "10"],
    imageUrl: "https://image.fonwall.ru/o/ok/kreml-moskva-rossiya-z7zh.jpg",
    isUsed: false
  },
  {
    id: 3,
    question: "Какой химический символ у золота?",
    answer: "Au",
    options: ["Ag", "Au", "Fe", "Cu"],
    imageUrl: "https://image.fonwall.ru/o/ok/kreml-moskva-rossiya-z7zh.jpg",
    isUsed: false
  },
  {
    id: 4,
    question: "Кто написал 'Войну и мир'?",
    answer: "Лев Толстой",
    options: ["Федор Достоевский", "Лев Толстой", "Александр Пушкин", "Иван Тургенев"],
    imageUrl: "https://image.fonwall.ru/o/ok/kreml-moskva-rossiya-z7zh.jpg",
    isUsed: false
  },
  {
    id: 5,
    question: "Сколько дней в високосном году?",
    answer: "366",
    options: ["365", "366", "367", "364"],
    imageUrl: "https://image.fonwall.ru/o/ok/kreml-moskva-rossiya-z7zh.jpg",
    isUsed: false
  },
  {
    id: 6,
    question: "Какой самый большой океан на Земле?",
    answer: "Тихий океан",
    options: ["Атлантический океан", "Индийский океан", "Тихий океан", "Северный Ледовитый океан"],
    imageUrl: "https://image.fonwall.ru/o/ok/kreml-moskva-rossiya-z7zh.jpg",
    isUsed: false
  }
];

export const TEAM_NAMES = {
  TEAM_1: "Команда 1",
  TEAM_2: "Команда 2"
}; 