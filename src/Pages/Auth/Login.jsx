import React, {useEffect, useRef, useState} from 'react'
import { Button, FloatingLabel, Form } from 'react-bootstrap'
import { Card, CardHeader, CardBody, CardFooter, Checkbox } from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'
import { API } from '../../config/API'
import axios from 'axios'
import Toast from '../../Components/Toast'

const Login = () => {

  // state for input value
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // show pass state
  const [showPass, setShowPass] = useState(false)
  const [typePass, setTypePass] = useState('password')

  // navigation
  const navigate = useNavigate()

  // toast state
  const [toastOpen, setToastOpen] = useState(true) // Initial state set to true
  const [toastTitle, setToastTitle] = useState('')
  const [toastDescription, setToastDescription] = useState('')
  const [toastStatus, setToastStatus] = useState('')
  const [toastDuration, setToastDuration] = useState(null)

  const emailref = useRef()
  const passwordref = useRef()
  const submitref = useRef()

  const handleKey = (e, nextRef) => {
        if (e.key === 'Enter' && nextRef.current) {
            nextRef.current.focus()
        } else if (e.key === 'Enter') {
            submitRef.current.focus()
        }
    }

    useEffect(()=>{
      if(showPass){
        setTypePass('text')
      }else{
        setTypePass('password')
      }
    },[showPass])

    useEffect(()=>{
      localStorage.removeItem('token')
    },[])

    const login = async () => {
      try {
        const res = await axios.post(`${API}/auth/login`, {
          email,
          password
        })
        localStorage.setItem('token', res.data.access_token)
        navigate('/')
      } catch (error) {
        setToastOpen(false) // Trigger the toast
        setToastTitle('Register Failed')
        setToastDescription(error.response.data.message)
        setToastStatus('error')
        setToastDuration(5000)
      }
    }

  return (
    <div className='d-flex justify-content-center align-items-center' style={{height: "100vh"}}>
          <Toast
              title={toastTitle}
              description={toastDescription}
              status={toastStatus}
              duration={toastDuration}
              isClosed={toastOpen}
              setIsClosed={setToastOpen}
            />
        <Card className='w-50'>
            <CardHeader className='text-center'>
              <h1>Login</h1>
            </CardHeader>
            <CardBody>
                <Form>
                    <FloatingLabel
                        controlId='floatingInput'
                        label='Email'
                        className='mb-3'
                    >
                        <Form.Control
                            type='email'
                            placeholder='email'
                            value={email}
                            ref={emailref}
                            onKeyDown={(e)=>handleKey(e, passwordref)}
                            onChange={(e)=>setEmail(e.target.value)}
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
                            value={password}
                            ref={passwordref}
                            onKeyDown={(e)=>handleKey(e, submitref)}
                            onChange={(e)=>setPassword(e.target.value)}
                        />
                    </FloatingLabel>
                    <Checkbox 
                      colorScheme='blue' 
                      className='mb-3'
                      isChecked={showPass}
                      onChange={() => setShowPass(!showPass)}
                      >
                      Tampilkan Password
                    </Checkbox>
                    <div>
                        <p>Belum Punya Akun?  <Link to={"/register"} className='text-primary mx-1'>Register</Link> </p>
                    </div>
                    <Button 
                      variant='primary' 
                      className='w-100'
                      ref={submitref}
                      onClick={login}
                      >
                      Login</Button>
                </Form>
            </CardBody>
            <CardFooter>
            </CardFooter>
        </Card>
    </div>
  )
}

export default Login