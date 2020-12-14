import React from 'react'
import S from '@sanity/desk-tool/structure-builder'                                                 //for creating custom sidebar

export default function Sidebar(){
  return S.list()
    .title(`Slick's Slices`)                                                                    //title of the sidebar
    .items([                                                                                   //create sub items
      S.listItem()
        .title('Home Page').icon(()=><strong>🔥</strong>)                                  //name of the sub item
        .child(                                                                                     //create a child "document"
          S.editor()
            .schemaType('storeSettings')                                                //connect it to storeSettings document
            .documentId('downtown')                                                       //define document id instead of having a random id
        ),
      ...S.documentTypeListItems()                                                                  //spread all documents items "Pizza, Toppings, SliceMasters"
        .filter(item =>item.getId()!=='storeSettings')                                              //don't show "settings" since it is now being controlled via "Home Page"
  ])
}

