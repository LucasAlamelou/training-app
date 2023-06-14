import CryptoJS from 'crypto-js';

/*const secretKey = 'votre_clé_secrète';
const encryptedToken = CryptoJS.AES.encrypt(token, secretKey).toString();

// Stockage du JWT crypté dans le localStorage
localStorage.setItem('encryptedJwt', encryptedToken);

// Récupération et déchiffrement du JWT depuis le localStorage
const encryptedToken = localStorage.getItem('encryptedJwt');
const decryptedBytes = CryptoJS.AES.decrypt(encryptedToken, secretKey);
const decryptedToken = decryptedBytes.toString(CryptoJS.enc.Utf8);*/

export const encryptToken = (token, secretKey) => {
    //const secretKey = window.env.REACT_APP_TOKEN_STOCKAGE_KEY_FRONT;
    const encryptedToken = CryptoJS.AES.encrypt(token, secretKey).toString();
    //localStorage.setItem('Application_Training_Token_Encrypt', encryptedToken);
    return encryptedToken;
};

export const encryptJson = (json, secretKey) => {
    const encryptedJson = CryptoJS.AES.encrypt(JSON.stringify(json), secretKey).toString();
    return encryptedJson;
};

export const getDecryptToken = (tokenCrypt, secretKey) => {
    //console.log('getDecryptToken', process.env.REACT_APP_TOKEN_STOCKAGE_KEY_FRONT);
    //const secretKey = window.env.REACT_APP_TOKEN_STOCKAGE_KEY_FRONT;
    if (tokenCrypt) {
        const decryptedBytes = CryptoJS.AES.decrypt(tokenCrypt, secretKey);
        const decryptedToken = decryptedBytes.toString(CryptoJS.enc.Utf8);
        return decryptedToken;
    }
    const encryptedToken = localStorage.getItem('Application_Training_Token_Encrypt');
    if (!encryptedToken) return null;
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedToken, secretKey);
    const decryptedToken = decryptedBytes.toString(CryptoJS.enc.Utf8);
    return decryptedToken;
};
