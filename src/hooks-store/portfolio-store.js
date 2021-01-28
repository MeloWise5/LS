import { initStore } from './store';

const ConfigurePortfolioStore = () => {

    // This is the price store.
    // we can have many other stores with many other states
    // each store can have its own actions that will update that 
    // stores state.
    // theses are our actions, and their stories

    // all these actions are based off listening to sockets
    // when a new record is added it will push and react will update the state.

    //actions is a obj that gets passed
    // productID === PAYLOAD
    // currentState.price is declared below in the init function
    const actions = {
        UPDATE_PRICE: (currentState, typeID) => {
            const updatedProducts = [...currentState.portfolio];
            return { portfolio: updatedProducts };
            //typeID is Capital Invested Profit
            // i would like each to be able to be clicked and sent here were we only update that data.
        },
        UPDATE_INTEREST: (currentState, price) => {
            //console.log(price)
            const updatedPrice = [...currentState.portfolio];
            updatedPrice[0].interest = price.toFixed(2)
            return { portfolio: updatedPrice };
            //typeID is Capital Invested Profit
            // i would like each to be able to be clicked and sent here were we only update that data.
        },
        UPDATE_INVESTED: (currentState, price) => {
            //console.log(price)
            const updatedPrice = [...currentState.portfolio];
            updatedPrice[0].invested = price.toFixed(2)
            return { portfolio: updatedPrice };
            //typeID is Capital Invested Profit
            // i would like each to be able to be clicked and sent here were we only update that data.
        },
        UPDATE_CAPITAL: (currentState, price) => {
            //console.log(price)
            const updatedPrice = [...currentState.portfolio];
            updatedPrice[0].capital = price.toFixed(2)
            return { portfolio: updatedPrice };
            //typeID is Capital Invested Profit
            // i would like each to be able to be clicked and sent here were we only update that data.
        }
    };
    // calling the InitStore passing the above Actions 
    // and the Store State we want to manage
    // here is where grab the TriggerPriceArray the python script makes
    // 
    initStore(actions, {
        portfolio: [{
            capital: '1300.00',
            invested: '0000.00',
            interest: '0000.00'
        }]
    })
};

export default ConfigurePortfolioStore;