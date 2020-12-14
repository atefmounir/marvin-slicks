import calculatePizzaPrice from '../utils/calculatePizzaPrice'
import formatMoney from "../utils/formatMoney";


export default function attachOrderDetails(order, pizzas){                             //order is holding only the id+size
  return order.map(item =>{
    const pizza=pizzas.find(pizza =>pizza.id===item.id)

    return{
      ...item,
      name:pizza.name,
      thumbnail:pizza.image.asset.fluid.src,
      price:formatMoney(calculatePizzaPrice(pizza.price,item.size)),
    }
  })
}