import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  function transition(newValue, replace = false) {
    if (replace === false) {
      setHistory((historyArr) => [...historyArr, newValue]);
    }
    setMode(newValue);
  }
  function back() {
    if (history.length > 1) {
      const historyCopy = [...history]; // this makes a copy - does not touch initial history
      historyCopy.pop();
      setHistory(historyCopy);
      setMode(historyCopy[historyCopy.length - 1]);
    }
  }

  return { mode, transition, back };
}
