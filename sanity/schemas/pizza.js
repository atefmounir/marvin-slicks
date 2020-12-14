import {MdLocalPizza as pizza} from "react-icons/md";

import PriceInput from "../components/PriceInput";


export default{
  name: 'pizza',                                                            //computer name
  title: 'Pizzas',                                                          //visible title
  type: 'document',
  icon:pizza,
  fields: [
    {
      name: 'name',
      title: 'Pizza name',
      type: 'string',
      description: 'Name of the pizza'
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options:{
        source:'name',                                                      //for auto generating a slug
        maxLength:100,
      }
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options:{
        hotspot:true,                                                       //for picture crop
      }
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      description: 'Price of the pizza in cents',
      validation:Rule=>Rule.min(1000),                                      //add a validation rule from the 'price' field
      inputComponent:PriceInput                                             //PriceInput component as CMS custom input to Sanity
    },
    {
      name:'toppings',                                                      //to create a relational reference with topping document
      title:'Toppings',
      type: 'array',                                                        //one to many relation "one pizza has many toppings". toppings is another document
      of:[{type:'reference',to:[{type:'topping'}]}]                         //array of type reference. reference could be relation to many documents. topping is the name of document
    }
  ],
  preview: {                                                                //create custom preview for pizza doc
    select:{
      title: 'name',
      media: 'image',
      topping0:'toppings.0.name',                                           //if we wrote toppings:'toppings' it will show a ref but we need a descriptive data. "it is not js syntax to access name field"
      topping1:'toppings.1.name',                                           //since toppings is an array, access its element through--> toppings.0 and them access the name field
      topping2:'toppings.2.name',
      topping3:'toppings.3.name',
    },
    prepare:({title,media,...toppings})=>{                                  //selected data has to passed to prepare function for data transformation "title,subtitle,media"
      const tops=Object.values(toppings).filter(topping=>                   //filter only toppings that has values not including "undefined"
      topping !== undefined)
      return {
        title:title,
        media:media,
        subtitle:tops.join(','),                                            //join array values by commas
      }
    },
  },
}

/*
  Notes
  Object.values used to convert the "toppings" object into array and extract only values out of it ['mushroom, 'onion' , 'undefined' ]
  then filter out the undefined values
  undefined comes since we could not add only two toppings out of 4 prepared for preview
*/