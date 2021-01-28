import { initStore } from './store';

const ConfigureOrdersStore = () => {

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
        ADD_ORDERS: (currentState, orderObj) => {
            
            const prodIndex = currentState.orders.findIndex(p => p.id === orderObj[0].id);
            //console.log('++++++++')
            //console.log(prodIndex)
            //console.log('++++++++')
            if(prodIndex>=0){
                const newMethodStatus = orderObj[0].method;
                const updatedPrice = [...currentState.orders];
                updatedPrice[prodIndex] = {
                    ...currentState.orders[prodIndex],
                    method: newMethodStatus
                };
                return { orders: updatedPrice };
            }else{
                const newOrder = [{id:orderObj[0].id,price:orderObj[0].price,method:orderObj[0].method,date:orderObj[0].date}];
                const updatedOrder = [...currentState.orders, ...newOrder];
                return { orders: updatedOrder };
            }

        }
    };
    // calling the InitStore passing the above Actions 
    // and the Store State we want to manage
    // here is where grab the TriggerPriceArray the python script makes
    // 
    const newState = ({
        id: '000',
        price: 0.00,
        method: '',
        date: ''
    })
    initStore(actions, {orders: [newState]})
};

export default ConfigureOrdersStore;


// {
//     id: 'O01',
//     method: 'buy',
//     price: '1.00',
//     date: '2021-01-14T20:01:45.418000Z'
// },{
//     id: 'O02',
//     method: 'buy',
//     price: '0.90',
//     date: '2021-01-14T20:01:25.418000Z'
// },{
//     id: 'O03',
//     method: 'sell',
//     price: '1.10',
//     date: '2021-01-14T20:01:02.418000Z'
// },{
//     id: 'O04',
//     method: 'sell',
//     price: '1.20',
//     date: '2021-01-14T20:01:10.418000Z'
// },{
//     id: 'O05',
//     method: 'buy',
//     price: '0.80',
//     date: '2021-01-15T20:01:20.418000Z'
// },{
//     id: 'O06',
//     method: 'buy',
//     price: '0.90',
//     date: '2021-01-15T20:01:32.418000Z'
// },{
//     id: 'O07',
//     method: 'buy',
//     price: '1.00',
//     date: '2021-01-15T20:01:33.418000Z'
// },{
//     id: 'O08',
//     method: 'sell',
//     price: '1.00',
//     date: '2021-01-15T20:01:36.418000Z'
// },{
//     id: 'O09',
//     method: 'buy',
//     price: '1.90',
//     date: '2021-01-19T20:01:40.418000Z'
// },{
//     id: 'O19',
//     method: 'sell',
//     price: '0.80',
//     date: '2021-01-20T20:01:50.418000Z'
// },