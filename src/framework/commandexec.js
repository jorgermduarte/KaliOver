const exec = require('child_process').exec;

module.exports = (socket,cmd) => {

    var ls = exec(cmd)
    
    ls.stdout.on('data', function (data) {
        socket.emit('command.output',data)
    })

    ls.stderr.on('data', function (data) {  
        socket.emit('command.output',data)
    })

    ls.on('exit', function (code) {
        socket.emit('command.output','child process exited with code ' + code.toString( ))
    })

}


