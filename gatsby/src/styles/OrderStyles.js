import styled from "styled-components";


const OrderStyles=styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  fieldset{
    grid-column:span 2;                        //grid will go on the 2 created columns. means 100%
    max-height: 600px;
    overflow: auto;
    display: grid;
    grid-gap:1rem;
    align-content: start;
    &.menu,
    &.order{
      grid-column:span 1;
    }
  }
  .mapleSyrup {
    display:none;
  }
  
  
  @media (max-width:900px){                  //below 900px
    fieldset.menu,
    fieldset.order{
      grid-column:span 2;
    }
  }
`

export default OrderStyles