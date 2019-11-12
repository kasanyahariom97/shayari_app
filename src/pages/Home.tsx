import {
  IonMenuButton,
  IonPage,
  IonContent,
} from "@ionic/react";
import React from "react";
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import styled from 'styled-components'
import { Types } from "../components/Types";
import { types } from '../data/data';
import { AppContext } from '../Context'

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background: #f1f1f1;
  overflow-y: auto;
`

const HomePage: React.FC = () => {

  const myContext: any = React.useContext(AppContext);

  React.useEffect(() => {
    myContext.setCurrentPage(0);
  }, [])

  return (
    <IonPage>
      <AppBar position="static">
        <Toolbar>
            <IonMenuButton />
          <Typography variant="h6">
            Shayari Collection 2019
          </Typography>
        </Toolbar>
      </AppBar>
      <IonContent>
        <Container>
        {
          types.map((x, i) => (
            <Types key={i} url={x.url} color={x.color} name={x.name} />
          ))
        }
        </Container>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
