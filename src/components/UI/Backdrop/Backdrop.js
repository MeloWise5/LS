import React from 'react';
import classes from './Backdrop.module.css';

const Backdrop = props => {
    let attachedClasses = [classes.SlideDrawer, classes.Close];
    if (props.show) {
        attachedClasses = [classes.SlideDrawer, classes.Open];
    }
    //console.log('Backdrop')
    return <div className={`${attachedClasses.join(' ')}`} onClick={props.clicked}></div>
}
export default Backdrop;