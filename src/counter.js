import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import CounterValue from './counterValue';
const Value = createContext();
const UseStateCounter = () => {
  const [initialValue, setInitialValue] = useState(1);
  const [isLoading, setLoading] = useState(true)
  useEffect(() => {

    const sendGetRequest = async () => {
      try {
        const resp = await axios.get('https://interview-8e4c5-default-rtdb.firebaseio.com/front-end/prashant.json');
        console.log(resp.data);
        if (resp.data) {
          setInitialValue(Number(resp.data));
        }
      } catch (err) {
        console.log(err);
      }
    }
    sendGetRequest();
  }, []);

  const [value, setValue] = useState(initialValue);
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);
  useEffect(() => {
    const item = { "prashant": value };
    const sendPutRequest = async () => {
      try {
        setLoading(true);
        const resp = await axios.put('https://interview-8e4c5-default-rtdb.firebaseio.com/front-end.json', item);
        console.log(resp.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    sendPutRequest();
  }, [value]);

  const Loader = ({ isLoading }) => {
    return isLoading ? (
      <>

        <div className='loader'></div>
        <div className='saving'>Saving counter value</div>

      </>
    ) : (
      <></>
    )
  }
  const Increase = () => {
    setTimeout(() => {
      setValue((prevState) => {
        return prevState + 1;
      });
    }, 1000);
    if (value > 999) {
      alert("maximum limit reached.");
      setValue(0);
    }

  };
  const Decrease = () => {
    setTimeout(() => {
      setValue((prevState) => {
        return prevState - 1;
      });

    }, 1000);
  };
  return (
    <>

      <section>
        <div className="loaderSaver">
          <Loader isLoading={isLoading} />
        </div>
        <button className='btn btn1' onClick={Decrease}>
          -
        </button>
        <button className='btn'>
          <input type="number"
            className='btn2'
            onChange={(e) => setValue(Number(e.target.value))}
            value={value}
          />
        </button>
        <button className='btn btn3' onClick={Increase}>
          +
        </button>
        <Value.Provider value={value}>
          <CounterValue />
        </Value.Provider>
      </section>

    </>
  );
};

export default UseStateCounter;
export { Value };