import React, { useState } from "react";
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

function AddProfileDialog({ handleClose, open }) {
  const [name, setName] = useState("");
  const [color, setColor] = useState("");

  const handleSubmit = () => {
    const profile = new Profile({ name, color });

    postProfile(profile)
      .then(() => {
        handleClose();
      })
      .catch(err => {
        console.error(err);
      });
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
          value={color}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Add Profile
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddProfileDialog;
