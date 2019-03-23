import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import QrReader from "react-qr-reader";
import Grid from "@material-ui/core/Grid";
import { TextField, Button } from "@material-ui/core";
import { setStreamRemoteServerAddress } from "../services/StreamRemoteService";

class Scan extends Component {
  constructor(props) {
    super(props);

    this.state = {
      address: "",
      redirect: false
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = () => {
    const { address } = this.state;
    const { onUpdate } = this.props;

    setStreamRemoteServerAddress(address);

    onUpdate();

    this.setState({ redirect: true });
  };

  handleScan = address => {
    if (address) {
      this.setState({
        address
      });
    }
  };

  handleError = err => {
    console.error(err);
  };

  render() {
    const { address, redirect } = this.state;

    if (redirect) {
      return <Redirect to="/" />;
    }

    return (
      <Grid container spacing={24}>
        <Grid item lg={4} md={6} sm={12} xs={12}>
          <QrReader onError={this.handleError} onScan={this.handleScan} />
        </Grid>
        <Grid item lg={8} md={6} sm={12} xs={12}>
          <form onSubmit={this.handleSubmit}>
            <Grid container spacing={24}>
              <Grid item xs={12}>
                <TextField
                  id="outlined-name"
                  label="Address"
                  name="address"
                  value={address}
                  onChange={this.handleChange}
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
                  onClick={this.handleSubmit}
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
}

export default Scan;
