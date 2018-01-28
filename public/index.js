const socket = io();

const info = document.getElementById('info')
const canvas = document.getElementById('canvas')
const width = 400
const height = 400
canvas.width = width
canvas.height = height
const canvasContext = canvas.getContext("2d")

let state = 0

setInfo('connecting')

const possibleStates = [
    'red',
    'prange',
    'yellow',
    'green',
    'blue',
    'purple',
    'magenta',
    'pink',
    'white',
    'black'
]

socket.on('state', (serverState) => (state = serverState))

setInterval(doStep2, 1000)

function doStep2() {
    state = doStep(state)
    updateCanvas(state)
    //setInfo(n(state, '|') + state)
}

function n(n, string) {
    let x = ''
    for (let i = 0; i < n; i++) {
        x += string
    }
    return x
}

document.onclick = function (event) {
    if (event === undefined) event = window.event;
    var target = 'target' in event ? event.target : event.srcElement;

    socket.emit('click')
    console.log('click')
};

socket.on('doClickInSeconds', (seconds) => {
    console.log('received doClickInSeconds')
    setTimeout(() => {
        state = 0
        console.log('reset state to 0')
    }, seconds * 1000);
})

{
    socket.on('connect', () => {
        setInfo('connected')
        console.log('connected')
    })

    socket.on('disconnect', (reason) => {
        setInfo('disconnected: ' + reason)
        console.log('disconnected: ' + reason)
    })

    socket.on('reconnect_attempt', (attemptNumber) => {
        setInfo('reconnect_attempt: ' + attemptNumber)
        console.log('reconnect_attempt: ' + attemptNumber)
    })

    socket.on('reconnecting', (attemptNumber) => {
        setInfo('reconnecting: ' + attemptNumber)
        console.log('reconnecting: ' + attemptNumber)
    })

    socket.on('reconnect_error', (error) => {
        setInfo('reconnect_error: ' + JSON.stringify(error, 2))
        console.log('reconnect_error: ' + JSON.stringify(error, 2))
    })

    socket.on('reconnect_failed', () => {
        setInfo('reconnect_failed')
        console.log('reconnect_failed')
    })

    socket.on('ping', () => {
        setInfo('ping')
        console.log('ping')
    })

    socket.on('pong', (latency) => {
        setInfo('pong - latency: ' + latency)
        console.log('pong - latency: ' + latency)
    })

    socket.on('reconnect', (attemptNumber) => {
        setInfo('reconnected: ' + attemptNumber)
        console.log('reconnected: ' + attemptNumber)
    })

    socket.on('connect_timeout', (timeout) => {
        setInfo('connect_timeout: ' + timeout)
        console.log('connect_timeout: ' + timeout)
    })

    socket.on('error', (error) => {
        setInfo('error: ' + JSON.stringify(error, 2))
        console.log('error: ' + JSON.stringify(error, 2))
    })

    socket.on('connect_error', (error) => {
        setInfo('connection error: ' + JSON.stringify(error, 2))
        console.log('connection error: ' + JSON.stringify(error, 2))
    })
}

function setInfo(newInfo) {
    info.textContent = newInfo
}

function updateCanvas(state) {
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    canvasContext.fillRect(state.x * (width / 10), state.y * (height / 10), (width / 10), (height / 10));
}