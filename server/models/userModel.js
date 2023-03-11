export class User {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }

    setEmail(email) {
        if (typeof email !== 'string') {
            throw new Error('Email must be a string');
        }
        this.email = email;
    }
    getEmail() {
        return this._email;
    }
    setPassword(password) {
        console.log(password.length);
        if (password.length < 8) {
            throw new Error('Password must be a string and have at least 8 characters');
        }
        this.password = password;
    }
    getPassword() {
        return this.password;
    }
}
