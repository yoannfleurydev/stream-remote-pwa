import React, { Component } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button
} from "@material-ui/core";
import { Profile } from "../resources/Profile";
import { postProfile } from "../services/ProfilesService";

class AddProfileDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      color: ""
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = () => {
    const { handleClose } = this.props;

    const profile = new Profile(this.state);

    postProfile(profile)
      .then(() => {
        handleClose();
      })
      .catch(err => {
        console.error(err);
      });
  };

  render() {
    const { handleClose, open } = this.props;
    const { name, color } = this.state;

    return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Profile</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            name="name"
            onChange={this.handleChange}
            value={name}
            fullWidth
          />
          <TextField
            margin="dense"
            id="color"
            label="Color"
            type="text"
            name="color"
            onChange={this.handleChange}
            value={color}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleSubmit} color="primary">
            Add Profile
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default AddProfileDialog;
