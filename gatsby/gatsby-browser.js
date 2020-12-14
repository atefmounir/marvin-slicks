import React from 'react';

import Layout from "./src/components/Layout";                                    //global layout
import {OrderProvider} from "./src/components/OrderContext";                     //for global context


export function wrapPageElement({element,props}) {
  return (
    <Layout {...props}>{element}</Layout>
  )
}

export function wrapRootElement({element}){                                      //will let OrderProvider to wrap the root element. data will this in the provider
  return(
    <OrderProvider>
      {element}
    </OrderProvider>
  )
}

