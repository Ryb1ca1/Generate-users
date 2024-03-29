const personGenerator = {
    surnameJson: `{
        "count": 15,
        "list": {
            "id_1": "Иванов",
            "id_2": "Смирнов",
            "id_3": "Кузнецов",
            "id_4": "Васильев",
            "id_5": "Петров",
            "id_6": "Михайлов",
            "id_7": "Новиков",
            "id_8": "Федоров",
            "id_9": "Кравцов",
            "id_10": "Николаев",
            "id_11": "Семёнов",
            "id_12": "Славин",
            "id_13": "Степанов",
            "id_14": "Павлов",
            "id_15": "Александров",
            "id_16": "Морозов"
        }
    }`,
    firstNameMaleJson: `{
        "count": 10,
        "list": {
            "id_1": "Александр",
            "id_2": "Максим",
            "id_3": "Иван",
            "id_4": "Артем",
            "id_5": "Дмитрий",
            "id_6": "Никита",
            "id_7": "Михаил",
            "id_8": "Даниил",
            "id_9": "Егор",
            "id_10": "Андрей"
        }
    }`,
    firstNameFemaleJson: `{
        "count": 10,
        "list": {
            "id_1": "Александра",
            "id_2": "Мария",
            "id_3": "Ирина",
            "id_4": "Анастасия",
            "id_5": "Екатерина",
            "id_6": "Наталья",
            "id_7": "Ольга",
            "id_8": "Татьяна",
            "id_9": "Елена",
            "id_10": "Анна"
        }
    }`,

    GENDER_MALE: 'Мужчина',
    GENDER_FEMALE: 'Женщина',

    months:[
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь'
    ],

    daysInMonth: {
        'Январь': 31,
        'Февраль': 28,
        'Март': 31,
        'Апрель': 30,
        'Май': 31,
        'Июнь': 30,
        'Июль': 31,
        'Август': 31,
        'Сентябрь': 30,
        'Октябрь': 31,
        'Ноябрь': 30,
        'Декабрь': 31
    },

    professionsMale: ['Инженер', 'Врач', 'Учитель', 'Программист', 'Архитектор', 'Дизайнер', 'Медбрат', 'Солдат', 'Шахтер'],

    professionsFemale: ['Медсестра', 'Учительница', 'Дизайнер', 'Библиотекарь', 'Переводчик', 'Программист', 'Швея'],

    randomIntNumber: (max = 1, min = 0) => Math.floor(Math.random() * (max - min + 1) + min),

    randomValue: function (json) {
        const obj = JSON.parse(json);
        const prop = `id_${this.randomIntNumber(obj.count, 1)}`;
        return obj.list[prop];
    },

    randomFirstName: function (gender) {
        if (gender === this.GENDER_MALE) {
            return this.randomValue(this.firstNameMaleJson);
        } else if (gender === this.GENDER_FEMALE) {
            return this.randomValue(this.firstNameFemaleJson);
        }
    },

    randomSurname: function (gender) {
        const surname = this.randomValue(this.surnameJson);
        if (gender === this.GENDER_FEMALE) {
            return surname + 'а';
        }
        return surname;
    },

    randomGender: function () {
        const genderOptions = [this.GENDER_MALE, this.GENDER_FEMALE];
        const randomIndex = this.randomIntNumber(genderOptions.length - 1);
        return genderOptions[randomIndex];
    },

    randomBirthYear: function () {
        const currentYear = new Date().getFullYear();
        const minYear = currentYear - 100;
        const maxYear = currentYear - 10;
        return this.randomIntNumber(maxYear, minYear);
    },

    randomBirthMonth: function () {
        const monthIndex = this.randomIntNumber(11);
        return this.months[monthIndex];
    },

    randomBirthDay: function (birthMonth) {
        const maxDay = this.daysInMonth[birthMonth];
        return this.randomIntNumber(maxDay, 1);
    },

    randomProfession: function (gender) {
        const professions = (gender === this.GENDER_MALE) ? this.professionsMale : this.professionsFemale;
        const randomIndex = this.randomIntNumber(professions.length - 1);
        return professions[randomIndex];
    },

    randomPatronymic: function (gender) {
        let patronymic;
        if (gender === this.GENDER_MALE) {
            const maleName = this.randomFirstName(this.GENDER_MALE);
            const lastChar1 = maleName.charAt(maleName.length - 1).toLowerCase();
            if (lastChar1 === 'й' && maleName.length > 1) {
                suffix1 = 'евич';
                patronymic = `${maleName.substring(0, maleName.length - 1)}${suffix1}`;
            } else  if (lastChar1 === 'а' && maleName.length > 1) {
                suffix1 = 'ович';
                patronymic = `${maleName.substring(0, maleName.length - 1)}${suffix1}`
            } else {
                patronymic = `${maleName}ович`;
            }
        } else if (gender === this.GENDER_FEMALE) {
            const femaleName = this.randomFirstName(this.GENDER_MALE); // используем мужское имя
            const lastChar = femaleName.charAt(femaleName.length - 1).toLowerCase();
            let suffix = 'овна';
            if (lastChar === 'й' && femaleName.length > 1) {
                suffix = 'евна';
                patronymic = `${femaleName.substring(0, femaleName.length - 1)}${suffix}`;
            } else if (lastChar === 'а' && femaleName.length > 1) {
                patronymic = `${femaleName.substring(0, femaleName.length - 1)}${suffix}`;
            } else {
                patronymic = `${femaleName}${suffix}`;
            }
        } else {
            patronymic = '';
        }
        return patronymic;
    },

    getPerson: function () {
        const gender = this.randomGender();
        this.person = {};
        this.person.gender = gender;
        this.person.firstName = this.randomFirstName(gender);
        this.person.surname = this.randomSurname(gender);
        this.person.patronymic = this.randomPatronymic(gender);
        this.person.birthYear = this.randomBirthYear();
        this.person.birthMonth = this.randomBirthMonth();
        this.person.birthDay = this.randomBirthDay(this.person.birthMonth);
        this.person.profession = this.randomProfession(gender);
        return this.person;
    }
};