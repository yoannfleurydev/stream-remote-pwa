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
import { ProfileContext } from "../context/ProfileContext";

function AddProfileDialog({ handleClose, open }) {
  const [name, setName] = useState("");
  const [color, setColor] = useState("");

  const handleSubmit = addProfile => {
    const profile = new Profile({ name, color });

    addProfile(profile)
      .then(() => {
        setName("");
        setColor("");
        handleClose();
      })
      .catch(err => {
        console.error(err);
      });
  };

  const handleKeyPress = (event, addProfile) => {
    if (event.key === "Enter") {
      handleSubmit(addProfile);
    }
  };

  return (
    <ProfileContext.Consumer>
      {profileContext => {
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
                onKeyPress={event =>
                  handleKeyPress(event, profileContext.addProfile)
                }
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
                onKeyPress={event =>
                  handleKeyPress(event, profileContext.addProfile)
                }
                value={color}
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>

              <Button
                onClick={() => handleSubmit(profileContext.addProfile)}
                color="primary"
              >
                Add Profile
              </Button>
            </DialogActions>
          </Dialog>
        );
      }}
    </ProfileContext.Consumer>
  );
}

export default AddProfileDialog;
