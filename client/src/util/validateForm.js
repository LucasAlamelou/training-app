export const validateForm = (donnesForm) => {
    const LENGTH_MAX = 30;
    const LENGTH_MIN = 3;
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
