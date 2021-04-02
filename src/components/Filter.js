import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import '../styles/semantic.css';

// https://ncoughlin.com/posts/react-dropdown/

/**
 * 
 * @param {data} the list of filter options
 * @param {title} the title of the filtering
 * @returns the dynamic filter box
 */
const Filter = ({data, title, selected, onSelectedChange}) => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        document.body.addEventListener("click", event => {
            if (event.target.className == "item"){
                // TODO: dynamically generate the appropriate report
                console.log(event.target.innerHTML);
            }
        })
    }, [])

    const locationList = data.map(items => {
        if (items.title === selected.title) {
            return null
        }

        return (
            <div 
                key={items.id} 
                className="item"
                onClick={() => onSelectedChange(items)}
            >
                {items.title}
            </div>
        )
    })

    return (
        <>
        <div className="ui form filter">
            <div className="field">
                <label className="label">{title}</label>
                <div
                    onClick={() => setOpen(!open)}
                    className={`ui selection dropdown ${open ? "visible active" : ""}`}
                >
                <i className="dropdown icon"></i>
                <div className="text">{selected.title}</div>
                <div 
                    onClick={() => setOpen(!open)}
                    className={`menu ${open ? "visible transition" : ""}`}
                >
                    {locationList}
                </div>
                </div>
            </div>
        </div>
        <div id="report">

        </div>
        </>
    )
}

export {
    Filter
};
