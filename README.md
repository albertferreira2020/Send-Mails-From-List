# Send-Mails-From-List
Send multiple emails from your database using node.js
When finalizing the sending of emails, an email is also sent as a report of the submissions. See code below! <br>

const sql = require("mssql"); <br>
const fileconfig = require("./config.js"); <br> <br>

const dbconfig = fileconfig.dbconfig  <br>
const Send = fileconfig.send <br> <br>

    
let report = '' <br> <br>
 
const conn = new sql.Connection(dbconfig); <br>
const req = new sql.Request(conn); <br>
    conn.connect().then(() => { <br>
    req.query(`select 'xxxx' as names, 'xxx@xxxx.com.br' as emails from yourtablelist`).then((recordset) => { <br>
      return new Promise((resolve, reject) => {    <br>
        try { <br>
            for (var i = 0; i < recordset.length; i++) {      <br>                   
            (function loop(i) { <br>
               setTimeout(function() { <br>
                               report+= 'Email ' + recordset[i].names   +' - '+ recordset[i].email  <br>
                                if (i+1 == recordset.length){ <br>
                                    resolve(report); <br>
                                }              <br>                  
                                var email1 = { <br>
                                    from: 'yourmail@host.com', // who send, important, necessary valid email <br>
                                    to: recordset[i].emails, // who recept <br>
                                    subject: recordset[i].names + ' another subject',  <br> 
                                    html: ` <br>
                                    Your Title,<br><br> <br>
                                    Here is a body your email ` <br>
                                    }; <br>
                                  Send.sendMail(email1, function(err, info){ <br>
                                  if(err){ <br>
                                  resolve(report); <br>
                                  console.log('Email sending: ', info); <br>
                                  console.log(recordset[i].names +'-'+recordset[i].emails ) <br>
                                  }else{ <br>
                                  datetime = new Date(); <br>
                                  datetime = datetime.getUTCFullYear() + '-' + ('00' + (datetime.getUTCMonth() + 1)).slice(-2) + '-' + ('00' + datetime.getUTCDate()).slice(-2) + ' ' + ('00' + datetime.getUTCHours()).slice(-2) + ':' + ('00' + datetime.getUTCMinutes()).slice(-2) + ':' + ('00' + datetime.getUTCSeconds()).slice(-2);   <br> 
                                  console.log('Sending to ' + recordset[i].names  + ' - ' + recordset[i].emails ); <br>
                                  } <br>
                              }); <br>
                 }, 7000*i) //every 7 seconds <br>
            })(i); <br>
        } <br>
     } <br>
        catch (err) { <br>
        console.log(err); <br>
        conn.close(); <br>
        }  <br>
    }).then((report) => {  <br>
    //console.log('Send Email report: ' + report) <br>
    datetime = new Date(); <br>
    datetime =  ('00' + datetime.getUTCDate()).slice(-2) + '/' + ('00' + (datetime.getUTCMonth() + 1)).slice(-2) + '/' +  datetime.getUTCFullYear() + ' ' + ('00' + datetime.getUTCHours()).slice(-2) + ':' + ('00' + datetime.getUTCMinutes()).slice(-2) + ':' + ('00' + datetime.getUTCSeconds()).slice(-2);    <br>
    var email2 = { <br>
        from: 'yourmail@host.com', //  who send, important, necessary valid email <br>
        to: 'yourmailreport@host.com', //  who recept <br>
        subject: ' Report Send E-mails ' + datetime,  <br> 
        html: ` <br>
        title <br><br> <br>
        <b>${report}</b>  <br>
        <br> Your Sign ` <br>
        }; <br>
            Send.sendMail(email2, function(err, info){ <br>
            if(err){ <br>
            console.log('Email Enviado: ', info); <br>
            }else{ <br>
            } <br>
        }); <br>
   })  <br>
 }); <br> <br>
 
} <br>
); <br>
