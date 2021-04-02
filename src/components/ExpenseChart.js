import * as React from "react";
import { Chart } from "react-google-charts";


const ExpenseChart = () => {
  return (

<Chart
  width={'600px'}
  height={'600px'}
  chartType="PieChart"
  loader={<div>Loading Chart</div>}
  data={[
    ['Task', 'Hours per Day'],
    ['Payroll', 11],
    ['Food cost', 2],
    ['Rent', 2],
    ['Utilities', 2],
    ['Suppies', 7],
  ]}
  options={{
    title: 'Expenses',
    // Just add this option
    pieHole: 0.4,
  }}
  rootProps={{ 'data-testid': '3' }}
/>
  );
};
  export default ExpenseChart;