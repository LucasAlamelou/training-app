import { pool } from './connection-data-base.js';

/**
 * Créer un user dans la base de donnée
 * @param {String} email
 * @param {String} hash
 * @param {String} salt
 * @returns {Int}  id User
 */
async function createUser(email, hash, salt) {
    const [result] = await pool.query('INSERT INTO user (email, hash, salt) VALUES (?, ?)', [
        email,
        hash,
        salt,
    ]);
    return result;
}

/**
 * Créer un membre dans la base de donnée
 * @param {Int} idUser
 * @param {String} firstName
 * @param {String} lastName
 * @param {Date} dateOfBirth 1999-12-31
 * @param {String} adress
 * @param {String} city
 * @param {Int} zipCode
 * @param {String} country
 * @returns {Int} idMember
 */
async function createMember(
    idUser,
    firstName,
    lastName,
    dateOfBirth,
    adress,
    city,
    zipCode,
    country
) {
    const [result] = await pool.query(
        'INSERT INTO member (idUser, firstName, lastName, dateOfBirth, adress, city, zipCode, country) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [idUser, firstName, lastName, dateOfBirth, adress, city, zipCode, country]
    );
    return result;
}

/**
 * Créer une entrée dans la table healthMember
 * @param {Int} idMember
 * @param {Int} weight
 * @param {Int} height
 * @param {Time} hourSleep
 * @returns {Int} idHealthMember
 */
async function createHealthMember(idMember, weight, height, hourSleep) {
    const [result] = await pool.query(
        'INSERT INTO healthMember (memberId, weight, height, hourSleep) VALUES (?, ?, ?, ?)',
        [idMember, weight, height, hourSleep]
    );
    return result;
}

/**
 * Créer une entrée dans la table performanceMember
 * @param {Int} idMember
 * @param {Int} vo2max
 * @param {Int} seuilLactateFC
 * @param {String} seuilLactate
 * @param {Int} fcRest
 * @param {Int} fcMax
 * @param {Float} vma
 * @param {String} favoriteSport
 * @returns {Int} idPerformanceMember
 */
async function createPerformanceMember(
    idMember,
    vo2max,
    seuilLactateFC,
    seuilLactate,
    fcRest,
    fcMax,
    vma,
    favoriteSport
) {
    const [result] = await pool.query(
        'INSERT INTO performanceMember (memberId, vo2max, seuilLactateFC, seuilLactate, fcRest, fcMax, vma, favoriteSport) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [idMember, vo2max, seuilLactateFC, seuilLactate, fcRest, fcMax, vma, favoriteSport]
    );
    return result;
}

/**
 * Créer une entrée dans la table typeOfTraining
 * @param {String} nameTypeOfTraining
 * @returns  {Int} idTypeOfTraining
 */
async function createTypeOfTraining(nameTypeOfTraining) {
    const [result] = await pool.query('INSERT INTO typeOfTraining (name) VALUES (?)', [
        nameTypeOfTraining,
    ]);
    return result;
}

/**
 * Créer une entrée dans la table training
 * @param {String} name
 * @param {String} note
 * @param {Time} along
 * @param {String} city
 * @param {String} country
 * @param {Int} idTypeOfTraining
 * @returns {Int} idTraining
 */
async function createTraining(name, note, along, city, country, idTypeOfTraining) {
    const [result] = await pool.query(
        'INSERT INTO training (name, note, along, city, country, idTypeOfTraining) VALUES (?, ?, ?, ?, ?, ?)',
        [name, note, along, city, country, idTypeOfTraining]
    );
    return result;
}

/**
 * Créer une entrée dans la table metricTraining
 * @param {Float} km
 * @param {Time} moyPerKm
 * @param {Float} speedMoy
 * @param {Float} speedMax
 * @returns {Int} idMetricTraining
 */
async function createMetricTraining(km, moyPerKm, speedMoy, speedMax) {
    const [result] = await pool.query(
        'INSERT INTO metricTraining (km, moyPerKm, speedMoy, speedMax) VALUES (?, ?, ?, ?)',
        [km, moyPerKm, speedMoy, speedMax]
    );
    return result;
}

/**
 * Créer une entrée dans la table metricHealthTraining
 * @param {Int} fcMoy
 * @param {Int} fcMax
 * @returns {Int} idMetricHealthTraining
 */
async function createMetricHealthTraining(fcMoy, fcMax) {
    const [result] = await pool.query(
        'INSERT INTO metricHealthTraining (fcMoy, fcMax) VALUES (?, ?)',
        [fcMoy, fcMax]
    );
    return result;
}

/**
 * Créer une entrée dans la table metricOptionalTraining
 * @param {Int} hikeUp
 * @param {Int} hikeDown
 * @param {Int} cadenceMoy
 * @param {Int} cadenceMax
 * @param {Time} moyForSwim
 * @returns {Int} idMetricOptionalTraining
 */
async function createMetricOptionalTraining(hikeUp, hikeDown, cadenceMoy, cadenceMax, moyForSwim) {
    const [result] = await pool.query(
        'INSERT INTO metricOptionalTraining (hikeUp, hikeDown, cadenceMoy, cadenceMax, moyForSwim) VALUES (?, ?, ?, ?, ?)',
        [hikeUp, hikeDown, cadenceMoy, cadenceMax, moyForSwim]
    );
    return result;
}
