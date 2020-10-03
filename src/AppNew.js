// import React from 'react'
import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import 'antd/dist/antd.css';
import { Select } from 'antd';
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
    <div>
    <PageHeader
    className="site-page-header"
    title="Live BTC Price"
   
    subTitle="This is a subtitle"
  />
    <Divider>Responsive</Divider>
    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
      <Col className="gutter-row" span={6}>
        <div style={style}>{selection ?
          <div> {currency.rate}</div> : <div>{usd.rate_float}</div>}</div>
      </Col>
      
    </Row>
    
      <h1>   {selection ?
        <div> {currency.rate}</div> : <div>{usd.rate_float}</div>}
      </h1>
      <h2>   {selection ?
        <div> {currency.description}</div> : <div>{usd.description}</div>}
      </h2>
      <div className="d-flex justify-content-center mx-2 p-2 ">

        <div>
          <Select
            showSearch
            style={{ width: 200 }}
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

          </Select>

        </div>

      </div>

      <GraphComponent data={graphData} />

    </div>
  )
}







export default AppNew
