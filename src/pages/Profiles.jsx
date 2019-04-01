import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Grid
} from "@material-ui/core";
import { Profile } from "../resources/Profile";
import ProfileDialog from "../components/ProfileDialog";
import { ProfileContext } from "../context/ProfileContext";

class Profiles extends React.Component {
  state = {
    isDialogOpen: false,
    selectedProfile: new Profile()
  };

  toggleDialog = profile => {
    const { isDialogOpen } = this.state;

    this.setState({
      isDialogOpen: !isDialogOpen,
      selectedProfile: profile
    });
  };

  render() {
    const { isDialogOpen, selectedProfile } = this.state;

    return (
      <React.Fragment>
        <Grid container spacing={24}>
          <ProfileContext.Consumer>
            {profileContext => {
              if (profileContext.state.profiles.length === 0) {
                return (
                  <Grid item xs={12}>
                    <Card>
                      <CardContent>
                        <Typography component="h2" variant="h2" align="center">
                          No profile available
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              }

              return profileContext.state.profiles.map(profile => (
                <Grid item xs={12} sm={6} lg={3} key={profile.id}>
                  <Card>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {profile.name}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        color="primary"
                        onClick={() => this.toggleDialog(profile)}
                      >
                        Update
                      </Button>
                      <Button
                        size="small"
                        color="secondary"
                        onClick={() => profileContext.deleteProfile(profile)}
                      >
                        Delete
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ));
            }}
          </ProfileContext.Consumer>
        </Grid>
        <ProfileDialog
          open={isDialogOpen}
          handleClose={() => this.toggleDialog(new Profile())}
          profileToUpdate={selectedProfile}
        />
      </React.Fragment>
    );
  }
}

export default Profiles;
