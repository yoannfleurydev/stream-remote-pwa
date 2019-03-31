import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Fab from "@material-ui/core/Fab";
import MenuIcon from "@material-ui/icons/Menu";
import AddIcon from "@material-ui/icons/Add";
import ComputerOutlinedIcon from "@material-ui/icons/ComputerOutlined";
import Drawer from "@material-ui/core/Drawer";
import {
  ListItem,
  ListItemText,
  List,
  Divider,
  ListItemIcon
} from "@material-ui/core";
import Index from "./pages/Index";
import Scan from "./pages/Scan";
import AddProfileDialog from "./components/AddProfileDialog";
import ListIcon from "@material-ui/icons/ListOutlined";
import Profiles from "./pages/Profiles";
import {
  ProfileContextProvider,
  ProfileContext
} from "./context/ProfileContext";

const styles = theme => ({
  appBar: {
    top: "auto",
    bottom: 0
  },
  body: {
    margin: theme.spacing.unit * 2
  },
  toolbar: {
    alignItems: "center",
    justifyContent: "space-between"
  },
  fabButton: {
    position: "absolute",
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: "0 auto"
  },
  drawer: {
    width: 250
  }
});

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loadingProfiles: false,
      profiles: [],
      isDrawerOpen: false,
      isDialogOpen: false
    };
  }

  toggleDialog = () => {
    const { isDialogOpen } = this.state;

    this.setState({
      isDialogOpen: !isDialogOpen
    });
  };

  toggleDrawer = () => {
    const { isDrawerOpen } = this.state;

    this.setState({
      isDrawerOpen: !isDrawerOpen
    });
  };

  render() {
    const { classes } = this.props;
    const { isDrawerOpen, isDialogOpen } = this.state;

    return (
      <Fragment>
        <ProfileContextProvider>
          <Router>
            <div className={classes.body}>
              <Route path="/" component={Index} exact />
              <Route
                path="/scan"
                render={props => (
                  <Scan {...props} onUpdate={this.getProfiles} />
                )}
              />
              <Route path="/profiles" component={Profiles} />
            </div>

            <Drawer open={isDrawerOpen} onClose={this.toggleDrawer}>
              <div
                tabIndex={0}
                role="button"
                onClick={this.toggleDrawer}
                onKeyDown={this.toggleDrawer}
                className={classes.drawer}
              >
                <List>
                  <Link to="/profiles">
                    <ListItem button>
                      <ListItemIcon>
                        <ListIcon />
                      </ListItemIcon>
                      <ListItemText primary="Profiles" />
                    </ListItem>
                  </Link>
                </List>
                <Divider />
                <List>
                  <ProfileContext.Consumer>
                    {profileContext =>
                      profileContext.state.profiles.map(profile => (
                        <ListItem button key={profile.id}>
                          <ListItemText primary={profile.name} />
                        </ListItem>
                      ))
                    }
                  </ProfileContext.Consumer>
                </List>
              </div>
            </Drawer>

            <AppBar position="fixed" color="primary" className={classes.appBar}>
              <Toolbar className={classes.toolbar}>
                <IconButton
                  color="inherit"
                  aria-label="Open drawer"
                  onClick={this.toggleDrawer}
                >
                  <MenuIcon />
                </IconButton>
                <Fab
                  color="secondary"
                  aria-label="Add"
                  className={classes.fabButton}
                  onClick={this.toggleDialog}
                >
                  <AddIcon />
                </Fab>
                <React.Fragment>
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    to="/scan"
                  >
                    <IconButton color="inherit">
                      <ComputerOutlinedIcon />
                    </IconButton>
                  </Link>
                </React.Fragment>
              </Toolbar>
            </AppBar>

            <AddProfileDialog
              open={isDialogOpen}
              handleClose={this.toggleDialog}
            />
          </Router>
        </ProfileContextProvider>
      </Fragment>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
