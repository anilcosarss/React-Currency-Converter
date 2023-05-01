import React, { useState } from 'react';
import { FaArrowDown } from "react-icons/fa";

function CurrencyInput({ symbols = [], result, selectedTo, setSelectedTo, selectedFrom, setSelectedFrom, amount, setAmount, setResult, isDisabled, setIsDisabled }) {

  var myHeaders = new Headers();
  myHeaders.append("apikey", "pWBr9IVSo9J4ubcLPckjRJTo5OiPh1ty");

  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
  };
  const handleConvert = () => {
    setIsDisabled(true);

    setTimeout(() => {
      setIsDisabled(false);
      const fetchData = async () => {
        try {
          const response = await fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${selectedTo}&from=${selectedFrom}&amount=${amount}`, requestOptions);
          const result = await response.json();
          console.log(result);
          setResult(result.result)
        } catch (error) {
          console.log('error', error);
        }
      };

      fetchData();


    }, 5000);

  }


  const formattedNumber = result.toLocaleString('tr-TR');
  console.log(formattedNumber)

  return (

    <div>
  
      {
        isDisabled &&
        <div className="spinner-container flex items-center justify-center flex-col my-10">
          <div className="loading-spinner">
          </div>
          <p className='mt-5 text-3xl text-white'>Loading...</p>
        </div>
        ||

      <div className="border-4 border-gray-800 rounded-xl inline-block py-5 px-5 w-1/4 mt-5 bg-gray-800">
        <div className="flex  items-center justify-center my-5 gap-5">
          <input placeholder='Amount' type="number" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 w-24 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' value={amount} onChange={e => setAmount(e.target.value)} />
          <select className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' value={selectedFrom} onChange={(event) => setSelectedFrom(event.target.value)} >
            {symbols.map((symbol, index) => (

              <option key={index} >{symbol}</option>

            ))}
          </select>
        </div>

        <div>
          <FaArrowDown className=' mx-auto my-5 text-5xl text-sky-900	' />
        </div>

        <select className='bg-gray-50 border mx-auto border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' value={selectedTo} onChange={(event) => setSelectedTo(event.target.value)}  >
          {symbols.map((symbol, index) => (

            <option key={index}>{symbol}</option>

          ))}
        </select>
      </div>

      }




      <div className="my-5">
        <button disabled={isDisabled} onClick={handleConvert} className='bg-gray-50 border mx-auto border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>Convert</button>
      </div>

      <div className={`${isDisabled ? 'hidden' : 'block'}`}>
        <h2 className='text-white text-3xl'> Equals to <span className='border-b-2 ms-3'>{`${formattedNumber} ${selectedTo}`}</span>  </h2>
      </div>


    </div>
  )
}

export default CurrencyInput;