import express from 'express';
const router = express.Router();
import configKey from './../../config/keys.json';
import CryptoJS from 'crypto-js';
import * as bcrypt from 'bcrypt';
import { users } from './../model/users';
import uuid = require('uuid');
import * as Jwt from 'jsonwebtoken';
const { Op } = require("sequelize");
import Utils from './../helper/utils';

router.use(function (req, res, next) {
    next();
});

router.get('/getup', function (req, res) {
    res.json({ message: 'hooray! welcome to our rest video api!' });
});



// User Sign In 
router.post('/signIn', function (req, res) {


    const bytes = CryptoJS.AES.decrypt(req.body.event, configKey.onboardEncryptKey);
    const signInPayload: any = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));


    users.findOne({
        where: {
            email: signInPayload.email
        }
    }).then((userResp: any) => {
        userResp = JSON.parse(JSON.stringify(userResp));
        bcrypt.compare(signInPayload.password, userResp.hash_password).then((bcryptRes: any) => {
            if (bcryptRes) {

                const token = Jwt.sign(userResp, configKey["jwt"]["secretKey"], {
                    expiresIn: '12h',
                });

                userResp.token = token;
                delete userResp.hash_password;
                delete userResp.salt;

                const sesData: any = {
                  subject: 'signed In',
                  body: 'you successfully signed In',
                  source: configKey.sourceMail
                };
                // Utils.awsSendMail(sesData, [userResp.email]);

                res.json({ 
                    success: true,
                    userData: userResp
                });
            } else {
                res.json({ 
                    success: false,
                    message: 'Incorrect Password' 
                });
            }
        });

    }).catch((error: any) => {

    });

    

    
});


// User Sign Up
router.post('/signUp', (req, res) => {

    const failedResponse: any = {
      success: false
    };
    const successResponse: any = {
      success: true,
    };
    try {
      const bytes = CryptoJS.AES.decrypt(req.body.event, configKey.onboardEncryptKey);
      const signUpPayload: any = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      
      const findPay: any = {
        attributes: ['email', 'userName'],
        where: {
          [Op.or]: [
            {
              email: { [Op.eq]: signUpPayload.email }
            },
            {
              userName: { [Op.eq]: signUpPayload.userName }
            }
          ]
        }
      };
  
      users.findOne(findPay).then((userResponse: any) => {
        userResponse = JSON.parse(JSON.stringify(userResponse));
        if (userResponse) {
          if (userResponse.email === signUpPayload.email && userResponse.userName === signUpPayload.userName) {
            failedResponse.message = 'User Already Exist';
            res.send(JSON.stringify(failedResponse));
          } else if (userResponse.email === signUpPayload.email) {
            failedResponse.message = 'User Email Already Exist';
            res.send(JSON.stringify(failedResponse));
          } else if (userResponse.userName === signUpPayload.userName) {
            failedResponse.message = 'User Name Already Exist';
            res.send(JSON.stringify(failedResponse));
          }
        } else {
          bcrypt.genSalt(10).then((salt: any) => {
            bcrypt.hash(signUpPayload.password, salt).then((hash_password: any) => {
              const createPay: any = {
                userId: uuid.v4(),
                email: signUpPayload.email,
                hash_password,
                salt,
                userName: signUpPayload.userName,
              };
              users.create(createPay).then(() => {
                const sesData: any = {
                  subject: 'signed Up',
                  body: 'you successfully signed up',
                  source: configKey.sourceMail
                };
                Utils.awsSendMail(sesData, [signUpPayload.email]);
                successResponse.message = 'User Successfully Created';
                res.send(JSON.stringify(successResponse));
              }).catch((error: any) => {
                console.log('User Creation Failed!!', error);
                failedResponse.message = 'User Creation Failed!!';
                res.send(JSON.stringify(failedResponse));
              });
            });
          });
        }
      }).catch((error: any) => {
        console.log('User Creation Failed!!', error);
        failedResponse.message = 'User Creation Failed!!';
        res.send(JSON.stringify(failedResponse));
      });
    } catch (errored) {
      console.log('User Creation Failed!!', errored);
      failedResponse.message = 'User Creation Failed!!';
      res.send(JSON.stringify(failedResponse));
    }
  });








module.exports.router = router;