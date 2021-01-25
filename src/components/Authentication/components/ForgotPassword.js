import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'
import AuthLayout from '../container/Auth'
import Title from '../container/Titles'
import classes from '../container/Auth.module.css'
const ForgotPassword = () => {

    const emailRef = useRef()

    const { resetPassword } = useAuth()
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()
        //Error handeling before we send to the server. Saves time and money.


        try {
            setMessage('')
            setError('')
            setLoading(true)
            // this will pass the vlaues and sign up the users
            await resetPassword(emailRef.current.value)
            setMessage(`Password instructions set to this email ${emailRef.current.value}`)
        } catch (err) {
            setError('Error with E-mail')

        }
        setLoading(false)
    }

    return (
        <>
            <AuthLayout>
                <Card>
                    <Card.Body className="p-2">
                    <Title title="Password Reset" error={error} />
                        {message && <Alert variant="success">{message}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group id='email'>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" ref={emailRef} required />
                            </Form.Group>
                            <Button disabled={loading} type="submit" className="w-100">Reset Password</Button>
                        </Form>
                        <div className="d-flex">
                        <div className="flex-fill w-100 text-center mt-3"> <Link to="/login" >Login</Link></div>
                        <div id={classes.AlertCellPhone} className="flex-fill w-100 text-center mt-3"> <Link to="/signup" >Sign Up</Link></div>
                        </div>
                    </Card.Body>
                </Card>
                <div id={classes.AlertDesktop} className="w-100 text-center mt-2">Don't have an account? <Link to="/signup" >Sign Up</Link></div>
            </AuthLayout>
        </>
    )
}

export default ForgotPassword

