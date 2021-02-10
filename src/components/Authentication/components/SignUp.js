import React, { useRef, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Form, Button, Card } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'
import AuthLayout from '../container/Auth'
import Title from '../container/Titles'
import classes from '../container/Auth.module.css'
const SignUp = () => {

    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    async function handleSubmit(e) {
        e.preventDefault()
        //Error handeling before we send to the server. Saves time and money.
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords Don't Match")
        }

        try {
            setError('')
            setLoading(true)
            // this will pass the vlaues and sign up the users
            await signup(emailRef.current.value, passwordRef.current.value)
            history.push("/")
        } catch (err) {
            setError('Error Signing Up')

        }
        setLoading(false)
    }

    return (
        <>
            <AuthLayout>
                <Card>
                    <Card.Body className="p-2">
                        <Title title='Sign Up' error={error} />
                        <Form onSubmit={handleSubmit}>
                            <Form.Group id='email'>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" ref={emailRef} required placeholder="E-Mail" />
                            </Form.Group>
                            <Form.Group id='password'>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" ref={passwordRef} required placeholder="Password"/>
                            </Form.Group>
                            <Form.Group id='password-confirm'>
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="password" ref={passwordConfirmRef} required placeholder="Confirm Password"/>
                            </Form.Group>
                            <div className="d-flex">
                            <Link id={classes.AlertCellPhone} to="/login" className="flex-fill text-center pr-3" >
                                <Button variant="dark" disabled={loading} type="button" className={classes.priceFontPageLandscape} >Log In</Button>
                            </Link>
                            <Button disabled={loading} type="submit" className={classes.priceFontPage}>Sign Up</Button>
                            
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
                <div id={classes.AlertDesktop}  className="w-100 text-center mt-2"> Already have an account? <Link to="/login" >Log In</Link></div>
            </AuthLayout>
        </>
    )
}

export default SignUp

