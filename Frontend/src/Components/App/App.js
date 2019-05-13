import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom'


//import components
import Detail from "../CharacterDetail/Detail"

class App extends Component {
  render() {
    return (

      <HashRouter>
        <Switch>
          <Route exact path="/" component={Detail} />
        </Switch>
      </HashRouter>
    );
  }
}

export default App;