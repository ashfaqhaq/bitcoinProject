// import React from 'react'
import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
// import 'antd/dist/antd.css';
// import { Select } from 'antd';
import "./App.css";
import supported_currencies from "./data/currency";
import GraphComponent from './GraphComponent'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));


  const Curency = () => {
        const listItems = supported_currencies.map((items) => (
      <MenuItem value={items.currency}>{items.country}</MenuItem>
    ));
    return listItems;
  };
  const Curenncy = () => {
    const listItems = supported_currencies.map((items) => (
  <option value={items.currency}>{items.country}</option>
));
return listItems;
};
  

const  AppNew = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
    const [usd, setUSD] = useState([])
    const [currency, setCurrency] = useState([])
    const [selection, setSelection] = useState('')
    const [historical, setHistorical] = useState({historical_key: [],historical_value: []})
    const [convert_rate,setConvertRate]= useState(1)

    

    
   const handleChange = (e) => {
      // console.log(selection);
     
        setSelection(e.target.value)
    
      // console.log(this.state.temp_input);
    };
    
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleOpen = () => {
      setOpen(true);
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
         
          <div>
      <Button className={classes.button} onClick={handleOpen}>
        Open the select
      </Button>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">Age</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={setSelection}
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
        {  supported_currencies.map((items) => (
            <MenuItem value={items.currency}>{items.country}</MenuItem>
          ))
        }
        </Select>
      </FormControl>
    </div> 

    <Button color="primary">Hello World</Button>
        </div>
        
           <GraphComponent data= {graphData} /> 
                  
        </div>
    )
}







export default AppNew
