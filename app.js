const express = require('express')
const bodyParser = require('body-parser')
const co = require('co')
const app = express()
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(bodyParser.json())

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

let state = 0;

app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'))
app.get('/state', (req, res) => res.sendFile())

io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
    socket.emit('state', state)
});

http.listen(80, () => console.log('yognar listening on port 80!'))

co(function* () {
    while (true) {
        yield waitSeconds(.5);
        io.emit('doStep');
        doStep()
    }
})

function waitSeconds(secondsToWait) {
    return new Promise(resolve => setTimeout(resolve, secondsToWait * 1000))
}

function doStep() {
    if (state < 2) {
        state++
    } else {
        state = 0
    }
}
