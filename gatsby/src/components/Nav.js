import React from 'react';
import {Link} from 'gatsby'
import styled from 'styled-components'
import Logo from "./Logo";


export default function Nav(props) {
  return (
    <NavStyles>
      <ul>
        <li>
          <Link to="/">Hot Now</Link>
        </li>
        <li>
          <Link to="/pizzas/">Pizza Menu</Link>
        </li>
        <li className="logo-item">
          <Link to="/">
            <Logo />
          </Link>
        </li>
        <li>
          <Link to="/slicemasters">Slice Masters</Link>
        </li>
        <li>
          <Link to="/order">Order Ahead</Link>
        </li>
      </ul>
    </NavStyles>
  );
}

const NavStyles = styled.nav`
  //margin-bottom: 3rem;
  .logo {
    transform: translateY(-25%);
  }
  ul{
    margin: 0;
    padding: 0;
    text-align: center;
    list-style-type: none;
    display: grid;
    grid-template-columns: 1fr 1fr auto 1fr 1fr;
    grid-gap: 2rem;                                         //means 2 * base font size of the global style = 2*10px
    align-items: center;
    margin-top:-6rem;
  }
  li{
    --rotateDegree:-2deg;                                   //create a variable "rotateDegree"
    transform:rotate(var(--rotateDegree));
    order: 1;
    &:nth-child(1){
      --rotateDegree:1deg;
    }
    &:nth-child(2){
      --rotateDegree:-2.5deg;
    }
    &:nth-child(4){
      --rotateDegree:2.5deg;
    }
    &:hover{
      --rotateDegree:3deg;
    }
    &[aria-current="page"]{                                //indicate that link item is selected. page value got from inspection tool
      color: var(--red)
    }
  }
  a{
    font-size:3rem;
    text-decoration:none;
    display: block;
    &:hover{
      color:var(--red)                                     //red is a variable in GlobalStyles
    }
    @media (max-width: 800px) {
      font-size: 2rem;
    }
    /* &[aria-current='page'] {
      color: var(--red);
    } */
  }
  @media (max-width: 600px) {
    --columns: 4;
    margin-bottom: 2rem;
    border-bottom: 2px solid var(--grey);
    padding-bottom: 2rem;
    ul {
      grid-template-rows: auto auto;
      grid-template-columns: repeat(var(--columns), 1fr);
      justify-items: center;
    }
    .logo-item {
      order: 0;
      grid-column: 1 / -1;
    }
    .logo {
      transform: none;
    }
  }
  @media (max-width: 500px) {
    --columns: 2;
  }
`

