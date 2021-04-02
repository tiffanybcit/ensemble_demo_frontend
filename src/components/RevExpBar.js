import * as React from "react";
import { Chart } from "react-google-charts";


const BarChart = () => {
  return (
    <div>
  <Chart
    width={'600px'}
    height={'500px'}
    chartType="Bar"
    loader={<div>Loading Chart</div>}
    data={[
      ['Month', 'Revenue', 'Expenses'],
      ['Jan', 3533.50, 1000],
      ['Feb', 3933.50, 1005],
      ['Mar', 4033.50, 1633.50],
      ['Apr', 6592.50, 1435.33],
      ['May', 4533.50, 1990.00],
      ['Jun', 4633.50, 1272.65],
      ['July', 8520.00, 1472.19],
      ['Aug', 4933.50, 1888.8],
      ['Sep', 5333.50, 1933.50],
      ['Oct', 3933.50, 1993.78],
      ['Nov', 4033.50, 1633.50],
      ['Dec', 3733.50, 2533.50]
    ]}
    options={{
    title: 'Rev/Expense',
          chartArea: {width: '50%'},
          hAxis: {
            title: 'Total Sales in Canadian Dollars',
            minValue: 0,
            textStyle: {
              bold: true,
              fontSize: 12,
              color: '#4d4d4d'
            },
            titleTextStyle: {
              bold: true,
              fontSize: 18,
              color: '#4d4d4d'
            }
          },
          vAxis: {
            title: 'Category',
            textStyle: {
              fontSize: 14,
              bold: true,
              color: '#848484'
            },
            titleTextStyle: {
              fontSize: 14,
              bold: true,
              color: '#848484'
            }
          },
          chart: {
              title: 'Profit & Loss chart',
              subtitle: 'Revenue and Expenses: 2020-2021',
            },
    }}
    // For tests
    rootProps={{ 'data-testid': '1' }}
  />
  </div>
  );
};
  export default BarChart;