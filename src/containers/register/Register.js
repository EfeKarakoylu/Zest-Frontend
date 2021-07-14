import React, {useEffect, useState} from "react";
import {withRouter} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {registerUser} from "./store/actions/register.actions";
import {Button, Form, Grid, Header, Message, Segment} from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCookie } from '@fortawesome/free-solid-svg-icons'
import DragAndDrop from "../../DragAndDrop";
import NotifyUser from "../../layout/NotifyUser";

const Register = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [email, setEmail] = useState('')
    const [key, setKey] = useState('')
    const [isPending, setIsPending] = useState(false)

    // const {imageKey} = useSelector(state => state.imageReducer)

    const element = <FontAwesomeIcon icon={faCookie} />


    const handleSubmit = (e) => {
        e.preventDefault()
        const user = {name, password, password2, email}
        const msg = dispatch(registerUser(user))
        console.log(msg)
        console.log('sa register')
    }

    // useEffect(() => {
    //     if (!imageKey){
    //         return
    //     }
    //     setKey(imageKey)
    // }, [imageKey])



    return(
        <div>
            {/*<DragAndDrop/>*/}
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as='h2' color='teal' textAlign='center'>
                        {element} Register
                    </Header>
                    <Form size='large'>
                        <Segment stacked>
                            <Form.Input fluid icon='user' iconPosition='left' placeholder='Name' required onChange={(e) => setName(e.target.value)}/>

                            <Form.Input
                                fluid
                                icon='lock'
                                iconPosition='left'
                                placeholder='Password'
                                type='password'
                                onChange={(e) => setPassword(e.target.value)}

                            />
                            <Form.Input
                                fluid
                                icon='lock'
                                iconPosition='left'
                                placeholder='Confirm Password'
                                type='password'
                                onChange={(e) => setPassword2(e.target.value)}

                            />
                            <Form.Input fluid icon='envelope' iconPosition='left' placeholder='E-mail address' required onChange={(e) => setEmail(e.target.value)}/>
                            {/*<div>*/}
                            {/*    <button type="submit" value={'Login'} onClick={handleSubmit}>Login</button>*/}
                            {/*</div>*/}


                            <Button color='teal' fluid size='large' onClick={handleSubmit}>
                                Register
                            </Button>
                        </Segment>
                    </Form>

                    <Message>
                        Already Registered? <a href='/login'>Login here</a>
                    </Message>
                </Grid.Column>
            </Grid>

        </div>
    );
}

export default withRouter(Register);