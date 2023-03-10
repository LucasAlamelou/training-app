export function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '12h' });
}

export function generateRefreshToken(user) {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '12h' });
}
/**
 * Permet l'envoi d'un token d'authentification au client
 * Apres verification du mot de passe et email
 *
 *  const accessToken = generateAccessToken(user);
 *   res.send({
 *      accessToken,
 *   });
 */
