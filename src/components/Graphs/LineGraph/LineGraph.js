import React, { useEffect } from 'react';
import { useStore } from '../../../hooks-store/store';
import firebase from 'firebase/app';
import { Line } from 'react-chartjs-2';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import 'firebase/database'



const LineGraph = React.memo(props => {
    const orders = useStore()[0].orders;
    const prices = useStore()[0].prices;
    const dispatch = useStore(false)[1];
    //console.log(orders)
    const dataBuys = {
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
            }
        ]
    };
    const dataSells = {
        labels: [],     
        datasets: [{
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
    const dataInterest = {
        labels: [],     
        datasets: [{
                label: 'Interest',
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
    const dataInvested = {
        labels: [],     
        datasets: [{
                label: 'Positions Invested',
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
    const dataOrders = {
        labels: [],     
        datasets: [{
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
            },
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
            }
        ]
    };
    // Loads the state with the current Order Data
    
    // pulls from thet state
    const sells = orders.filter(p => p.method ==='sell' );
    sells.map(sell => {
        //console.log(sell)
        dataSells.labels.push(sell.date);
        dataSells.datasets[0].data.push(sell.price);
        return true
    });
    const interest = orders.filter(p => p.method ==='sell' );
    let interestPrice = 0
    interest.map(sell => {
        //console.log(sell)
        dataInterest.labels.push(sell.date);
        interestPrice = interestPrice + .20
        dataInterest.datasets[0].data.push(interestPrice);
        return true
    });
    const invested = prices.filter(p => p.method ==='sell' );
    let investedPrice = 0
    invested.map(buy => {
        dataInvested.labels.push('');
        investedPrice = investedPrice + parseFloat(buy.price)
        dataInvested.datasets[0].data.push(buy.price);
        return true
    });
    const buys = orders.filter(p => p.method ==='buy' );
    buys.map(buy => {
        dataBuys.labels.push(buy.date);
        dataBuys.datasets[0].data.push(buy.price);
        return true
    });

    orders.map(order => {
        //console.log(order)
        if(order.method==='buy'){
            dataOrders.labels.push(order.date);
            dataOrders.datasets[0].data.push('');
            dataOrders.datasets[1].data.push(order.price);
            
        }else if(order.method==='sell'){
            dataOrders.labels.push(order.date);
            dataOrders.datasets[0].data.push(order.price);
            dataOrders.datasets[1].data.push('');
        }else{
            //this grabs the initial state which is blank
            console.log('Order does not have a method.')
        }
        
        return true
    });
    

    return (
        <Aux>
            <Line data={dataInterest} width={10} height={10} options={{maintainAspectRatio: false}}/>
            <hr/>
            <Line data={dataInvested} width={10} height={2} options={{maintainAspectRatio: false}}/>
            <hr/>
            <Line data={dataBuys} width={10} height={2} options={{maintainAspectRatio: false}}/>
            <hr/>
            <Line data={dataSells} width={10} height={2} options={{maintainAspectRatio: false}}/>
            <hr/>
            <Line data={dataOrders} width={10} height={2} options={{maintainAspectRatio: false}}/>
        </Aux>
    );
});

export default LineGraph;
