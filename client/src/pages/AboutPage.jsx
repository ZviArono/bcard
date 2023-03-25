import React from "react";
import Container from "@mui/material/Container";
import PageHeader from "./../components/PageHeader";
import Grid from "@mui/material/Grid";

const AboutPage = () => {
  return (
    <Container maxWidth="lg">
      <PageHeader
        title="About Page"
        subtitle="On this page you can find explanations about using the application"
      />

      <Grid container spacing={2}>
        <Grid item xs={12} md={8} alignSelf="center">
          <div>
            <h2>Welcome to my Business Card App - BCARD</h2>
            <br />
            <p>
              Here you can find a variety of business cards that business have
              listed on my site <br />
              You can find full details of the business by clicking on the card.
            </p>
            <br />
            <p>
              You can register with your own account as a "Regular" user, which
              will only allow you to add listed cards to your favorite list, by
              clicking on the "like" icon - and viewing them all on the "FAV
              CARDS" page.
            </p>
            <br />
            <p>
              If you would like to add yours on business cards, you must
              register as a "Business" user account by marking the "sign up as
              business" checkbox.
            </p>
            <br />
            <p>
              With a business account you can view all your cards on the "MY
              CARDS" page and you can edit/delete your business cards that you
              created by clicking on the relative icon.
            </p>
            <br />
            <p>
              With an Admin user, you have full access to the App, you can
              Add/Edit/Delete your oun cards + Delete all cards, you with have
              access to "SANDBOX" page & "CRM" page that will allow you to
              Edit/Delete other users (that are not Admin users)
            </p>
            <br />
            <p>
              <strong>
                To enjoy this Demo you can login with these user accounts:
              </strong>
              <br />
              <br />
              <strong>Regular user:</strong> email: regular@gmail.com ;
              password: Aa1234!
              <br />
              <strong>Business user:</strong> email: business@gmail.com ;
              password: Aa1234!
              <br />
              <strong>Admin user:</strong> email: admin@gmail.com ; password:
              Aa1234!
            </p>
          </div>
        </Grid>
        <Grid
          item
          xs={4}
          sx={{
            display: { md: "flex", xs: "none" },
            justifyContent: "center",
          }}
        >
          <img src="/assets/images/card.jpg" alt="card" width="100%" />
        </Grid>
      </Grid>
    </Container>
  );
};

export default AboutPage;
