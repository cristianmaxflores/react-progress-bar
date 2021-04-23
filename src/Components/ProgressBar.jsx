import React, { Component } from "react";
import "./ProgressBar.css"
import { BUTTON_ACTIONS, INTERVAL_TIME, MAX_LENGTH } from "./constants"

class ProgressBar extends Component {

  state = {
    maxLength: MAX_LENGTH,
    counter: 0,
    isRunning: false
  };

  renderBar = () => {
    const { counter, maxLength } = this.state
    let i = 1;
    const bar = [];
    while (i <= maxLength) {
      bar.push(<li key={i} className={i <= counter ? "active" : "inactive"}></li>);
      i++;
    }
    return bar
  };

  handleCounter = (e) => {
    const action = e.target.name;
    const { isRunning, maxLength } = this.state
    if (action === BUTTON_ACTIONS.START) {
      if (!isRunning) {
        this.setState({ isRunning: true })
        this.intervalRef = setInterval(() => {
          let currentValue;

          this.setState(prevState => {
            const nextValue = prevState.counter + 1
            currentValue = nextValue;
            return {
              counter: nextValue
            }
          })

          if (currentValue === maxLength) {
            clearInterval(this.intervalRef)
          }
        }, INTERVAL_TIME)
      }
    } else {
      clearInterval(this.intervalRef)
      if (action === BUTTON_ACTIONS.STOP) {
        this.setState({ isRunning: false })
      } else if (action === BUTTON_ACTIONS.RESET) {
        this.setState({ isRunning: false, counter: 0 })
      }
    }
  }

  render() {
    return (
      <div className="container centered">
        <h3 className="title">Progress Bar</h3>
        <ul className="progressBar">
          {this.renderBar()}
        </ul>
        <div className="buttonGroup">
          <button name={BUTTON_ACTIONS.START} onClick={this.handleCounter}> Start </button>
          <button name={BUTTON_ACTIONS.STOP} onClick={this.handleCounter}> Stop </button>
          <button name={BUTTON_ACTIONS.RESET} onClick={this.handleCounter}> Reset </button>
        </div>
      </div>
    );
  }
}

export default ProgressBar