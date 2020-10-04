import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";

const GraphComponent = (props) => {
    return (
      <Line
        data={props.data}
        options={{
          title: {
            display: true,
            text: "Bitcoin",
            fontSize: 20,
            fontColor:`rgb(0,255,255,1)`,
            scales: {
              yAxes: [{
                fontColor:`rgb(0,255,255,1)`,
                borderColor: `rgb(0,255,255,1)`,
              }]
          }
          },
          legend: {
            display: true,
            borderColor: `rgb(0,255,255,1)`,
            fontColor:`rgb(0,255,255,1)`,
            
            position: "right"
          }
        }}
      />
    );
  };

export default GraphComponent;
