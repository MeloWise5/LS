import {useState, useEffect } from 'react';

let globalState = {};
// gets filled during init
// reason. this merges all states into this one.
let listeners = [];
// list of functions that will call the actions
let actions = {};
// gets filled during init
// reason. this merges all actions into this obj

// ShouldListen tells some components 
// if they change dont tell the store to update
// not everyone needs to be updated when the 
// store changes on a small slice
export const useStore = (shouldListen = true) => {
    const setState = useState(globalState)[1];
    const dispatch = (actionIdentifier, payload) => {
        // i really like this code.
        // we call the object by the KEY
        // that IS a function. so we add the () to the end
        // and pass the state and the payload
        const newState = actions[actionIdentifier](globalState,payload);
        globalState = {...globalState, ...newState};
        // now we need to tell all the listeners we just updated. 
        // this will happen to all that use this hook and dont set
        // shouldListen to false.
        for(const listener of listeners) {
            listener(globalState);
        }
    };
    // We need to set up the listeners correctly on the first 
    // time this useStore hook loads/renders/mounts/ gets called
    useEffect(() => {
        // we are adding setState to the array/list of listeners
        // if we had more functions above we would add them here.
        if (shouldListen){ listeners.push(setState) }
        
        //CLEAN UP
        // we are removing setState from the array/list of listeners
        return () => {
            if (shouldListen) {
                listeners = listeners.filter(li => li !== setState)
            }
        };
    },[setState, shouldListen]);
    // you now have a reducer that takes the state and the action you want
    // to perform on it.
    return [globalState,dispatch]
}

// this init function will only be called in the price-store 
// during setup on the apps first load.
export const initStore = (userActions, initialState) => {
    if (initialState) {
        globalState = {...globalState, ...initialState};
    }
    actions = {...actions, ...userActions}
}
