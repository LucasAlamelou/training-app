import { pool } from './connection-data-base.js';

/**
 * Update l'user par id sans password
 * @param {Number} idUser
 * @param {String} email
 * @returns
 */
export async function updateUserById(idUser, email) {
    const [result] = await pool.execute('UPDATE user SET email = ? WHERE user.id = ?', [
        email,
        idUser,
    ]);
    return result;
}

/**
 * Modification du mot de passe de l'user par id
 * @param {Int} idUser
 * @param {String} hash
 * @param {String} salt
 * @returns
 */
export async function updateUserPasswordById(idUser, hash, salt) {
    const [result] = await pool.execute('UPDATE user SET hash = ?, salt = ? WHERE user.id = ?', [
        hash,
        salt,
        idUser,
    ]);
    return result;
}

/**
 * Update le membre par id
 * @param {Int} idMember
 * @param {String} firstName
 * @param {String} lastName
 * @param {Date} dateOfBirth 1999-12-31
 * @param {String} adress
 * @param {String} city
 * @param {Int} zipCode
 * @param {String} country
 * @returns
 */
export async function updateMemberById(
    idMember,
    firstName,
    lastName,
    dateOfBirth,
    adress,
    city,
    zipCode,
    country
) {
    const [result] = await pool.execute(
        'UPDATE member SET firstName = ?, lastName = ?, dateOfBirth = ?, adress = ?, city = ?, zipCode = ?, country = ? WHERE member.id = ?',
        [firstName, lastName, dateOfBirth, adress, city, zipCode, country, idMember]
    );
    return result;
}

/**
 * Update le healthMember par idMember
 * @param {Int} idMember
 * @param {Int} weight
 * @param {Int} height
 * @param {Time} hourSleep 00:00:00
 * @returns
 */
export async function updateHealthMemberByIdMember(idMember, weight, height, hourSleep) {
    const [result] = await pool.execute(
        'UPDATE healthMember SET weight = ?, height = ?, hourSleep = ? WHERE healthMember.memberId = ?',
        [weight, height, hourSleep, idMember]
    );
    return result;
}

/**
 * Update le performanceMember par idMember
 * @param {Int} idMember
 * @param {Int} vo2max
 * @param {Int} seuilLactateFC
 * @param {String} seuilLactate
 * @param {Int} fcRest
 * @param {Int} fcMax
 * @param {Int} vma
 * @param {String} favoriteSport
 * @returns
 */
export async function updatePerformanceMemberByIdMember(
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
        'UPDATE performanceMember SET vo2max = ?, seuilLactateFC = ?, seuilLactate = ?, fcRest = ?, fcMax = ?, vma = ?, favoriteSport = ?  WHERE performanceMember.memberId = ?',
        [vo2max, seuilLactateFC, seuilLactate, fcRest, fcMax, vma, favoriteSport, idMember]
    );
    return result;
}

/**
 * Update le training par id
 * @param {Int} idTraining
 * @param {String} name
 * @param {String} note
 * @param {Time} along 00:00:00
 * @param {String} city
 * @param {String} country
 * @param {Date} dateTraining 1999-12-31
 * @param {Int} idTypeOfTraining
 * @returns
 */
export async function updateTrainingById(
    idTraining,
    name,
    note,
    along,
    city,
    country,
    dateTraining,
    idTypeOfTraining
) {
    const [result] = await pool.execute(
        'UPDATE training SET name = ?, note = ?, along = ?, city = ?, country = ?, date = ? ,idTypeOfTraining = ? WHERE training.id = ?',
        [name, note, along, city, country, dateTraining, idTypeOfTraining, idTraining]
    );
    return result;
}

/**
 * Update le metricTraining par idTraining
 * @param {Int} idTraining
 * @param {Float} km
 * @param {Time} moyPerKm 00:00:00
 * @param {Float} speedMoy
 * @param {Float} speedMax
 * @returns
 */
export async function updateMetricTrainingByIdTraining(
    idTraining,
    km,
    moyPerKm,
    speedMoy,
    speedMax
) {
    const [result] = await pool.execute(
        'UPDATE metricTraining SET km = ?, moyPerKm = ?, speedMoy = ?, speedMax = ? WHERE metricTraining.idTraining = ?',
        [km, moyPerKm, speedMoy, speedMax, idTraining]
    );
    return result;
}

/**
 * Update le metricHealthTraining par idTraining
 * @param {Int} idTraining
 * @param {Int} fcMoy
 * @param {Int} fcMax
 * @returns
 */
export async function updateMetricHealthTrainingByIdTraining(idTraining, fcMoy, fcMax) {
    const [result] = await pool.execute(
        'UPDATE metricHealthTraining SET fcMoy = ?, fcMax = ? WHERE metricHealthTraining.idTraining = ?',
        [fcMoy, fcMax, idTraining]
    );
    return result;
}

/**
 * Update le metricOptionalTraining par idTraining
 * @param {Int} idTraining
 * @param {Int} hikeUp
 * @param {Int} hikeDown
 * @param {Int} cadenceMoy
 * @param {Int} cadenceMax
 * @param {Time} moyForSwim 00:00:00
 * @returns
 */
export async function updateMetricOptionalTraining(
    idTraining,
    hikeUp,
    hikeDown,
    cadenceMoy,
    cadenceMax,
    moyForSwim
) {
    const [result] = await pool.execute(
        'UPDATE metricOptionalTraining SET hikeUp = ?, hikeDown = ?, cadenceMoy = ?, cadenceMax = ?, moyForSwim = ? WHERE metricOptionalTraining.idTraining = ?',
        [hikeUp, hikeDown, cadenceMoy, cadenceMax, moyForSwim, idTraining]
    );
    return result;
}

/**
 * Update une fonctionnalité par son id
 * @param {Int} idFonctionnalite
 * @param {String[Text]} name
 * @param {String[Text]} description
 * @param {Date} updateDate
 * @returns
 */
export async function updateFonctionnaliteById(
    idFonctionnalite,
    name,
    description,
    updateDate,
    isActive
) {
    const [result] = await pool.execute(
        'UPDATE fonctionnalites SET name = ?, description = ?, updateDate = ?, isActive = ? WHERE fonctionnalites.id = ?',
        [name, description, updateDate, isActive, idFonctionnalite]
    );
    return result;
}

/**
 * Update le isActive d'une fonctionnalité par son id
 * @param {Int} idFonctionnalite
 * @param {Boolean} isActive
 * @param {Date} updateDate
 * @returns
 */
export async function updateFonctionnaliteActiveById(idFonctionnalite, isActive, updateDate) {
    const [result] = await pool.execute(
        'UPDATE fonctionnalites SET isActive = ?, updateDate = ? WHERE fonctionnalites.id = ?',
        [isActive, updateDate, idFonctionnalite]
    );
    return result;
}
