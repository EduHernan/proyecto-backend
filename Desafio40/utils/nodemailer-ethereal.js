const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'fern.parisian57@ethereal.email',
        pass: 'rkGfws7VH3C1CcxAea'
    }
});

const enviarMail = (asunto,mensaje) => {
    const mailOptions = {
        from: 'Servidor Node.js',
        to: 'bellrington75@gmail.com',
        subject: asunto,
        html: mensaje
    }
    
    transporter.sendMail(mailOptions, (err, info) => {
        
        if(err) {
            console.log(err)
            return err
        }
        else console.log(info)
        
       /*
       */
    })
}

module.exports = enviarMail