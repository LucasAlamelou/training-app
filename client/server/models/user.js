export class User {
    constructor(email, password, roles) {
        this.email = email;
        this.password = password;
        this.roles = roles;
        this.hash = this.hash;
        this.salt = this.salt;
    }

    /**
     * Vérifie les champs de l'utilisateur
     * @returns {boolean} true si l'utilisateur est valide, false sinon
     */
    validate() {
        const emailValidator = new RegExp(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/i
        );
        const password = new RegExp(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
        );
        if (this.email === undefined || this.password === undefined) {
            return false;
        } else if (this.email === '' || this.password === '') {
            return false;
        } else if (this.email.length > 50 || this.password.length > 50) {
            return false;
        } else if (!emailValidator.test(this.email)) {
            return false;
        } else if (!password.test(this.password)) {
            return false;
        }
        return true;
    }
    setEmail(email) {
        this.email = email;
    }
    getEmail() {
        return this._email;
    }
    setPassword(password) {
        this.password = password;
    }
    getPassword() {
        return this.password;
    }
    setHash(hash) {
        this.hash = hash;
    }
    getHash() {
        return this.hash;
    }
    setSalt(salt) {
        this.salt = salt;
    }
    getSalt() {
        return this.salt;
    }
    setRoles(roles) {
        this.roles = roles;
    }
    getRoles() {
        return this.roles;
    }
}
