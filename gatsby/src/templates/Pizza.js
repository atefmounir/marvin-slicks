import React from 'react';
import {graphql} from "gatsby";
import Img from "gatsby-image"
import styled from "styled-components";

import SEO from "../components/SEO";



export default function SinglePizzaPage({data}) {
  const {pizza}=data

  return (
    <>
      <SEO
        image={pizza.image?.asset?.fluid?.src}
        title={pizza.name}/>
      <PizzaGrid>
        <Img fluid={pizza.image.asset.fluid}/>
        <div>
          <h2 className="mark">{pizza.name}</h2>
          <ul>
            {
              pizza.toppings.map(topping=>(
                <li key={topping.id}>{topping.name}</li>
              ))
            }
          </ul>
        </div>
      </PizzaGrid>
    </>
  );
}



export const query = graphql`
  query ($slug:String!){                                          
    pizza:sanityPizza (slug:{current:{eq:$slug}}){                
      name
      id
      image {
        asset {
          fluid(maxWidth:800){
            ...GatsbySanityImageFluid
          }
        }
      }
      toppings{
        name
        id
        vegetarian
      }
    }
  }
`

const PizzaGrid=styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fill,minmax(400px,1fr));
  
`

/*
  Notes
  $slug variable will get through context from Node API "Gatsby Node"
  Single page will be fetched upon building a query to get page details of the single pizza provided to get a slug information through context
  page query is the only way to accept variables
  although this is a dynamic page, we have named it with capital letter "Pizza" since it is a re-usable template.
  in image of SEO, the ? put in as a condition which understood by Gatsby to check it one by one instead of bringing undefined
*/