import React from 'react';
import {graphql} from 'gatsby';

import PizzaList from "../components/PizzaList";
import ToppingsFilter from "../components/ToppingsFilter";
import SEO from "../components/SEO";


export default function PizzasPage({data,pageContext}) {
  const allPizza=data.pizzas.nodes

  return (
    <>
      <SEO title={pageContext.topping ? `Pizzas with ${pageContext.topping}` : `All Pizzas`}/>
      <ToppingsFilter activeTopping={pageContext.topping} />
      <PizzaList allPizza={allPizza}/>
    </>
  );
}

export const query= graphql`
  query PizzaQuery ($toppingRegex:String){
    pizzas:allSanityPizza(filter: {toppings: {elemMatch: {name: {regex: $toppingRegex}}}}) {
      nodes {
        id
        name
        price
        slug {
          current
        }
        toppings {
          id
          name
        }
        image {
          asset {
            fixed (width: 200, height: 200){
              ...GatsbySanityImageFixed
            }
            fluid (maxWidth:400){
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`

/*
  Notes
  we can't build regex in graphql directly. we have to build it in Node API and path it here as context
  if we used variable "$topping", we have to give a type of [String]

  pageContext is available due to the use of context in Node API "gatsby-node"
  data is the result of the query

*/