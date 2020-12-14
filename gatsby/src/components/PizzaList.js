import React from 'react';
import {Link} from 'gatsby'
import Img from 'gatsby-image'
import styled from "styled-components";


function SinglePizza({pizza}) {
  const {slug,name,toppings,image}=pizza

  return (
    <PizzaStyles>
      <Link to={`/pizza/${slug.current}`}>
        <h2><span className="mark">{name}</span></h2>
      </Link>
      <p>{toppings.map(topping =>topping.name).join(', ')}</p>
      <Img fluid={image.asset.fluid} alt={name}/>
    </PizzaStyles>
  )
}


export default function PizzaList({allPizza}) {
  return (
    <PizzaGridStyles>
      {
        allPizza.map((pizza=>{
          return (
            <SinglePizza key={pizza.id} pizza={pizza}/>
          )
        }))
      }
    </PizzaGridStyles>
  );
}


const PizzaGridStyles =styled.div`
  display: grid;
  grid-template-columns:repeat(auto-fill,minmax(300px,1fr));            //min 300px and max 1fr
  grid-gap:4rem;
  grid-auto-rows: auto auto 500px;                                      
`

const PizzaStyles=styled.div`
  display: grid;
  @supports not (grid-template-rows: subgrid){                          //since subgrid is not supported bt chrome
    --rows:auto auto 1fr;
  }
  grid-template-rows: var(--rows,subgrid);                              //take styles of single pizza styles from its parent div "PizzaGridStyles". if subgrid is not supported, take it for the var rows
  grid-row: span 3;
  grid-gap: 1rem;                                                       //override the parent value "4rem"
  h2,p{
    margin: 0;
  }
`
