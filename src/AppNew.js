// import React from 'react'
import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";

import "./App.css";
import supported_currencies from "./data/currency";

import GraphComponent from './GraphComponent'







  const Curency = () => {
        const listItems = supported_currencies.map((items) => (
      <option value={items.currency}>{items.country}</option>
    ));
    return listItems;
  };
  

const  AppNew = () => {
    const [usd, setUSD] = useState([])
    const [currency, setCurrency] = useState([])
    const [selection, setSelection] = useState('')
    const [historical, setHistorical] = useState({historical_key: [],historical_value: []})
    const [convert_rate,setConvertRate]= useState(1)

    

    const Curency = () => {
      
    
      const listItems = supported_currencies.map((items) => (
        <option value={items.currency}>{items.country}</option>
      ));
      return listItems;
    };
   const handleChange = (e) => {
      // console.log(selection);
      
        setSelection(e.target.value)
    
      // console.log(this.state.temp_input);
    };
    
    

    useEffect(() => {
      const code =  selection ? selection : "USD"
      // console.log(code);


     
        //  const code = "USD";
         fetch(`https://api.coindesk.com/v1/bpi/currentprice/${code}.json`)
           .then((resp) => resp.json())
          // .then(data=>console.log(data))
           .then((data) => {
             console.log(data)
             const USD = data.bpi.USD;
             setUSD(USD)
            // console.log(data.bpi)
            //  console.log(data.bpi.USD);
            if (code!=='USD'){
              

              const base = Object.values(data.bpi)[1];
            // console.log(base);
            const rate = base.rate / USD.rate_float;
            setCurrency(base)
            setConvertRate(rate)
            }})
            .catch ((err)=>console.log(err));
        
    var todayDate = new Date().toISOString().slice(0, 10);
    console.log(todayDate);
    fetch(
      `https://api.coindesk.com/v1/bpi/historical/close.json?end=${todayDate}`
    )
      .then((resp) => resp.json())
      // .then(data=>console.log(data.bpi))
      .then((data) => {
        var historical_key = [],
          historical_value = [];
        // console.log(data.bpi);
        var newData = data.bpi;
        console.log(newData);
        for (var property in newData) {
          if (!newData.hasOwnProperty(property)) {
            continue;
          }

          historical_key.push(property);
          // alert(convert_rate)
          
            historical_value.push(newData[property]);
        // historical_value.push(newData[property] * convert_rate)        
      }
      
       setHistorical({
          historical_key,
          historical_value
        })
       

      });

    

            // console.log(Object.values(data.bpi)[1])
            
            // const convert_rate = base.rate_float / USD.rate_float;
            // console.log(base.rate);
            // console.log(USD);
            // console.log(convert_rate);
             
             
            //  setCon
        //      console.log(USD)
            
          
         return () => {
           
         }
     },[convert_rate, selection])



     const graphData = {
      labels: historical.historical_key,
      datasets: [
        {
          label: "1 BTC ",
          fill: false,
          lineTension: 0.5,
          backgroundColor: "rgba(75,192,192,1)",
          // borderColor: 'rgba(0,0,0,1)',
          borderColor: `rgb(125,102,100,1)`,
          borderWidth: 2.5,
          data: historical.historical_value
        }
      ]
    };

    return (
        <div>

        <h1>   {selection ? 
          <div> {currency.rate }</div>:<div>{usd.rate_float}</div>}
          </h1>
          <div className="d-flex justify-content-center mx-2 p-2 ">
          <select value={setSelection} onChange={handleChange}>
            {/* <select id ="country" value={this.state.temp_input} onChange={this.handleChange}  > */}
            <option value="" disabled>
              Select an option
            </option>

            <Curency />
          </select>

          <GraphComponent data={graphData} />
        </div>
            
                  
        </div>
    )
}







export default AppNew
