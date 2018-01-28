const doStep = (state) => {
    let newState;
    switch (state.direction) {
        case 'right': newState = {...state, x: state.x + 1}
            break
        case 'left': newState = {...state, x: state.x - 1}
            break
        case 'up': newState = {...state, y: state.y + 1}
            break
        case 'down': newState = {...state, y: state.y - 1}
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
    module.exports.doStep = doStep;
}
