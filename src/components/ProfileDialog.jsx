import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from "@material-ui/core";
import { Profile } from "../resources/Profile";
import { ProfileContext } from "../context/ProfileContext";
import TextFieldOutlined from "./molecules/TextFieldOutlined";

function UpdateProfileDialog({ handleClose, open, profileToUpdate }) {
  const [id, setId] = useState("id");
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [loading, setLoading] = useState(false);

  const isUpdate = Boolean(profileToUpdate);

  if (profileToUpdate && id !== profileToUpdate.id) {
    setId(profileToUpdate.id);
    setName(profileToUpdate.name);
    setColor(profileToUpdate.color);
  }

  const resetTextFields = () => {
    setId("id");
    setName("");
    setColor("");
  };

  const handleSubmit = profileContext => {
    setLoading(true);

    if (isUpdate) {
      profileContext
        .updateProfile(new Profile({ _id: id, name, color }))
        .then(() => {
          resetTextFields();
          handleClose();
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
        });

      return;
    }

    profileContext
      .addProfile(new Profile({ name, color }))
      .then(() => {
        resetTextFields();
        handleClose();
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
      });
  };

  const handleKeyPress = (event, profileContext) => {
    if (event.key === "Enter") {
      handleSubmit(profileContext);
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
              <TextFieldOutlined
                autoFocus
                margin="dense"
                id="name"
                label="Name"
                type="text"
                name="name"
                onKeyPress={event => handleKeyPress(event, profileContext)}
                fullWidth
                value={name}
                onChange={event => setName(event.target.value)}
              />
              <TextFieldOutlined
                margin="dense"
                id="color"
                label="Color"
                type="text"
                name="color"
                onKeyPress={event => handleKeyPress(event, profileContext)}
                fullWidth
                value={color}
                onChange={event => setColor(event.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary" disabled={loading}>
                Cancel
              </Button>
              <Button
                onClick={() => handleSubmit(profileContext)}
                color="primary"
                disabled={loading}
              >
                {isUpdate ? "Update Profile" : "Add Profile"}
              </Button>
            </DialogActions>
          </React.Fragment>
        )}
      </ProfileContext.Consumer>
    </Dialog>
  );
}

export default UpdateProfileDialog;
