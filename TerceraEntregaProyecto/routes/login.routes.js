// importo el modulo de express
const express = require('express');
const router = express.Router();

// importo modulos para envio de emails
const EnviarEthereal = require('../utils/nodemailer-ethereal.js');
const EnviarGmail = require('../utils/nodemailer-gmail.js');

// modulo para saber el numero de nucleos del procesador
const numCPUs = require('os').cpus().length;

module.exports = function(passport) {

    router.get('/login', (req,res) => {
        if(req.isAuthenticated()) {
          console.log(req.user)
            res.render("home", {
                nombre: req.user.username
            })
        }
        else {
            res.render("login")
        }
    })
    
    router.post('/login', passport.authenticate('login', { failureRedirect: '/api/faillogin' }), (req,res) => {
        res.redirect('/')        
    })
    
    router.get('/faillogin', (req,res) => {
        res.render('login-error', {});
    })
    
    // rutas para registro de usuario
    
    router.get('/register', (req,res) => {
        res.render('registro', {})
    })
    
    router.post('/register', passport.authenticate('register', { failureRedirect: '/api/failregister' }), (req,res) => {
        let nombre = req.user.username
        // let email = 'hernandez-9193@hotmail.com'
        let asunto = 'Nuevo registro'
        let mensaje = 'Ingresó ' + nombre + ' en la fecha ' + new Date().toLocaleString() 

        res.redirect('/') 
    })
    
    router.get('/failregister', (req,res) => {
        res.render('register-error', {});
    })
    
    
    router.get('/logout', (req,res) => {
        let nombre = req.user.username
        if(nombre) {
            req.logout()
            res.render("logout", { nombre })
        }
        else {
            res.redirect('/')
        }
    })

    router.get('/info', (req,res) => {
        res.render('info', {
            args:  JSON.stringify(process.argv,null,'\t'),
            path: process.execPath,
            plataforma: process.platform,
            pid: process.pid,
            version: process.version,        
            dir: process.cwd(),        
            memoria: JSON.stringify(process.memoryUsage(),null,'\t'),
            numCPUs: numCPUs
    
        })
    })

   return router;
}