import React, { Component } from 'react'
import json from '../../data/characterId'
import CircularProgress from '@material-ui/core/CircularProgress'
import { withRouter } from 'react-router-dom'
import { Card, Icon, Image , Input } from 'semantic-ui-react'
import { getCookie } from '../../Common/cookie'
require('../CharacterDetail/Detail.scss')

class MainPage extends Component {
    //previosPos = window.pageYOffset;

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            characters: [],
            characterNames: [],
            characterIds: [],
            characterImages: [],
            loggedIn: false,
            //loaded: false,
            query: ""
        }
    }


    componentDidMount() {
        var username = getCookie("username");
        // var names = []
        // var ids = []
        // var images = []
        // for (var i = 0; i < json['data'].length; i++) {
        //     var name = json['data'][i]['top']
        //     var find = '-';
        //     var re = new RegExp(find, 'g');
        //     name = name.replace(re, ' ');
        //     names.push(name);
        //     ids.push(parseInt(json['data'][i]['topId']));
        //     images.push(json['data'][i]['image_url']);
        // }

        var characters = json['data']
        for (var i = 0; i < characters.length; i++) {
            var name = characters[i]['top'];
            var find = '-';
            var re = new RegExp(find, 'g');
            name = name.replace(re, ' ');
            characters[i]['top'] = name
        }

        this.setState({
            // characterNames: names,
            // characterIds: ids,
            // characterImages: images,
            characters: characters,
            username: username,
            loaded: true
            // }, ()=> {
            //     console.log(this.state.characterNames)
            //     console.log(this.state.characterIds)

            // })
        })



    }

    queryHandler = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    queryFilter = (name) => {
        return name['top'].toLowerCase().includes(this.state.query.toLowerCase())
    }

    render() {

        var query = this.state.query

        if (this.state.loaded) {
            var characterGrid = this.state.characters.filter(this.queryFilter).map((character, index) => {
                /**
                 * extra styles
                 */

                var url = character['image_url']
                var liStyle = {
                    marginBottom: "10px",
                    marginLeft: "5px",
                    marginRight: "5px",
                }
                var imageStyle = {
                    height: "400px",
                    backgroundImage: `url(${url})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    cursor: "pointer"
                }
                return (
                    <div style={liStyle} >
                        <Card>
                            <img style={imageStyle} onClick={() => this.props.history.push("/Detail/" + character['topId'])} />
                            <Card.Content>
                                <Card.Header>{character['top']}</Card.Header>
                                <Card.Meta>Joined in 2016</Card.Meta>
                                <Card.Description>
                                    Daniel is a comedian living in Nashville.
                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <a>
                                    <Icon name='user' />
                                    10 Friends
                            </a>
                            </Card.Content>
                        </Card>
                    </div>

                )
            })


            const inputBoxStyle = {
                textAlign: "center",
                marginBottom: "20px"
            } 

            const inputStyle = {
                width: "50%"
            }


            return (
                <div>
                    {/* <p>Hi, {this.state.username}</p> */}

                    <div style = {inputBoxStyle}>
                        <Input 
                            style = {inputStyle} 
                            size='massive' 
                            icon='search' 
                            placeholder='Search...' 
                            value = {query}
                            name = "query"
                            onChange = {this.queryHandler}
                            />
                    </div>
                    <div className='cardGroup'>
                        {characterGrid}
                    </div>

                </div>

            )
        } else {
            return (
                <div>
                    {/* <MenuAppBar /> */}
                    <div className="progress">
                        <CircularProgress></CircularProgress>
                    </div>
                </div>
            )
        }


    }

}


export default withRouter(MainPage);