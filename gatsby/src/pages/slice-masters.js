import React from 'react';
import {graphql,Link} from "gatsby";
import Img from 'gatsby-image'
import styled from "styled-components";

import Pagination from "../components/Pagination";
import SEO from '../components/SEO'



export const query = graphql`
  query($skip:Int=0,$pageSize:Int=4,) {
    sliceMasters:allSanityPerson(limit:$pageSize,skip:$skip){
      totalCount
      nodes {
        name
        id
        description
        slug {
          current
        }
        image {
          asset {
            fluid (maxWidth:410){
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`


export default function SliceMastersPage({data,pageContext}) {
  const sliceMasters =data.sliceMasters.nodes

  return (
    <>
      <SEO title={`Slice Masters - Page ${pageContext.currentPage || 1}`}/>
      <Pagination
        base="/slice-masters"
        skip={pageContext.skip}
        currentPage={pageContext.currentPage || 1}
        totalCount={data.sliceMasters.totalCount}
        pageSize={parseInt(process.env.GATSBY_PAGE_SIZE)} />

      <SliceMasterGrid>
        {
          sliceMasters.map(person =>{
            const {id,slug,name,image,description}=person

            return (
              <SliceMasterStyles key={id}>
                <Link to={`/sliceMaster/${slug.current}`}>
                  <h2>
                    <span className="mark">{name}</span>
                  </h2>
                </Link>
                <Img fluid={image.asset.fluid} alt={name}/>
                <p className="description">{description}</p>
              </SliceMasterStyles>
            )
          })
        }
      </SliceMasterGrid>
    </>
  );
}

const SliceMasterGrid=styled.div`
  display: grid;
  gap:2rem;
  grid-template-columns:repeat(auto-fill,minmax(250px,1fr))
`

const SliceMasterStyles =styled.div`
  a{
    text-decoration:none;
  }
  .gatsby-image-wrapper {
    height:400px;
  }
  h2{
    transform: rotate(-2deg);
    text-align: center;
    font-size:4rem;
    margin-bottom: -2rem;
    position:relative;
    z-index: 2;
  }
  .description{
    background:var(--yellow);
    padding :1rem;
    margin:2rem;
    margin-top:-6rem;
    z-index: 2;
    position:relative;
    transform:rotate(1deg);
    text-align: center;
  }
`





