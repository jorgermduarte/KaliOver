const exec = require('child_process').exec;


module.exports = class CommandExecutor{

    constructor(){
    }
    
    ExecuteSocket(socket,command){
        let ls = exec(command)
        ls.stdout.on('data', function (data) {
            socket.emit('console',data)
        })
        ls.stderr.on('data', function (data) {  
            socket.emit('console',data)
        })
        ls.on('exit', function (code) {
            socket.emit('console','child process exited with code ' + code.toString())
        })
    }
    
}
