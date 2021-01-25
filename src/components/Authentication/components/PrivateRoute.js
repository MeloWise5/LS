import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
const PrivateRoute = ({component:Component, ...props}) => {
    const { currentUser } = useAuth()

    return (
        <Route 
        {...props}
        render={props => {
            return currentUser ? <Component {...props} /> : <Redirect to='/login'/>
        }}
            
            >

        </Route>
    )
}

export default PrivateRoute
