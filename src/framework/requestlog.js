
let cfg = require('./../../configurations');
let emitter = require('./EventEmitter').Global
let moment = require('moment')

class Request {

    Initialize(req,res,next){

        if(cfg.config.environment == cfg.environmentType.development){
            emitter.emit('sv.info',`:: [REQUEST - ${req.method }] ${moment().format("LLL")} : IP - ${req.ip}  | ${req.url} `)
        }

        next();
    }
}

var RequestLogger = new Request();

module.exports = { RequestLogger }