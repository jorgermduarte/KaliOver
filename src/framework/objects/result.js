let ResourceKeys = require('./../../resources/default.lang')
let languagecfgs = require('./../../../configurations/index').config.resources;

let enumtypes = {
    success : 1,
    nodata : 2,
    duplicated : 3,
    invalid : 4,
    error : 5,
    notfound : 6,
    unauthorized : 7
}

let resultobject = function( { result = [], message = "", type = 0,req = null } ){
    
    //verify the language requested by the middleware
    //set the converted response based on the resources
    let resourcelang = LanguageRequested(req);

    

    let returnobj = {
        message : message,
        result : result,
        type : type
    }

    returnobj.message = Translate(resourcelang,message);

    if(type == 0)
        returnobj.type = enumtypes.success;


    //save the request in history
    
    //req.params
    //req.session.user
    //req.body
    //req.ip
    //req.url
  
    return returnobj
}

function Translate (language, message){

    let r = message;

    languagecfgs.languages.forEach(l => {
        if(l.name == language){
            if(l.resource[message])
                r = l.resource[message]
        }

    })

    return r;
}

function LanguageRequested(req){
    let language = "";
    
    try{

        if(req != null){
             
            //check if we allow the respective language or return default;
            Object.keys(req.query).forEach( header => {
                //check if this key is allowed by our configurations
                if(languagecfgs.queryinputs.includes(header)){

                    let langrequest = req.query[header];

                    //check if we have this lang translation
                    languagecfgs.languages.forEach(cl => {
                        if(cl.codes.includes(langrequest.toLowerCase())){
                            //is this lang
                            language = cl.name;
                        }
                    })

                }
            });
           
            req.session.lang = language;
            
        }   

    }catch(err){
        language = ""
    }

    if(language == ""){
        //set default language
        languagecfgs.languages.forEach(cl => {
            if(cl.default == true)
                language = cl.name
        });
    }

    return language;
}

module.exports = {
    result  : resultobject,
    type : enumtypes
}