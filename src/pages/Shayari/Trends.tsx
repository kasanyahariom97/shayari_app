import React from "react";
import { IonPage, IonBackButton } from "@ionic/react";
import { AppBar, Toolbar, Typography, Snackbar } from "@material-ui/core";
import { Shayari as SingleTrend } from '../../components/Shayari'
import shayari from '../../data/shayari'
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  background: #f1f1f1;
`


const trendShayari = shayari.filter(s => s.type === 'trend')

export const Trends = () => {

  const [snackbarState, setSnackbar] = React.useState(false);

  return (
    <IonPage>
      <AppBar position="static">
        <Toolbar>
          <IonBackButton defaultHref="/" />
          <Typography variant="h6">Trending Shayari</Typography>
        </Toolbar>
      </AppBar>
      <Container>
        {
          trendShayari.map((s, i) => (
            <SingleTrend key={i} text={s.text} setSnackbar={setSnackbar} />
          ))
        }
        <Snackbar
        open={snackbarState}
        onClose={e => console.log("Hello World")}
        message="Copied"
        />
      </Container>
    </IonPage>
  );
};