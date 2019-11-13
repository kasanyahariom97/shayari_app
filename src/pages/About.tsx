import React from "react";
import { IonPage, IonMenuButton } from "@ionic/react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { AppContext } from '../Context'
import styled from 'styled-components'
import LogoImg from '../assets/favicon.png'
import { Share as ShareIcon } from '@material-ui/icons'
import { url, version, repoUrl } from '../data/config'
import { Plugins } from '@capacitor/core'

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f1f1f1;
  overflow-y: auto;

  img {
    margin: 2rem 0;
  }

  .content-container {
    width: 90%;
    max-width: 720px;

    .button-container {
      margin-top: 3px;
      button, .btn {
        text-decoration: none;
        padding: 10px;
        background: transparent;
        font-size: 2rem;
        color: #333333;

        &:focus {
          outline: none;
        }
      }
    }
  }
`


const About = () => {

  const myContext: any = React.useContext(AppContext);

  React.useEffect(() => {
    myContext.setCurrentPage(1);
  }, [])

  const Share = async () => {
    const text = `हेलो दोस्तों, मैंने play store पर एक नया app ढूँढा है जिसका नाम है 'Shayari Collection 2019' 
    ❤️ यह एक ऐसी app है जिस पर आपको latest शायरियाँ हिंदी में उपलब्ध कराई जाती है 
    इस पर आपको हर हफ्ते नयी नयी शायरियाँ भी देखने को मिलती हैं।`;
    await Plugins.Share.share({
      title: "Shayari Collection 2019",
      text: text + "\n\n Download करें: " + url,
      dialogTitle: "Share video"
    });
  };

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
      <div className="content-container">
      हेलो दोस्तों, 'Shayari Collection 2019' <span role="img" aria-label="heart"> ❤️ </span> एक ऐसी app है जिस पर आपको latest शायरियाँ हिंदी में
      उपलब्ध कराई जाती है इस पर आपको हर हफ्ते नयी नयी शायरियाँ भी देखने को मिलती हैं।
      <br />
      <br />
      <p>Version: {version}</p>
      <br />
      <p>Sources: Youtube + Various</p>
      <br />
      <p>Disclaimer: All the content belongs to their respective owners.</p>
      <br />
      <p>Credits: <a href="https://unsplash.com/photos/sitjgGsVIAs" target="_blank" rel="noopener noreferrer">Sidebar Image</a> Photo by Tyler Nix on Unsplash</p>
      <br />
      <p>License: @MIT license <a href={repoUrl} target="_blank" rel="noopener noreferrer">Source Code</a></p>
      <br />
      <span className="button-container">
        <button onClick={e => Share()}><ShareIcon /></button>
      </span>
      </div>
      </Container>
    </IonPage>
  );
};

export default About;
