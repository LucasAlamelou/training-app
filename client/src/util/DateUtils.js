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
