import uid2 from 'uid2';
import pkg from 'crypto-js';
const { SHA256, encBase64 } = pkg;

export function encryptPassword(password) {
    const salt = uid2(16);
    const hash = SHA256(salt + password).toString(encBase64);
    return { salt, hash };
}
