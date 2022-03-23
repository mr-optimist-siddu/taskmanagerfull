const { User } = require('../db/models');
const jwt = require('jsonwebtoken');
const { logger } = require('../logger');

let authenticate = (req, res, next) => {
    let token = req.header('x-access-token');
    // verify the JWT
    jwt.verify(token, User.getJWTSecret(), (err, decoded) => {
        if (err) {
            logger.error(err);
            res.status(401).send(err);
        } else {
            req.user_id = decoded._id;
            next();
        }
    });
}


module.exports = { authenticate }