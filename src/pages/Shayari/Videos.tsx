import React, { Component } from "react";
import { IonPage, IonBackButton, IonSpinner } from "@ionic/react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import styled from "styled-components";
import { PlayArrow } from "@material-ui/icons";
import { YoutubePlayerWeb } from "capacitor-youtube-player";
import { data, obj, imgUrl } from "../../data/videos";
import { Plugins } from "@capacitor/core";
import Iframe from "react-iframe";

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  background: #f1f1f1;

  .loadingContainer {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .video-conatiner {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10px 0;



    #myPlayer {
      width: 90%;
      max-width: 600px;
      height: 340px;
    }

    button {
      width: 540px;
      padding: 8px 0;
      font-size: 1rem;
      margin-top: 3rem;

      &:active,
      &:focus {
        outline: none;
      }
    }
  }
`;

const ListConatiner = styled.div`
  width: 100%;
  margin: 10px 0;

  .list-item-class {
    width: 80%;
    position: relative;
    max-width: 720px;
    margin: 0 auto;
    background: white;
    border-radius: 6px;
    color: white;
    box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    img {
      height: 210px;
      width: 100%;
      object-fit: cover;
      object-position: center;
    }

    .logo-center {
      position: absolute;
      opacity: 0.8;
      background: transparent;
      border: none;
      color: white;

      &:hover {
        opacity: 1;
      }

      &:focus,
      &:active {
        outline: none;
      }

      svg {
        height: 6rem;
        width: 6rem;
        filter: drop-shadow(0 8px 12px #11111155);
      }
    }
  }
`;

export class Videos extends Component {
  state = {
    videoId: "0",
    view: 0,
    showLoading: false,
    internetConnection: true,
    initializedOnce: false
  };

  addIdandView = async (id: string) => {
    await this.actions.setId(id);
  };

  frameBorder: number | undefined = 0;

  youtubeWebPlayer = (videoId: string) => {
    return (
      <>
      <div className="video-conatiner">
          <Iframe
            url={ "https://www.youtube.com/embed/" + videoId }
            id="myPlayer"
            height="240"
            frameBorder={this.frameBorder}
          />
        <button onClick={e => this.actions.onClose(0)}>Close</button>
      </div>
    </>
    )
  }

  viewPage = <></>;

  actions = {
    setId: (id: string) => {
      this.setState(state => ({
        ...state,
        videoId: id
      }));
    },
    setView: (no: number) => {
      this.setState(state => ({
        ...state,
        view: no
      }));
    },
    onView: (id: string, no: number) => {
      this.actions.toggleLoading();
      this.addIdandView(id)
        .then(e => {
          this.viewPage = this.youtubeWebPlayer(this.state.videoId)
          return e
        }).then(e => {
          this.actions.setView(no);
        })
        .then(e => {
          this.actions.toggleLoading();
        });
    },
    onClose: (no: number) => {
      this.actions.setView(no);
      this.actions.setId("0");
    },
    toggleLoading: () => {
      this.setState(state => ({
        ...state,
        showLoading: !(state as any).showLoading
      }));
    }
  };

  mainPage = (
    <>
      {data.map((d, i) => (
        <ListConatiner key={i}>
          <div className="list-item-class">
            <img src={imgUrl + d + obj} alt={d} />
            <button
              className="logo-center"
              onClick={e => this.actions.onView(d, 1)}
            >
              <PlayArrow />
            </button>
          </div>
        </ListConatiner>
      ))}
    </>
  );

  componentDidMount() {
    Plugins.Network.getStatus()
      .then(e => {
        if (e["connected"]) {
          this.setState(state => ({
            ...state,
            internetConnection: true
          }));
        } else {
          this.setState(state => ({
            ...state,
            internetConnection: false
          }));
        }
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {

    if(!this.state.internetConnection) {
      return (
      <IonPage>
          <AppBar position="static">
            <Toolbar>
              <IonBackButton defaultHref="/" />
              <Typography variant="h6">Video Shayari</Typography>
            </Toolbar>
          </AppBar>
          <Container>
            <div className="loadingContainer">
              <h3>No Internet Available.</h3>
            </div>
          </Container>
        </IonPage>
      )
    }

    if (this.state.showLoading) {
      return (
        <IonPage>
          <AppBar position="static">
            <Toolbar>
              <IonBackButton defaultHref="/" />
              <Typography variant="h6">Video Shayari</Typography>
            </Toolbar>
          </AppBar>
          <Container>
            <div className="loadingContainer">
              <IonSpinner />
            </div>
          </Container>
        </IonPage>
      );
    }

    return (
      <IonPage>
        <AppBar position="static">
          <Toolbar>
            <IonBackButton defaultHref="/" />
            <Typography variant="h6">Video Shayari</Typography>
          </Toolbar>
        </AppBar>
        <Container>
          {this.state.view === 1 ? this.viewPage : this.mainPage}
        </Container>
      </IonPage>
    );
  }
}
