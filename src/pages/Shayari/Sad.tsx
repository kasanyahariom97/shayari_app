import React from "react";
import { IonPage, IonBackButton } from "@ionic/react";
import { AppBar, Toolbar, Typography, Snackbar } from "@material-ui/core";
import { Shayari as SingleSad } from "../../components/Shayari";
import shayari from "../../data/shayari";
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  background: #f1f1f1;
`;

const sadShayari = shayari.filter(s => s.type === "sad");

export const Sad = () => {

  const [snackbarState, setSnackbar] = React.useState(false);

  return (
    <IonPage>
      <AppBar position="static">
        <Toolbar>
          <IonBackButton defaultHref="/" />
          <Typography variant="h6">Sad Shayari</Typography>
        </Toolbar>
      </AppBar>
      <Container>
        {sadShayari.map((s, i) => (
          <SingleSad key={i} text={s.text} setSnackbar={setSnackbar} />
        ))}
        <Snackbar
        open={snackbarState}
        onClose={e => console.log("Hello World")}
        message="Copied"
        />
      </Container>
    </IonPage>
  );
};
