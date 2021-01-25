import React, { useState } from 'react';
import Aux from '../Auxiliary/Auxiliary';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const Layout = props => {
    // Setting the side drawer state here
    // we send the SetState to the toolBar
    // we send the state to the sideDrawer
    const [SideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);
    const sideDrawerClosedHandler = () => {
        setSideDrawerIsVisible(false)
    };
    const sideDrawerToggleHandler = () => {
        setSideDrawerIsVisible(!SideDrawerIsVisible);
    };
    
    return (
        <Aux>
            <Toolbar DrawerToggleClicked={sideDrawerToggleHandler}/>
            <SideDrawer open={SideDrawerIsVisible} closed={sideDrawerClosedHandler} />
            <main>
                {props.children}
            </main>
        </Aux>
    );
};

export default Layout;