import React from "react";

import styled from 'styled-components';
import { share, copy } from 'ionicons/icons';
import { IonIcon } from "@ionic/react";
import { Plugins } from '@capacitor/core'

const Container = styled.div`
  width: 100%;
  margin: 10px 0;

  .list-item-class {
    width: 90%;
    padding: 1rem;
    max-width: 720px;
    margin: 0 auto;
    background: ${props => colorGenerator()};
    border-radius: 3px;
    color: white;
    box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    p {
      padding: 2rem;
    }

    .btn-container {
      width: 100%;
      display: flex;
      justify-content: center;

      a {
        text-decoration: none;
        color: black;
      }

      button {
        font-size: 1rem;
      }

      .btn {
        display: flex;
        justify-content: center;
        align-items: center;
        transition: 0.2s all;
        background: transparent;
        border: none;
        width: 40%;
        text-align: center;
        background: #e1e1e1;
        margin: 0 5px;
        padding: 10px 0;

        &:focus, &:active{
          outline: none;
        }
      }
    }
  }
`

type PropType = {
  text: string;
  setSnackbar: Function;
};

const colorGenerator = (): string => {
  const colors: string[] = [
     "#1976d2",
     "#c2185b",
     "#2979ff",
     "#c51162",
     "#ff3d00",
     "#00695c",
     "#00b8d4",
     "#e65100",
     "#455a64"
  ]

  const index: number = Math.floor(Math.random() * 9);
  return colors[index];
}

export const Shayari = (props: PropType) => {

  const copyText = () => {

    Plugins.Clipboard.write({
      string: props.text
    }).then(e => {
      props.setSnackbar(true);
      setTimeout(() => props.setSnackbar(false), 2000);
    }).catch(e => {
      console.log("Error")
    })
  }

  const Share = async () => {
      const sData = await Plugins.Share.share({
        title: "Shayari Collection 2019",
        text: props.text + "\n \n http://www.example.com",
        dialogTitle: "Share a shayari"
      })
  }

  return (
    <Container>
      <div className="list-item-class"><p>
      {props.text}
      </p>
      <span className="btn-container">
        <button className="btn" onClick={e => Share()}><IonIcon icon={share} />&nbsp;Share</button>
        <button className="btn" onClick={copyText}><IonIcon icon={copy} />&nbsp;Copy</button>
      </span>
      </div>
    </Container>
  );
};
