const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const common = require('./public/common.js')

app.use(bodyParser.json())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
})

let state = {...common.initialState}

const stepIntervalms = 100
const syncIntervalms = 1000

app.use(express.static('public'))

app.get('/state', (req, res) => res.sendFile())

io.on('connection', (socket) => {
    console.log('a user connected')
    socket.on('disconnect', () => {
        console.log('user disconnected')
    })
    socket.on('click', () => {
        console.log('click')
        socket.emit('doClickInSeconds', .4)
        setTimeout(() => {
            state = common.changeDirection(state)
        }, 500)
    })
    sendState(socket)
    setInterval(() => sendState(socket), syncIntervalms)
})

http.listen(80, () => console.log('yognar listening on port 80!'))

setInterval(() => (state = common.doStep(state)), stepIntervalms)

function sendState(socket) {
    socket.emit('state', state)
}
