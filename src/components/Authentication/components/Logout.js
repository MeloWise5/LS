import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Card } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'
import AuthLayout from '../container/Auth'
import Title from '../container/Titles'
const Login = () => {

    const { logout } = useAuth()
    const [error, setError] = useState('')
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()
        //Error handeling before we send to the server. Saves time and money.
        try {
            setError('')
            // this will pass the vlaues and sign up the users
            await logout()
            history.push("/")
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <>
            <AuthLayout>
                <Card>
                    <Card.Body>
                        <Title title="Logout" error={error} />
                        <Button type="submit" className="w-100" onClick={handleSubmit}>Logout</Button>
                    </Card.Body>
                </Card>
            </AuthLayout>
        </>
    )
}

export default Login

