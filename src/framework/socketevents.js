let ExecCmd = require('./commandexec')
var GroupMang = require('./../models/commandgroups');

module.exports = (socket) => {
    console.log(`socket connected ${socket.id}`)

    socket.on('command.input',(input) => {
        // console.log(input,"fuck");
        if(input.module >= 0){
            console.log("module invoke requested : " + input.module);
            var newGM = new GroupMang();
            var dbCmd = newGM.FindFile(input.module);
            if(dbCmd != null){
                var cmdsexec = dbCmd.commands.map( (cmd) => cmd.cmd);
                ExecCmd(socket,cmdsexec.join(" && "));
            }

        }else{
            
            if(input.command != ""){
                ExecCmd(socket,input.command);
            }
            
        }
    });

}