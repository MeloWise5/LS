import React from 'react';
import classes from './Portfolio.module.css';
import 'firebase/database'

const Portfolio = props => {
    return (
        <li className={classes[props.main]}>
            <div className={classes.icon}>
                <i className={props.icon}></i>
            </div>
            <div className={classes.title}>{props.title}</div>
            <div className={classes.divider}></div>
            <div className={classes.amount}>${props.price}</div>
        </li>
    );
};

export default Portfolio;