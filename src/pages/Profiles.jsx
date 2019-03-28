import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Grid
} from "@material-ui/core";
import { getProfiles, deleteProfile } from "../services/ProfilesService";
import { Profile } from "../resources/Profile";

class Profiles extends React.Component {
  state = {
    profiles: []
  };

  componentDidMount() {
    getProfiles()
      .then(response => response.json())
      .then(body => body.map(profile => new Profile(profile)))
      .then(profiles => this.setState({ profiles }));
  }

  handleDeletion = profile => {
    const { profiles } = this.state;

    deleteProfile(profile).then(() => {
      const newProfiles = profiles;
      let index = newProfiles.indexOf(profile);

      if (index > -1) {
        newProfiles.splice(index, 1);
      }

      this.setState({ profiles: newProfiles });
    });
  };

  render() {
    const { profiles } = this.state;

    return (
      <Grid container spacing={24}>
        {profiles.map(profile => (
          <Grid item xs={12} sm={6} lg={3} key={profile.id}>
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {profile.name}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  Update
                </Button>
                <Button
                  size="small"
                  color="secondary"
                  onClick={() => this.handleDeletion(profile)}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  }
}

export default Profiles;
