import React, { useEffect, useRef, useState } from 'react'
import { 
    Card, 
    CardHeader, 
    CardBody, 
    CardFooter,
    Checkbox
} from '@chakra-ui/react'
import { FloatingLabel, Form, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Toast from '../../Components/Toast'
import { API } from '../../config/API'

const Register = () => {
    // State for input value
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [rate, setRate] = useState(null)

    // State for show password
    const [showPass, SetShowPass] = useState(false)
    const [typePass, setTypePass] = useState('password')

    // State for toast
    const [toastOpen, setToastOpen] = useState(true) // Initial state set to true
    const [toastTitle, setToastTitle] = useState('')
    const [toastDescription, setToastDescription] = useState('')
    const [toastStatus, setToastStatus] = useState('')
    const [toastDuration, setToastDuration] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        if (showPass) {
            setTypePass('text')
        } else {
            setTypePass('password')
        }
    }, [showPass])

    const nameRef = useRef()
    const rateRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const submitRef = useRef()

    const handleKey = (e, nextRef) => {
        if (e.key === 'Enter' && nextRef.current) {
            nextRef.current.focus()
        } else if (e.key === 'Enter') {
            submitRef.current.focus()
        }
    }

    const register = async () => {
        try {
            await axios.post(`${API}/auth/register`, {
                name,
                email,
                password,
                rate
            })
            navigate('/login')
        } catch (error) {
            console.log(error.response.data.message)
            setToastOpen(false) // Trigger the toast
            setToastTitle('Register Failed')
            setToastDescription(error.response.data.message)
            setToastStatus('error')
            setToastDuration(5000)
        }
    }

    return (
        <div className='d-flex justify-content-center align-items-center' style={{ height: "100vh" }}>
            <Toast
                title={toastTitle}
                description={toastDescription}
                status={toastStatus}
                duration={toastDuration}
                isClosed={toastOpen}
                setIsClosed={setToastOpen}
            />
            <Card className='w-50'>
                <CardHeader>
                    <h1>Register</h1>
                </CardHeader>
                <CardBody>
                    <Form>
                        <FloatingLabel
                            controlId='floatingInput'
                            label='Name'
                            className='mb-3'
                        >
                            <Form.Control
                                type='text'
                                placeholder='Nama'
                                ref={nameRef}
                                value={name}
                                onKeyDown={(e) => handleKey(e, rateRef)}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </FloatingLabel>

                        <FloatingLabel
                            controlId='floatingInput'
                            label='Rate Per Jam'
                            className='mb-3'
                        >
                            <Form.Control
                                type='number'
                                placeholder='Rate Per Jam'
                                ref={rateRef}
                                value={rate}
                                onKeyDown={(e) => handleKey(e, emailRef)}
                                onChange={(e) => setRate(e.target.value)}
                            />
                        </FloatingLabel>

                        <FloatingLabel
                            controlId='floatingInput'
                            label='Email'
                            className='mb-3'
                        >
                            <Form.Control
                                type='email'
                                placeholder='email'
                                ref={emailRef}
                                onKeyDown={(e) => handleKey(e, passwordRef)}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </FloatingLabel>

                        <FloatingLabel
                            controlId='floatingInput'
                            label='Password'
                            className='mb-3'
                        >
                            <Form.Control
                                type={typePass}
                                placeholder='password'
                                ref={passwordRef}
                                onKeyDown={(e) => handleKey(e, submitRef)}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </FloatingLabel>

                        <Button
                            variant='primary'
                            className='w-100'
                            disabled={email === '' || password === '' || name === '' || rate === null}
                            onClick={register}
                            ref={submitRef}
                        >
                            Register
                        </Button>
                    </Form>
                </CardBody>
                <CardFooter className='d-flex flex-column'>
                    <Checkbox
                        className='mb-2'
                        isChecked={showPass}
                        onChange={() => SetShowPass(!showPass)}
                    >
                        Tampilkan Sandi
                    </Checkbox>
                    <div>
                        Already have an account? <Link to={"/login"} className='text-primary mx-1'>Login</Link>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}

export default Register
