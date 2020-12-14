import styled from "styled-components";


const MenuItemsStyles=styled.div`
  display: grid;
  grid-template-columns:100px 1fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: 0 1.3rem;
  align-content: center;
  align-items: center;
  position: relative;
  .gatsby-image-wrapper {                           //select the image in gatsby
    grid-row: span 2;                               //span in 2 rows
    height:100%;                                    //image will stretch as possible as other adjacent column contents is big
  }
  p{
    margin:0;
  }
  button{
    font-size:1.2rem;
  }
  button+button{                                    //button which comes next to button
    margin-left:0.5rem;
  }
  .remove{
    background:none;
    color: var(--red);
    font-size:3rem;
    position:absolute;
    top: 0;
    right: 0;
    box-shadow: none;
    line-height:1rem;
  }
`

export default MenuItemsStyles