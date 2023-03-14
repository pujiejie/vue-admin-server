const mysql2 = require('mysql2');

class MiniOrm {
    constructor() { }
    getConnectionPool() {
        if (global.db == undefined) {
            global.db = mysql2.createPool({
                host: 'localhost',
                database: 'admin',
                user: 'root',
                password: 'root',
                port: 3306
            });
        }
        return global.db;
    }
    getConnection() {
        let db = this.getConnectionPool();
        return new Promise((resolve, reject) => {
            db.getConnection((err, connect) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(connect);
                }
            })
        })
    }
    async query(sql) {
        let connection;
        try {
            connection = await this.getConnection();
        } catch {
            return {
                code: -1,
                name: 'connection error',
                message: 'mysql connection failed'
            }
        }
        try {
            const result = await connection.promise().query(sql)
            return {
                code: 0,
                data: result[0],
                message: 'success'
            };
        } catch (e) {
            return {
                code: -1,
                message: e.sqlMessage
            }
        }
    }
}

module.exports = function () {
    if (global.miniorm == undefined) {
        global.miniorm = new MiniOrm();
    }
    return global.miniorm;
};