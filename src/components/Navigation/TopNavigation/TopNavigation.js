import React from 'react';
import classes from './TopNavigation.module.css'

const topnavigation = (props) => (
    <header className={classes.mainHeader}>
        <nav>
            <div className={classes.inputGroup}>
                <div 
                    onClick={props.clicked} 
                    className={classes.inputGroupText} 
                    id="ladderIcon" >
                        <i className="bi bi-ladder App-logo"  ></i>
                </div>
                
            </div>
        </nav>
    </header>
);

//<input type='text' placeholder="Symbol" aria-label="Symbol" aria-describedby="basic-addon1" />
export default topnavigation;