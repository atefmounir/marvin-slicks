import React,{useState} from "react";

export default function useForm(defaults){
  const [values,setValues]=useState(defaults)

  function updateValues(e){
    let value=e.target.value

    if(e.target.type==='number'){                 //if entered value is a number
      parseInt(value)
    }

    setValues({
      ...values,                                  //copy the old values
      [e.target.name]:value,                      //update using name attribute
    })
  }
  return{values,updateValues}
}



/*
  Custom hook to deal with a forms

*/