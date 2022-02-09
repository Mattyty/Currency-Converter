import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {timeout, convertedAmount} from "../store/actions";

const Timer =({amount, newAmount, from, to})=>{
    const dispatch = useDispatch();
    const [timeLeft, setTimeLeft] = useState(3);
    const timeOut = useSelector((state) => state.TimeOutReducer.timeOut);

    useEffect(() => {
        // exit early when we reach 0
        if (timeLeft === -1){
            dispatch(timeout(false));
            dispatch(convertedAmount(0.00));
        };

        // save intervalId to clear the interval when the
        // component re-renders
        const intervalId = setInterval(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);


        return () => clearInterval(intervalId);
    }, [timeLeft, timeOut]);

    return (
        <div className="mt-4">
            <p>{'This rate expires in ' + timeLeft + ' ' + 'seconds'}</p>
            <p>{amount + ' ' + from + ' is equivalent to '}</p><h6>{newAmount}</h6><p>{ ' ' + to}</p>
        </div>
    );
}

export default Timer;
