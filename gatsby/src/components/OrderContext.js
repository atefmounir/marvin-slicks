import React,{useState,createContext} from 'react';


const OrderContext =createContext()                         //create Context

export  function OrderProvider({children}) {                //provider data live in the root and give access to the state around the app
  const [order,setOrder] =useState([])

  return (
    <OrderContext.Provider value={[order,setOrder]}>
      {children}
    </OrderContext.Provider>
  )
}

export default OrderContext



/*
  Notes
  we have created a custom provider "OrderProvider" that will wrap the root element
  data that will passed through useContext will live into it and can be accessed all over the app.

*/
