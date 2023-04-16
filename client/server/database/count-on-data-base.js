import { pool } from './connection-data-base.js';

export async function countTrainingByMemberId(idMember) {
    const [result] = await pool.execute(
        'SELECT COUNT(*) AS nbTraining FROM training WHERE idMember = ?',
        [idMember]
    );
    return result[0];
}
