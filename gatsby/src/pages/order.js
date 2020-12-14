import React from 'react';
import SEO from '../components/SEO'
import {graphql} from 'gatsby'
import Img from 'gatsby-image'

import useForm from "../utils/useForm";
import usePizza from "../utils/usePizza";
import calculatePizzaPrice from '../utils/calculatePizzaPrice'
import formatMoney from "../utils/formatMoney";
import calculateOrderTotal from "../utils/calculateOrderTotal";
import PizzaOrder from "../components/PizzaOrder";
import OrderStyles from "../styles/OrderStyles";
import MenuItemsStyles from "../styles/MenuItemsStyles";


export default function OrderPage({data}) {
  const pizzasList=data.pizzas.nodes

  const {values,updateValues}=useForm({                         //use custom hook and give defaults and extract its return
    name:'',
    email:'',
    mapleSyrup:'',                                                     //for honeypot
  })

  const {order,addToOrder,removeFromOrder,submitOrder,error,loading,message}=
    usePizza({                                            //use custom hook to manage order functions
    pizzas:pizzasList,                                                 //pizza list
    userData:values                                                    //name & email
  })

  if(message){
    return <p>{message}</p>
  }

  return (
    <>
      <SEO title="Order a Pizza!"/>
      <OrderStyles onSubmit={submitOrder}>
        <fieldset disabled={loading}>
          <legend>Your Info</legend>
          <label htmlFor="name">Name</label>
          <input
            name="name"
            type="text"
            value={values.name}
            onChange={updateValues}/>
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="email"
            value={values.email}
            onChange={updateValues}/>
          <input
            name="mapleSyrup"
            type="mapleSyrup"
            value={values.mapleSyrup}
            onChange={updateValues}
            className="mapleSyrup"/>
        </fieldset>
        <fieldset disabled={loading} className="menu">
          <legend>Menu</legend>
          {
            pizzasList.map((pizza)=>{
              const {id,name,image,price}=pizza

              return (
                <MenuItemsStyles key={id}>
                  <Img width='50' height='50' fluid={image.asset.fluid} alt={name}/>
                  <div>
                    <h2>{name}</h2>
                  </div>
                  <div>
                    {
                      ['S','M','L'].map(size =>(
                        <button
                          key={size}
                          type="button"
                          onClick={()=>addToOrder({id:id,size:size})}
                        >
                          {size} {formatMoney(calculatePizzaPrice(price,size))}
                        </button>
                      ))
                    }
                  </div>
                </MenuItemsStyles>
              )
            })
          }
        </fieldset>
        <fieldset disabled={loading} className="order">
          <legend>Order</legend>
          <PizzaOrder
            order={order}
            pizzas={pizzasList}
            removeFromOrder={removeFromOrder}
          />
        </fieldset>
        <fieldset disabled={loading}>
          <h3>Your total is {calculateOrderTotal(order,pizzasList)}</h3>
          <div>{error ? <p>Error: {error}</p> :''}</div>
          <button type="submit" disabled={loading}>
            {loading ? 'Placing Order...' : 'Order Ahead'}
          </button>
        </fieldset>
      </OrderStyles>
    </>
  );
}


export const query =graphql`
  query{
    pizzas:allSanityPizza{
     nodes{
       name
       id
       slug{
         current
       }
       price
       image{
         asset{
           fluid(maxWidth:100){
             ...GatsbySanityImageFluid
           }
         }
       }
     }
    }
  }
`