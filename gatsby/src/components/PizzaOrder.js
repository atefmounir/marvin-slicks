import React from 'react';
import Img from "gatsby-image";

import calculatePizzaPrice from '../utils/calculatePizzaPrice'
import formatMoney from "../utils/formatMoney";
import MenuItemsStyles from "../styles/MenuItemsStyles";


export default function PizzaOrder({order, pizzas, removeFromOrder}) {
  return (
    <>
      {
        order.map((singleOrder, index) =>{
          const {id,size}=singleOrder;

          const pizza=pizzas.find(pizza =>pizza.id===id)
          const {name,image,price}=pizza

          return (
            <MenuItemsStyles key={`${id}-${index}`}>
              <Img fluid={image.asset.fluid}/>
              <h2>{name}</h2>
              <p>
                {formatMoney(calculatePizzaPrice(price,size))}
                <button
                  type="button"
                  className="remove" title={`Remove ${size} ${name} from order`}
                  onClick={()=>removeFromOrder(index)}
                >
                  &times;
                </button>
              </p>
            </MenuItemsStyles>
          )
        })
      }
    </>
  );
}

