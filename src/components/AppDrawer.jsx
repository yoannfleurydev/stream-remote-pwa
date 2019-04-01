import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  Drawer,
  ListItem,
  ListItemText,
  List,
  Divider,
  ListItemIcon
} from "@material-ui/core";
import ListIcon from "@material-ui/icons/ListOutlined";
import { ProfileContext } from "../context/ProfileContext";

function AppDrawer({ isDrawerOpen, toggleDrawer }) {
  return (
    <Drawer open={isDrawerOpen} onClose={toggleDrawer}>
      <div
        tabIndex={0}
        role="button"
        onClick={toggleDrawer}
        onKeyDown={toggleDrawer}
        style={{ width: 250 }}
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
  );
}

AppDrawer.propTypes = {
  isDrawerOpen: PropTypes.bool,
  toggleDrawer: PropTypes.func
};

export default AppDrawer;
