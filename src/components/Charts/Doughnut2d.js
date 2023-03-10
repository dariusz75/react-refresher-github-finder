// STEP 1 - Include Dependencies
// Include react
import React from "react";
import ReactDOM from "react-dom";

// Include the react-fusioncharts component
import ReactFC from "react-fusioncharts";

// Include the fusioncharts library
import FusionCharts from "fusioncharts";

// Include the chart type
import Chart from "fusioncharts/fusioncharts.charts";

// Include the theme as fusion
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.candy";

// Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);



const ChartComponent = ({data}) => {
  // STEP 3 - Creating the JSON object to store the chart configurations
const chartConfigs = {
  type: "doughnut2d",
  width: "100%", 
  height: "400", 
  dataFormat: "json",
  dataSource: {
    // Chart Configuration
    chart: {
      caption: "Stars Per Language",
      decimals: 0,
      doughnutRadius: '50%',
      showPercentValues: 0,
      theme: 'candy'
    },
    // Chart Data
    data: data
  }
};
  return <ReactFC {...chartConfigs} />
}

export default ChartComponent;

