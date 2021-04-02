import React, { useState } from 'react';
import styled from 'styled-components';
import '../styles/Report.css';
import { Dropdown, NavDropdown} from 'react-bootstrap';
import {Collapse} from 'react-collapse';

const DataHeaderWrapper = styled.div`
    border-bottom: 1px solid black;
    padding: 2px;
`;

const DataRowWrapper = styled.div`
    border-bottom: 1px solid gray;
    padding: 3px;
`

const ReportHeaderWrapper = styled.div`
    text-align: center;
    margin-bottom: 5px;
`

const ReportWrapper = styled.div`
position: relative;
padding: 10px;
width: 70%;
right: -15%;
justify-content: center;
`

const Data = ({data}) => {
    const [open, setOpen] = useState(false);
    const { Header } = data;
    const { Rows } = data;
    const listItems = Rows.Row.map((item) =>
        <div>
            <DataRowWrapper className="hover_wrapper">
                <p>{item.ColData[0].value}<span className="cost_value">${item.ColData[1].value}</span></p>
            </DataRowWrapper>
        </div>
    );
    let header_without_val = Header.ColData[0].value;
    let header_with_val = <p>{Header.ColData[0].value}<span className="cost_value">${data.Summary.ColData[1].value}</span></p>;
    return ( 
        <>
            <DataHeaderWrapper className="hover_wrapper">
                <h4 onClick={() => setOpen(!open)} aria-expanded={open}>{open ? header_without_val : header_with_val}</h4> 
            </ DataHeaderWrapper>
            <Collapse isOpened={open}>
                {listItems}
                <DataRowWrapper className="hover_wrapper">
                        <p>{data.Summary.ColData[0].value}<span className="cost_value">${data.Summary.ColData[1].value}</span></p>
                </DataRowWrapper>
            </Collapse>
        </>
    )
}

const ReportHeader = ({data}) => {
    const { Header } = data;
    const words = Header.ReportName.split(/(?=[A-Z])/);
    let string = "";
    words.map((word) => {
        string += word + " ";
    })
    return (
        <ReportHeaderWrapper>
            <h2>{string}</h2>
        </ReportHeaderWrapper>
    )
}

const ReportSummary = ({data}) => {
    return (
        <DataRowWrapper className="hover_wrapper">
                <b><p>{data.Summary.ColData[0].value}<span className="cost_value">{data.Summary.ColData[1].value}</span></p></b>
        </DataRowWrapper>
    )
}

const Category = ({data}) => {
    return (
        <div>
            <Data data={data} />
        </div>
    )
}

const Report = ({data}) => {
    return (
    <ReportWrapper>
        <ReportHeader data={data} />
        {data.Rows.Row.map((item) => {
          if (item.Header != undefined){
            return <Category data={item}/>;
          } else {
            return <ReportSummary data={item} />;
          }
          //return <p>{JSON.stringify(item)}\n</p>
        })}
    </ReportWrapper>
    )
}

// TODO: Create a Summary (Grand Total) Component
// TODO: Make Header Component collapsible

export {
    Data,
    Category,
    ReportHeader,
    ReportSummary,
    Report
};