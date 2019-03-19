import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Fab from "@material-ui/core/Fab";
import MenuIcon from "@material-ui/icons/Menu";
import AddIcon from "@material-ui/icons/Add";
import Drawer from "@material-ui/core/Drawer";
import { ListItem, ListItemText, List } from "@material-ui/core";

const styles = {
  appBar: {
    top: "auto",
    bottom: 0
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
  }
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loadingProfiles: false,
      profiles: [],
      isDrawerOpen: false
    };
  }

  componentDidMount() {
    this.setState({ loadingProfiles: true }, () => {
      fetch("http://localhost:3000/api/profiles")
        .then(response => response.json())
        .then(body => {
          this.setState({ loadingProfiles: false, profiles: body });
        });
    });
  }

  toggleDrawer = () => {
    const { isDrawerOpen } = this.state;

    this.setState({
      isDrawerOpen: !isDrawerOpen
    });
  };

  render() {
    const { classes } = this.props;
    const { profiles, isDrawerOpen } = this.state;

    return (
      <Fragment>
        <Drawer open={isDrawerOpen} onClose={this.toggleDrawer}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer}
            onKeyDown={this.toggleDrawer}
          >
            <List>
              {profiles.map(profile => (
                <ListItem button key={profile._id}>
                  <ListItemText primary={profile.name} />
                </ListItem>
              ))}
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
            >
              <AddIcon />
            </Fab>
          </Toolbar>
        </AppBar>
      </Fragment>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
