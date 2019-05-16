import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import { getCookie, setCookie } from '../../Common/cookie';
import { withRouter } from 'react-router-dom';

import Login from "../User/Login.jsx"
const styles = {
  root: {
    flexGrow: 1,
    marginBottom: "80px",

  },
  grow: {
    //flexGrow: 1,
    cursor: "pointer"
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  
  toolBar: {
    display: "flex",
    justifyContent: "space-between"
  },
  toolBar2: {
    display: "flex",
    //justifyContent: "space-between"
    alignItems: "center"
  }
};

class MenuAppBar extends React.Component {
  state = {
    auth: false,
    anchorEl: null,
    username: "",
  };

  handleChange = event => {
    this.setState({ auth: event.target.checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  logout = () => {
    //delete username cookie
    setCookie('username', '', 0.1);
    window.location.reload();

  };

  setAuthStatus = () => {
    var username = getCookie('username');
    if (username != null) {
      this.setState({
        auth: true,
        username: username
      })
    }
  }

  componentDidMount() {
    this.setAuthStatus();
  }

  componentWillMount() {
    //refresh when logged in (listener to the change of routes)
    this.unlisten = this.props.history.listen((location, action) => {
      this.setAuthStatus();
    });
  }

  componentWillUnmount() {
    this.unlisten();
  }


  render() {
    const { classes } = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);


    const showUserOrLogin = () => {
      if (auth) {
        return (
          <div>
            <IconButton
              aria-owns={open ? 'menu-appbar' : undefined}
              aria-haspopup="true"
              onClick={this.handleMenu}
              color="inherit"
            >
              {/* <AccountCircle /> */}
              Hi, {this.state.username}
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={this.handleClose}
            >
              <MenuItem onClick={this.handleClose}>Profile</MenuItem>
              <MenuItem onClick={this.handleClose}>My account</MenuItem>
              <MenuItem onClick={this.logout}>Log out</MenuItem>
            </Menu>
          </div>

        )
      } else {
        return (<Login></Login>)
      }
    }

    return (
      <div className={classes.root}>
        {/* <FormGroup>
          <FormControlLabel
            control={
              <Switch checked={auth} onChange={this.handleChange} aria-label="LoginSwitch" />
            }
            label={auth ? 'Logout' : 'Login'}
          />
        </FormGroup> */}
        <AppBar position="fixed">
          <Toolbar className={classes.toolBar}>
            <div className={classes.toolBar2}>
              <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" className={classes.grow} onClick={() => { this.props.history.push('/') }}>
                A Song of Ice and Fire - 冰与火之歌
            </Typography>
            </div>

            {showUserOrLogin()}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(MenuAppBar));