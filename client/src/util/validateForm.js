const LENGTH_MAX = 30;
const LENGTH_MIN = 3;

export const validateForm = (donnesForm) => {
    const LENGTH_MAX_ZIPCODE = 5;

    const regexExp_EMAIL = new RegExp(
        // eslint-disable-next-line
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/i
    );
    const regexExp_PASSWORD = new RegExp(
        // eslint-disable-next-line
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/
    );

    const { email, password, lastName, firstName, dateOfBirth, address, city, zipCode, country } =
        donnesForm;
    const errors = {};
    if (
        typeof email !== 'string' ||
        !email.includes('@') ||
        !email.includes('.') ||
        email === '' ||
        !regexExp_EMAIL.test(email)
    ) {
        errors.email = 'Veuillez saisir une adresse email valide !';
    }
    if (typeof password !== 'string' || !regexExp_PASSWORD.test(password)) {
        if (password.length < 6) {
            errors.password = 'Veuillez saisir un mot de passe supérieur à 6 caractères !';
        } else {
            errors.password =
                'Veuillez saisir un mot de passe avec au moins 1 caractère spéciaux, un chiffre, une majuscule !';
        }
    }
    if (
        lastName !== undefined ||
        firstName !== undefined ||
        dateOfBirth !== undefined ||
        address !== undefined ||
        city !== undefined ||
        zipCode !== undefined ||
        country !== undefined
    ) {
        if (typeof lastName !== 'string' || lastName === '' || lastName.length > LENGTH_MAX) {
            errors.lastName = 'Veuillez saisir un nom de famille !';
        }
        if (typeof firstName !== 'string' || firstName === '' || firstName.length > LENGTH_MAX) {
            errors.firstName = 'Veuillez saisir un prénom !';
        }
        const dateOfBirthForValidate = dateOfBirth !== '' ? new Date(dateOfBirth) : '';
        if (typeof dateOfBirthForValidate !== 'object' || dateOfBirthForValidate === null) {
            errors.dateOfBirth = 'Veuillez saisir une date de naissance !';
        }
        if (
            typeof address !== 'string' ||
            address.length > LENGTH_MAX ||
            address.length < LENGTH_MIN
        ) {
            errors.address = 'Veuillez saisir une adresse valide!';
        }
        if (typeof city !== 'string' || city.length > LENGTH_MAX) {
            errors.city = 'Veuillez saisir une ville valide!';
        }
        const zipCodeForValidate = zipCode !== '' ? parseInt(zipCode) : '';
        if (
            typeof zipCodeForValidate !== 'number' ||
            zipCodeForValidate.length > LENGTH_MAX_ZIPCODE
        ) {
            errors.zipCode = 'Veuillez saisir un code postal valide!';
        }
        if (
            typeof country !== 'string' ||
            country.length > LENGTH_MAX ||
            country.length < LENGTH_MIN
        ) {
            errors.country = 'Veuillez saisir un pays valide!';
        }
    }

    return errors;
};

export const validateFormTraining = (donnesForm) => {
    console.log(donnesForm);
    const {
        name,
        idTypeOfTraining,
        along,
        city,
        country,
        note,
        km,
        moyPerKm,
        speedMoy,
        speedMax,
        fcMoy,
        fcMax,
        hikeUp,
        hikeDown,
        cadenceMoy,
        cadenceMax,
        moyForSwim,
    } = donnesForm;
    const errors = {};
    if (typeof name !== 'string' || name === '') {
        errors.name = 'Veuillez saisir un nom de séance !';
    }
    if (typeof idTypeOfTraining !== 'string' || idTypeOfTraining === '') {
        errors.typeOfTraining = 'Veuillez selectionner un type de séance !';
    }
    const alongForValidate = along !== '' ? new Date(along) : '';
    if (typeof alongForValidate !== 'object' && along !== null) {
        errors.along = 'Veuillez saisir une durée !';
    }
    if ((typeof city !== 'string' || city.length > LENGTH_MAX) && city !== null) {
        errors.city = 'Veuillez saisir une ville valide !';
    }
    if ((typeof country !== 'string' || country.length > LENGTH_MAX) && country !== null) {
        errors.country = 'Veuillez saisir un pays !';
    }
    if ((typeof note !== 'string' || note.length > 300) && note !== null) {
        errors.note = 'Veuillez saisir une note ne depassant pas 300 caractères!';
    }
    const kmForValidate = km !== '' ? parseInt(km) : '';
    if (typeof kmForValidate !== 'number' && km !== null) {
        errors.km = 'Veuillez saisir un nombre de km valide !';
    }
    const moyPerKmForValidate = moyPerKm !== '' ? parseInt(moyPerKm) : '';
    if (typeof moyPerKmForValidate !== 'number' && moyPerKm !== null) {
        errors.moyPerKm = 'Veuillez saisir une moyenne par km valide !';
    }
    const speedMoyForValidate = speedMoy !== '' ? parseInt(speedMoy) : '';
    if (typeof speedMoyForValidate !== 'number' && speedMoy !== null) {
        errors.speedMoy = 'Veuillez saisir une vitesse moyenne valide !';
    }
    const speedMaxForValidate = speedMax !== '' ? parseInt(speedMax) : '';
    if (typeof speedMaxForValidate !== 'number' && speedMax !== null) {
        errors.speedMax = 'Veuillez saisir une vitesse max valide !';
    }
    const fcMoyForValidate = fcMoy !== '' ? parseInt(fcMoy) : '';
    if ((typeof fcMoyForValidate !== 'number' || fcMoyForValidate > 230) && fcMoy !== null) {
        errors.fcMoy = 'Veuillez saisir une fréquence cardiaque moyenne valide !';
    }
    const fcMaxForValidate = fcMax !== '' ? parseInt(fcMax) : '';
    if ((typeof fcMaxForValidate !== 'number' || fcMaxForValidate > 230) && fcMax !== null) {
        errors.fcMax = 'Veuillez saisir une fréquence cardiaque max valide !';
    }
    const hikeUpForValidate = hikeUp !== '' ? parseInt(hikeUp) : '';
    if ((typeof hikeUpForValidate !== 'number' || hikeUpForValidate > 100000) && hikeUp !== null) {
        errors.hikeUp = 'Veuillez saisir un dévivelé valide !';
    }
    const hikeDownForValidate = hikeDown !== '' ? parseInt(hikeDown) : '';
    if (
        (typeof hikeDownForValidate !== 'number' || hikeDownForValidate > 100000) &&
        hikeDown !== null
    ) {
        errors.hikeDown = 'Veuillez saisir un dévivelé valide !';
    }
    const cadenceMoyForValidate = cadenceMoy !== '' ? parseInt(cadenceMoy) : '';
    if (
        (typeof cadenceMoyForValidate !== 'number' || cadenceMoyForValidate > 300) &&
        cadenceMoy !== null
    ) {
        errors.cadenceMoy = 'Veuillez saisir une cadence moyenne valide !';
    }
    const cadenceMaxForValidate = cadenceMax !== '' ? parseInt(cadenceMax) : '';
    if (
        (typeof cadenceMaxForValidate !== 'number' || cadenceMaxForValidate > 300) &&
        cadenceMax !== null
    ) {
        errors.cadenceMax = 'Veuillez saisir une cadence max valide !';
    }
    const moyForSwimForValidate = moyForSwim !== '' ? new Date(moyForSwim) : '';
    if (typeof moyForSwimForValidate !== 'object' && moyForSwim !== null) {
        errors.moyForSwim = 'Veuillez saisir une moyenne valide !';
    }
    return errors;
};
