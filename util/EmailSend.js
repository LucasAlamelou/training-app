import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { TemplateRegisterEmail } from './TemplateRegisterEmail.js';
dotenv.config({ path: '../.env' }); // TODO : à changer en ../.env

let transporter = nodemailer.createTransport({
    //host: 'smtp.gmail.com',
    //port: 587, // 587 -> TLS & 465 -> SSL
    service: 'gmail',
    auth: {
        user: process.env.AUTH_GMAIL_USER, // email de votre votre compte google
        pass: process.env.AUTH_GMAIL_PASSWORD, // password de votre compte google
    },
});

export function sendEmailTest() {
    const mailOptions = {
        from: process.env.AUTH_GMAIL_SENDER,
        to: 'lucas.alamelou@gmail.com',
        subject: 'Test email',
        html: TemplateRegisterEmail('Lucas', 'Alamelou'),
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            // do something useful
        }
    });
}

/**
 * Envoie un email de confirmation d'inscription
 * @param {String} token
 * @param {Object} user object with email, password, firstname, lastname
 * @returns {Boolean} true if success, false if error
 */
export function sendConfirmationRegister(token, user) {
    const mailOptions = {
        from: process.env.AUTH_GMAIL_SENDER,
        to: user.email, // process.env.AUTH_GMAIL_SENDER for test
        subject: "Confimation d'inscription à Training App",
        html: TemplateRegisterEmail(token, user.firstName, user.lastName),
    };
    return transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(`Error sending email to ${user.email}. Error : ${error}`);
            return false;
        } else {
            console.log(`Email register sent to ${user.email} :  ${info.response}`);
            // do something useful
            return true;
        }
    });
}

export function testConnection() {
    transporter.verify(function (error, success) {
        if (error) {
            console.log(`Error server not ready to take our messages. Error : ${error}`);
        } else {
            console.log(`Server is ready to take our messages. Success : ${success}`);
        }
    });
}
