import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {timeout, convertedAmount} from "../store/actions";

const Timer =({amount, newAmount, from, to})=>{
    const dispatch = useDispatch();
    const [timeLeft, setTimeLeft] = useState(10);
    const timeOut = useSelector((state) => state.TimeOutReducer.timeOut);

    //sends flag to HomeComponent to stop counter when countdown passes 0
    useEffect(() => {
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
    }, [timeLeft, timeOut, dispatch]);

    return (
        <div className="mt-4">
            <p style={{color: "red"}}>{'This rate expires in ' + timeLeft + ' ' + 'seconds'}</p>
            <p>{amount + ' ' + from + ' is equivalent to '}</p><h5>{newAmount}</h5><p>{ ' ' + to}</p>
        </div>
    );
}

export default Timer;
