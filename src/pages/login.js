import { loginUser } from "../components/authRoutes";
import { useNavigate } from "react-router";
import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const LoginUser = (props) => {
    const currentUser = props.mods.currentUser
    const setCurrentUser = props.mods.setCurrentUser
    const isAuthenticated = props.mods.isAuthenticated
    const setIsAuthenticated = props.mods.setIsAuthenticated
    const initialState = { username: "", password: ""}
    const navigate = useNavigate()
    const [input, setInput] = useState(initialState)
    const [errorState, setErrorState] = useState(false)
    
    function errorMessage() {
        setErrorState(true)
        setTimeout(() => {
            setErrorState(false)
        }, 3000)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const user = await loginUser(input)
        if (user.isLoggedIn) {
            setCurrentUser(user)
            setIsAuthenticated(user.isLoggedIn)
            navigate("/")
        } else {
            errorMessage()
        }
        setInput(initialState)
    }

    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value})
    }

    return (
        <>
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email: </Form.Label>
                <Form.Control type="text" onChange={handleChange} placeholder="email@email.com" name="username" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password: </Form.Label>
                <Form.Control type="text" onChange={handleChange} placeholder="Make it a good'un" name="password" />
            </Form.Group>
            <Button variant="primary" type="submit">Login</Button>
        </Form>
        {(errorState == true) ? <p>There was an error. Please try again</p> : null}
        </>
    )
}

export default LoginUser