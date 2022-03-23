const express = require('express');
const app = express();
const { mongoose } = require('./db/mongoose');
const { authSchema } = require('./schema/user');
const winston = require('winston');
const { logger } = require('./logger');
const cors = require('cors')
const bodyParser = require('body-parser');

const listRoutes = require('./routes/listroutes'); 
const taskRoutes = require('./routes/taskrouts');
//const userRoutes = require('./routes/userroutes');

const {authenticate , verifySession } = require('./middleware/index')
// Load in the mongoose models
const { Task, User } = require('./db/models');

app.use(cors())
// Load middleware
app.use(bodyParser.json());
// CORS HEADERS MIDDLEWARE
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token,  _id");
    res.header(
        'Access-Control-Expose-Headers',
        'x-access-token'
    );

    next();
});


/**
 * POST /users/login
 * Purpose: Login
 */
app.post('/login', async(req, res) => {
    try {
        let result = await authSchema.validateAsync(req.body)
        // console.log(result)
        let body = result;
        if (body.email.trim() === "" || body.password.trim() === "") {
                logger.info('Valid Credentials Required')
        } else {
            let email = req.body.email;
            let password = req.body.password;
            User.findByCredentials(email, password).then((user) => {
                logger.info('User ' + email + ' logged in Successfully')
                // return user.createSession().then((refreshToken) => {
                    return user.generateAccessAuthToken().then((accessToken) => {
                        return { accessToken }
                    })
                .then((authTokens) => {
                    res
                        .header('x-access-token', authTokens.accessToken)
                        .send(user);
                    })
            }).catch((err) => {
                logger.error('Not a Valid User');
                 res.status(400).send(err);
             });
        }
    } catch (err) {
        logger.error('Login ' +err.message);
        res.status(500).json(err.message)
    }
})


/**
 * POST /users
 * Purpose: Sign up
 */
app.post('/users', async(req, res,next) => {
    
    try {
        let result = await authSchema.validateAsync(req.body)
        // console.log(result)
        let body = result;
        const newUser = new User(body)
        // console.log(newUser)
        if (req.body.trim === "") {
            logger.error('Email & password are required');
            res.status(400).json('Enter the User & Password')
        } else {
            newUser.save().then(() => {
                return newUser.createSession();
            }).then(() => {
            // Session created successfully - refreshToken returned.
            // now we geneate an access auth token for the user
            return newUser.generateAccessAuthToken().then((accessToken) => {
                // access auth token generated successfully, now we return an object containing the auth tokens
                return { accessToken }
            });
            }).then((authTokens) => {
            // Now we construct and send the response to the user with their auth tokens in the header and the user object in the body
            res
                .header('x-access-token', authTokens.accessToken)
                    .send(newUser);
            }).catch((err) => {
                
                logger.error(err.message);
                res.status(500).json(err);
                //next(err)
            })
        }
    } catch (err) {
        if (err.isJoi === true) {
            res.status(400).json(err.message + "Pattern Missmatch")
            return;
        }
        logger.error('Signup '+err.message);
        res.status(500).json(err.message)
    }
})

/**
 * GET /users/me/access-token
 * Purpose: generates and returns an access token
 */
app.get('/users/me/access-token',  (req, res) => {
    // we know that the user/caller is authenticated and we have the user_id and user object available to us
    try {
        req.userObject.generateAccessAuthToken().then((accessToken) => {
        res.header('x-access-token', accessToken).send({ accessToken });
        }).catch((e) => {
        res.status(400).send(e);
    });
    } catch (err) {
        console.log(err);
    }
    
})

app.use('/lists', authenticate, listRoutes);
app.use('/',authenticate, taskRoutes);

//Error handling
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});


app.listen(3000, () => {
    logger.info("Server is listening on port 3000");
})