import * as React from "react";
import { Chart } from "react-google-charts";


let data1 = [
    {"INFO ADDED IN RED":"Location","field2":"Department","ORIGINAL DATA EXPORT (CSV)":"Category","field4":"Items Sold","field5":"Gross Sales","field6":"Items Refunded","field7":"Refunds","field8":"Discounts & Comps","field9":"Net Sales","field10":"Taxes"},
    {"INFO ADDED IN RED":"Polygon","field2":"FOH","ORIGINAL DATA EXPORT (CSV)":"Uncategorized","field4":"1","field5":"4","field6":"0","field7":"0","field8":"0","field9":"4","field10":"0.2"},
    {"INFO ADDED IN RED":"Polygon","field2":"FOH","ORIGINAL DATA EXPORT (CSV)":"Batch Brew","field4":"153","field5":"535.4","field6":"0","field7":"0","field8":"-3.85","field9":"531.55","field10":"26.85"},
    {"INFO ADDED IN RED":"Polygon","field2":"FOH","ORIGINAL DATA EXPORT (CSV)":"Dope Coffee","field4":"67","field5":"1555","field6":"0","field7":"0","field8":"-21","field9":"1534","field10":"8.8"},
    {"INFO ADDED IN RED":"Polygon","field2":"FOH","ORIGINAL DATA EXPORT (CSV)":"Espresso","field4":"1545","field5":"6592.5","field6":"-1","field7":"-4.5","field8":"-152.67","field9":"6435.33","field10":"320.72"},
    {"INFO ADDED IN RED":"Polygon","field2":"FOH","ORIGINAL DATA EXPORT (CSV)":"Filter","field4":"66","field5":"330","field6":"0","field7":"0","field8":"-20","field9":"310","field10":"15.5"},
    {"INFO ADDED IN RED":"Polygon","field2":"BOH","ORIGINAL DATA EXPORT (CSV)":"Food","field4":"416","field5":"4333.5","field6":"0","field7":"0","field8":"-160.85","field9":"4172.65","field10":"208.63"},
    {"INFO ADDED IN RED":"Polygon","field2":"BOH","ORIGINAL DATA EXPORT (CSV)":"Pastry","field4":"1544","field5":"8520","field6":"-1","field7":"-5.5","field8":"-42.31","field9":"8472.19","field10":"404.48"},
    {"INFO ADDED IN RED":"Polygon","field2":"FOH","ORIGINAL DATA EXPORT (CSV)":"Retail Merchandise","field4":"5","field5":"181","field6":"0","field7":"0","field8":"-34.2","field9":"146.8","field10":"17.62"},
    {"INFO ADDED IN RED":"Polygon","field2":"FOH","ORIGINAL DATA EXPORT (CSV)":"Taps (non-alcoholic)","field4":"2","field5":"9","field6":"0","field7":"0","field8":"0","field9":"9","field10":"0.46"},
    {"INFO ADDED IN RED":"Polygon","field2":"FOH","ORIGINAL DATA EXPORT (CSV)":"Tea","field4":"84","field5":"294","field6":"0","field7":"0","field8":"-0.52","field9":"293.48","field10":"14.84"},
    {"INFO ADDED IN RED":"Polygon","field2":"FOH","ORIGINAL DATA EXPORT (CSV)":"Beer","field4":"0","field5":"0","field6":"0","field7":"0","field8":"0","field9":"0","field10":"0"},
    {"INFO ADDED IN RED":"Polygon","field2":"FOH","ORIGINAL DATA EXPORT (CSV)":"Cocktails","field4":"0","field5":"0","field6":"0","field7":"0","field8":"0","field9":"0","field10":"0"},
    {"INFO ADDED IN RED":"N/A","field2":"N/A","ORIGINAL DATA EXPORT (CSV)":"Commissary baked goods square","field4":"1","field5":"6","field6":"0","field7":"0","field8":"0","field9":"6","field10":"0.3"}
    ]

    
    let foh = 0;
    let boh = 0;
    for (let i = 1; i < data1.length; i++){
        
        if(data1[i]["field2"].localeCompare("FOH") == 0){
         
            foh = foh + parseInt(data1[i]["field9"]);
        } else {
            boh = boh + parseInt(data1[i]["field9"]);
        }
    }

const ExampleChart = () => {
  return (
<Chart
  width={'500px'}
  height={'300px'}
  chartType="PieChart"
  data={[
    ['Division', 'Sales'],
    ['Front of the House',     foh],
    ['Back of the House',      boh]
  ]}
  options={{
    title: 'Sales by FOH and BOH in Polygon'
  }}
  rootProps={{ 'data-testid': '1' }}
/>
  );
};
  export default ExampleChart;