const { validationResult } = require('express-validator')
let resultobj = require('../../framework/objects/result')
var GroupManagement = require('./../../models/commandgroups')

module.exports =  {

    get : (req,res,next) => {
        res.send(resultobj.result({ message : "helloworld", req: req }))
    },

    savecmd : (req,res,next) => {
        
        console.log("new cmd");

        var body = req.body;
        var cmdid = body.id || -1;

        console.log(body);
        var newCmd = new GroupManagement();

        if(cmdid >= 0){
            var currentCmd = newCmd.FindFile(cmdid);

            if(currentCmd != null){
                newCmd.Update(cmdid,body);
                res.send(resultobj.result({ message : "success", req: req, result: body }))
            }else{
                res.send(resultobj.result({ message : "not_found", req: req, type: resultobj.type.notfound }))
            }

        }else{
            //create
            newCmd.AddNewCommand(body);
            res.send(resultobj.result({ message : "success", req: req, result: body }))
        }

    }

}