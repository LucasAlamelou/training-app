import { pool } from './connection-data-base.js';

/**
 * Créer un user dans la base de donnée
 * Roles par défaut : ROLE_USER
 * @param {String} email
 * @param {String} hash
 * @param {String} salt
 * @returns {Int}  id User
 */
export async function createUser({ email, hash, salt }) {
    const [result] = await pool.execute(
        'INSERT INTO user (email, hash, salt, roles) VALUES (?, ?, ?, \'["ROLE_USER"]\')',
        [email, hash, salt]
    );
    return result.insertId;
}

/**
 * Créer un membre dans la base de donnée
 * @param {Int} userId
 * @param {String} firstName
 * @param {String} lastName
 * @param {Date} dateOfBirth 1999-12-31
 * @param {String} adress
 * @param {String} city
 * @param {Int} zipCode
 * @param {String} country
 * @returns {Int} idMember
 */
export async function createMember({
    userId,
    firstName,
    lastName,
    dateOfBirth,
    adress,
    city,
    zipCode,
    country,
}) {
    const [result] = await pool.execute(
        'INSERT INTO member (userId, firstName, lastName, dateOfBirth, adress, city, zipCode, country) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [userId, firstName, lastName, dateOfBirth, adress, city, zipCode, country]
    );
    return result.insertId;
}

/**
 * Créer une entrée dans la table healthMember
 * @param {Int} idMember
 * @param {Int} weight
 * @param {Int} height
 * @param {Time} hourSleep
 * @returns {Int} idHealthMember
 */
export async function createHealthMember(idMember, weight, height, hourSleep) {
    const [result] = await pool.execute(
        'INSERT INTO healthMember (memberId, weight, height, hourSleep) VALUES (?, ?, ?, ?)',
        [idMember, weight, height, hourSleep]
    );
    return result.insertId;
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
export async function createPerformanceMember(
    idMember,
    vo2max,
    seuilLactateFC,
    seuilLactate,
    fcRest,
    fcMax,
    vma,
    favoriteSport
) {
    const [result] = await pool.execute(
        'INSERT INTO performanceMember (memberId, vo2max, seuilLactateFC, seuilLactate, fcRest, fcMax, vma, favoriteSport) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [idMember, vo2max, seuilLactateFC, seuilLactate, fcRest, fcMax, vma, favoriteSport]
    );
    return result.insertId;
}

/**
 * Créer une entrée dans la table typeOfTraining
 * @param {String} nameTypeOfTraining
 * @returns  {Int} idTypeOfTraining
 */
export async function createTypeOfTraining(nameTypeOfTraining) {
    const [result] = await pool.execute('INSERT INTO typeOfTraining (nameSport) VALUES (?)', [
        nameTypeOfTraining,
    ]);
    return result.insertId;
}

/**
 * Créer une entrée dans la table training
 * @param {Int} idMember
 * @param {String} name
 * @param {String} note
 * @param {Time} along
 * @param {String} city
 * @param {String} country
 * @param {date} dateTraining 1999-12-31
 * @param {Int} idTypeOfTraining
 * @returns {Int} idTraining
 */
export async function createTraining(
    idMember,
    name,
    note,
    along,
    city,
    country,
    dateTraining,
    idTypeOfTraining
) {
    const [result] = await pool.execute(
        'INSERT INTO training (name, note, along, city, country, date, idTypeOfTraining, idMember) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [name, note, along, city, country, dateTraining, idTypeOfTraining, idMember]
    );
    return result.insertId;
}

/**
 * Créer une entrée dans la table metricTraining
 * @param {Float} km
 * @param {Time} moyPerKm
 * @param {Float} speedMoy
 * @param {Float} speedMax
 * @param {Int} idTraining
 * @returns {Int} idMetricTraining
 */
export async function createMetricTraining(km, moyPerKm, speedMoy, speedMax, idTraining) {
    const [result] = await pool.execute(
        'INSERT INTO metricTraining (km, moyPerKm, speedMoy, speedMax, idTraining) VALUES (?, ?, ?, ?, ?)',
        [km, moyPerKm, speedMoy, speedMax, idTraining]
    );
    return result.insertId;
}

/**
 * Créer une entrée dans la table metricHealthTraining
 * @param {Int} fcMoy
 * @param {Int} fcMax
 * @param {Int} idTraining
 * @returns {Int} idMetricHealthTraining
 */
export async function createMetricHealthTraining(fcMoy, fcMax, idTraining) {
    const [result] = await pool.execute(
        'INSERT INTO metricHealthTraining (fcMoy, fcMax, idTraining) VALUES (?, ?, ?)',
        [fcMoy, fcMax, idTraining]
    );
    return result.insertId;
}

/**
 * Créer une entrée dans la table metricOptionalTraining
 * @param {Int} hikeUp
 * @param {Int} hikeDown
 * @param {Int} cadenceMoy
 * @param {Int} cadenceMax
 * @param {Time} moyForSwim
 * @param {Int} idTraining
 * @returns {Int} idMetricOptionalTraining
 */
export async function createMetricOptionalTraining(
    hikeUp,
    hikeDown,
    cadenceMoy,
    cadenceMax,
    moyForSwim,
    idTraining
) {
    const [result] = await pool.execute(
        'INSERT INTO metricOptionalTraining (hikeUp, hikeDown, cadenceMoy, cadenceMax, moyForSwim, idTraining) VALUES (?, ?, ?, ?, ?, ?)',
        [hikeUp, hikeDown, cadenceMoy, cadenceMax, moyForSwim, idTraining]
    );
    return result.insertId;
}

export async function createFonctionnalite(description, name, date, isActive) {
    const [result] = await pool.execute(
        'INSERT INTO fonctionnalites (description, name, date, isActive) VALUES (?, ?, ?, ?)',
        [description, name, date, isActive]
    );
    return result.insertId;
}
