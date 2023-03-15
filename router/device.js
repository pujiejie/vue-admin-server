const express = require('express');
const router = express.Router();
const db = require('../db')();
const jwt = require('../tools/jwt')();

router.use((req, res, next) => {
    let { authorization } = req.headers;
    if (!authorization) return res.json({ code: -1, message: 'please log in first' });
    if (!/^(Bearer) \w+$/g.test(authorization)) return res.json({ code: -1, message: 'token format error' });
    let token = authorization.split(' ')[1];
    let result = jwt.verifyToken(token);
    if (result.state == 'error') {
        return res.json({
            code: -2,
            ...result
        })
    } else {
        return next();
    }
})

// 读取所有设备
router.get('/api/v1/device', async (req, res) => {
    const result = await db.query(`select * from devices`);
    return res.json(result);
})

// 新增设备
router.post('/api/v1/device', async (req, res) => {
    let { name, price, insurance_date, state } = req.body;
    if (!checkBody(name, price, insurance_date, state)) {
        return res.json({
            code: -1,
            message: 'parameter error'
        })
    }
    if (isNaN(Number(price))) {
        return res.json({
            code: -1,
            message: 'parameter price type error'
        })
    } else {
        price = Number(price);
    }
    let time;
    try {
        time = new Date(insurance_date).toLocaleString();
    } catch {
        return res.json({
            code: -1,
            message: 'parameter insurance_date error'
        })
    }
    if (state.length != 1 || !/^[01]/.test(state)) {
        return res.json({
            code: -1,
            message: "state must be 0 or 1"
        })
    }
    const result = await db.query(`insert into devices(name,price,insurance_date,state,create_time,update_time) values("${name}",${price},"${time}","${state}","${new Date().toLocaleString()}","${new Date().toLocaleString()}")`);
    return res.json(result);
})

// 更改设备
router.put('/api/v1/device', async (req, res) => {
    let { name, price, insurance_date, state, id } = req.body;
    if (!checkBody(name, price, insurance_date, state, id)) {
        return res.json({
            code: -1,
            message: 'parameter error'
        })
    }
    if (isNaN(Number(price))) {
        return res.json({
            code: -1,
            message: 'parameter price type error'
        })
    } else {
        price = Number(price);
    }
    let time;
    try {
        time = new Date(insurance_date).toLocaleString();
    } catch {
        return res.json({
            code: -1,
            message: 'parameter insurance_date error'
        })
    }
    if (state.length != 1 || !/^[01]/.test(state)) {
        return res.json({
            code: -1,
            message: "state must be 0 or 1"
        })
    }
    const result = await db.query(`UPDATE devices SET name="${name}",price=${price},insurance_date="${time}",state="${state}",update_time="${new Date().toLocaleString()}" WHERE id=${id}`);
    if (result.code == 0) {
        if (result.data.affectedRows == 0) {
            return res.json({
                code: -1,
                message: "No Data Found"
            })
        } else {
            return res.json({
                code: 0,
                message: "update success"
            })
        }
    }
    return res.json(result);
})

// 删除设备
router.delete('/api/v1/device', async (req, res) => {
    let { id } = req.body;
    if (!checkBody(id)) {
        return res.json({
            code: -1,
            message: 'parameter error'
        })
    }
    const result = await db.query(`DELETE FROM devices WHERE id=${id}`);
    if (result.code == 0) {
        if (result.data.affectedRows == 0) {
            return res.json({
                code: -1,
                message: "No Data Found"
            })
        } else {
            return res.json({
                code: 0,
                message: "delete success"
            })
        }
    }
    return res.json(result);
})

function checkBody(...arr) {
    let result = true;
    arr.forEach(item => {
        if (item == undefined) {
            result = false;
            return;
        }
    })
    return result;
}

module.exports = router;
