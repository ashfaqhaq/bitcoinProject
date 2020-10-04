// import React from 'react'
import React, { useState, useEffect } from "react";
import { useCountUp } from 'react-countup';
import { Line } from "react-chartjs-2";
import 'antd/dist/antd.css';
import { Select } from 'antd';
import { Space } from 'antd';
import { blue } from '@ant-design/colors';
import { PageHeader } from 'antd';

import "./App.css";
import supported_currencies from "./data/currency";
import GraphComponent from './GraphComponent'
import { Row, Col, Divider } from 'antd';

const style = { background: '#0092ff', padding: '8px' , margin: '8px' };


const { Option } = Select;



function onBlur() {
  console.log('blur');
}

function onFocus() {
  console.log('focus');
}

function onSearch(val) {
  console.log('search:', val);
}










const AppNew = () => {
  const [usd, setUSD] = useState([])
  const [currency, setCurrency] = useState([])
  const [selection, setSelection] = useState('')
  const [historical, setHistorical] = useState({ historical_key: [], historical_value: [] })
  const [convert_rate, setConvertRate] = useState(1)


  
  const handleChange = (value) => {
    setSelection(value)
  };


  useEffect(() => {
    const code = selection ? selection : "USD"
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
        if (code !== 'USD') {


          const base = Object.values(data.bpi)[1];
          // console.log(base);
          const rate = base.rate / USD.rate_float;
          setCurrency(base)
          setConvertRate(rate)
        }
      })
      .catch((err) => console.log(err));

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
  }, [convert_rate, selection])



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
    <div className="bg">
    
    {//} <PageHeader
  //   className="site-page-header"
  //   title="Live BTC Price"
   
  //   subTitle="This is a subtitle"
  // />
    }
  <div className="content container">
    <div className="currency">
    
  <Space size={20}>
        {selection ?
        <div> {currency.rate}</div> : <div>{usd.rate_float}</div>}
    
       
    </Space>
    </div>
    <div  className="currency desc">
      
      {selection ?
        <div className="text"> {currency.description}</div> : <div  className="text">{usd.description}</div>}
        <div className="select text">
          <Select
            showSearch
            style={{ backgroundColor: 'blue' , width: 200}}
            // dropdownStyle={{ backgroundColor: transparent }}
            placeholder="Choose your native currency"
            optionFilterProp="children"
            onChange={handleChange}
            onFocus={onFocus}
            onBlur={onBlur}
            onSearch={onSearch}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >{supported_currencies.map((items) => (
            <Option value={items.currency}>{items.country}</Option>
          ))
            }
            Select your currency!
          </Select>
            
        </div>

      </div>

      <GraphComponent data={graphData} />

    </div>
    </div>
  )
}







export default AppNew
