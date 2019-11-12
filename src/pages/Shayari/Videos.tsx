import React, { Component } from "react";
import { IonPage, IonBackButton, IonSpinner, IonIcon } from "@ionic/react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import styled from "styled-components";
import { vidData, imgObj, imgUrl, vidName, vidLink } from "../../data/data";
import { Plugins } from "@capacitor/core";
import Iframe from "react-iframe";
import { url } from '../../data/config'
import { Share as ShareIcon, ArrowBack } from '@material-ui/icons'

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
      height: 280px;
    }

    .original-link {
      width: 90%;
      max-width: 600px;
      background: white;
      margin-top: 1rem;
      padding: 1rem;
      border-radius: 3px;
      box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.3);
    }

    .buttonContainer {
      width: 90%;
      max-width: 600px;
      display: flex;

      button {
        display: inline-block;
        width: 100%;
        padding: 8px 0;
        font-size: 1rem;
        margin: 0 5px;
        color: black;
        margin-top: 1rem;

        svg {
          width: 1rem;
          height: 1rem;
        }

        &:active,
        &:focus {
          outline: none;
        }
      }
    }
  }
`;

const ListConatiner = styled.div`
  width: 100%;
  margin: 10px 0;

  .list-item-class {
    transition: 0.2s;
    width: 95%;
    position: relative;
    max-width: 720px;
    margin: 0 auto;
    background: white;
    border-radius: 6px;
    overflow: hidden;
    cursor: pointer;
    box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.3);
    display: flex;
    color: black;

    &:hover {
      background: #f8f8f8;
    }

    img {
      height: auto;
      width: 40%;
      object-fit: cover;
      object-position: center;
    }

    .left-container {
      padding: 1rem;
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

  Share = async (id: string) => {
    const sData = await Plugins.Share.share({
      title: "Shayari Collection 2019",
      text: vidLink + id + "\n \n From: " + url,
      dialogTitle: "Share video"
    });
  };

  frameBorder: number | undefined = 0;

  youtubeWebPlayer = (videoId: string) => {
    return (
      <>
        <div className="video-conatiner">
          <Iframe
            url={"https://www.youtube.com/embed/" + videoId}
            id="myPlayer"
            height="240"
            frameBorder={this.frameBorder}
          />
          <div className="original-link">
            Video Source:{" "}
            <a href={vidLink + videoId} target="_blank">
              Click here
            </a>
          </div>
          <span className="buttonContainer">
          <button onClick={e => this.actions.onClose(0)}><ArrowBack /> Back</button>
            <button onClick={e => this.Share(videoId)}><ShareIcon /> Share</button>
          </span>
        </div>
      </>
    );
  };

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
          this.viewPage = this.youtubeWebPlayer(this.state.videoId);
          return e;
        })
        .then(e => {
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
      {vidData.map((d, i) => (
        <ListConatiner key={i}>
          <div
            className="list-item-class"
            onClick={e => this.actions.onView(d, 1)}
          >
            <img src={imgUrl + d + imgObj} alt={d} />
            <div className="left-container">
              <strong>
                {vidName}&nbsp;{i}
              </strong>
              <p>Source: Youtube</p>
              <p>Quality: 720p (HD)</p>
            </div>
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
    if (!this.state.internetConnection) {
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
      );
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
