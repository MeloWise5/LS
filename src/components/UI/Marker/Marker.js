import React from 'react';

import classes from './Marker.module.css';
const Marker = props => (
    <div className={classes.Loader}style={{left:props.percentage}}>${props.price}</div>
);
export default Marker;