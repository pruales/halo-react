import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { navigate } from "gatsby"
import { handleLogin, isLoggedIn, handleRegister } from "../services/auth"

const styles = theme => ({
    '@global': {
      body: {
        backgroundColor: theme.palette.common.white,
        margin: 0
      },
    },
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  });

class Login extends React.Component {
  state = {
    username: ``,
    password: ``,
    registering: false
  }
  handleUpdate = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }
  handleSubmit = event => {
    event.preventDefault()
    const credentials = {
        username: this.state.username,
        password: this.state.password
    };

    if(!this.state.registering) {
        handleLogin(credentials)
        .then(this.handleSuccessfulAuth, err => {  
            console.log(err.response)
        });
    } else {
        handleRegister(credentials)
        .then(this.handleSuccessfulAuth, err => {  
            console.log(err.response)
        });
    }
  
  }

  handleSuccessfulAuth = (res) => {
    window.localStorage.setItem('access_token',res.data.access_token)
    navigate(`/app/collection`)
  }
  render() {
    if (isLoggedIn()) {
      navigate(`/app/collection`)
    }

    const { classes } = this.props;
    const heading = this.state.registering ? 'Register' : 'Sign in';

    return (
       
        <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
            {heading}
        </Typography>
        <form 
            className={classes.form} 
            noValidate
            method="post"
          onSubmit={event => {
            this.handleSubmit(event)
          }}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={this.handleUpdate}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={this.handleUpdate}
          />
     
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
               {this.state.registering ? 'Register' : 'Sign in'}   
          </Button>
          <Link 
          component="button"
           onClick={(e) => {
            e.preventDefault()
            this.setState(prevState => ({registering: !prevState.registering}))
            }} 
          variant="body2">
                {this.state.registering ? "Already have an account? Sign in": "Don't have an account? Register"}
            </Link>
        </form>
      </div>
    </Container>
    )
  }
}
export default withStyles(styles)(Login)