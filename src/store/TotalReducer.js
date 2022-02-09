const initialState = {
    newSum: 0.00
};

export default function inputState(state = initialState, action) {
    if (action.type === 'TOTAL_SUM') {
        return {
            newSum: action.payload
        }
    } else {
        return state

    }
}
