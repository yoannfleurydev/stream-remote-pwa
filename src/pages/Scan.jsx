import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import QrReader from "react-qr-reader";
import Grid from "@material-ui/core/Grid";
import { TextField, Button } from "@material-ui/core";
import { setStreamRemoteServerAddress } from "../services/StreamRemoteService";

function Scan({ onUpdate }) {
  const [address, setAddress] = useState("");
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = async () => {
    await setStreamRemoteServerAddress(address);

    onUpdate();

    setRedirect(true);
  };

  const handleScan = address => {
    if (address) {
      setAddress(address);
    }
  };

  const handleError = err => {
    console.error(err);
  };

  if (redirect) {
    return <Redirect to="/" />;
  }

  return (
    <Grid container spacing={24}>
      <Grid item lg={4} md={6} sm={12} xs={12}>
        <QrReader onError={handleError} onScan={handleScan} />
      </Grid>
      <Grid item lg={8} md={6} sm={12} xs={12}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <TextField
                id="outlined-name"
                label="Address"
                name="address"
                value={address}
                onChange={event => setAddress(event.target.value)}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                disabled={address.length === 0}
                fullWidth
                type="submit"
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
}

export default Scan;
