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
import UpdateProfileDialog from "../components/UpdateProfileDialog";
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
                return <p>It's empty here</p>;
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
        <UpdateProfileDialog
          open={isDialogOpen}
          handleClose={this.toggleDialog}
          profile={selectedProfile}
        />
      </React.Fragment>
    );
  }
}

export default Profiles;
