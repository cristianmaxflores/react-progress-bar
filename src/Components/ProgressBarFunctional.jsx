import React, { useState, useEffect } from "react";
import "./ProgressBar.css";
import { BUTTON_ACTIONS, INTERVAL_TIME, MAX_LENGTH } from "./constants";

const Component = () => {

    const maxLength = MAX_LENGTH;
    const [counter, setCounter] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        if(isRunning){
            const intRef = setInterval(() => {
                setCounter(counter => counter + 1);
            }, INTERVAL_TIME);

            return () => clearInterval(intRef);
        }
    }, [isRunning]);

    const renderBar = () => {
        let i = 1;
        const bar = [];
        while (i <= maxLength) {
            bar.push(<li key={i} className={i <= counter ? "active" : "inactive"}></li>);
            i++;
        }
        return bar;
    };

    const handleCounter = (e) => {
        const action = e.target.name;
        if (action === BUTTON_ACTIONS.START) {
            if (!isRunning) {
                setIsRunning(true);
            }
        } else {
            setIsRunning(false);
            if (action === BUTTON_ACTIONS.RESET) {
                setCounter(0);
            }
        }
    };

    return (
        <div className="container centered">
            <h3 className="title">Progress Bar</h3>
            <ul className="progressBar">
                {renderBar()}
            </ul>
            <div className="buttonGroup">
                <button name={BUTTON_ACTIONS.START} onClick={handleCounter}> Start </button>
                <button name={BUTTON_ACTIONS.STOP} onClick={handleCounter}> Stop </button>
                <button name={BUTTON_ACTIONS.RESET} onClick={handleCounter}> Reset </button>
            </div>
        </div>
    );
};

export default Component;
