import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../Authentication/context/AuthContext'
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Button from 'react-bootstrap/Button';
import Portfolio from '../../../containers/Portfolio/Portfolio';

import classes from './SideDrawer.module.css';


const SideDrawer = props => {
    // logout user when the close the page
    const { currentUser } = useAuth()
    // this is the slide animation for the side drawer
    let attachedClasses = [classes.SlideDrawer, classes.Close];
    if (props.open) {
        attachedClasses = [classes.SlideDrawer, classes.Open];
    }

    // this is to switch the View Graph to the Ladder Stock button and routes
    let topButton = (
        <NavLink
            exact
            to='/graph'
            activeClassName={classes.NavigationItem}
        ><Button variant="success" size="lg" className="ml-0 w-100">Graph <i className="bi bi-clipboard-data"></i></Button>
        </NavLink>
    );
    let location = useLocation();
    if (location.pathname === '/graph') {
        topButton = (
            <NavLink
                exact
                to='/'
                activeClassName={classes.NavigationItem}
            ><Button variant="danger" size="lg" className="ml-0 w-100" >Ladder <i className="bi bi-graph-up"></i></Button>
            </NavLink>
        );
    }
    let logOutTop = (<>
        <div className="flex-fill w-100  text-center ">
            <NavLink
                exact
                to='/signup'
                activeClassName={classes.NavigationItem}
            ><Button variant="link" size="lg" className="ml-0 w-100" >Sign Up</Button>
            </NavLink>
        </div>
    </>)
    // since we have users and mobile. I had to really swtich up the design with such little space
    // in the landscape mode.
    // When the user is logged in. Change up a bit of the code and where they are sent to
    // Sign is now log out
    // The graph is being shown when a user is logged in.
    // and that button switched to the ladder stock based off what page youre on.
    let logOutBottom = ''
    if (currentUser) {
        logOutTop = (
            <Aux>
                <div id={classes.AlertCellPhone} className="flex-fill w-100 text-center pr-3">
                    <NavLink
                        exact
                        to='/logout'
                        activeClassName={classes.NavigationItem}
                    ><Button title={`Dashboard Of : ${currentUser.email}`} variant="link" size="lg" className="w-100 ml-0 justify-content-center" >Log Out</Button>
                    </NavLink>
                </div>
                <div id={classes.AlertCellPhone} className="flex-fill w-100 text-center pl-3">
                    {topButton}
                </div>

                <div id={classes.AlertDesktop} className="flex-fill w-100 text-center">
                    {topButton}
                </div>
            </Aux>
        )
        logOutBottom = (<div id={classes.AlertDesktop} className="w-100 text-center  mt-2">
            <NavLink
                        exact
                        to='/logout'
                        activeClassName={classes.NavigationItem}
                    >
            <Button variant="link" className="w-100 ml-0 p-3 justify-content-center">
                Log Out
            </Button></NavLink>
        </div>)
    }
    return (
        <Aux>
            <Backdrop clicked={props.closed} show={props.open} />
            <aside className={attachedClasses.join(' ')} onClick={props.closed}>
                <section>
                    <nav>
                        <ul className={classes.TopNavigationUL}>
                            <li className='d-flex pr-0 pl-0'>
                                {logOutTop}
                            </li>
                        </ul>
                    </nav>
                </section>
                <Portfolio />

                <section id={classes.ladderStockDescription} >
                    <header>
                        <h1>Ladder Stocks</h1>
                        <p className={classes.subTitle}>A Stock Algorithm written in Python 3.9. It utilizies the usefulness of Robinhood Tradeing API. With the empolyment of robin-stocks for all the benefits and advantages this script has.</p>
                    </header>
                </section>
                {logOutBottom}
            </aside>
        </Aux >
    );
};

export default SideDrawer;