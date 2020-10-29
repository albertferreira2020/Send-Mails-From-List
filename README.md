# Send-Mails-From-List
Send multiple emails from your database using node.js
When finalizing the sending of emails, an email is also sent as a report of the submissions. See code below!

const sql = require("mssql");
const fileconfig = require("./config.js");

const dbconfig = fileconfig.dbconfig 
const Send = fileconfig.send

    
let report = ''
 
const conn = new sql.Connection(dbconfig);
const req = new sql.Request(conn);
    conn.connect().then(() => {
    req.query(`select 'xxxx' as names, 'xxx@xxxx.com.br' as emails from yourtablelist`).then((recordset) => {
      return new Promise((resolve, reject) => {   
        try {
            for (var i = 0; i < recordset.length; i++) {                        
            (function loop(i) {
               setTimeout(function() {
                               report+= 'Email ' + recordset[i].names   +' - '+ recordset[i].email 
                                if (i+1 == recordset.length){
                                    resolve(report);
                                }                               
                                var email1 = {
                                    from: 'yourmail@host.com', // who send, important, necessary valid email
                                    to: recordset[i].emails, // who recept
                                    subject: recordset[i].names + ' another subject',  
                                    html: `
                                    Your Title,<br><br>
                                    Here is a body your email `
                                    };
                                  Send.sendMail(email1, function(err, info){
                                  if(err){
                                  resolve(report);
                                  console.log('Email sending: ', info);
                                  console.log(recordset[i].names +'-'+recordset[i].emails )
                                  }else{
                                  datetime = new Date();
                                  datetime = datetime.getUTCFullYear() + '-' + ('00' + (datetime.getUTCMonth() + 1)).slice(-2) + '-' + ('00' + datetime.getUTCDate()).slice(-2) + ' ' + ('00' + datetime.getUTCHours()).slice(-2) + ':' + ('00' + datetime.getUTCMinutes()).slice(-2) + ':' + ('00' + datetime.getUTCSeconds()).slice(-2);   
                                  console.log('Sending to ' + recordset[i].names  + ' - ' + recordset[i].emails );
                                  }
                              });
                 }, 7000*i) //every 7 seconds
            })(i);
        }
     }
        catch (err) {
        console.log(err);
        conn.close();
        } 
    }).then((report) => { 
    //console.log('Send Email report: ' + report)
    datetime = new Date();
    datetime =  ('00' + datetime.getUTCDate()).slice(-2) + '/' + ('00' + (datetime.getUTCMonth() + 1)).slice(-2) + '/' +  datetime.getUTCFullYear() + ' ' + ('00' + datetime.getUTCHours()).slice(-2) + ':' + ('00' + datetime.getUTCMinutes()).slice(-2) + ':' + ('00' + datetime.getUTCSeconds()).slice(-2);   
    var email2 = {
        from: 'yourmail@host.com', //  who send, important, necessary valid email
        to: 'yourmailreport@host.com', //  who recept
        subject: ' Report Send E-mails ' + datetime,  
        html: `
        title <br><br>
        <b>${report}</b> 
        <br> Your Sign `
        };
            Send.sendMail(email2, function(err, info){
            if(err){
            console.log('Email Enviado: ', info);
            }else{
            }
        });
   }) 
 });
 
}
);
