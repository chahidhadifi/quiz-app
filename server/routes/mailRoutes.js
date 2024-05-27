const express = require('express');
const MailSender=require('../controllers/mailController');
const routerMail = express.Router();

const pool = require("../db");

routerMail.post('/',(req,res)=>{
    const{receiver_mail,receiver_name,qcm,score}=req.body;
    MailSender(receiver_mail,receiver_name,qcm,score);

})

module.exports = routerMail