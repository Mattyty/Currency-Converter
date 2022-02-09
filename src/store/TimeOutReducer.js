const initialState = {
    timeOut: false
};

export default function inputState(state = initialState, action) {
    if (action.type === 'TIMER') {
        return {
            timeOut: action.payload
        }
    } else {
        return state

    }
}
