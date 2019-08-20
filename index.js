let express = require('express')
let ejs = require('ejs')
let app = express()
var http = require('http').createServer(app)
var io = require('socket.io')(http)

app.set('view engine', 'ejs')
app.use('/public', express.static('public'))
app.use('/node_modules', express.static('node_modules'))

io.on('connection', function(socket){
    console.log("New client connected", socket.id)
    let CommandExecutor = new (require('./commandexecutor'))()
    socket.on('command', function(cmd){
        io.emit('console', CommandExecutor.ExecuteSocket(socket,cmd))
    })
})

app.get('/',function(req,res){
    res.render("panel")
})

http.listen("3000")