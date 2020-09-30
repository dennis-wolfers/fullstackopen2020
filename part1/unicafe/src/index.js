import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = (props) => (
  <div>
    <button onClick={props.handleClick}>{props.text}</button>
  </div>
);

const DisplayStat = (props) => (
  <>
    <tr>
      <td>{props.stat}</td>
      <td>{props.value}</td>
    </tr>
  </>
);

const Statistics = (props) => {
  if (props.good === 0 && props.neutral === 0 && props.bad === 0) {
    return (
      <div>
        <h1>statistics</h1>
        <p>no feedback has been given</p>
      </div>
    );
  }

  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <DisplayStat stat="Good" value={props.good} />
          <DisplayStat stat="Neutral" value={props.neutral} />
          <DisplayStat stat="Bad" value={props.bad} />
          <DisplayStat
            stat="Total"
            value={props.good + props.neutral + props.bad}
          />
          <DisplayStat
            stat="Average"
            value={avgFeedback(props.good, props.neutral, props.bad)}
          />
          <DisplayStat
            stat="Positive %"
            value={posFeedbackPerCent(props.good, props.neutral, props.bad)}
          />
        </tbody>
      </table>
    </div>
  );
};

function avgFeedback(pos, neut, neg) {
  const total = pos + neut + neg;
  return (pos + -neg) / total || 0;
}

function posFeedbackPerCent(pos, neut, neg) {
  const total = pos + neut + neg;
  return (pos / total) * 100 || 0;
}

const App = (props) => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const setGoodTo = (newGoodValue) => setGood(newGoodValue);
  const setNeutralTo = (newNeutralValue) => setNeutral(newNeutralValue);
  const setBadTo = (newBadValue) => setBad(newBadValue);

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGoodTo(good + 1)} text="Good" />
      <Button handleClick={() => setNeutralTo(neutral + 1)} text="Neutral" />
      <Button handleClick={() => setBadTo(bad + 1)} text="Bad" />

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
