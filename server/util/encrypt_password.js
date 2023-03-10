import uid2 from 'uid2';
import { SHA256, encBase64 } from 'crypto-js';

export function encryptPassword(password) {
    const salt = uid2(16);
    const hash = SHA256(salt + password).toString(encBase64);
    return { salt, hash };
}
