import { pool } from './connection-data-base.js';

/**
 * Requete pour récupèrer le nombre total d'heure des d'entrainements par id du membre
 * Option : année et mois et jour
 * @param {Number} idMember
 * @param {Number} year format YYYY (optionnel)
 * @param {Number} month format MM (optionnel)
 * @param {Number} day format DD (optionnel)
 * @param {Number} idTypeOfTraining (optionnel)
 * @returns {object} row total_training
 */
export async function getSumTimeTrainingByMemberId(idMember, year, month, day, idTypeOfTraining) {
    if (idTypeOfTraining) {
        if (year) {
            if (month) {
                if (day) {
                    const [result] = await pool.query(
                        'SELECT SEC_TO_TIME( SUM( TIME_TO_SEC( along))) AS total_training from training t where t.idMember = ? AND YEAR(date) = ? AND MONTH(date) = ? AND DAY(date) = ? AND t.idTypeOfTraining = ?',
                        [idMember, year, month, day, idTypeOfTraining]
                    );
                    return result[0];
                }
                const [result] = await pool.query(
                    'SELECT SEC_TO_TIME( SUM( TIME_TO_SEC( along))) AS total_training from training t where t.idMember = ? AND YEAR(date) = ? AND MONTH(date) = ? AND t.idTypeOfTraining = ?',
                    [idMember, year, month, idTypeOfTraining]
                );
                return result[0];
            }
            const [result] = await pool.query(
                'SELECT SEC_TO_TIME( SUM( TIME_TO_SEC( along))) AS total_training from training t where t.idMember = ? AND YEAR(date) = ? AND t.idTypeOfTraining = ?',
                [idMember, year, idTypeOfTraining]
            );
            return result[0];
        }
        const [result] = await pool.query(
            'SELECT SEC_TO_TIME( SUM( TIME_TO_SEC( along))) AS total_training from training t where t.idMember = ? AND t.idTypeOfTraining = ?',
            [idMember]
        );
        return result[0];
    } else {
        if (year) {
            if (month) {
                if (day) {
                    const [result] = await pool.query(
                        'SELECT SEC_TO_TIME( SUM( TIME_TO_SEC( along))) AS total_training from training t where t.idMember = ? AND YEAR(date) = ? AND MONTH(date) = ? AND DAY(date) = ? ',
                        [idMember, year, month, day]
                    );
                    return result[0];
                }
                const [result] = await pool.query(
                    'SELECT SEC_TO_TIME( SUM( TIME_TO_SEC( along))) AS total_training from training t where t.idMember = ? AND YEAR(date) = ? AND MONTH(date) = ?',
                    [idMember, year, month]
                );
                return result[0];
            }
            const [result] = await pool.query(
                'SELECT SEC_TO_TIME( SUM( TIME_TO_SEC( along))) AS total_training from training t where t.idMember = ? AND YEAR(date) = ?',
                [idMember, year]
            );
            return result[0];
        }
        const [result] = await pool.query(
            'SELECT SEC_TO_TIME( SUM( TIME_TO_SEC( along))) AS total_training from training t where t.idMember = ?',
            [idMember]
        );
        return result[0];
    }
}

/**
 * Requete pour récupèrer le nombre total de km des d'entrainements par id du membre
 * Ne filtre pas par type d'entrainement
 * Option : année et mois et jour
 * @param {Number} idMember id du membre
 * @param {Number} year format YYYY (optionnel)
 * @param {Number} month format MM (optionnel)
 * @param {Number} day format DD (optionnel)
 * @param {Number} idTypeOfTraining (optionnel)
 * @returns {object} row km_total
 */
export async function getSumDistanceTrainingByMemberId(
    idMember,
    year,
    month,
    day,
    idTypeOfTraining
) {
    if (idTypeOfTraining) {
        if (year) {
            if (month) {
                if (day) {
                    const [result] = await pool.query(
                        'SELECT SUM(km) AS km_total FROM metricTraining mt INNER JOIN training t ON mt.idTraining = t.id WHERE t.idMember = ? AND YEAR(t.date) = ? AND MONTH(t.date) = ? AND DAY(t.date) = ? AND t.idTypeOfTraining = ?',
                        [idMember, year, month, day, idTypeOfTraining]
                    );
                    return result[0];
                }

                const [result] = await pool.query(
                    'SELECT SUM(km) AS km_total FROM metricTraining mt INNER JOIN training t ON mt.idTraining = t.id WHERE t.idMember = ? AND YEAR(t.date) = ? AND MONTH(t.date) = ? AND t.idTypeOfTraining = ?',
                    [idMember, year, month, idTypeOfTraining]
                );
                return result[0];
            }

            const [result] = await pool.query(
                'SELECT SUM(km) AS km_total FROM metricTraining mt INNER JOIN training t ON mt.idTraining = t.id WHERE t.idMember = ? AND YEAR(t.date) = ? AND t.idTypeOfTraining = ?',
                [idMember, year, idTypeOfTraining]
            );
            return result[0];
        }

        const [result] = await pool.query(
            'SELECT SUM(km) AS km_total FROM metricTraining mt INNER JOIN training t ON mt.idTraining = t.id WHERE t.idMember = ? AND t.idTypeOfTraining = ?',
            [idMember, idTypeOfTraining]
        );
        return result[0];
    } else {
        if (year) {
            if (month) {
                if (day) {
                    const [result] = await pool.query(
                        'SELECT SUM(km) AS km_total FROM metricTraining mt INNER JOIN training t ON mt.idTraining = t.id WHERE t.idMember = ? AND YEAR(t.date) = ? AND MONTH(t.date) = ? AND DAY(t.date) = ?',
                        [idMember, year, month, day]
                    );
                    return result[0];
                }
                const [result] = await pool.query(
                    'SELECT SUM(km) AS km_total FROM metricTraining mt INNER JOIN training t ON mt.idTraining = t.id WHERE t.idMember = ? AND YEAR(t.date) = ? AND MONTH(t.date) = ?',
                    [idMember, year, month]
                );
                return result[0];
            }
            const [result] = await pool.query(
                'SELECT SUM(km) AS km_total FROM metricTraining mt INNER JOIN training t ON mt.idTraining = t.id WHERE t.idMember = ? AND YEAR(t.date) = ?',
                [idMember, year]
            );
            return result[0];
        }
        const [result] = await pool.query(
            'SELECT SUM(km) AS km_total FROM metricTraining mt INNER JOIN training t ON mt.idTraining = t.id WHERE t.idMember = ?',
            [idMember]
        );
        return result[0];
    }
}

/**
 * Requete pour récupèrer la moyenne fréquence cardiaque des d'entrainements par id du membre
 * Option : année et mois et jour
 * @param {Number} idMember id du membre
 * @param {Number} year format YYYY (optionnel)
 * @param {Number} month format MM (optionnel)
 * @param {Number} day format DD (optionnel)
 * @param {Number} idTypeOfTraining (optionnel)
 * @returns {object} row fc_moy_[all]_[year]_[month]_[day
 */
export async function getMoyFcTrainingByMemberId(idMember, year, month, day, idTypeOfTraining) {
    if (idTypeOfTraining) {
        if (year) {
            if (month) {
                if (day) {
                    const [result] = await pool.query(
                        'SELECT AVG(fcMoy) AS fc_moy FROM metricHealthTraining mht INNER JOIN training t ON mht.idTraining = t.id WHERE t.idMember = ? AND YEAR(t.date) = ? AND MONTH(t.date) = ? AND DAY(t.date) = ? AND t.idTypeOfTraining = ?',
                        [idMember, year, month, day, idTypeOfTraining]
                    );
                    return result[0];
                }

                const [result] = await pool.query(
                    'SELECT AVG(fcMoy) AS fc_moy FROM metricHealthTraining mht INNER JOIN training t ON mht.idTraining = t.id WHERE t.idMember = ? AND YEAR(t.date) = ? AND MONTH(t.date) = ? AND t.idTypeOfTraining = ?',
                    [idMember, year, month, idTypeOfTraining]
                );
                return result[0];
            }

            const [result] = await pool.query(
                'SELECT AVG(fcMoy) AS fc_moy FROM metricHealthTraining mht INNER JOIN training t ON mht.idTraining = t.id WHERE t.idMember = ? AND YEAR(t.date) = ? AND t.idTypeOfTraining = ?',
                [idMember, year, idTypeOfTraining]
            );
            return result[0];
        }
        const [result] = await pool.query(
            'SELECT AVG(fcMoy) AS fc_moy FROM metricHealthTraining mht INNER JOIN training t ON mht.idTraining = t.id WHERE t.idMember = ? AND t.idTypeOfTraining = ?',
            [idMember, idTypeOfTraining]
        );
        return result[0];
    } else {
        if (year) {
            if (month) {
                if (day) {
                    const [result] = await pool.query(
                        'SELECT AVG(fcMoy) AS fc_moy FROM metricHealthTraining mht INNER JOIN training t ON mht.idTraining = t.id WHERE t.idMember = ? AND YEAR(t.date) = ? AND MONTH(t.date) = ? AND DAY(t.date) = ?',
                        [idMember, year, month, day]
                    );
                    return result[0];
                }
                const [result] = await pool.query(
                    'SELECT AVG(fcMoy) AS fc_moy FROM metricHealthTraining mht INNER JOIN training t ON mht.idTraining = t.id WHERE t.idMember = ? AND YEAR(t.date) = ? AND MONTH(t.date) = ?',
                    [idMember, year, month]
                );
                return result[0];
            }
            const [result] = await pool.query(
                'SELECT AVG(fcMoy) AS fc_moy FROM metricHealthTraining mht INNER JOIN training t ON mht.idTraining = t.id WHERE t.idMember = ? AND YEAR(t.date) = ?',
                [idMember, year]
            );
            return result[0];
        }
        const [result] = await pool.query(
            'SELECT AVG(fcMoy) AS fc_moy FROM metricHealthTraining mht INNER JOIN training t ON mht.idTraining = t.id WHERE t.idMember = ?',
            [idMember]
        );
        return result[0];
    }
}

/**
 * Requete pour récupèrer la moyenne de la vitesse des d'entrainements par id du membre
 * Option : année et mois et jour
 * @param {Number} idMember id du membre
 * @param {Number} year format YYYY (optionnel)
 * @param {Number} month format MM (optionnel)
 * @param {Number} day format DD (optionnel)
 * @param {Number} idTypeOfTraining (optionnel)
 * @returns {object} row speed_moy
 */
export async function getMoySpeedTrainingByMemberId(idMember, year, month, day, idTypeOfTraining) {
    if (idTypeOfTraining) {
        if (year) {
            if (month) {
                if (day) {
                    const [result] = await pool.query(
                        'SELECT AVG(speedMoy) AS speed_moy FROM metricTraining mt INNER JOIN training t ON mt.idTraining = t.id WHERE t.idMember = ? AND YEAR(t.date) = ? AND MONTH(t.date) = ? AND DAY(t.date) = ? AND t.idTypeOfTraining = ?',
                        [idMember, year, month, day, idTypeOfTraining]
                    );
                    return result[0];
                }

                const [result] = await pool.query(
                    'SELECT AVG(speedMoy) AS speed_moy FROM metricTraining mt INNER JOIN training t ON mt.idTraining = t.id WHERE t.idMember = ? AND YEAR(t.date) = ? AND MONTH(t.date) = ? AND t.idTypeOfTraining = ?',
                    [idMember, year, month, idTypeOfTraining]
                );
                return result[0];
            }

            const [result] = await pool.query(
                'SELECT AVG(speedMoy) AS speed_moy FROM metricTraining mt INNER JOIN training t ON mt.idTraining = t.id WHERE t.idMember = ? AND YEAR(t.date) = ? AND t.idTypeOfTraining = ?',
                [idMember, year, idTypeOfTraining]
            );
            return result[0];
        }
        const [result] = await pool.query(
            'SELECT AVG(speedMoy) AS speed_moy FROM metricTraining mt INNER JOIN training t ON mt.idTraining = t.id WHERE t.idMember = ? AND t.idTypeOfTraining = ?',
            [idMember, idTypeOfTraining]
        );
        return result[0];
    } else {
        if (year) {
            if (month) {
                if (day) {
                    const [result] = await pool.query(
                        'SELECT AVG(speedMoy) AS speed_moy FROM metricTraining mt INNER JOIN training t ON mt.idTraining = t.id WHERE t.idMember = ? AND YEAR(t.date) = ? AND MONTH(t.date) = ? AND DAY(t.date) = ?',
                        [idMember, year, month, day]
                    );
                    return result[0];
                }
                const [result] = await pool.query(
                    'SELECT AVG(speedMoy) AS speed_moy FROM metricTraining mt INNER JOIN training t ON mt.idTraining = t.id WHERE t.idMember = ? AND YEAR(t.date) = ? AND MONTH(t.date) = ?',
                    [idMember, year, month]
                );
                return result[0];
            }
            const [result] = await pool.query(
                'SELECT AVG(speedMoy) AS speed_moy FROM metricTraining mt INNER JOIN training t ON mt.idTraining = t.id WHERE t.idMember = ? AND YEAR(t.date) = ?',
                [idMember, year]
            );
            return result[0];
        }
        const [result] = await pool.query(
            'SELECT AVG(speedMoy) AS speed_moy FROM metricTraining mt INNER JOIN training t ON mt.idTraining = t.id WHERE t.idMember = ?',
            [idMember]
        );
        return result[0];
    }
}

/**
 * Requete pour récupèrer le max de la frequence cardiaque des d'entrainements par id du membre
 * Option : année et mois et jour
 * @param {Number} idMember id du membre
 * @param {Number} year format YYYY (optionnel)
 * @param {Number} month format MM (optionnel)
 * @param {Number} day format DD (optionnel)
 * @param {Number} idTypeOfTraining (optionnel)
 * @returns {object} row fc_max_[all]_[year]_[month]_[day
 */
export async function getFcMaxTrainingByMemberId(idMember, year, month, day, idTypeOfTraining) {
    if (idTypeOfTraining) {
        if (year) {
            if (month) {
                if (day) {
                    const [result] = await pool.query(
                        'SELECT MAX(fcMax) AS fc_max FROM metricHealthTraining mht INNER JOIN training t ON mht.idTraining = t.id WHERE t.idMember = ? AND YEAR(t.date) = ? AND MONTH(t.date) = ? AND DAY(t.date) = ? AND t.idTypeOfTraining = ?',
                        [idMember, year, month, day, idTypeOfTraining]
                    );
                    return result[0];
                }

                const [result] = await pool.query(
                    'SELECT MAX(fcMax) AS fc_max FROM metricHealthTraining mht INNER JOIN training t ON mht.idTraining = t.id WHERE t.idMember = ? AND YEAR(t.date) = ? AND MONTH(t.date) = ? AND t.idTypeOfTraining = ?',
                    [idMember, year, month, idTypeOfTraining]
                );
                return result[0];
            }

            const [result] = await pool.query(
                'SELECT MAX(fcMax) AS fc_max FROM metricHealthTraining mht INNER JOIN training t ON mht.idTraining = t.id WHERE t.idMember = ? AND YEAR(t.date) = ? AND t.idTypeOfTraining = ?',
                [idMember, year, idTypeOfTraining]
            );
            return result[0];
        }
        const [result] = await pool.query(
            'SELECT MAX(fcMax) AS fc_max FROM metricHealthTraining mht INNER JOIN training t ON mht.idTraining = t.id WHERE t.idMember = ? AND t.idTypeOfTraining = ?',
            [idMember, idTypeOfTraining]
        );
        return result[0];
    } else {
        if (year) {
            if (month) {
                if (day) {
                    const [result] = await pool.query(
                        'SELECT MAX(fcMax) AS fc_max FROM metricHealthTraining mht INNER JOIN training t ON mht.idTraining = t.id WHERE t.idMember = ? AND YEAR(t.date) = ? AND MONTH(t.date) = ? AND DAY(t.date) = ?',
                        [idMember, year, month, day]
                    );
                    return result[0];
                }
                const [result] = await pool.query(
                    'SELECT MAX(fcMax) AS fc_max FROM metricHealthTraining mht INNER JOIN training t ON mht.idTraining = t.id WHERE t.idMember = ? AND YEAR(t.date) = ? AND MONTH(t.date) = ?',
                    [idMember, year, month]
                );
                return result[0];
            }
            const [result] = await pool.query(
                'SELECT MAX(fcMax) AS fc_max FROM metricHealthTraining mht INNER JOIN training t ON mht.idTraining = t.id WHERE t.idMember = ? AND YEAR(t.date) = ?',
                [idMember, year]
            );
            return result[0];
        }
        const [result] = await pool.query(
            'SELECT MAX(fcMax) AS fc_max FROM metricHealthTraining mht INNER JOIN training t ON mht.idTraining = t.id WHERE t.idMember = ?',
            [idMember]
        );
        return result[0];
    }
}

/**
 * Requete pour récupèrer le dénivelé montant des d'entrainements par id du membre
 * Option : année et mois et jour
 * @param {Number} idMember id du membre
 * @param {Number} year format YYYY (optionnel)
 * @param {Number} month format MM (optionnel)
 * @param {Number} day format DD (optionnel)
 * @returns {object} row hike_up
 */
export const getHikeUpTrainingByMemberId = async (idMember, year, month, day, idTypeOfTraining) => {
    if (idTypeOfTraining) {
        if (year) {
            if (month) {
                if (day) {
                    const [result] = await pool.query(
                        'SELECT SUM(hikeUp) AS hike_up FROM metricOptionalTraining mt LEFT JOIN training t ON  t.id = mt.idTraining WHERE t.idMember = ? AND YEAR(t.date) = ? AND MONTH(t.date) = ? AND DAY(t.date) = ? AND t.idTypeOfTraining = ?',
                        [idMember, year, month, day, idTypeOfTraining]
                    );
                    return result[0];
                }

                const [result] = await pool.query(
                    'SELECT SUM(hikeUp) AS hike_up FROM metricOptionalTraining mt LEFT JOIN training t ON  t.id = mt.idTraining WHERE t.idMember = ? AND YEAR(t.date) = ? AND MONTH(t.date) = ? AND t.idTypeOfTraining = ?',
                    [idMember, year, month, idTypeOfTraining]
                );
                return result[0];
            }

            const [result] = await pool.query(
                'SELECT SUM(hikeUp) AS hike_up FROM metricOptionalTraining mt LEFT JOIN training t ON  t.id = mt.idTraining WHERE t.idMember = ? AND YEAR(t.date) = ? AND t.idTypeOfTraining = ?',
                [idMember, year, idTypeOfTraining]
            );
            return result[0];
        }
        const [result] = await pool.query(
            'SELECT SUM(hikeUp) AS hike_up FROM metricOptionalTraining mt LEFT JOIN training t ON  t.id = mt.idTraining WHERE t.idMember = ? t.idTypeOfTraining = ?',
            [idMember, idTypeOfTraining]
        );
        return result[0];
    } else {
        if (year) {
            if (month) {
                if (day) {
                    const [result] = await pool.query(
                        'SELECT SUM(hikeUp) AS hike_up FROM metricOptionalTraining mt LEFT JOIN training t ON  t.id = mt.idTraining WHERE t.idMember = ? AND YEAR(t.date) = ? AND MONTH(t.date) = ? AND DAY(t.date) = ?',
                        [idMember, year, month, day]
                    );
                    return result[0];
                }

                const [result] = await pool.query(
                    'SELECT SUM(hikeUp) AS hike_up FROM metricOptionalTraining mt LEFT JOIN training t ON  t.id = mt.idTraining WHERE t.idMember = ? AND YEAR(t.date) = ? AND MONTH(t.date) = ?',
                    [idMember, year, month]
                );
                return result[0];
            }

            const [result] = await pool.query(
                'SELECT SUM(hikeUp) AS hike_up FROM metricOptionalTraining mt LEFT JOIN training t ON  t.id = mt.idTraining WHERE t.idMember = ? AND YEAR(t.date) = ?',
                [idMember, year]
            );
            return result[0];
        }
        const [result] = await pool.query(
            'SELECT SUM(hikeUp) AS hike_up FROM metricOptionalTraining mt LEFT JOIN training t ON  t.id = mt.idTraining WHERE t.idMember = ?',
            [idMember]
        );
        return result[0];
    }
};

/**
 * Requete pour récupèrer le dénivelé descendant des d'entrainements par id du membre
 * Option : année et mois et jour
 * @param {Number} idMember id du membre
 * @param {Number} year format YYYY (optionnel)
 * @param {Number} month format MM (optionnel)
 * @param {Number} day format DD (optionnel)
 * @param {Number} idTypeOfTraining id du type d'entrainement (optionnel)
 * @returns {object} row hike_down
 */
export const getHikeDownTrainingByMemberId = async (
    idMember,
    year,
    month,
    day,
    idTypeOfTraining
) => {
    if (idTypeOfTraining) {
        if (year) {
            if (month) {
                if (day) {
                    const [result] = await pool.query(
                        'SELECT SUM(hikeDown) AS hike_down FROM metricOptionalTraining mt LEFT JOIN training t ON  t.id = mt.idTraining WHERE t.idMember = ? AND YEAR(t.date) = ? AND MONTH(t.date) = ? AND DAY(t.date) = ? AND t.idTypeOfTraining = ?',
                        [idMember, year, month, day, idTypeOfTraining]
                    );
                    return result[0];
                }

                const [result] = await pool.query(
                    'SELECT SUM(hikeDown) AS hike_down FROM metricOptionalTraining mt LEFT JOIN training t ON  t.id = mt.idTraining WHERE t.idMember = ? AND YEAR(t.date) = ? AND MONTH(t.date) = ? AND t.idTypeOfTraining = ?',
                    [idMember, year, month, idTypeOfTraining]
                );
                return result[0];
            }

            const [result] = await pool.query(
                'SELECT SUM(hikeDown) AS hike_down FROM metricOptionalTraining mt LEFT JOIN training t ON  t.id = mt.idTraining WHERE t.idMember = ? AND YEAR(t.date) = ? AND t.idTypeOfTraining = ?',
                [idMember, year, idTypeOfTraining]
            );
            return result[0];
        }
        const [result] = await pool.query(
            'SELECT SUM(hikeDown) AS hike_down FROM metricOptionalTraining mt LEFT JOIN training t ON  t.id = mt.idTraining WHERE t.idMember = ? AND t.idTypeOfTraining = ?',

            [idMember, idTypeOfTraining]
        );
        return result[0];
    } else {
        if (year) {
            if (month) {
                if (day) {
                    const [result] = await pool.query(
                        'SELECT SUM(hikeDown) AS hike_down FROM metricOptionalTraining mt LEFT JOIN training t ON  t.id = mt.idTraining WHERE t.idMember = ? AND YEAR(t.date) = ? AND MONTH(t.date) = ? AND DAY(t.date) = ?',
                        [idMember, year, month, day]
                    );
                    return result[0];
                }

                const [result] = await pool.query(
                    'SELECT SUM(hikeDown) AS hike_down FROM metricOptionalTraining mt LEFT JOIN training t ON  t.id = mt.idTraining WHERE t.idMember = ? AND YEAR(t.date) = ? AND MONTH(t.date) = ?',
                    [idMember, year, month]
                );
                return result[0];
            }

            const [result] = await pool.query(
                'SELECT SUM(hikeDown) AS hike_down FROM metricOptionalTraining mt LEFT JOIN training t ON  t.id = mt.idTraining WHERE t.idMember = ? AND YEAR(t.date) = ?',
                [idMember, year]
            );
            return result[0];
        }
        const [result] = await pool.query(
            'SELECT SUM(hikeDown) AS hike_down FROM metricOptionalTraining mt LEFT JOIN training t ON  t.id = mt.idTraining WHERE t.idMember = ?',
            [idMember]
        );
        return result[0];
    }
};

/**
 * Requête qui récupere tout les paremetres du total des entrainemts d'un membre
 * @param {Number} idMember id du membre
 * @param {Number} year format YYYY (optionnel)
 * @param {Number} month format MM (optionnel)
 * @param {Number} day format DD (optionnel)
 * @returns {object}
 */
export const getRecapAllParametersTrainingByMemberId = async (
    idMember,
    year,
    month,
    day,
    idTypeOfTraining
) => {
    const resultKm = await getSumDistanceTrainingByMemberId(
        idMember,
        year,
        month,
        day,
        idTypeOfTraining
    );
    const resultTime = await getSumTimeTrainingByMemberId(
        idMember,
        year,
        month,
        day,
        idTypeOfTraining
    );
    const resultFcAvg = await getMoyFcTrainingByMemberId(
        idMember,
        year,
        month,
        day,
        idTypeOfTraining
    );
    const resultFcMax = await getFcMaxTrainingByMemberId(
        idMember,
        year,
        month,
        day,
        idTypeOfTraining
    );
    const resultHikeUp = await getHikeUpTrainingByMemberId(
        idMember,
        year,
        month,
        day,
        idTypeOfTraining
    );
    const resultHikeDown = await getHikeDownTrainingByMemberId(
        idMember,
        year,
        month,
        day,
        idTypeOfTraining
    );
    const resultSpeedAvg = await getMoySpeedTrainingByMemberId(
        idMember,
        year,
        month,
        day,
        idTypeOfTraining
    );
    return {
        ...resultKm,
        ...resultTime,
        ...resultFcAvg,
        ...resultFcMax,
        ...resultHikeUp,
        ...resultHikeDown,
        ...resultSpeedAvg,
    };
};
