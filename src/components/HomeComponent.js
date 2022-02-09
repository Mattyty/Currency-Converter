import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {fetchCountries} from '../store/GetCountryAPIAction';
import {data} from "./data";
import {Button, Container, CardBody, CardTitle, Card, Row, Col} from 'reactstrap';
import Timer from "./TimerComponent";
import {convertedAmount, timeout} from "../store/actions";
import DropDownComponent from "./DropDownComponent";
import { HiSwitchHorizontal } from 'react-icons/hi';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
    const dispatch = useDispatch();
    const country = useSelector((state) => state.GetCountryReducer.countries);
    const timeOut = useSelector((state) => state.TimeOutReducer.timeOut);
    /*    const totalSum = useSelector((state) => state.TotalReducer.newSum);*/
    const [amount, setAmount] = useState(0.00);
    const [newAmount, setNewAmount] = useState('');
    const [from, setFrom] = useState('');
    const [fromRate, setFromRate] = useState('');
    const [to, setTo] = useState('');
    const [toRate, setToRate] = useState('');
    const [toCode, setToCode] = useState('');
    const [options, setOptions] = useState([]);
    const ratesList = [];

        console.log("FROMMMMMMMMMM", from)
        console.log("TOOOOOOOOOOOOO", to)
        console.log("FROOOOOOOOMMMMMRate", fromRate)
        console.log("TOOOOOOOOOOOOORate", toRate)

    useEffect(() => {
        dispatch(fetchCountries())
    }, []);

    useEffect(() => {
        if (timeOut === false) {
            setNewAmount(0)
        }
    }, [timeOut]);

    // Calling the convert function whenever
    // a user switches the currency
    useEffect(() => {
        setOptions(Object.entries(country));
        applyRate();
    }, [country, to, from, fromRate, toRate, timeOut, setAmount]);


    // Function to convert the currency
    function applyRate() {
        const entries = Object.entries(data);      // Here I am converting the 'Rates' data into an array.
        entries.forEach(function (element, key) {   // This could have been done when hard coding the data into the separate data.js sheet,
            ratesList.push(element);              // but I wanted to keep the test as close to reality as possible.
        });
        ratesList.map((key) => {
            const currencyString = JSON.stringify(key);                                      // Map of currency list
            const countryStringFrom = JSON.stringify(from);
            const countryStringTo = JSON.stringify(to);                                     //2nd input box
            const currencyCode = currencyString.substring(2, 5);                           //currency list's country codes
            const currencyRate = currencyString.substring(7, currencyString.length - 1);
            /*            console.log("CURRENCYRATE", currencyRate);*/
            const countryCodeFrom = countryStringFrom.substring(1, 4);                       //1st input country code
            const countryCodeTo = countryStringTo.substring(1, 4);                          //currency lists' rates
            /*console.log("currencyString", currencyString);
            console.log("countryStringFrom", countryStringFrom);
            console.log("countryStringTo", countryStringTo);
            console.log("currencyCode", currencyCode);
            console.log("currencyRate", currencyRate);
            console.log("countryCodeFrom", countryCodeFrom);
            console.log("countryCodeTo", countryCodeTo);*/
            if (countryCodeFrom === currencyCode) {
                setFromRate(currencyRate)
            }
            if (countryCodeTo === currencyCode) {
                setToRate(currencyRate);
                setToCode(countryCodeTo);
            }
        });
    }


    function convert() {
        if ((fromRate !== '') && (toRate !== '')) {
            const rate1Int = parseFloat(fromRate);
            const rate2Int = parseFloat(toRate);
            const inputAmountInt = parseFloat(amount);
            const inputAmount = rate1Int * inputAmountInt;
            const totalSum = inputAmount * rate2Int;
            console.log("rate1Int", rate1Int);
            console.log("rate2Int", rate2Int);
            console.log("totalSum", totalSum);
            console.log("inputAmountInt", inputAmountInt);
            /*            console.log("inputAmount", inputAmount);*/
            /*            console.log("startingRate", startingRate);*/
            setNewAmount(totalSum);
            beginTimer();
        }
    }

    // Function to switch between two currency
    function flip() {
        let temp = from;
        let tempRate = fromRate;
        setFrom(to);
        setTo(temp);
        setFromRate(toRate)
        setToRate(tempRate)
    }

    function beginTimer() {
        dispatch(timeout(true))
    }


    function isNumber() {

        if (isNaN(amount)) {
            console.log("HELP", amount)
            toast.error("Whoops! Please enter a valid amount: " + amount);
            setAmount(0)
        } else {
            console.log("HELP2", amount)
            convert();
        }
    }


    const handleFromChange = (event) => {
        console.log("EVERNTTTTTTTTTTT", event)
        setFrom(event.target.value);
    };

    const handleToChange = (event) => {
        console.log("EVERNTTTTTTTTTTT2222222222222222222", event)
        setTo(event.target.value);
    };

    return (
        <div>
            <Container>
                <ToastContainer
                    position="top-right"
                    autoClose={2500}
                    hideProgressBar={true}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    draggable
                    pauseOnHover={false}
                    type="warning"/>
                <form>
                    <Card className={'text-center shadow bg-gradient hover mt-5'} style={{cursor: 'pointer'}}>
                        <CardBody>
                            <CardTitle
                                style={{
                                    fontWeight: 'bold',
                                    fontSize: '1.5em',
                                }}>
                                <h2>Currency Converter:</h2>
                            </CardTitle>
                            <CardTitle
                                style={{
                                    fontWeight: 'bold',
                                    fontSize: '1.5em',
                                }}>

                                {/*<p>{totalSum + ' ' + currencyCodeTwo}</p>*/}
                                <h1 className="mt-3 mb-3">{newAmount + ' ' + toCode}</h1>

                            </CardTitle>
                            <Row>
                                <Col xs={4}>
                                    Amount:
                                </Col>
                                <Col xs={3} className="pb-3">
                                    From:
                                </Col>
                                <Col xs={1}></Col>
                                <Col xs={3}>
                                    To:
                                </Col>

                            </Row>
                            <Row>
                                <Col xs={4}>
                                    {/*                                <input
                                        id='amount'
                                        autoFocus='autofocus'
                                        className='inputBox'
                                        value={inputAmount}
                                        onChange={(e) => setInputAmount(e.target.value)}
                                        placeholder=' Enter Amount:'
                                        type="number"
                                    />*/}
                                    <input type="text"
                                           placeholder="Enter your amount..."
                                           onChange={(e) => setAmount(e.target.value)} className="currency-input" autoFocus />
                                </Col>
                                <Col xs={3}>
                                    <DropDownComponent
                                        options={options}
                                        onChange={handleFromChange}
                                        value={from} placeholder="From"/>
                                </Col>
                                <Col xs={1}>
                                    <HiSwitchHorizontal size="30px" onClick={() => {
                                        flip()}} className="switch-btn"/>
                                </Col>
                                <Col xs={3}>
                                    <DropDownComponent
                                        options={options}
                                        onChange={handleToChange}
                                        value={to} placeholder="To"/>
                                </Col>
                            </Row>

                            <Button onClick={() => {
                                isNumber()
                            }} className="mt-5 btn-info">Convert</Button>
                            <div>
                                {timeOut ? <Timer amount={amount} newAmount={newAmount} from ={from} to={to}/> : ''}
                            </div>
                        </CardBody>
                    </Card>
                </form>
                <img src="../components/images/coop.png" alt="logo"/>
            </Container>
            {/*            <div className="heading">
                <h1>Currency converter</h1>
            </div>
            <div className="container">
                <div className="result">
                    <h2>Converted Amount:</h2>
                                    <p>{amount+" "+from+" = "+output.toFixed(2) + " " + to}</p>
                    <h1>{amount + ' ' + toCode}</h1>

                </div>
                <div className="left">
                    <h3>Amount</h3>
                    <input type="text"
                           placeholder="Enter the amount"
                           onChange={(e) => setAmount(e.target.value)} />
                </div>
                <div className="middle">
                    <h3>From</h3>
                    <DropDownComponent
                                       options={options}
                                       onChange={handleFromChange}
                                       value={from} placeholder="From"/>


                </div>
                <div className="switch">
                    <Button size="30px"
                            onClick={() => { flip()}}>Switch</Button>
                </div>
                <div className="right">
                    <h3>To</h3>
                    <DropDownComponent
                              options={options}
                              onChange={handleToChange}
                              value={to} placeholder="To"/>
                </div>
            </div>
            <button onClick={()=>{convert()}}>Convert</button>
            {timeOut ? <Timer/> : ''}*/}
        </div>
    );
}

export default Home;