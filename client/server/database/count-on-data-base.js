import { pool } from './connection-data-base.js';

export async function countTrainingByMemberId(idMember) {
    const [result] = await pool.query('SELECT COUNT(*) AS count FROM training WHERE idMember = ?', [
        idMember,
    ]);
    return result[0];
}
