export const getListYear = () => {
    const listYear = [];
    listYear.push({ id: '', name: 'Tous' });
    for (let i = new Date().getFullYear(); i >= 2000; i--) {
        listYear.push({ id: i, name: i });
    }
    return listYear;
};

export const getListMonth = () => {
    const listMonth = [];
    listMonth.push({ id: '', name: 'Tous' });
    const monthLetter = [
        'Jan',
        'Fev',
        'Mar',
        'Avr',
        'Mai',
        'Juin',
        'Juil',
        'Aout',
        'Sept',
        'Oct',
        'Nov',
        'Dec',
    ];
    for (let i = 1; i <= 12; i++) {
        listMonth.push({ id: i, name: monthLetter[i - 1] });
    }
    return listMonth;
};

export const getListDay = (month, year) => {
    const listDay = [];
    const month30 = [4, 6, 9, 11];
    const month31 = [1, 3, 5, 7, 8, 10, 12];
    const month28 = [2];
    let nbDay = 0;
    if (month30.includes(month)) {
        nbDay = 30;
    } else if (month31.includes(month)) {
        nbDay = 31;
    } else if (month28.includes(month)) {
        if (year % 4 === 0) {
            nbDay = 29;
        } else {
            nbDay = 28;
        }
    }
    listDay.push({ id: '', name: 'Tous' });
    for (let i = 1; i <= nbDay; i++) {
        listDay.push({ id: i, name: i });
    }
    return listDay;
};

export const convertDateToFrenchDate = (date) => {
    const dateForConvert = new Date(date);
    if (dateForConvert.toString() === 'Invalid Date') {
        return null;
    }
    const day = dateForConvert.getDate();
    const month = dateForConvert.getMonth() + 1;
    const year = dateForConvert.getFullYear();
    const dateConverted = `${day}/${month}/${year}`;
    return dateConverted;
};

export const convertFrenchDateToDataBase = (date) => {
    const dateForConvert = date.split('/');
    if (dateForConvert.length !== 3 || dateForConvert[2].length !== 4) {
        return null;
    }
    const day = dateForConvert[0];
    const month = dateForConvert[1];
    const year = dateForConvert[2];
    const dateConverted = `${year}-${month}-${day}`;
    return dateConverted;
};

export const validateIsDate = (date) => {
    console.log(date);
    const dateForValidate = new Date(date);
    if (dateForValidate.toString() === 'Invalid Date') {
        return false;
    }
    console.log(dateForValidate);
    if (dateForValidate > new Date()) {
        return false;
    }
    return true;
};

export const isFrenchDate = (date) => {
    const dateForValidate = date.split('/');
    if (dateForValidate.length !== 3 || dateForValidate[2].length !== 4) {
        return false;
    }
    return true;
};
