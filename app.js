import { createServer } from 'http';
import express, { json, urlencoded } from 'express';
import * as dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

import { getRoleMiddleware } from './util/getRoleMiddleware.js';

import { routes } from './routes/index_route.js';

var app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 *  Config DotEnv
 */
dotenv.config({ path: '.env' });

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3009');
app.set('port', port);
/**
 * Create HTTP server.
 */
var server = createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * App use
 */
app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, './client/build')));
//app.use(express.static('public'));
app.use(getRoleMiddleware);
console.log('path : ', path.join(__dirname, './client/build'));
app.all('/api/admin/*', function (req, res, next) {
    const ROLES = 'ROLE_ADMIN';
    const userConnected = req.user.roles;
    if (userConnected.includes(ROLES)) {
        console.debug('Route rôle : admin');
        next();
        return;
    } else {
        console.debug('Route admin : not admin');
        res.sendStatus(403);
    }
});
/*
app.all('/api/*', function (req, res, next) {
    if (req.path === '/api/login' || req.path === '/api/register') {
        next();
        return;
    }
    const ROLES = 'ROLE_USER';
    const userConnected = req.user.roles;
    if (userConnected.includes(ROLES)) {
        next();
        return;
    } else if (userConnected.includes('ROLE_ADMIN')) {
        next();
        return;
    } else {
        console.error('not user');
        res.sendStatus(403);
    }
});
*/
routes(app);
app.all('/*', function (req, res, next) {
    res.sendFile(path.join(__dirname + './client/build/index.html'));
    //res.sendStatus(404);
    //res.json({ info: null, error: `La route : ${req.path} non trouvé.` });
});

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    console.error('Listening on ' + bind);
}

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

export default app;
