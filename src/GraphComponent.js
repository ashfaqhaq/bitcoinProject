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
            fontSize: 20
          },
          legend: {
            display: true,
            position: "right"
          }
        }}
      />
    );
  };

export default GraphComponent;
