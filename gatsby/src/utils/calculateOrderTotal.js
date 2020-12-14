import calculatePizzaPrice from './calculatePizzaPrice'


export default function calculateOrderTotal(order,pizzas){
  const total=order.reduce((runningTotal,singleOrder)=>{                          //loop over each item in the order and use reduce method
    const pizza=pizzas.find(singlePizza=>singlePizza.id===singleOrder.id)         //find the pizza item being ordered to get its details. runningTotal is acc, singleOrder is each individual order item===pizza item

    return runningTotal+calculatePizzaPrice(pizza.price,singleOrder.size)
  },0)

  return total/10
}