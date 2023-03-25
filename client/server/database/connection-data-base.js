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
 * Rêquete pour trouver l'user par id
 * @param {Number} idUser
 * @returns {object} user
 */
export async function getUserById(idUser) {
    const [result] = await pool.query('SELECT * FROM user WHERE user.id = ?', [idUser]);
    return result[0];
}

/**
 * Rêquete pour trouver l'user par email
 * @param {String} emailUser
 * @returns {object} user
 */
export async function getUserByEmail(emailUser) {
    const [result] = await pool.query(
        'SELECT * FROM user INNER JOIN member ON member.userId = user.id WHERE user.email = ?',
        [emailUser]
    );
    return result[0];
}

/**
 * Rêquete pour trouver le membre par email
 * @param {Int} emailUser
 * @returns {object} member
 */
export async function getMemberByEmail(emailUser) {
    const [result] = await pool.query(
        'SELECT * FROM user u INNER JOIN member m ON m.userId = u.id WHERE u.email = ?',
        [emailUser]
    );
    return result[0];
}
export async function getMemberById(idMember) {
    const [result] = await pool.query('SELECT * FROM member WHERE member.id = ?', [idMember]);
    return result[0];
}
/**
 * Rêquete rentourne tout les lignes des tables associées au membre par son id
 * Filtre : aucun
 * @param {Number} idMember
 * @returns {object} membre complet
 */
export async function getMemberCompletById(idMember) {
    const [result] = await pool.query(
        'SELECT * FROM member m LEFT JOIN performanceMember pm ON m.id = pm.memberId LEFT JOIN healthMember hm ON m.id = hm.memberId WHERE m.id = ? ',
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
        'SELECT * FROM training t LEFT JOIN typeOfTraining tp ON tp.id = t.idTypeOfTraining LEFT JOIN metricTraining mt ON mt.idTraining = t.id LEFT JOIN metricHealthTraining mht ON mht.idTraining = t.id LEFT JOIN metricOptionalTraining mot ON mot.idTraining = t.id WHERE t.idMember = ? ORDER BY t.date DESC',
        [idMember]
    );
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

/**
 * Requete pour récupèrer le training complet par id
 * @param {Number} idTraining
 * @returns {Array} row training complet
 */
export async function getTrainingCompletById(idTraining) {
    const [result] = await pool.query(
        'SELECT * FROM training t LEFT JOIN typeOfTraining tp ON tp.id = t.idTypeOfTraining LEFT JOIN metricTraining mt ON mt.idTraining = t.id LEFT JOIN metricHealthTraining mht ON mht.idTraining = t.id LEFT JOIN metricOptionalTraining mot ON mot.idTraining = t.id WHERE t.id = ? ',
        [idTraining]
    );
    return result[0];
}
/**
 * Requete pour récupèrer la liste des types d'entrainement
 * @returns {Array} row typeOfTraining
 */
export async function getAllTypeOfTraining() {
    const [result] = await pool.query('SELECT * FROM typeOfTraining');
    return result;
}

/**
 * Requete pour récupèrer les users
 * @returns {Array} row user [id, email, roles]
 */
export async function getUsers() {
    const [result] = await pool.query('SELECT id, email, roles FROM user');
    return result;
}

/**
 * Requete pour récupèrer les membres
 * @returns {Array} row member [id, userId, firstName, lastName, dateOfBirth]
 */
export async function getMembers() {
    const [result] = await pool.query(
        'SELECT id, userId, firstName, lastName, dateOfBirth, favoriteSport FROM member m LEFT JOIN performanceMember pm ON pm.memberId = m.id'
    );
    return result;
}
