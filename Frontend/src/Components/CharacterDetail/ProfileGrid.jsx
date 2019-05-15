import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';
import { FormHelperText } from '@material-ui/core';
import {Label} from 'semantic-ui-react'
require('./Detail.scss')
const styles = theme => ({
  body: {
    paddingTop: '10px',
    paddingLeft: '10%',
    paddingRight: '10%',
  },

  paper: {
    padding: theme.spacing.unit * 2,
    //textAlign: 'center',
    color: theme.palette.text.secondary,

  },

  paper_image: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },

  profile_image: {
    maxWidth: "300px",
    maxHeight: "100%",
  },

  // house: {
  //   //display: "flex",
  //   // justifyContent: "space-between",
  //   // alignItems: "space-between"
  // },

  house_image: {
    maxWidth: "50px",
    maxHeight: "50px",
  },

  title: {
    wordWrap: 'break-word'

  }
});

function ProfileGrid(props) {
  const classes = props.classes;
  const name = props.name;
  //return title array
  const title = props.title.map((title, index) => {
    // if (index == props.title.length - 1) {
    //   return (
    //     <div key = {index}>
    //       <p>{title}</p>
    //       <br></br>
    //     </div>
    //   )

    // }
    return <p key = {index}>{title}</p>
  });

  const gender = props.gender;
  const culture = props.culture;
  const born = props.born;
  const died = () => {
    if (props.died == "") {
      return "Alive";
    } else {
      return props.died;
    }
  };

  const house = props.allegiances;

  

  let bookNames = ["A Game of Thrones", "A Clash of Kings", "A Storm of Swords", "The Hedge Knight", "A Feast for Crows", "The Sworn Sword", "The Mystery Knight", "A Dance with Dragons", "The Princess and the Queen", "The Rogue Prince"]
  const povBooks = props.povBooks.map((index, i) => {
    return <p key = {i}>{bookNames[index]}</p>
  });
  const playedBy = props.playedBy;



  return (
    <div className={classes.body}>
      {/* Horizontal grid of the entire page */}
      <Grid container spacing={16}>
        {/* Basic Profile */}
        <Grid item xs={8}>
          <Grid container spacing={16} direction="column">
            <Grid item xs={12}>
            
              <Paper className={classes.paper}>
                <Label as='p' color='red' ribbon>
                  Overview
                </Label>
                {/*Name*/}
                <Typography variant="h4" gutterBottom >
                  {name}
                </Typography>
                <Divider/>
                {/*Titles*/}
                <Typography variant="subtitle1">
                  {title}
                </Typography>
              </Paper>
            </Grid>

          <Grid item xs={12}>
            <Paper className={classes.paper}>
              {/**Intro */}
              <Typography variant="h5" gutterBottom>
                Basic Information
              </Typography>
              <Divider/>
              <Typography variant="subtitle1">
                {"Gender: " + gender}
              </Typography>
              <Typography variant="subtitle1">
                {"Culture: " + culture}
              </Typography>
              <Typography variant="subtitle1">
                {"Born: " + born}
              </Typography>
              <Typography variant="subtitle1">
                {"Died: " + died()}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
         
        </Grid>
        {/* Vertical section on the right */}
        <Grid item xs={4}>
          <Grid container spacing={16} direction="column">

            {
              /**
               * Allegience section
               */
            }
            
            <Grid item xs={12}>
              <Paper className={classes.paper_image}>
                <Typography variant="h4" gutterBottom className={classes.title}>
                  {house.data.name}
                </Typography>
                {/* <img src={require('./Anonymous.png')} title={"Photo of " + name} className={classes.profile_image}/> */}
                <div class = "house">
                  <img src={require('./House_Targaryen.svg')} title={"Photo of " + house.data.name} className={classes.house_image} />
                  <Typography variant="h5" className={classes.title}>
                    {name}
                  </Typography>
                  <img src={require('./House_Targaryen.svg')} title={"Photo of " + house.data.name} className={classes.house_image} />
                </div>
                
              </Paper>
            </Grid>

            {/**
            Image section
           */}
            
            <Grid item xs={12}>
              <Paper className={classes.paper_image}>
                <Typography variant="h4" gutterBottom className={classes.title}>
                  {"Picture of " + name}
                </Typography>
                {/* <img src={require('./Anonymous.png')} title={"Photo of " + name} className={classes.profile_image}/> */}
                <img src={require('./Daenerys_targaryen_by_regochan-d7hfi57.webp')} title={"Photo of " + name} className={classes.profile_image} />
              </Paper>
            </Grid>

            {/**
            Other section
          */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Typography variant="h4" className={classes.title} gutterBottom>
                  Miscellaneous
                </Typography>
                <Divider/>
                <Typography variant="h5" gutterBottom>
                  Playered by:
                </Typography>
                <Typography variant="subtitle1">
                  {playedBy}
                </Typography>
                <Typography variant="h5" gutterBottom>
                  Being POV in books:
                </Typography>
                <Typography variant="subtitle1" >
                  {povBooks}
                </Typography>
              </Paper>

            </Grid>
          </Grid>
        </Grid>

      </Grid>



    </div>
  );
}



export default withStyles(styles)(ProfileGrid);