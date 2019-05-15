import React, { Component } from 'react'
import json from '../../data/characterId'
import CircularProgress from '@material-ui/core/CircularProgress'
import {withRouter}  from 'react-router-dom'
import { Card, Icon, Image } from 'semantic-ui-react'

require('../CharacterDetail/Detail.scss')

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            characterNames: [],
            characterIds: [],
            characterImages: [],
            loggedIn: false,
            //loaded: false,
        }
    }

    componentDidMount() {

        var names = []
        var ids = []
        var images = []
        for (var i = 0; i < json['data'].length; i++) {
            var name = json['data'][i]['top']
            var find = '-';
            var re = new RegExp(find, 'g');
            name = name.replace(re, ' ');
            names.push(name);
            ids.push(parseInt(json['data'][i]['topId']));
            images.push(json['data'][i]['image_url']);
        }

        this.setState({
            characterNames: names,
            characterIds: ids,
            characterImages: images,
            loaded: true
            // }, ()=> {
            //     console.log(this.state.characterNames)
            //     console.log(this.state.characterIds)

            // })
        })



    }


    render() { 
        if (this.state.loaded) {
            var characterGrid = this.state.characterNames.map((character, index) => {
                /**
                 * extra styles
                 */

                var url = this.state.characterImages[index]
                var liStyle = {
                    marginBottom: "10px",
                    marginLeft: "5px",
                    marginRight: "5px",
               }
                var imageStyle = {
                    height: "400px",
                    backgroundImage:  `url(${url})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    cursor: "pointer"
                }
                return (
                    <li style = {liStyle} >
                        <Card>
                            <img style = {imageStyle} onClick = {() => this.props.history.push("/Detail/" + this.state.characterIds[index])}/>
                            <Card.Content>
                                <Card.Header>{character}</Card.Header>
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
                    </li>

                )
            })

            return (
                <ul className='cardGroup'>
                    {characterGrid}
                </ul>

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