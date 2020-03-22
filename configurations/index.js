let uuid = require('uuid')
let rootpath = require('app-root-path')

environmentType = {
    development : 0,
    production : 1
}

let config = {
    environment : environmentType.development,
    session : {
        secret: uuid.v4() + uuid.v1(),
        resave: false,
        saveUninitialized: true
    },
    port : process.env.PORT || 3000,
    cors : {
        "origin": "*",
        "methods": "GET,PUT,POST,DELETE",
        "allowedHeaders" : [ 'Content-Type','application/json','Authorization'],
        "preflightContinue": false,
        "optionsSuccessStatus": 204
    },
    database : {
        mongodb : {
            development : {
                url : "mongodb://localhost:27017/kalicommands",
                options :{
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    useFindAndModify: false
                }
            },
            production : {
                url : "mongodb://mongo:27017/kalicommands",
                options :{
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    useFindAndModify: false
                }
            }
        }
    },
    emailprovider : {
        enabled : true,
        transporter : {
            auth : {
                apiKey : "",
                domain : "",
                host: "api.eu.mailgun.net"
            }
        }
    },
    resources : {
        queryinputs : ["lang","language","l"],
        languages : [
            {
                name : 'portuguese',
                codes : ['pt','pt-pt','portuguese'],
                resource : require(`${rootpath}/src/resources/portuguese.lang.js`)
            },
            {
                default : true,
                name : 'english',
                codes : ['en'],
                resource : require(`${rootpath}/src/resources/default.lang.js`)
            }
        ]
    }
}

module.exports = { config, environmentType }