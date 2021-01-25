import React from 'react'
import { Container } from 'react-bootstrap'
import classes from './Auth.module.css'
const AuthLayout = props => {
    return (
        <>
            <Container
                className={`d-flex align-items-center justify-content-center ${classes.AuthLayout}`} >
                <div className="w-100" style={{ maxWidth: '400px' }}>
                    {props.children}
                </div>
            </Container>
        </>
    )
}

export default AuthLayout
