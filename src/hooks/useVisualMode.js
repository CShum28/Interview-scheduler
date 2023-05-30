import { useState, useEffect } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  function transition(newValue, replace = false) {
    if (replace === false) {
      console.log(history);
      setHistory((historyArr) => [...historyArr, newValue]);
      // history.push(newValue) // This works as well
    }
    setMode(newValue);
  }
  function back() {
    console.log("current history: " + history);
    if (history.length > 1) {
      history.pop();
      setMode(history[history.length - 1]);
      console.log(`new history: ` + history);
    }
  }

  return { mode, transition, back };
}
