import React, { useRef, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Form, Button, Card } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'
import AuthLayout from '../container/Auth'
import Title from '../container/Titles'
import classes from '../container/Auth.module.css'
const Login = () => {

    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()
        //Error handeling before we send to the server. Saves time and money.


        try {
            setError('')
            setLoading(true)
            // this will pass the vlaues and sign up the users
            await login(emailRef.current.value, passwordRef.current.value)
            history.push("/")
        } catch (err) {
            setError('Issue Logging in')

        }
        setLoading(false)
    }

    return (
        <>
            <AuthLayout>
                <Card>
                    <Card.Body className="p-2">
                        <Title title="Log In" error={error} />
                        <Form onSubmit={handleSubmit}>
                            <Form.Group id='email'>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" ref={emailRef} required  placeholder="E-Mail"/>
                            </Form.Group>
                            <Form.Group id='password'>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" ref={passwordRef} required  placeholder="Password"/>
                            </Form.Group>
                            <div className="d-flex">
                                <Link id={classes.AlertCellPhone} to="/signup" className="flex-fill text-center pr-3" >
                                    <Button variant="dark" disabled={loading} type="btn" className="w-100 flex-stretch" >Sign Up</Button>
                                </Link>
                                <Button disabled={loading} type="submit" className="flex-fill">Log In</Button>
                            </div>
                        </Form>
                        <div className="w-100 text-center mt-3">  <Link to="/forgot-password" >Forgot Password?</Link></div>
                    </Card.Body>
                </Card>
                <div id={classes.AlertDesktop} className="w-100 text-center mt-2"> Need an account? <Link to="/signup" >Sign Up</Link></div>
            </AuthLayout>
        </>
    )
}

export default Login

