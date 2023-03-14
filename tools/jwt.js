const jwt = require('jsonwebtoken');

class Jwt {
    constructor() {}
    generateToken(payload) {
        return jwt.sign(payload, "d41d8cd98f00b204e9800998ecf8427e", {
            expiresIn: '1h'
        })
    }
    verifyToken(token) {
        try {
            return jwt.verify(token, "d41d8cd98f00b204e9800998ecf8427e");
        } catch(e) {
            return e;
        }
    }
}

module.exports = function() {
    if (global.jwt == undefined) {
        global.jwt = new Jwt();
    }
    return global.jwt;
};