import { SHA256, encBase64 } from 'crypto-js';

export function decryptPassword({ salt, hash }, password) {
    const toCompareHash = SHA256(salt + password).toString(encBase64);
    if (hash === toCompareHash) {
        return true;
    }
    return false;
}
