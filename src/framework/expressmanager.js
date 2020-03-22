let express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const http = require('http')
// const https = require('https')
const path = require('path')
let session = require('express-session')
let rootpath = require('app-root-path')
let emitter = require('./../framework/EventEmitter').Global
let cfg = require(rootpath + '/configurations/index').config
let resultobject = require('./objects/result')
var expressLayouts = require('express-ejs-layouts')
let RequestLogger = require('./RequestLog').RequestLogger;


var server = express()
var app = http.createServer(server);
var io = require('socket.io').listen(app);
io.on('connection', require('./socketevents'))

server.use(helmet())
server.use(cors(cfg.cors))
server.disable('x-powered-by')
server.set('trust proxy', 1)

// parse application/x-www-form-urlencoded
server.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
server.use(bodyParser.json())
server.use(session(cfg.session))
server.use(RequestLogger.Initialize)

//set the public folder
server.use('/public', express.static(process.cwd() + '/public'))


server.set('views', path.join(__dirname, '../../views'))
server.set('view engine', 'ejs')
server.use(expressLayouts)


let CreateRouter = (routername,path = "") => {
    try{
        let RouterNew = express.Router();
        
        if(path == ""){
            path = `${rootpath}/src/routers/${routername}/index`
            require(path)(RouterNew)
        }else
            require(path)(RouterNew)

        server.use(`/${routername}`,RouterNew)

        emitter.emit('sv.info', `[${routername}] router initialized successfully.`)

    }catch(err){
        emitter.emit('sv.warn',`[${routername}] : Failed to start the router! Please verify the index inside the folder on: ` + path + `  :::: ${err}`)
    }
}

let Initialize = () => {

    //not found middleware
    // server.get('*',function(req,res){
    //     res.send(resultobject.result({ result : null, message : "endpointnotfound", type : resultobject.type.unauthorized }))
    // })

    app.listen(cfg.port, () => {
        emitter.emit('sv.initialization',cfg.port)
    })
}



module.exports = { CreateRouter, server, Initialize }