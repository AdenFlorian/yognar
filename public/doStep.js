const common = {
    doStep: (state) => {
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
        if (newState.x >= state.gridSize || newState.x <= 0 || newState.y >= state.gridSize || newState.y <= 0) {
            newState.x = state.gridSize / 2
            newState.y = state.gridSize / 2
        }
        return newState
    },
    changeDirection: (state) => {
        return {...state, direction: newDirectionMap[state.direction]}
    }
}

const newDirectionMap = {
    left: 'up',
    right: 'down',
    up: 'right',
    down: 'left',
}

if (typeof window === 'undefined') {
    module.exports = common
}
