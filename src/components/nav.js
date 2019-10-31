import React from "react"
import { navigate } from "gatsby"
import { isLoggedIn, logout } from "../services/auth"
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = {
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    }
};

const NavBar = (props) => {
    const { classes } = props
    return (
        isLoggedIn() ? (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" className={classes.title}>
                            Your Collection
                </Typography>
                        <Button 
                            onClick={event => {
                                event.preventDefault()
                                logout().then(() => {
                                    window.localStorage.removeItem('access_token')
                                    navigate(`/app/login`)
                                })
                            }} 
                            color="inherit">
                            Logout
                        </Button>
                    </Toolbar>
                </AppBar>
            </div>
        ) : null
    )
};

export default withStyles(styles)(NavBar);