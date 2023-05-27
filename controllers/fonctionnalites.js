import { getAllFonctionnalitesIsActive } from '../database/connection-data-base.js';
import { asErrorValidator } from '../validator/errors_validator.js';

export const getFonctionnaliteActive = async (req, res) => {
    const errorValidator = asErrorValidator(req, res);
    if (errorValidator) {
        return;
    }
    try {
        const fonctionnalites = await getAllFonctionnalitesIsActive();
        if (fonctionnalites) {
            res.json({ info: fonctionnalites }).status(200);
            return;
        }
    } catch (error) {
        console.error(error);
        res.json({ error: { message: error.message } }).status(500);
        return;
    }
};
