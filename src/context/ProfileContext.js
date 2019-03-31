import React from "react";
import {
  getProfiles,
  deleteProfile,
  postProfile
} from "../services/ProfilesService";
import { Profile } from "../resources/Profile";
import { getStreamRemoteServerAddress } from "../services/StreamRemoteService";

export const ProfileContext = React.createContext();

export class ProfileContextProvider extends React.Component {
  state = {
    profiles: [],
    profile: {}
  };

  componentDidMount() {
    if (getStreamRemoteServerAddress()) {
      getProfiles()
        .then(response => response.json())
        .then(body => body.map(profile => new Profile(profile)))
        .then(profiles => this.setState({ profiles }));
    }
  }

  addProfile = profile => {
    return postProfile(profile)
      .then(res => res.json())
      .then(createdProfile => {
        const newProfiles = this.state.profiles;
        newProfiles.push(new Profile(createdProfile));

        this.setState({ profiles: newProfiles });
      })
      .catch(err => {
        console.error(err);
      });
  };

  deleteProfile = profile => {
    const { profiles } = this.state;

    return deleteProfile(profile).then(() => {
      const newProfiles = profiles;
      let index = newProfiles.indexOf(profile);

      if (index > -1) {
        newProfiles.splice(index, 1);
      }

      this.setState({ profiles: newProfiles });
    });
  };

  render() {
    return (
      <ProfileContext.Provider
        value={{
          state: this.state,
          deleteProfile: this.deleteProfile,
          addProfile: this.addProfile
        }}
      >
        {this.props.children}
      </ProfileContext.Provider>
    );
  }
}
