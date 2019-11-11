import React from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom'
import { string } from 'prop-types';

const Button = styled.div`
   background: white;
   border-radius: 3px;
   box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.4);
   width: 90%;
   max-width: 720px;
   display: flex;
   justify-content: center;
   align-items: center;
   margin: 10px 0;

   a {
      display: inline-block;
      width: 100%;
      padding: 13px 0;
      text-align: center;
      color: black;
      text-decoration: none;
      font-size: 1.1rem;
      color: ${props => props.color || "black"};
   }
`

type PropType = {
   name: string;
   url?: any;
   color?: string
}

export const Types = (props: PropType) => {
   return (
      <Button color={props.color}>
         <Link to={props.url}>{props.name}</Link>
      </Button>
   )
}
