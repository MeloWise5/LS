import React from 'react';
import { useStore } from '../../hooks-store/store'
import PortfolioItems from '../../components/Portfolio/Portfolio';
import classes from './Portfolio.module.css';

const Portfolio = props => {
    const state = useStore()[0].portfolio
    //console.log(state)


    return (
        <section className={classes.stockPortfolio} >
            <header>
                <h1>Portfolio</h1>
            </header>
            <ul id="portfolioNav">
                <PortfolioItems main='bank' icon='bi bi-house' title='Capital' price={state[0].capital} />
                <PortfolioItems main='invested' icon='bi bi-calculator' title='Invested' price={state[0].invested} />
                <PortfolioItems main='profit' icon='bi bi-wallet2' title='Interest' price={state[0].interest} /> 
            </ul>
        </section>
    );
};

export default Portfolio;