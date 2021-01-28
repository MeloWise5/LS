import React, { useEffect } from 'react';
import { useStore } from '../../../hooks-store/store';
import firebase from 'firebase/app';
import { Line } from 'react-chartjs-2';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import 'firebase/database'



const LineGraph = React.memo(props => {
    const orders = useStore()[0].orders;
    const dispatch = useStore(false)[1];
    //console.log(orders)
    const data = {
        labels: [],     
        datasets: [
            {
                label: 'Buys',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(255,0,0,0.4)',
                borderColor: 'rgba(255,0,0,0.5)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(255,0,0,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(255,0,0,1)',
                pointHoverBorderColor: 'rgba(255,0,0,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 5,
                pointHitRadius: 10,
                data: []
            },
            {
                label: 'Sells',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(0,255,0,0.4)',
                borderColor: 'rgba(0,255,0,.5)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(0,255,0,1)',
                pointBackgroundColor: '#149414',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(0,255,0,1)',
                pointHoverBorderColor: 'rgba(0,255,0,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 6,
                pointHitRadius: 10,
                data: []
            }
        ]
    };
    // Loads the state with the current Order Data
    useEffect(() => {
        const orderRef = firebase.database().ref('orders');
        orderRef.on('value', (snapshot) => {
            let itemCollection = snapshot.val()
            let newOrderState = []
            let sells = 0;
            for (let items in itemCollection) {
                //console.log('All the price '+JSON.stringify(itemCollection))
                //console.log('price Data '+JSON.stringify(itemCollection[items].date))
                //console.log('price '+items)
                newOrderState = [{
                    id: items,
                    price: itemCollection[items].price,
                    method: itemCollection[items].method,
                    date: itemCollection[items].date
                }]
                dispatch('ADD_ORDERS', newOrderState)
                if(itemCollection[items].method==='sell'){
                    sells = sells + .10
                }
            }
            dispatch('UPDATE_INTEREST', sells)
        });
    }, [])
    // pulls from thet state
    const sells = orders.filter(p => p.method ==='sell' );
    sells.map(sell => {
        //console.log(sell)
        //data.labels.push(sell.date);
        data.datasets[1].data.push(sell.price);
        return true
    });
    const buys = orders.filter(p => p.method ==='buy' );
    buys.map(buy => {
        data.labels.push(buy.date);
        data.datasets[0].data.push(buy.price);
        return true
    });
    

    return (
        <Aux>
            <Line data={data} width={10} height={10} options={{maintainAspectRatio: false}}/>
        </Aux>
    );
});

export default LineGraph;
