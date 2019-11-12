import { IonContent, IonList, IonMenu, IonMenuToggle } from "@ionic/react";
import React from "react";
import { RouteComponentProps, withRouter, Link } from "react-router-dom";
import { AppPage } from "../declarations";
import { ListItem, ListItemText, ListItemIcon } from "@material-ui/core";
import {
  Home as HomeIcon,
  Person as PersonIcon
} from "@material-ui/icons";
import MainImg from "../assets/main.jpg";
import styled from "styled-components";
import { AppContext } from "../Context";

interface MenuProps extends RouteComponentProps {
  appPages: AppPage[];
}

const Img = styled.div`
  width: 100%;
  height: 200px;
  margin-bottom: 20px;
  margin-top: -20px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`;

const ItemArray: any[] = [
  <HomeIcon />,
  <PersonIcon />,
];

const Menu: React.FunctionComponent<MenuProps> = ({ appPages }) => {
  const myContext: any = React.useContext(AppContext);
  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList>
          <Img>
            <img src={MainImg} alt="main" />
          </Img>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <ListItem button component={Link} to={appPage.url} selected={myContext.currentPage === index} onClick={() => myContext.setCurrentPage(index)}>
                  <ListItemIcon>{ItemArray[appPage.icon]}</ListItemIcon>
                  <ListItemText primary={appPage.title} />
                </ListItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default withRouter(Menu);
