import React from "react";
import { IonPage, IonMenuButton, IonContent } from "@ionic/react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { AppContext } from "../Context";
import styled from "styled-components";
import LogoImg from "../assets/favicon.png";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f1f1f1;

  img {
    margin: 2rem 0;
  }
`;

const Connect = () => {
  const myContext: any = React.useContext(AppContext);

  React.useEffect(() => {
    myContext.setCurrentPage(2);
  }, []);

  return (
    <IonPage>
      <AppBar position="static">
        <Toolbar>
          <IonMenuButton />
          <Typography variant="h6">Connect</Typography>
        </Toolbar>
      </AppBar>
      <IonContent>
        <Container>
          <img src={LogoImg} alt="logo" />
          <div>Social Links:</div>
          <p>To be filled</p>
        </Container>
      </IonContent>
    </IonPage>
  );
};

export default Connect;
