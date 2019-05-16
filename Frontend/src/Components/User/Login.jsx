import React, { Component } from 'react'
import { Card, Button, List, Image, Form, Segment, Dimmer, Loader, Input, } from 'semantic-ui-react';
import { getCookie, setCookie } from '../../Common/cookie.js'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
            error: "",
            loading: false
        }
    }

    formSubmitHandler = ((event) => {
        const {
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
                if (response.data.success) {
                    alert("Login successfully!")
                    setCookie('username', username, 0.5)
                    window.location.reload();
                } else {
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


    render() {
        const {
            username,
            password,
            loading
        } = this.state;

        const invalid = (
            username == '' || password == ''
        )

        const formStyle = {
            display: "flex",
            height: "100%",
            alignItems: "center",
            //justifyContents: "space-between"
        }

        const inputStyle = {
            marginRight: "20px"
        }

        const buttonStyle = {
            height: "50%"
        }
        return (

            <div>
                <Dimmer active={loading} inverted>
                    <Loader inverted>Loading</Loader>
                </Dimmer>
                <Form onSubmit={this.formSubmitHandler} style={formStyle}>

                        <Input
                            label='Username'
                            name="username"
                            value={username}
                            onChange={this.formInput}
                            type="text"
                            placeholder="admin"
                            style={inputStyle}
                        />
                

                 
                        <Input
                            label='Password'
                            name="password"
                            value={password}
                            onChange={this.formInput}
                            type="password"
                            style={inputStyle}
                        />

                    <Button primary disabled={invalid} type="submit" style={buttonStyle}>
                        Sign In
                        </Button>
                </Form>
                {/* <div class="already">
                        <p>Already have an account?</p>
                        <Button primary onClick={() => this.props.history.push("/")}>Return and sign in!</Button>
                    </div> */}
            </div>



        )
    }
}


export default withRouter(Login);