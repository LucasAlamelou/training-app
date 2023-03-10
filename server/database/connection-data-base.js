import mysql from 'mysql2';
import * as dotenv from 'dotenv';
dotenv.config();

/**
 * Connection with pool Sql
 */
export const pool = mysql
    .createPool({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        waitForConnections: true,
        connectionLimit: 10,
        maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
        idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
        queueLimit: 0,
    })
    .promise();

/**
 * Test query
 */
export async function getSomething() {
    const [result] = await pool.query('SELECT * FROM clients');
    console.log(result);
    return result;
}

/**
 * Rêquete pour trouver l'user par id
 * @param {Number} idUser
 * @returns {object} user
 */
export async function getUserById(idUser) {
    const [result] = await pool.query('SELECT * FROM user WHERE user.id = ?', [idUser]);
    return result;
}

/**
 * Rêquete pour trouver l'user par email
 * @param {String} emailUser
 * @returns {object} user
 */
export async function getUserByEmail(emailUser) {
    const [result] = await pool.query('SELECT * FROM user WHERE user.email = ?', [emailUser]);
    return result[0];
}

/**
 * Rêquete rentourne tout les lignes des tables associées au membre par son id
 * Filtre : aucun
 * @param {Number} idMember
 * @returns {object} membre complet
 */
export async function getMemberById(idMember) {
    const [result] = await pool.query(
        'SELECT * FROM member m INNER JOIN performanceMember pm ON pm.memberId = m.id INNER JOIN healthMember hm ON hm.memberId = m.id WHERE m.id = ? ',
        [idMember]
    );
    return result[0];
}

/**
 * Rêquete rentourne tout les lignes des tables associées associées au training par id du membre
 * Filtre : aucun
 * @param {Number} idMember
 * @returns {Array}
 */
export async function getAllDataTrainingByMemberId(idMember) {
    const [result] = await pool.query(
        'SELECT * FROM training t INNER JOIN typeOfTraining tp ON tp.id = t.idTypeOfTraining INNER JOIN metricTraining mt ON mt.idTraining = t.id INNER JOIN metricHealthTraining mht ON mht.idTraining = t.id INNER JOIN metricOptionalTraining mot ON mot.idTraining = t.id WHERE t.idMember = ? ',
        [idMember]
    );
    console.log(result);
    return result;
}

/**
 * Rêquete rentourne les trainings du membre
 * Filtre : aucun
 * @param {Number} idTraining
 * @returns {Array} training par id du membre
 */
export async function getAllTrainingByMemberId(idMember) {
    const [result] = await pool.query('SELECT * FROM training t WHERE t.idMember = ? ', [idMember]);
    return result;
}

/**
 * Rêquete rentourne le training uniquement
 * Filtre : aucun
 * @param {Number} idTraining
 * @returns {Array} row training par id
 */
export async function getTrainingById(idTraining) {
    const [result] = await pool.query('SELECT * FROM training t WHERE t.id = ? ', [idTraining]);
    return result[0];
}
