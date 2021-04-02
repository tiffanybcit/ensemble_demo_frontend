import * as React from "react";
import { Chart } from "react-google-charts";


const BarChart = () => {
  return (
    <div>
  <Chart
    width={'500px'}
    height={'500px'}
    chartType="Bar"
    loader={<div>Loading Chart</div>}
    data={[
      ['Category', 'Gross Sales', 'Net Sales'],
      ['Uncategorized', 4.00, 4.00],
      ['Batch Brew', 535.40, 531.55],
      ['Dope Coffee', 1555.00, 1534.00],
      ['Espresso', 6592.50, 6435.33],
      ['Filter', 330.00, 310.00],
      ['Food', 4333.50, 4172.65],
      ['Pastry', 8520.00, 8472.19],
      ['Retail Merchandise', 181, 146.8],
      ['Taps(non-alcoholic)', 9, 9],
      ['Tea', 294, 293.78],
      ['Beer', 0, 0],
      ['Cocktails', 0, 0]
    ]}
    options={{
    title: 'Sales by Categories in Polygon',
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
              title: 'Company Performance',
              subtitle: 'Sales, Expenses, and Profit: 2014-2017',
            },
    }}
    // For tests
    rootProps={{ 'data-testid': '1' }}
  />
  </div>
  );
};
  export default BarChart;