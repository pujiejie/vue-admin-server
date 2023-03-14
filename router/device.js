const express = require('express');
const router = express.Router();
const db = require('../db')();
// 读取所有设备
router.get('/api/v1/device', async (req, res) => {
    const result = await db.query(`select * from device`);
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
    const result = await db.query(`insert into devices(name,price,insurance_date,state,create_time,update_time) values("${name}",${price},"${time}","${state}","${new Date().toLocaleString()}","${new Date().toLocaleString()}")`);
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
