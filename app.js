const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const doStep = require('./public/doStep.js').doStep

app.use(bodyParser.json())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
})

let state = {
    x: 5,
    y: 5,
    direction: 'right'
}

app.use(express.static('public'))

app.get('/state', (req, res) => res.sendFile())

io.on('connection', (socket) => {
    console.log('a user connected')
    socket.on('disconnect', () => {
        console.log('user disconnected')
    })
    socket.on('click', () => {
        console.log('click')
        socket.emit('doClickInSeconds', 3)
        setTimeout(() => {
            switch (state.direction) {
            case 'left': state.direction = 'up'
                break
            case 'right': state.direction = 'down'
                break
            case 'up': state.direction = 'right'
                break
            case 'down': state.direction = 'left'
                break
            default: throw 'bad direction'
            }
        }, 3000)
    })
    sendState(socket)
    setInterval(() => sendState(socket), 1000)
})

http.listen(80, () => console.log('yognar listening on port 80!'))

setInterval(() => (state = doStep(state)), 1000)

function sendState(socket) {
    socket.emit('state', state)
}
