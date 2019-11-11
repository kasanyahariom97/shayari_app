import React from "react";
import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, IonSplitPane } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { AppPage } from "./declarations";

import Menu from "./components/Menu";
import Home from "./pages/Home";
import Provider from "./Context";
import About from "./pages/About";
import Help from "./pages/Help";
import Connect from "./pages/Connect";

import { Sad } from "./pages/Shayari/Sad";
import { Trends } from "./pages/Shayari/Trends";
import { Videos } from "./pages/Shayari/Videos";
import { Video } from "./pages/Shayari/Single/Video";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

const appPages: AppPage[] = [
  {
    title: "Home",
    url: "/home",
    icon: 0
  },
  {
    title: "About",
    url: "/about",
    icon: 1
  },
  {
    title: "Connect With Us",
    url: "/connect",
    icon: 2
  },
  {
    title: "Help",
    url: "/help",
    icon: 3
  }
];

const App: React.FC = () => (
  <IonApp>
    <Provider>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu appPages={appPages} />
          <IonRouterOutlet id="main">
            <Route path="/home" component={Home} exact={true} />
            <Route path="/home/sad" component={Sad} exact={true} />
            <Route path="/home/trend" component={Trends} exact={true} />
            <Route path="/home/videos" component={Videos} exact={true} />
            <Route path="/video" component={Video} exact={true} />
            <Route path="/about" component={About} exact={true} />
            <Route path="/connect" component={Connect} exact={true} />
            <Route path="/help" component={Help} exact={true} />
            <Route
              path="/"
              render={() => <Redirect to="/home" exact={true} />}
            />
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </Provider>
  </IonApp>
);

export default App;
