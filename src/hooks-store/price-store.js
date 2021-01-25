import { initStore } from './store'

const ConfigurePriceStore = () => {

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
        ADD_PRICE: (currentState, priceObj) => {
            
            const prodIndex = currentState.prices.findIndex(p => p.id === priceObj[0].id);
            //console.log('++++++++')
            //console.log(prodIndex)
            //console.log('++++++++')
            if(prodIndex>=0){
                const newMethodStatus = priceObj[0].method;
                const updatedPrice = [...currentState.prices];
                updatedPrice[prodIndex] = {
                    ...currentState.prices[prodIndex],
                    method: newMethodStatus
                };
                return { prices: updatedPrice };
            }else{
                const newPrice = [{id:priceObj[0].id,price:priceObj[0].price,method:priceObj[0].method,show:priceObj[0].show}];
                const updatedPrice = [...currentState.prices, ...newPrice];
                return { prices: updatedPrice };
            }

        }
    };
    // calling the InitStore passing the above Actions 
    // and the Store State we want to manage
    // here is where grab the TriggerPriceArray the python script makes
    // 

    const newState = ({
        id: '0000',
        price: 0.0,
        method: '',
        show: false
    })
    initStore(actions, {prices:[newState]})
};

export default ConfigurePriceStore;


// prices: [{
//     id: 'p1',
//     price: '1.20',
//     method: 'buy',
//     show: false
// },
// {
//     id: 'p2',
//     price: '1.30',
//     method: 'sell',
//     show: false
// },
// {
//     id: 'p3',
//     price: '1.40',
//     method: '',
//     show: false
// },
// {
//     id: 'p4',
//     price: '1.50',
//     method: 'sell',
//     show: false
// },
// {
//     id: 'p5',
//     price: '1.60',
//     method: 'buy',
//     show: false
// },
// {
//     id: 'p6',
//     price: '1.70',
//     method: 'buy',
//     show: false
// },
// {
//     id: 'p7',
//     price: '1.80',
//     method: '',
//     show: false
// }