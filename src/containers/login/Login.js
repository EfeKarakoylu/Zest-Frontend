import React from 'react';
import {withRouter} from "react-router";
import {useState} from "react";
import {useHistory} from "react-router-dom";
import {userLogin} from "./store/actions/login.actions";
import {useDispatch} from "react-redux";
import 'semantic-ui-css/semantic.min.css'
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCookie } from '@fortawesome/free-solid-svg-icons'


function Login(props) {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const history = useHistory()
    const element = <FontAwesomeIcon icon={faCookie} />

    const handleSubmit = (e) => {
        e.preventDefault()
        const user = {email, password}
        dispatch(userLogin(user, history))
    }

    return (
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' color='teal' textAlign='center'>
                    {element} Log-in to your account
                </Header>
                <Form size='large'>
                    <Segment stacked>
                        <Form.Input fluid icon='envelope' iconPosition='left' placeholder='E-mail address' required onChange={(e) => setEmail(e.target.value)}/>
                        <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Password'
                            type='password'
                            onChange={(e) => setPassword(e.target.value)}

                        />
                        {/*<div>*/}
                        {/*    <button type="submit" value={'Login'} onClick={handleSubmit}>Login</button>*/}
                        {/*</div>*/}


                        <Button color='teal' fluid size='large' onClick={handleSubmit}>
                            Login
                        </Button>
                    </Segment>
                </Form>
                <Message>
                    New to us? <a href='/register'>Sign Up</a>
                </Message>
            </Grid.Column>
        </Grid>
    );
}

export default withRouter(Login);