var mongoose = require('mongoose')
let configuration = require('./../../configurations/index')
let emitter = require('./../framework/EventEmitter').Global

let dbconfig = configuration.config.database.mongodb;

let Connect = async function(){

    //if is in development mode
    if(configuration.config.environment == configuration.environmentType.development){

        try{
            await mongoose.connect(dbconfig.development.url,dbconfig.development.options);
            emitter.emit('sv.dbconnect')
        }catch(err){
            emitter.emit('sv.dbconnect.error',err)
        }
    }

    if(configuration.config.environment == configuration.environmentType.production){

        try{
            await mongoose.connect(dbconfig.production.url,dbconfig.production.options);
            emitter.emit('sv.dbconnect')
        }catch(err){
            emitter.emit('sv.dbconnect.error',err)
        }
    }

}

module.exports = { Connect };