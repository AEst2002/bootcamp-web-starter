import React, { useState } from 'react'
import {Input, FormBox, Page, Button}  from './styles'
import { LOGIN } from './graphql'
import { useHistory } from "react-router-dom";
import { useMutation } from '@apollo/react-hooks'



const Login = () => {
    const history = useHistory()
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [login, {loading, error}] = useMutation(LOGIN, {
        variables: {
            email,
            password: pass,
        },
        onCompleted: ({login: {token}}) => {
            localStorage.setItem('token', token)
            history.push('/home')
        },
    })
    if(error){console.log(error)}
    return(
        <>
            <Page>
                <FormBox>
                    <h1>Log-In:</h1>
                    <Input placeholder="E-mail" onChange={(e) => setEmail(e.target.value)}></Input><br/>
                    <Input placeholder="Password" onChange={(e) => setPass(e.target.value)}></Input><br/>
                    <Button onClick={() => login()}>{ loading ? 'Loading...' : 'Login'}</Button>
                </FormBox>
            </Page>    
        </>
    )
}




export default Login