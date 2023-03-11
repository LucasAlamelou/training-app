import pkg from 'crypto-js';
const { SHA256, encBase64 } = pkg;

export function decryptPassword(salt, hash, password) {
    const toCompareHash = SHA256(salt + password).toString(encBase64);
    if (hash === toCompareHash) {
        return true;
    }
    return false;
}
