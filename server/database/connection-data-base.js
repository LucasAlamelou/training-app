import mysql from 'mysql2';
import * as dotenv from 'dotenv';
dotenv.config();

/**
 * Connection with pool Sql
 */
const pool = mysql
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
 * Test query
 */
export async function getSomething() {
    const [result] = await pool.query('SELECT * FROM clients');
    console.log(result);
    return result;
}
