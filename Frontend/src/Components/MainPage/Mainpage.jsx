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
            loggedIn: false,
            //loaded: false,
        }
    }

    componentDidMount() {

        var names = []
        var ids = []
        for (var i = 0; i < json['data'].length; i++) {
            names.push(json['data'][i]['top'].replace("-", " "))
            ids.push(parseInt(json['data'][i]['topId']))
        }

        this.setState({
            characterNames: names,
            characterIds: ids,
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
                var liStyle = {
                    marginBottom: "10px",
                    marginLeft: "5px",
                    marginRight: "5px",
                    cursor: "pointer"
               }
                var imageStyle = {
                    height: "400px",
                    backgroundImage:  `url(${require('../CharacterDetail/Daenerys_targaryen_by_regochan-d7hfi57.webp')})`,
                    backgroundSize: "cover"
                }
                return (
                    <li style = {liStyle} onClick = {() => this.props.history.push("/Detail/" + this.state.characterIds[index])}>
                        <Card>
                            <img style = {imageStyle}/>
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