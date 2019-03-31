import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button
} from "@material-ui/core";
import { Profile } from "../resources/Profile";
import { patchProfile } from "../services/ProfilesService";

function UpdateProfileDialog({ handleClose, open, profile = new Profile() }) {
  const [name, setName] = useState(profile.name);
  const [color, setColor] = useState(profile.color);

  useEffect(() => {
    setName(profile.name);
    setColor(profile.color);
  }, []);

  const handleSubmit = () => {
    const profile = new Profile({ name, color });

    patchProfile(profile)
      .then(() => {
        setName("");
        setColor("");
        handleClose();
      })
      .catch(err => {
        console.error(err);
      });
  };

  const handleKeyPress = event => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

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
          onChange={event => {
            setName(event.target.value);
          }}
          onKeyPress={handleKeyPress}
          value={name}
          fullWidth
        />
        <TextField
          margin="dense"
          id="color"
          label="Color"
          type="text"
          name="color"
          onChange={event => {
            setColor(event.target.value);
          }}
          onKeyPress={handleKeyPress}
          value={color}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Update Profile
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default UpdateProfileDialog;
