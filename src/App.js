import React, { useState, useEffect } from 'react';
import './App.css';
import CurrencyInput from './Components/CurrencyInput';


const myHeaders = new Headers();
myHeaders.append("apikey", "KL3DluYlFALn9ce6Lrw4PhoyOE6J1bBKpjke0CvT");

const requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};
function App() {
  const [symbols, setSymbols] = useState([]);
  const [selectedTo, setSelectedTo] = useState('TRY');
  const [selectedFrom, setSelectedFrom] = useState('USD');
  const [amount, setAmount] = useState(0);
  const [result, setResult] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    fetch("https://api.freecurrencyapi.com/v1/latest", requestOptions)
      .then(response => response.json())
      .then(data => {
        setSymbols([...Object.keys(data.data)]);
      })
      .catch(error => console.log('error', error));
  }, []);


  return (
    <div className="App bg-sky-950 min-h-screen ">
      <h1 className=' rounded-xl text-5xl text-white font-bold bg-sky-900 inline-block px-5 py-3 mt-10'>Convert</h1>
      <CurrencyInput
        symbols={symbols}
        selectedTo={selectedTo}
        setSelectedTo={setSelectedTo}
        selectedFrom={selectedFrom}
        setSelectedFrom={setSelectedFrom}
        amount={amount}
        setAmount={setAmount}
        setResult={setResult}
        isDisabled={isDisabled}
        setIsDisabled={setIsDisabled}
        result={result}
        
      />
    </div>
  );
}

export default App;
