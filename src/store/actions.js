export const timeout = payload => {
    return {
        type: "TIMER",
        payload: payload
    };
};

export const convertedAmount = payload => {
    return {
        type: "TOTAL_SUM",
        payload: payload
    };
};




