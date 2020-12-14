import {FaPepperHot as pepper} from "react-icons/fa";


export default{
  name: 'topping',                 //computer name
  title: 'Toppings',               //visible title
  type: 'document',
  icon:pepper,
  fields: [
    {
      name: 'name',                //'name' will hold the value of topping name
      title: 'Pizza topping',
      type: 'string',
      description: 'What is the name of the toppings'
    },
    {
      name: 'vegetarian',          //'vegetarian' will hold true/false
      title: 'Vegetarian',
      type: 'boolean',
      description: 'Is it vegetarian ?',
      options:{
        layout:'checkbox'
      }
    },
  ],
  preview: {                       //define what we need to show in docs list
    select:{
      name: 'name',                //fields.name-->name
      vegetarian:'vegetarian'      //field.vegetarian-->vegetarian
    },
    prepare:({name,vegetarian})=>({
      title: `${name} ${vegetarian ? '🍂🍂🍂' : ''}`
    })
  }
}