import React from 'react';
import {Report} from './Report';
import data from './data.json';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';

export const Locations = [
    {
        id: 0,
        title: 'Polygon',
        selected: false,
        key: 'location',
        report: <Report data={data} />
    },
    {
        id: 1,
        title: 'Gastown',
        selected: false,
        key: 'location',
        report: ''
    },
    {
        id: 2,
        title: 'GNW',
        selected: false,
        key: 'location',
        report: ''
    }
];