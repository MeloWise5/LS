import React, { useState, useEffect } from 'react';
import classes from './Graph.module.css';
import LineGraph from '../../components/Graphs/LineGraph/LineGraph';



const GraphContainer = React.memo(props => {
    const [showBackdrop, setShowBackdrop] = useState(false)
    useEffect(() => {
        // calls a rerender of this component Rigth away.
        setShowBackdrop(true);
        return () => (
            setShowBackdrop(false)
        );
    }, [showBackdrop]);
    let attachedClasses = [classes.SlideDrawer, classes.graphBG, classes.Close];
    if (showBackdrop) {
        attachedClasses = [classes.SlideDrawer, classes.graphBG, classes.Open];
    }
    return (
        <section>
            <div className={attachedClasses.join(' ')}>
                <div className={classes.graphContainer}>
                    <LineGraph />
                </div>
            </div>
        </section>
    );
});

export default GraphContainer;