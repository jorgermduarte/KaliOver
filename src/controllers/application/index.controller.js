

var Render = require('./../../framework/render')
var GroupManager = require('./../../models/commandgroups')

module.exports =  {

    get : (req,res,next) => {

        var currentCmds = new GroupManager();


       Render({
           req : req,
           res : res,
           view : 'dashboard',
           data : currentCmds.parsed
       })
    },

    groups : (req,res,next) => {
        
        var currentGroups = new GroupManager();


        Render({
            req : req,
            res : res,
            view : 'groups',
            data : currentGroups.parsed
        })
    },

    command : (req,res,next) => {

        var currentCmd = new GroupManager();
        var data = currentCmd.SampleStructure();

        if(req.params.id){
            var dbcmd = currentCmd.FindFile(req.params.id);
            if(dbcmd != null)
                data = dbcmd;

            data.id = req.params.id;
        }


        Render({
            req : req,
            res : res,
            view : 'command',
            data : data
        })
    }

}