export async function getRoleMiddleware(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(401);
        }
        req.user = user;
        next();
    });
}

/**
 * Permet l'envoi d'un token d'authentification au client
 * Apres verification du mot de passe et email
 *
 *  const accessToken = generateAccessToken(user);
 *   res.send({
 *      accessToken,
 *   });
 * const accessToken = generateAccessToken(user);
 *  console.log('accessToken', accessToken);
 */
