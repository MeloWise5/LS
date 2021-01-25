import React, { useState, useEffect } from 'react';
import { useStore } from '../../hooks-store/store';
import classes from './Ladder.module.css';
import firebase from 'firebase/app';
import 'firebase/database'

const Ladder = props => {
    const pricesState = useStore()[0].prices
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
        const priceRef = firebase.database().ref('prices');
        priceRef.on('value', (snapshot) => {
            let itemCollection = snapshot.val()
            let newState = []
            for (let items in itemCollection) {
                //console.log('All the price '+JSON.stringify(itemCollection))
                //console.log('price Data '+JSON.stringify(itemCollection[items]))
                //console.log('price '+items)
                newState = [{
                    id: items,
                    price: itemCollection[items].price,
                    method: itemCollection[items].method,
                    show: false
                }]
                dispatch('ADD_PRICE', newState)
            }
        });
    }, [])

    //console.log('The Prices as of now')
    //console.log(pricesState)
    //console.log(pricesState[0])
    let attachedClasses = [classes.SlideDrawer, classes.LadderContainer, classes.Close];
    if (showBackdrop) {
        attachedClasses = [classes.SlideDrawer, classes.LadderContainer, classes.Open];
    }
    return (
        <section id="main" className={attachedClasses.join(' ')}>
            {pricesState.map(price => (
                <div key={price.id} className={`${classes.TriggerPriceMerge} ${classes[price.method]}`}>{price.price}</div>
            ))}
        </section>
    );
};
export default Ladder;