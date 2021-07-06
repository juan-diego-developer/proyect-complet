const mysql = require('mysql');
const {promisify} = require('util');

const {database} = require('./keys');

const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
    if(err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('database connection was clased');
        }
        if(err.code === 'ER_CON_COUNT_ERROR'){
            console.error('database has to many connections');
        }
        if(err.code === 'ECONNREFUSED'){
            console.error('database connection was refused');
        }
    }

    if (connection) connection.release();
    console.log('DB is Connected');
    return;
});

// Promisify Pool Querys

pool.query = promisify(pool.query);

module.exports = pool;
