import React from 'react';
import {graphql} from'gatsby'
import styled from "styled-components";

import SEO from "../components/SEO";


export const query = graphql`
  query {
    beers: allBeer {
      nodes {
        id
        name
        price
        image
        rating {
          average
          reviews
        }
      }
    }
  }
`;


export default function BeersPage({data}) {
  const beersData=data.beers

  return (
    <>
      <SEO title={`Beers! We have ${beersData.nodes.length} in stock`}/>
      <h2 className="center">We have {beersData.nodes.length} beers available. Dine in only!</h2>
      <BeerGridStyles>
        {
          beersData.nodes.map(beer=>{
            const {id,name,image,price,rating} = beer
            const calcRating =Math.round(rating.average)

            return(
              <SingleBeerStyles key={id}>
                <img src={image} alt={name}/>
                <h3>{name}</h3>
                {price}
                <p title={`${calcRating} out of 5 stars`}>
                  {`⭐`.repeat(calcRating)}
                  <span style={{filter:`grayscale(100%)`}}>
                    {`⭐`.repeat(5-calcRating)}
                  </span>
                  <span>({rating.reviews})</span>
                </p>
              </SingleBeerStyles>
            )
          })
        }
      </BeerGridStyles>
    </>
  )
}

const BeerGridStyles=styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns:repeat(auto-fit,minmax(200px,1fr))
`

const SingleBeerStyles = styled.div`
  border:1px solid var(--grey);
  padding:2rem;
  text-align:center;
  img{
    width:100%;
    height:200px;
    object-fit:contain;
    display:grid;
    align-items:center;
    font-size:10px;
  }
`







