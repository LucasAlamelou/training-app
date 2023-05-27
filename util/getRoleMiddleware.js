import jwt from 'jsonwebtoken';
const pathAuthorized = ['/api/login', '/api/register', '/api/verify-email'];

export async function getRoleMiddleware(req, res, next) {
    if (pathAuthorized.includes(req.path)) {
        next();
    } else {
        const authHeader = req.headers['authorization'];
        const token = authHeader;
        if (token == null) {
            // const token = authHeader && authHeader.split(' ')[1];
            res.json({ error: { message: 'Token invalide' }, info: null }).status(401);
            return;
        }
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                console.error(err.expiredAt);
                res.json({
                    error: { message: 'Token expirer veuillez vous reconnecter' },
                    info: null,
                }).status(401);
                return;
            }
            req.user = user;
            next();
        });
    }
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
