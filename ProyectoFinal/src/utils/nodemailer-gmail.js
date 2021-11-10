const nodemailer = require('nodemailer');
// modulo de .env configuration
const config = require('../config/config');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.GMAIL_USER,
        pass: config.GMAIL_PASS
    }
});

const enviarMail = (asunto, mensaje, adjunto, to) => {
    const mailOptions = {
        from: 'Servidor Node.js',
        to: config.EMAIL,
        subject: asunto,
        html: mensaje   
    }
    
    transporter.sendMail(mailOptions, (err, info) => {
        
        if(err) {
            console.log(err)
            //return err
        }
        else console.log(info)
        
    })
}

module.exports = enviarMail