import React from "react";
import { IonPage, IonMenuButton } from "@ionic/react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { AppContext } from '../Context'
import styled from 'styled-components'
import LogoImg from '../assets/favicon.png'

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
`


const About = () => {

  const myContext: any = React.useContext(AppContext);

  React.useEffect(() => {
    myContext.setCurrentPage(1);
  }, [])

  return (
    <IonPage>
      <AppBar position="static">
        <Toolbar>
          <IonMenuButton />
          <Typography variant="h6">About</Typography>
        </Toolbar>
      </AppBar>
      <Container>
      <img src={LogoImg} alt="logo" />
      <p>
        This will be filled soon
      </p>
      <br />
      <p>This build is only for special tests *prohibited for production</p>
      </Container>
    </IonPage>
  );
};

export default About;
