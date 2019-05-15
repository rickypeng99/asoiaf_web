import React, {Component} from 'react'
import {Card, Button, List, Image, Form, Segment, Dimmer, Loader, Input, } from 'semantic-ui-react';
import {getCookie, setCookie} from '../../Common/cookie.js'
import {withRouter} from 'react-router-dom'
import axios from 'axios'

class Login extends Component{
    constructor(props){
        super(props)
        this.state = {
            username: "",
            password: "",
            error: "",
            loading: false
        }
    }

    formSubmitHandler = ((event) => {
        const{
            username,
            password
        } = this.state;

        this.setState({
            loading: true
        });

        axios.post('api/login/', {
            username: username,
            password: password
        })
        .then((response) => {
            if(response.data.success){
                alert("Login successfully!")
                setCookie('username', username, 0.5)
                this.props.history.push("/");
            } else{
                this.setState({
                    error: response.data.message,
                    loading: false
                })
            }
        })
        .catch((error) => {
            this.setState({
                error: error,
                loading: false
            })
        })

        event.preventDefault();

    })

    formInput = ((event) => {
        this.setState({ [event.target.name]: event.target.value });
    })


    render(){
        const{
            username,
            password,
            loading
        } = this.state;

        const invalid = (
            username == '' || password == ''
        )

        return(
            
                <Segment>
                    <Dimmer active={loading} inverted>
                        <Loader inverted>Loading</Loader>
                    </Dimmer>
                    <Form onSubmit={this.formSubmitHandler}>
                        <Form.Field>
                            <div className="input-container">
                                <p inline>Username</p>
                            </div>
                            <Input
                                name="username"
                                value={username}
                                onChange={this.formInput}
                                type="text"
                                placeholder="admin"
                            />
                        </Form.Field>
                        
                        <Form.Field>
                            <div className="input-container">
                                <p>Password</p>
    
                            </div>
                            <Input
                                name="password"
                                value={password}
                                onChange={this.formInput}
                                type="password"
                            />
                        </Form.Field>
                        
                        <Button primary disabled={invalid} type="submit" >
                            Sign In
                    </Button>
                    </Form>
                    {/* <div class="already">
                        <p>Already have an account?</p>
                        <Button primary onClick={() => this.props.history.push("/")}>Return and sign in!</Button>
                    </div> */}
                </Segment>
                
          
            
        )
    }
}


export default withRouter(Login);