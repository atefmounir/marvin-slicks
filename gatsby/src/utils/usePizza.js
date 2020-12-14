import {useState,useContext} from "react";

import OrderContext from "../components/OrderContext";
import calculateOrderTotal from "../utils/calculateOrderTotal";
import formatMoney from "../utils/formatMoney";
import attachOrderDetails from "./attachOrderDetails";


export default function usePizza({pizzas,userData}){                 //will take the pizza list of items to order & contact details
  const [order,setOrder]=useContext(OrderContext)                    //order & setOrder are being accessed globally
  const [error,setError]=useState()                                  //handling errors
  const [loading,setLoading]=useState(false)                //handling loading states
  const [message,setMessage]=useState('')                   //handling messages

  function addToOrder(orderedPizza){
    setOrder([...order,orderedPizza])
  }

  function removeFromOrder(index){
    setOrder([
      ...order.slice(0,index),                                       //get all items before index of item that want to be delete
      ...order.slice(index+1)                                        //get all items after index of item that want to be delete
    ])
  }

  async function submitOrder(e) {
    e.preventDefault()                                               //prevent uploading order data into url

    setError(null)
    setLoading(true)

    const body ={                                                    //collect all order information
      order:attachOrderDetails(order,pizzas),                        //order is holding id+size
      total:formatMoney(calculateOrderTotal(order,pizzas)),          //calculating total price
      name:userData.name,                                            //username
      email:userData.email,                                          //user email
      mapleSyrup:userData.mapleSyrup                                 //mapleSyrup for honeypot
    }

    const res=await fetch(                                           //send data to backend
      `${process.env.GATSBY_SERVERLESS_BASE}/placeOrder`,      //since we are using netlify serverless functions-->http://localhost:8888/.netlify/functions/placeOrder
      {
        method:'POST',                                               //define the method
        headers:{
          'Content-Type':'application/json',                         //define the mime type
        },
        body:JSON.stringify(body)                                    //define the body which has to be in string
      }
    )

    const text=JSON.parse(await res.text())                          //text method returns A Promise that resolves with a USVString. parse the result to turn it back into object

    if(res.status>=400 && res.status<600){                           //bad responses
      setLoading(false)
      setError(text.message)
    }else{                                                           //good responses
      setLoading(false)
      setMessage('Success! Come on down for your pizza')
    }
  }

  return{
    order,
    addToOrder,
    removeFromOrder,
    submitOrder,
    error,
    loading,
    message,
  }
}