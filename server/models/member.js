export class Member {
    constructor(firstName, lastName, dateOfBirth, adress, zipCode, city, country) {
        this.userId = this.userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dateOfBirth = dateOfBirth;
        this.adress = adress;
        this.zipCode = zipCode;
        this.city = city;
        this.country = country;
    }
    validate() {
        const firstName = new RegExp(/^[a-zA-Z]+$/);
        const lastName = new RegExp(/^[a-zA-Z]+$/);
        const dateOfBirth = new RegExp(/^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/);
        const adress = new RegExp(/^[a-zA-Z0-9\s,'-]*$/);
        const zipCode = new RegExp(/^(?:0[1-9]|[1-8]\d|9[0-8])\d{3}$/i);
        const city = new RegExp(/^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/);
        const country = new RegExp(/^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/);
        let validation = true;
        if (
            this.firstName === undefined ||
            this.lastName === undefined ||
            this.dateOfBirth === undefined
        ) {
            validation = false;
        } else if (this.firstName === '' || this.lastName === '' || this.dateOfBirth === '') {
            validation = false;
        } else if (
            !firstName.test(this.firstName) ||
            !lastName.test(this.lastName) ||
            !dateOfBirth.test(this.dateOfBirth)
        ) {
            validation = false;
        } else if (this.adress != '') {
            if (!adress.test(this.adress)) {
                validation = false;
            }
        } else if (this.zipCode != '') {
            if (!zipCode.test(this.zipCode)) {
                validation = false;
            }
        } else if (this.city != '') {
            if (!city.test(this.city)) {
                validation = false;
            }
        } else if (this.country != '') {
            if (!country.test(this.country)) {
                validation = false;
            }
        }
        return validation;
    }
    setUserId(userId) {
        this.userId = userId;
    }
    getUserId() {
        return this.userId;
    }
    setFirstName(firstName) {
        this.firstName = firstName;
    }
    getFirstName() {
        return this.firstName;
    }
    setLastName(lastName) {
        this.lastName = lastName;
    }
    getLastName() {
        return this.lastName;
    }
    setDateOfBirth(dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }
    getDateOfBirth() {
        return this.dateOfBirth;
    }
    setAdress(adress) {
        this.adress = adress;
    }
    getAdress() {
        return this.adress;
    }
    setZipCode(zipCode) {
        this.zipCode = zipCode;
    }
    getZipCode() {
        return this.zipCode;
    }
    setCity(city) {
        this.city = city;
    }
    getCity() {
        return this.city;
    }
    setCountry(country) {
        this.country = country;
    }
    getCountry() {
        return this.country;
    }
}
