export const SET_LIST = "SET_LIST";

export const fetchCountries = () => {
    return async function (dispatch) {
        try {
            const result = await fetch('https://openexchangerates.org/api/currencies.json', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({})
            });
            if (!result.ok) {
                throw Error('Could not fetch currencies!');
            } else {
                const countries = await result.json();
                    dispatch({type: SET_LIST, payload: countries});
            }
        } catch (error) {
            console.log("ERROR", error)
        }
    };
};
