require('dotenv').config();
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  service: 'gmail',
  host :"smtp.gmail.com",
  port :587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,// poppinplatforme@gmail.com
    pass: process.env.EMAIL_PASSWORD
  }
});

const sendMail=async (transporter,mailOptions)=>{
    try{
        await transporter.sendMail(mailOptions);
        console.log('Email sent!');
    }
    catch(err){
        console.log(err.message);
    }
}
const MailSender=(receiver_email,receiver_name,qcm,score)=>{
  var mailOptions = {
    from: {
      name: 'poppinplatforme',
      address:process.env.EMAIL_USER
    },
    to: receiver_email,
    subject: 'Resultat du qcm '+qcm,
    text: `Bonjour ${receiver_name},\n
        Votre score dans le qcm ${qcm} est ${score}.`,
    html:`<h2>Bonjour ${receiver_name},</h2>
    
    <p style='text-indent: 30px;'>Votre Score dans le qcm <strong>${qcm}</strong> est <strong>${score+'%'}</strong>.`
  };
  sendMail(transporter,mailOptions);
}


module.exports = MailSender;