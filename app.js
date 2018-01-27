const express = require('express')
const app = express()
var bodyParser = require('body-parser')
const co = require('co')

app.use(bodyParser.json())

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

let state = false;

app.get('/state', (req, res) => res.json({ state: state }))

app.listen(3000, () => console.log('Example app listening on port 3000!'))


co(function* () {
    while (true) {
        yield waitSeconds(1);
        flipState()
    }
})

function waitSeconds(secondsToWait) {
    return new Promise(resolve => setTimeout(resolve, secondsToWait * 1000))
}

function flipState() {
    state = !state
}
