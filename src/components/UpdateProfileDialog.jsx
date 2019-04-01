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

function UpdateProfileDialog({
  handleClose,
  open,
  profileToUpdate = new Profile()
}) {
  const [id, setId] = useState("id");
  const [name, setName] = useState("");
  const [color, setColor] = useState("");

  if (id !== profileToUpdate.id) {
    setId(profileToUpdate.id);
    setName(profileToUpdate.name);
    setColor(profileToUpdate.color);
  }

  const handleSubmit = updateProfile => {
    updateProfile(new Profile({ _id: id, name, color }))
      .then(() => {
        setId("id");
        setName("");
        setColor("");
        handleClose();
      })
      .catch(err => {
        console.error(err);
      });
  };

  const handleKeyPress = (event, updateProfile) => {
    if (event.key === "Enter") {
      handleSubmit(updateProfile);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Profile</DialogTitle>
      <ProfileContext.Consumer>
        {profileContext => (
          <React.Fragment>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Name"
                type="text"
                name="name"
                onKeyPress={event =>
                  handleKeyPress(event, profileContext.updateProfile)
                }
                fullWidth
                value={name}
                onChange={event => setName(event.target.value)}
              />
              <TextField
                margin="dense"
                id="color"
                label="Color"
                type="text"
                name="color"
                onKeyPress={event =>
                  handleKeyPress(event, profileContext.updateProfile)
                }
                fullWidth
                value={color}
                onChange={event => setColor(event.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button
                onClick={() => handleSubmit(profileContext.updateProfile)}
                color="primary"
              >
                Update Profile
              </Button>
            </DialogActions>
          </React.Fragment>
        )}
      </ProfileContext.Consumer>
    </Dialog>
  );
}

export default UpdateProfileDialog;
