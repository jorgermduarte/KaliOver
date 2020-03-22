var socket = io();

socket.on('command.output', (log)  => { 
    console.log(log);
    $("#console").html( $("#console").html() + "<br/>" + log.replace(/(?:\r\n|\r|\n)/g, '<br>'));
 });

var actions = {
    request : (id,input) => {
        socket.emit('command.input', {
            module : id,
            command : input
        });
    },
    clearconsole : () => {
        $("#console").html("")
    }
};