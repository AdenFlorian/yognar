const doStep = (state) => {
    let newState = {...state}
    switch (state.direction) {
        case 'right': newState.x++
            break
        case 'left': newState.x--
            break
        case 'up': newState.y++
            break
        case 'down': newState.y++
            break
        default: throw 'bad direction'
    }
    if (newState.x >= 10 || newState.x <= 0 || newState.y >= 10 || newState.y <= 0) {
        newState.x = 5
        newState.y = 5
    }
    return newState
}

if (typeof window === 'undefined') {
    module.exports.doStep = doStep
}
