import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom'


//import components
import Detail from "../CharacterDetail/Detail"
import Login from "../User/Login.jsx"
import Register from "../User/Register"
import MenuAppBar from "../AppBar/AppBar"
import MainPage from "../MainPage/Mainpage"
import ScrolltoTop from "./ScrolltoTop"
import Network from "../Network/Network"
class App extends Component {
  render() {
    return (

      <HashRouter>
        <ScrolltoTop>
          <div>
            {/* Add app bar */}
            <MenuAppBar/>
            <Switch>
              <Route exact path="/" component = {Network}/>
              <Route exact path="/main" component = {MainPage}/>
              <Route exact path="/detail/:id" component={Detail} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
            </Switch>
          </div>
        </ScrolltoTop>
       
      </HashRouter>
    );
  }
}

export default App;