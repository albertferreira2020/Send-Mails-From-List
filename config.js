var nodemailer = require('nodemailer');
module.exports = {
 
    dbconfig: {

    server: "Yourhost",
    user: "Userdatabase",
    password: "Passwd",
    options: {
        port: 1433,//49161,
        database: 'YourDataBase',
        connectionTimeout : 150000,
        //instancename: 'SQLEXPRESS'
      }

},



//connect email account

    send : nodemailer.createTransport({
    service: 'Gmail', // use your email system
    auth: {
        user: 'youraccount@gmail.com', // add your email account
        pass: 'yourpassword'             // your password
        } 
})
 

}
