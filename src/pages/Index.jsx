import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import {
  getStreamRemoteServerAddress,
  getHealth
} from "../services/StreamRemoteService";
import { Health } from "../resources/Health";

class Index extends Component {
  state = {
    health: new Health()
  };

  componentDidMount() {
    getHealth()
      .then(response => response.json())
      .then(body => new Health(body))
      .then(health => this.setState({ health }))
      .catch(err => console.error(err));
  }

  render() {
    const address = getStreamRemoteServerAddress();
    const { health } = this.state;

    if (!address) {
      return <Redirect to="/scan" />;
    }

    return (
      <div>
        <p>Connected to {address}</p>
        <p>Status : {health.status}</p>
      </div>
    );
  }
}

export default Index;
