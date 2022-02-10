import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {fetchCountries} from '../store/GetCountryAPIAction';
import {data} from "./data";
import {Button, Container, CardBody, CardTitle, Card, Row, Col} from 'reactstrap';
import Timer from "./TimerComponent";
import {timeout} from "../store/actions";
import DropDownComponent from "./DropDownComponent";
import { HiSwitchHorizontal } from 'react-icons/hi';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
    const dispatch = useDispatch();
    const country = useSelector((state) => state.GetCountryReducer.countries);
    const timeOut = useSelector((state) => state.TimeOutReducer.timeOut);
    const [amount, setAmount] = useState(0.00);
    const [newAmount, setNewAmount] = useState('');
    const [from, setFrom] = useState('');
    const [fromRate, setFromRate] = useState('');
    const [to, setTo] = useState('');
    const [toRate, setToRate] = useState('');
    const [toCode, setToCode] = useState('');
    const [options, setOptions] = useState([]);
    const ratesList = [];

    //calls dropdown api on page load via redux
    useEffect(() => {
        dispatch(fetchCountries())
    }, []);

        //receives flag though redux that timer has finished. Resets converted amount to zero and hides
        // message at the bottom
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


    // Function to extract the conversion rates for each currency
    function applyRate() {
        const entries = Object.entries(data);      // Here I am converting the 'Rates' data into an array.
        entries.forEach(function (element, key) {   // This could have been done when hard coding the data into the separate data.js sheet,
            ratesList.push(element);              // but I wanted to keep the test as close to reality as possible.
        });
        ratesList.map((key) => {
            const currencyString = JSON.stringify(key);
            const countryStringFrom = JSON.stringify(from);
            const countryStringTo = JSON.stringify(to);
            const currencyCode = currencyString.substring(2, 5);
            const currencyRate = currencyString.substring(7, currencyString.length - 1);
            const countryCodeFrom = countryStringFrom.substring(1, 4);
            const countryCodeTo = countryStringTo.substring(1, 4);
            if (countryCodeFrom === currencyCode) {
                setFromRate(currencyRate)
            }
            if (countryCodeTo === currencyCode) {
                setToRate(currencyRate);
                setToCode(countryCodeTo);
            }
        });
        return null
    }

    // function to sum the conversion rates
    function convert() {
        if ((fromRate !== '') && (toRate !== '')) {
            const rate1Int = parseFloat(fromRate);
            const rate2Int = parseFloat(toRate);
            const inputAmountInt = parseFloat(amount);
            const inputAmount = inputAmountInt / rate1Int;
            const totalSum = inputAmount * rate2Int;
            setNewAmount(totalSum);
            beginTimer();
        } else{
            toast.error("Whoops! Please Choose Two Currencies");
        }
    }

    // Function to switch between two currencies and rates
    function flip() {
        let temp = from;
        let tempRate = fromRate;
        setFrom(to);
        setTo(temp);
        setFromRate(toRate)
        setToRate(tempRate)
    }

    //function to start timer via Redux
    function beginTimer() {
        dispatch(timeout(true))
    }

    //function to check if input is a number
    function isNumber() {
        if (isNaN(amount)) {
            toast.error("Whoops! Please enter a valid amount: " + amount);
            setAmount(0)
        } else {
            convert();
        }
    }

    // sets the 'from' currency
    const handleFromChange = (event) => {
        setFrom(event.target.value);
    };

    //sets the 'To' currency
    const handleToChange = (event) => {
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
                            <p>Total:</p>
                            <CardTitle
                                style={{
                                    fontWeight: 'bold',
                                    fontSize: '1.5em',
                                }}>
                                <h1 className="mt-3 mb-3">{newAmount + ' ' + toCode}</h1>

                            </CardTitle>

{/*                            ///stylingsfor large screen below*/}
                            <div className="d-none d-lg-block">
                            <Row>
                                <Col xs={3}>
                                    Amount:
                                </Col>
                                <Col xs={4} className="pb-3">
                                    From:
                                </Col>
                                <Col xs={1}></Col>
                                <Col xs={4}>
                                    To:
                                </Col>

                            </Row>
                            <Row>
                                <Col xs={3}>
                                    <input type="text"
                                           placeholder="Enter your amount..."
                                           onChange={(e) => setAmount(e.target.value)} className="currency-input" autoFocus />
                                </Col>
                                <Col xs={4}>
                                    <DropDownComponent
                                        options={options}
                                        onChange={handleFromChange}
                                        value={from} placeholder="From"/>
                                </Col>
                                <Col xs={1}>
                                    <HiSwitchHorizontal size="30px" onClick={() => {
                                        flip()}} className="switch-btn"/>
                                </Col>
                                <Col xs={4}>
                                    <DropDownComponent
                                        options={options}
                                        onChange={handleToChange}
                                        value={to} placeholder="To"/>
                                </Col>
                            </Row>
                            </div>
                           {/* /////Style for mobile below*/}
                            <div className="d-block d-lg-none" >
                                <Row className="mt-5">
                                    <label>Amount:</label>
                                </Row>
                                <Row className="mt-3">
                                    <input type="text"
                                           placeholder="Enter your amount..."
                                           onChange={(e) => setAmount(e.target.value)} className="currency-input mb-3" autoFocus/>
                                </Row>
                                <Row className="mt-3">
                                    <label> From:</label>
                                    <DropDownComponent
                                        options={options}
                                        onChange={handleFromChange}
                                        value={from} placeholder="From"/>
                                </Row>
                                <Row>
                                    <HiSwitchHorizontal size="30px" onClick={() => {
                                        flip()}} className="switch-btn mt-3"/>
                                </Row>
                                <Row className="mt-3">
                                    <label>To:</label>
                                    <DropDownComponent
                                        options={options}
                                        onChange={handleToChange}
                                        value={to} placeholder="To"/>
                                </Row>
                            </div>
                            <Button onClick={() => {
                                isNumber()
                            }} className="mt-5 btn-info">Convert</Button>
                            <div>
                                {timeOut ? <Timer amount={amount} newAmount={newAmount} from ={from} to={to}/> : ''}
                            </div>
                        </CardBody>
                    </Card>
                </form>
            </Container>
            <img src="../images/co.png" alt="logo" style={{height: '50px', width: '50px'}} className="img-logo"/>
        </div>
    );
}

export default Home;