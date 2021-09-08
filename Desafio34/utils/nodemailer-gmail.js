const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
});

const enviarMail = (asunto,mensaje,adjunto,to) => {
    const mailOptions = {
        from: 'Servidor Node.js',
        to: to,
        subject: asunto,
        html: mensaje,
        attachments: [
            {   // filename and content type is derived from path
                path: adjunto,
                filename: 'foto.jpg',
            }
        ]        
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