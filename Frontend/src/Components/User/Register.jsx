import React, { Component } from 'react'
import { Card, Button, List, Image, Form, Segment, Dimmer, Loader, Input } from 'semantic-ui-react';
import { getCookie, setCookie } from '../../Common/cookie.js'
import axios from 'axios'

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            email: "",
            password: "",
            passwordTwo: "",
            error: "",
            loading: false
        }
    }

    formSubmitHandler = ((event) => {
        const {
            username,
            email,
            password,
            passwordTwo,
        } = this.state;

        this.setState({
            loading: true
        });

        axios.post('api/register/', {
            username: username,
            email: email,
            password: password
        })
            .then((response) => {
                if (response.data.success) {
                    alert("Registered successfully!")
                    setCookie('username', username, 0.5)
                    this.props.history.push("/");
                } else {
                    alert(response.success)
                    this.setState({
                        error: response.data.message,
                        loading: false
                    })
                }
            })
            .catch((error) => {
                alert(error)
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


    render() {
        const {
            username,
            password,
            email,
            passwordTwo,
            loading
        } = this.state;

        var emailRegex = "[a-zA-Z0-9]+@[a-zA-Z0-9]+.[a-zA-Z0-9]+";

        const invalid = (
            username == '' // empty username
            || password == '' //empty password
            || passwordTwo == '' //empty passwordTwo
            || password != passwordTwo // password not the same
            || email == '' //empty email
            || !email.match(emailRegex) //malformed email
        )

        return (
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
                            <p>Email</p>
                        </div>
                        <Input
                            name="email"
                            value={email}
                            onChange={this.formInput}
                            type="text"
                            placeholder="xxx@gmail.com"
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
                    <Form.Field>
                        <div className="input-container">
                            <p>Comfirm Password</p>
                        </div>
                        <Input
                            name="passwordTwo"
                            value={passwordTwo}
                            onChange={this.formInput}
                            type="password"
                        />
                    </Form.Field>
                    <Button primary disabled={invalid} type="submit" >
                        Sign Up
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


export default Register;