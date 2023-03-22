import { pool } from './connection-data-base.js';

/**
 * Requete pour récupèrer le nombre total d'heure des d'entrainements par id du membre
 * Option : année et mois et jour
 * @param {Number} idMember
 * @param {Number} year format YYYY (optionnel)
 * @param {Number} month format MM (optionnel)
 * @param {Number} day format DD (optionnel)
 * @returns {object} row total_training_[all]_[year]_[month]_[day]
 */
export async function getSumTimeTrainingByMemberId(idMember, year, month, day) {
    if (year) {
        if (month) {
            if (day) {
                const [result] = await pool.query(
                    'SELECT SEC_TO_TIME( SUM( TIME_TO_SEC( along))) AS total_training_day from training where training.idMember = ? AND YEAR(date) = ? AND MONTH(date) = ? AND DAY(date) = ?',
                    [idMember, year, month, day]
                );
                return result[0];
            }
            const [result] = await pool.query(
                'SELECT SEC_TO_TIME( SUM( TIME_TO_SEC( along))) AS total_training_year_month from training where training.idMember = ? AND YEAR(date) = ? AND MONTH(date) = ?',
                [idMember, year, month]
            );
            return result[0];
        }
        const [result] = await pool.query(
            'SELECT SEC_TO_TIME( SUM( TIME_TO_SEC( along))) AS total_training_year from training where training.idMember = ? AND YEAR(date) = ?',
            [idMember, year]
        );
        return result[0];
    }
    const [result] = await pool.query(
        'SELECT SEC_TO_TIME( SUM( TIME_TO_SEC( along))) AS total_training_all_time from training where training.idMember = ?',
        [idMember]
    );
    return result[0];
}

/**
 * Requete pour récupèrer le nombre total de km des d'entrainements par id du membre
 * Ne filtre pas par type d'entrainement
 * Option : année et mois et jour
 * @param {Number} idMember id du membre
 * @param {Number} year format YYYY (optionnel)
 * @param {Number} month format MM (optionnel)
 * @param {Number} day format DD (optionnel)
 * @returns {object} row total_km_[all]_[year]_[month]_[day]
 */
export async function getSumDistanceTrainingByMemberId(idMember, year, month, day) {
    if (year) {
        if (month) {
            if (day) {
                const [result] = await pool.query(
                    'SELECT SUM(km) AS km_total_day FROM metricTraining mt INNER JOIN training t ON mt.idTraining = t.id WHERE t.idMember = ? AND YEAR(t.date) = ? AND MONTH(t.date) = ? AND DAY(t.date) = ?',
                    [idMember, year, month, day]
                );
                return result[0];
            }
            const [result] = await pool.query(
                'SELECT SUM(km) AS km_total_year_month FROM metricTraining mt INNER JOIN training t ON mt.idTraining = t.id WHERE t.idMember = ? AND YEAR(t.date) = ? AND MONTH(t.date) = ?',
                [idMember, year, month]
            );
            return result[0];
        }
        const [result] = await pool.query(
            'SELECT SUM(km) AS km_total_year FROM metricTraining mt INNER JOIN training t ON mt.idTraining = t.id WHERE t.idMember = ? AND YEAR(t.date) = ?',
            [idMember, year]
        );
        return result[0];
    }
    const [result] = await pool.query(
        'SELECT SUM(km) AS km_total_all FROM metricTraining mt INNER JOIN training t ON mt.idTraining = t.id WHERE t.idMember = ?',
        [idMember]
    );
    return result[0];
}

/**
 * Requete pour récupèrer la moyenne fréquence cardiaque des d'entrainements par id du membre
 * Option : année et mois et jour
 * @param {Number} idMember id du membre
 * @param {Number} year format YYYY (optionnel)
 * @param {Number} month format MM (optionnel)
 * @param {Number} day format DD (optionnel)
 * @returns {object} row fc_moy_[all]_[year]_[month]_[day
 */
export async function getMoyFcTrainingByMemberId(idMember, year, month, day) {
    if (year) {
        if (month) {
            if (day) {
                const [result] = await pool.query(
                    'SELECT AVG(fcMoy) AS fc_moy_day FROM metricHealthTraining mht INNER JOIN training t ON mht.idTraining = t.id WHERE t.idMember = ? AND YEAR(t.date) = ? AND MONTH(t.date) = ? AND DAY(t.date) = ?',
                    [idMember, year, month, day]
                );
                return result[0];
            }
            const [result] = await pool.query(
                'SELECT AVG(fcMoy) AS fc_moy_year_month FROM metricHealthTraining mht INNER JOIN training t ON mht.idTraining = t.id WHERE t.idMember = ? AND YEAR(t.date) = ? AND MONTH(t.date) = ?',
                [idMember, year, month]
            );
            return result[0];
        }
        const [result] = await pool.query(
            'SELECT AVG(fcMoy) AS fc_moy_year FROM metricHealthTraining mht INNER JOIN training t ON mht.idTraining = t.id WHERE t.idMember = ? AND YEAR(t.date) = ?',
            [idMember, year]
        );
        return result[0];
    }
    const [result] = await pool.query(
        'SELECT AVG(fcMoy) AS fc_moy_all FROM metricHealthTraining mht INNER JOIN training t ON mht.idTraining = t.id WHERE t.idMember = ?',
        [idMember]
    );
    return result[0];
}

/**
 * Requete pour récupèrer la moyenne de la vitesse des d'entrainements par id du membre
 * Option : année et mois et jour
 * @param {Number} idMember id du membre
 * @param {Number} year format YYYY (optionnel)
 * @param {Number} month format MM (optionnel)
 * @param {Number} day format DD (optionnel)
 * @returns {object} row speed_moy_[all]_[year]_[month]_[day]
 */
export async function getMoySpeedTrainingByMemberId(idMember, year, month, day) {
    if (year) {
        if (month) {
            if (day) {
                const [result] = await pool.query(
                    'SELECT AVG(speedMoy) AS speed_moy_day FROM metricTraining mt INNER JOIN training t ON mt.idTraining = t.id WHERE t.idMember = ? AND YEAR(t.date) = ? AND MONTH(t.date) = ? AND DAY(t.date) = ?',
                    [idMember, year, month, day]
                );
                return result[0];
            }
            const [result] = await pool.query(
                'SELECT AVG(speedMoy) AS speed_moy_year_month FROM metricTraining mt INNER JOIN training t ON mt.idTraining = t.id WHERE t.idMember = ? AND YEAR(t.date) = ? AND MONTH(t.date) = ?',
                [idMember, year, month]
            );
            return result[0];
        }
        const [result] = await pool.query(
            'SELECT AVG(speedMoy) AS speed_moy_year FROM metricTraining mt INNER JOIN training t ON mt.idTraining = t.id WHERE t.idMember = ? AND YEAR(t.date) = ?',
            [idMember, year]
        );
        return result[0];
    }
    const [result] = await pool.query(
        'SELECT AVG(speedMoy) AS speed_moy_all FROM metricTraining mt INNER JOIN training t ON mt.idTraining = t.id WHERE t.idMember = ?',
        [idMember]
    );
    return result[0];
}

/**
 * Requete pour récupèrer le max de la frequence cardiaque des d'entrainements par id du membre
 * Option : année et mois et jour
 * @param {Number} idMember id du membre
 * @param {Number} year format YYYY (optionnel)
 * @param {Number} month format MM (optionnel)
 * @param {Number} day format DD (optionnel)
 * @returns {object} row fc_max_[all]_[year]_[month]_[day
 */
export async function getFcMaxTrainingByMemberId(idMember, year, month, day) {
    if (year) {
        if (month) {
            if (day) {
                const [result] = await pool.query(
                    'SELECT MAX(fcMax) AS fc_max_day FROM metricHealthTraining mht INNER JOIN training t ON mht.idTraining = t.id WHERE t.idMember = ? AND YEAR(t.date) = ? AND MONTH(t.date) = ? AND DAY(t.date) = ?',
                    [idMember, year, month, day]
                );
                return result[0];
            }
            const [result] = await pool.query(
                'SELECT MAX(fcMax) AS fc_max_year_month FROM metricHealthTraining mht INNER JOIN training t ON mht.idTraining = t.id WHERE t.idMember = ? AND YEAR(t.date) = ? AND MONTH(t.date) = ?',
                [idMember, year, month]
            );
            return result[0];
        }
        const [result] = await pool.query(
            'SELECT MAX(fcMax) AS fc_max_year FROM metricHealthTraining mht INNER JOIN training t ON mht.idTraining = t.id WHERE t.idMember = ? AND YEAR(t.date) = ?',
            [idMember, year]
        );
        return result[0];
    }
    const [result] = await pool.query(
        'SELECT MAX(fcMax) AS fc_max_all FROM metricHealthTraining mht INNER JOIN training t ON mht.idTraining = t.id WHERE t.idMember = ?',
        [idMember]
    );
    return result[0];
}

/**
 * Requete pour récupèrer le dénivelé montant des d'entrainements par id du membre
 * Option : année et mois et jour
 * @param {Number} idMember id du membre
 * @param {Number} year format YYYY (optionnel)
 * @param {Number} month format MM (optionnel)
 * @param {Number} day format DD (optionnel)
 * @returns {object} row hike_up_[all]_[year]_[month]_[day]
 */
export const getHikeUpTrainingByMemberId = async (idMember, year, month, day) => {
    if (year) {
        if (month) {
            if (day) {
                const [result] = await pool.query(
                    'SELECT SUM(hikeUp) AS hike_up_day FROM metricOptionalTraining mt LEFT JOIN training t ON  t.id = mt.idTraining WHERE t.idMember = ? AND YEAR(t.date) = ? AND MONTH(t.date) = ? AND DAY(t.date) = ?',
                    [idMember, year, month, day]
                );
                return result[0];
            }
            const [result] = await pool.query(
                'SELECT SUM(hikeUp) AS hike_up_year_month FROM metricOptionalTraining mt LEFT JOIN training t ON  t.id = mt.idTraining WHERE t.idMember = ? AND YEAR(t.date) = ? AND MONTH(t.date) = ?',
                [idMember, year, month]
            );
            return result[0];
        }
        const [result] = await pool.query(
            'SELECT SUM(hikeUp) AS hike_up_year FROM metricOptionalTraining mt LEFT JOIN training t ON  t.id = mt.idTraining WHERE t.idMember = ? AND YEAR(t.date) = ?',
            [idMember, year]
        );
        return result[0];
    }
    const [result] = await pool.query(
        'SELECT SUM(hikeUp) AS hike_up_all FROM metricOptionalTraining mt LEFT JOIN training t ON  t.id = mt.idTraining WHERE t.idMember = ?',
        [idMember]
    );
    return result[0];
};

/**
 * Requete pour récupèrer le dénivelé descendant des d'entrainements par id du membre
 * Option : année et mois et jour
 * @param {Number} idMember id du membre
 * @param {Number} year format YYYY (optionnel)
 * @param {Number} month format MM (optionnel)
 * @param {Number} day format DD (optionnel)
 * @returns {object} row hike_down_[all]_[year]_[month]_[day]
 */
export const getHikeDownTrainingByMemberId = async (idMember, year, month, day) => {
    if (year) {
        if (month) {
            if (day) {
                const [result] = await pool.query(
                    'SELECT SUM(hikeDown) AS hike_down_day FROM metricOptionalTraining mt LEFT JOIN training t ON  t.id = mt.idTraining WHERE t.idMember = ? AND YEAR(t.date) = ? AND MONTH(t.date) = ? AND DAY(t.date) = ?',
                    [idMember, year, month, day]
                );
                return result[0];
            }
            const [result] = await pool.query(
                'SELECT SUM(hikeDown) AS hike_down_year_month FROM metricOptionalTraining mt LEFT JOIN training t ON  t.id = mt.idTraining WHERE t.idMember = ? AND YEAR(t.date) = ? AND MONTH(t.date) = ?',
                [idMember, year, month]
            );
            return result[0];
        }
        const [result] = await pool.query(
            'SELECT SUM(hikeDown) AS hike_down_year FROM metricOptionalTraining mt LEFT JOIN training t ON  t.id = mt.idTraining WHERE t.idMember = ? AND YEAR(t.date) = ?',
            [idMember, year]
        );
        return result[0];
    }
    const [result] = await pool.query(
        'SELECT SUM(hikeDown) AS hike_down_all FROM metricOptionalTraining mt LEFT JOIN training t ON  t.id = mt.idTraining WHERE t.idMember = ?',
        [idMember]
    );
    return result[0];
};
