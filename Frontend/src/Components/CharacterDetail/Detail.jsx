import React, { Component } from 'react';
import ProfileGrid from "./ProfileGrid"
import AppBar from '@material-ui/core/AppBar'
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography'
import MenuAppBar from '../AppBar/AppBar'


require('./Detail.scss');

class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            character: "",
            name: "",
            title: [],
            gender: "",
            culture: "",
            born: "",
            died: "",
            allegiances: "",
            playedBy: "",
            loaded: false
        };
    }

    componentDidMount() {
        //Jon snow:
        // axios.get("https://anapioficeandfire.com/api/characters/583")

        var id = this.props.match.params.id;
        (async () => {
            await axios.get("api/asoiaf/character/" + id)
                .then(character => {
                    if (character) {
                        this.setState({
                            character: character
                        })
                    }
                })
                .catch(error => {
                    alert(error)
                })

            let character = this.state.character
            let allegiances = [];
            let houseId = 0;
            //Get the primary house
            if (character.data.allegiances.length > 0) {
                allegiances = character.data.allegiances[0];
                houseId = allegiances.match('[0-9]+')[0];
            }

            //second get
            await axios.get('api/asoiaf/house/' + houseId)
                .then(house => {
                    let bookIndex = []
                    for (var i = 0; i < character.data.povBooks.length; i++) {
                        bookIndex = bookIndex.concat(parseInt(character.data.povBooks[i][character.data.povBooks[i].length - 1]))
                    }
                    this.setState({
                        //basic info
                        name: character.data.name,
                        title: character.data.titles,
                        gender: character.data.gender,
                        culture: character.data.culture,
                        born: character.data.born,
                        died: character.data.died,
                        //other information
                        allegiances: house,
                        playedBy: character.data.playedBy,
                        povBooks: bookIndex,
                        //syatematic
                        loaded: true
                    });

                })
        })()


    }




    render() {
        let loaded = this.state.loaded
        if (loaded) {
            return (
                <div>
                    {/* <MenuAppBar /> */}
                    <ProfileGrid
                        //basic info
                        name={this.state.name}
                        title={this.state.title}
                        gender={this.state.gender}
                        culture={this.state.culture}
                        born={this.state.born}
                        died={this.state.died}

                        //other information
                        allegiances={this.state.allegiances}
                        playedBy={this.state.playedBy}
                        povBooks={this.state.povBooks}
                    />
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



export default Detail