import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../../../firebase'

const AuthContext = React.createContext()

// this is a way to accesss the context and all its methods
export const useAuth = () => useContext(AuthContext)




// this is a HOC higher order component to wrap other with this authentication
// all all these states and functions
export const AuthProvider = props => {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)
    // signup method
    const signup = (email,password) => {
        return auth.createUserWithEmailAndPassword(email,password)
    }
    const login = (email,password) => {
        return auth.signInWithEmailAndPassword(email,password)
    }
    const logout = () => {
        return auth.signOut()
    }
    const resetPassword = (email) => {
        return auth.sendPasswordResetEmail(email)
    }
    const updateEmail = email => {
        return currentUser.updateEmail(email)
    }
    const updatePassword = password => {
        return currentUser.updatePassword(password)
    }

    // we have to call a different function to see if we have a state change
    // we only want this to be called when this component is rendered the first time
    useEffect(()=>{
        //When the APP first loads we check to see if the user is already authenticated.
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })

        //firebase trick here
        // when we call this method onAuthStatChanged it returns a Unsub method
        // If called will unSubscribe this user
        return unsubscribe
    },[])
    

    // here are the list of props allt he children can use
    const value = {
        currentUser,
        logout,
        login,
        resetPassword,
        signup,
        updateEmail,
        updatePassword
    }
    return (
        <AuthContext.Provider value={value}>
            {!loading && props.children}
        </AuthContext.Provider>
    )
}
