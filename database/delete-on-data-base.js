import { pool } from './connection-data-base.js';

/**
 * Supprime l'user par id en cascade avec member, healthMember, performanceMember
 * @param {Number} idUser
 * @returns {object} user ?
 */
export async function deleteUserById(idUser) {
    const [result] = await pool.query('DELETE FROM user WHERE user.id = ?', [idUser]);
    return result;
}

/**
 * Supprime le membre par id en cascade avec healthMember, performanceMember
 * @param {Number} idMember
 * @returns
 */
export async function deleteMemberById(idMember) {
    const [result] = await pool.query('DELETE FROM member WHERE member.id = ?', [idMember]);
    return result;
}

/**
 * Supprime le training par id en cascade avec metricTraining, metricHealthTraining, metricOptionalTraining
 * @param {Number} idTraining
 * @returns
 */
export async function deleteTrainingById(idTraining) {
    const [result] = await pool.query('DELETE FROM training WHERE training.id = ?', [idTraining]);
    return result;
}

/**
 * Supprime les metrics training par id
 * @param {Number} idTraining
 * @returns
 */
export async function deleteMetricTrainingByIdTraining(idTraining) {
    const [result] = await pool.query(
        'DELETE FROM metricTraining WHERE metricTraining.idTraining = ?',
        [idTraining]
    );
    return result;
}

/**
 * Supprime les metricsHealth du training par id
 * @param {Number} idTraining
 * @returns
 */
export async function deleteMetricHealthTrainingByIdTraining(idTraining) {
    const [result] = await pool.query(
        'DELETE FROM metricHealthTraining WHERE metricHealthTraining.idTraining = ?',
        [idTraining]
    );
    return result;
}

/**
 * Supprime les metricsOptional du training par id
 * @param {Number} idTraining
 * @returns
 */
export async function deleteMetricOptionalTrainingByIdTraining(idTraining) {
    const [result] = await pool.execute(
        'DELETE FROM metricOptionalTraining WHERE metricOptionalTraining.idTraining = ?',
        [idTraining]
    );
    return result;
}

/**
 * Supprime la fonctionnalité par id
 * @param {Int} idFonctionnalite
 * @returns
 */
export async function deleteFonctionnaliteById(idFonctionnalite) {
    const [result] = await pool.execute(
        'DELETE FROM fonctionnalites WHERE fonctionnalites.id = ?',
        [idFonctionnalite]
    );
    return result;
}
