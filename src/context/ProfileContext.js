import React from "react";
import {
  getProfiles,
  deleteProfile,
  postProfile,
  patchProfile
} from "../services/ProfilesService";
import { Profile } from "../resources/Profile";
import { getStreamRemoteServerAddress } from "../services/StreamRemoteService";

export const ProfileContext = React.createContext();

export class ProfileContextProvider extends React.Component {
  state = {
    profiles: []
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

  updateProfile = profile => {
    return patchProfile(profile)
      .then(res => res.json())
      .then(newProfile => {
        const profiles = this.state.profiles.map(p => {
          if (p.id !== profile.id) return p;
          return newProfile;
        });

        this.setState({ profiles });
      });
  };

  render() {
    return (
      <ProfileContext.Provider
        value={{
          state: this.state,
          deleteProfile: this.deleteProfile,
          addProfile: this.addProfile,
          updateProfile: this.updateProfile
        }}
      >
        {this.props.children}
      </ProfileContext.Provider>
    );
  }
}
