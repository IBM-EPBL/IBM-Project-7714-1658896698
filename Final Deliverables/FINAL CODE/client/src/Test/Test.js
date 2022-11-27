/* eslint-disable no-unused-vars */
/* eslint-disable no-unreachable */
import React, {useState,useEffect} from 'react';

function Test() {

  const [prediction, setPrediction] = useState([]);
  const [score, setScore] = useState([]);
  const [test, setTest] = useState([]);

  useEffect(() => {
      fetch("/benchedPrediction").then((res) =>
          res.json().then((val) => {
            setPrediction(val)          
          })
      );

      fetch("/benchedScore").then((res) =>
          res.json().then((val) => {
            setScore(val)
          })
      );

      fetch("/search").then((res) =>
          res.json().then((val) => {
            setTest(val)          
          })
      );
      
  }, []);

  
  return (
    <div className="App">
        {prediction}
    </div>
  );
  setPrediction([])
  setScore([])
}

export default Test

