const mailgun = require("mailgun-js");

let transporterconfiguration = require('./../../configurations/index').config.emailprovider;
let mg = null;

if(transporterconfiguration.enabled){
    mg = mailgun(transporterconfiguration.transporter.auth);
}

async function Submit(from,to,subject,text = "",html = ""){   
        try{

            if(mg != null){

                let data = {
                    from: from, // sender address
                    to: to, // list of receivers
                    subject: subject, // Subject line
                    text: text, // plain text body
                    html: html // html body
                };

                mg.messages().send(data, function (error, body) {
                    console.log(error,body);
                });

            }else{
                console.log("Failed to submit email. Service not active in the configuration file.")
            }

        }catch(Exception){
           console.log(Exception);
        }
}

module.exports = { Submit }