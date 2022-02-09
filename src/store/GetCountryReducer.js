const initialState = {
    countries: ''
};

export default function countryReducer(state = initialState, action) {
    if (action.type === 'SET_LIST') {
        return {
            ...state,
            countries: action.payload
        }
    }
    if (action.type === 'RESET_DATA') {
        return {
            countries: null
        }
    } else {
        return state
    }
}