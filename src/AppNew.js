// import React from 'react'
import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";

import "./App.css";
import supported_currencies from "./data/currency";

// const [state, setState] = useState({temp_input:'',base:[]})
// const [input, setInput] = useState('')
// const [usd, setUSD] = useState([])
// const [base, setBase] = useState([])
// const [convert, setConvert] = useState('')
// const [historical, setHistorical] = useState({historical_key: [],historical_value: []})





// const Graph = (props) => {
//     console.log(props.data);
//     // console.log()
//     return (
//       <Line
//         data={props.data}
//         options={{
//           title: {
//             display: true,
//             text: "Bitcoin",
//             fontSize: 20
//           },
//           legend: {
//             display: true,
//             position: "right"
//           }
//         }}
//       />
//     );
//   };

  const Curency = () => {
        const listItems = supported_currencies.map((items) => (
      <option value={items.currency}>{items.country}</option>
    ));
    return listItems;
  };
  

const  AppNew = () => {
    const [usd, setUSD] = useState([])
    const [currency, setCurrency] = useState([])
    // const [reload, setReload] = useState(true)
    const [selection, setSelection] = useState('')
    const [temp_input, setTempInput] = useState(false)
    // const [code,]

    const handleSubmit = () =>{
        console.log('asdasd');
        // setUSD()
        // setReload(!reload)
        setSelection('INR')
        setTempInput(true)
    }


    // handleSsubmit = (e) => {
    //     e.preventDefault();
    //     // console.log(e.target.value)
    //     console.log(this.state);
    //     const code = this.state.temp_input;
    //     fetch(`https://api.coindesk.com/v1/bpi/currentprice/${code}.json`)
    //       // fetch("https://v6.exchangerate-api.com/v6/6948efe6212cdb78c881a754/latest/USD")
    //       .then((resp) => resp.json())
    
    //       // .then( => console.log(js))
    //       .then((data) => {
    //         console.log(data);
    //         // const nw=this.state.bas
    //         console.log(data.bpi);
    //         const base = Object.values(data.bpi)[1];
    //         const USD = data.bpi.USD;
    //         const convert_rate = base.rate_float / USD.rate_float;
    //         console.log(base);
    //         console.log(USD);
    //         console.log(convert_rate);
    //         this.setState({
    //           base,
    //           USD,
    //           convert_rate
    //         });
    //       });
    //   };

    useEffect(() => {
      const code =  temp_input ? selection : "USD"
      console.log(code);
        //  const code = "USD";
         fetch(`https://api.coindesk.com/v1/bpi/currentprice/${code}.json`)
           .then((resp) => resp.json())
          // .then(data=>console.log(data))
           .then((data) => {
             console.log(data)
             const USD = data.bpi.USD;
            // console.log(data.bpi)
            //  console.log(data.bpi.USD);
            
            // console.log(Object.values(data.bpi)[1])
            const base = Object.values(data.bpi)[1];
            // const USD = data.bpi.USD;
            
            // const convert_rate = base.rate_float / USD.rate_float;
            // console.log(base.rate);
            // console.log(USD);
            // console.log(convert_rate);
             setUSD(USD)
             setCurrency(base.rate)
        //      console.log(USD)
            
           })
           .catch ((err)=>console.log(err));

         return () => {
         }
     },[temp_input, selection])
     

    return (
        <div>
        <h1>   {temp_input ? 
          <div> {currency}</div>:<div>{usd.rate_float}</div>}
          </h1>
          
            <button
                    className="btn btn-outline-success pl-2 ml-2 text-white "
                    type="submit"
                    value="Submit"
                    onClick={handleSubmit}
                  >
                    Submit

                  
                    
                  </button>
                  
        </div>
    )
}







export default AppNew
