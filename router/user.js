const express = require('express');
const router = express.Router();
const db = require('../db')();
const md5 = require('md5');
const jwt = require('../tools/jwt')();

// 登录
router.post('/signin', async (req, res) => {
    let { username, password } = req.body;
    if (!username || !password) {
        return res.json({
            code: -1,
            message: 'Missing parameter'
        })
    }
    const verifyUsername = /^\w{6,12}$/g.test(username);
    const verifyPassword = /^\w{6,12}$/g.test(password);
    if (!verifyUsername || !verifyPassword) {
        return res.json({
            code: -1,
            message: 'Parameter format error'
        })
    }
    const result = await db.query(`select username from users where username = "${username}"`);
    if (result.code == -1) {
        return res.json({
            code: -1,
            message: 'No Such User'
        })
    } else {
        const result = await db.query(`select * from users where username="${username}" AND password="${md5(password)}"`);
        if (result.code == -1) {
            return res.json({
                code: -1,
                message: "password error"
            })
        } else {
            const token = jwt.generateToken(result.data[0]);
            return res.json({
                code: 0,
                token,
                message: 'Login successded',
                username: result.data[0].username
            })
        }
    }

})

// 注册
router.post('/register', async (req, res) => {
    let { username, password } = req.body;
    if (!username || !password) {
        return res.json({
            code: -1,
            message: 'Missing parameter'
        })
    }
    const verifyUsername = /^\w{6,12}$/g.test(username);
    const verifyPassword = /^\w{6,12}$/g.test(password);
    if (!verifyUsername || !verifyPassword) {
        return res.json({
            code: -1,
            message: 'parameter format error'
        })
    }
    let time = new Date().toLocaleString();
    password = md5(password);
    const result = await db.query(`insert into users(username,password,create_time,update_time) values("${username}", "${password}","${time}","${time}")`);
    return res.json(result);
})

module.exports = router;
