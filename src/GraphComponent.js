import React, {  } from "react";
import { Line } from "react-chartjs-2";
import './index.css'

const GraphComponent = (props) => {
    return (
      <div className="accent">
     
      <Line
        data={props.data}
        options={{
          scales: {
            xAxes: [{
              display: true,
              scaleLabel: {
                  display: true,
                  labelString: 'Date',
                  fontColor:'#00ffff',
                  fontSize:10
              },
              ticks: {
                 fontColor: "aqua",
                 fontSize: 14
                }
          }],
          yAxes: [{
              display: true,
              scaleLabel: {
                  display: true,
                  labelString: 'Price in Dollars',
                  fontColor: '#00ffff',
                  fontSize:10
              },
              ticks: {
                    fontColor: "aqua",
                    fontSize: 14
              }
          }]
            },
          title: {
            display: true,
            text: "Bitcoin",
            fontSize: 20,
            fontColor:`rgb(0,255,255,1)`,
            
          },
          legend: {
            display: true,
            borderColor: `rgb(0,255,255,1)`,
            fontColor:`rgb(0,255,255,1)`,
            
            position: "right"
          }
        }}
      />
      </div>
    );
  };

export default GraphComponent;
