import React, { useState, useEffect } from 'react';
import { useStore } from '../../hooks-store/store';
import Spinner from '../../components/UI/Spinner/Spinner'
import Marker from '../../components/UI/Marker/Marker'
import classes from './Ladder.module.css';
import firebase from 'firebase/app';
import 'firebase/database'

const Ladder = props => {
    const pricesState = useStore()[0].prices
    const portfolioState = useStore()[0].portfolio
    const dispatch = useStore(false)[1];
    // on the first load of this mount it will animate the section to slide down.
    const [showBackdrop, setShowBackdrop] = useState(false)
    useEffect(() => {
        setShowBackdrop(true);
        return () => (
            setShowBackdrop(false)
        );
    }, [showBackdrop]);
    useEffect(() => {
        const marketpriceRef = firebase.database().ref('marketprice');
        marketpriceRef.on('value', (snapshot) => {
            let itemCollection = snapshot.val()
            dispatch('UPDATE_MARKET_PRICE', itemCollection['price'])
        });
    }, [])
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
                if (itemCollection[items].method === 'sell') {
                    sells = sells + .10
                }
            }
            dispatch('UPDATE_INTEREST', sells)
        });
    }, [])
    useEffect(() => {
        const priceRef = firebase.database().ref('prices');
        priceRef.on('value', (snapshot) => {
            let itemCollection = snapshot.val()
            let newState = []
            let sells = 0;
            for (let items in itemCollection) {
                //console.log('All the price '+JSON.stringify(itemCollection))
                //console.log('price Data '+JSON.stringify(itemCollection[items]))
                //console.log(items)
                newState = [{
                    id: items,
                    price: itemCollection[items].price,
                    method: itemCollection[items].method,
                    show: false
                }]
                //console.log(newState)
                dispatch('ADD_PRICE', newState)
                if (itemCollection[items].method === 'sell') {
                    sells = sells + (itemCollection[items].price * 1)
                }
            }
            dispatch('UPDATE_INVESTED', sells)

        });
    }, [])


    //console.log(pricesState)
    //console.log(pricesState[0])
    let attachedClasses = [classes.SlideDrawer, classes.LadderContainer, classes.Close];
    if (showBackdrop) {
        attachedClasses = [classes.SlideDrawer, classes.LadderContainer, classes.Open];
    }
    // create a let variable to hold spinner or ladders stock
    //let ladderStockData = <Spinner/>
    // while looping through all the price. Check for marketprice data positioning
    let ladderStockData = pricesState.map(price => {
        const divid = price.id.slice(0, -1)
        let mark = ''
        const marketNeedle = portfolioState[0].marketprice.slice(0, -1).replace('.', '');
        if (divid === marketNeedle) {
            let percentage = portfolioState[0].marketprice.slice(-1)
            percentage = percentage + '0%'

            mark = <Marker price={portfolioState[0].marketprice} percentage={percentage} />
        }
        return <>
            <div key={price.id} className={`${classes.TriggerPriceMerge} ${classes[price.method]}`}>
                {mark}{price.price}
            </div>
        </>
    })
    // remove the last number from both the market place and the priceid
    // 55.95 = 55.9
    // if you find a match. use the removed number from the market price
    // 5 = 50
    // add a 0 to the end 
    // this is now the width positioning of the market 
    return (
        <section id="main" className={attachedClasses.join(' ')}>

            {ladderStockData}
        </section>
    );
};
export default Ladder;