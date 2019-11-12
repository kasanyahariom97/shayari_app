import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Button = styled.div`
  background: white;
  border-radius: 3px;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.4);
  width: 90%;
  max-width: 720px;
  margin: 10px 0;
  overflow: hidden;

  &:focus {
    background: #f1f1f1;
  }

  a {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: auto;
    text-align: center;
    text-decoration: none;
    position: relative;
    padding: 13px 0;
    font-size: 1.1rem;
    color: ${props => props.color || "black"};
  }
`;

type PropType = {
  name: string;
  url: any;
  color: string;
};

export const Types = (props: PropType) => {
  return (
    <Button color={props.color}>
      <Link to={props.url}>
      {props.name}
      </Link>
    </Button>
  );
};
