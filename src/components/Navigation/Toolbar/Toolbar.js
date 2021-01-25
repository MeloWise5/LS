import React from 'react';
import TopNavigation from '../TopNavigation/TopNavigation';

const toolbar = (props) => (
    <section>
        <TopNavigation clicked={props.DrawerToggleClicked} />
    </section>
);
export default toolbar;