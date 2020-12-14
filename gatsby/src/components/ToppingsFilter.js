import React from 'react';
import {graphql, Link, useStaticQuery} from 'gatsby'
import styled from "styled-components";


function countPizzasHasToppings(pizzas){
  const counts = pizzas
    .map((pizza)=>pizza.toppings)                 //gives arrays contains each pizzas with its toppings
    .flat()                                       //gives one array of toppings
    .reduce((acc,topping)=>{
      const existingTopping=acc[topping.id]       //e.x acc[ham id]
        if(existingTopping){                      //if ham existed in the acc array
          existingTopping.count += 1              //increase the count field by one. count field is created first time when item was not existed. each topping will has a new object
        }else{
          acc[topping.id]={                       //if topping was not existed in acc array-->create it as new object
            id:topping.id,
            name:topping.name,
            count:1
          }
        }
        return acc
    },{})                                         //start with empty object

  return Object.values(counts)
    .sort((a, b) => b.count - a.count)  //sorting based on count
}

export default function ToppingsFilter({activeTopping}) {
  const {pizzas} = useStaticQuery(graphql`
    query {
      pizzas:allSanityPizza {
        nodes {
          toppings{
            name
            id
          }
        }
      }
    }
  `)

  const toppingsWithCount=countPizzasHasToppings(pizzas.nodes)

  return (
    <ToppingsStyles>
      <Link to='/pizzas'>
        <span className="name">All</span>
        <span className="count">{pizzas.nodes.length}</span>
      </Link>
      {
        toppingsWithCount.map(topping =>{
          return (
            <Link
              key={topping.id}
              to={`/topping/${topping.name}`}
              className={topping.name===activeTopping ? 'active' : ''}>
              <span className="name">{topping.name}</span>
              <span className="count">{topping.count}</span>
            </Link>
          )
        })
      }
    </ToppingsStyles>
  );
}

const ToppingsStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 4rem;
  a {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 0 1rem;
    align-items: center;
    padding: 5px;
    background: var(--grey);
    border-radius: 2px;
    text-decoration: none;
    font-size:clamp(1.5rem,1.4vw,2.5rem);
    .count {
      background: white;
      padding: 2px 5px;
    }
    //.active {
    //  background: var(--yellow);
    //}
    &[aria-current='page']{                                   //instead of active class. Gatsby provide it
      background:var(--yellow);
    }
  }
`
/*
  This component aims to collect all toppings in one array and do reduce method to calculate counts for each toppings
  user when click on each topping , it will show to him pizzas that includes this topping
  number of showing pizzas has to match counts appeared for each topping

  Actually we don't need to query by toppings since this information already existed in pizzas

  ActiveTopping comes directly from pizzas.js but indirectly through the gatsby-node
*/
