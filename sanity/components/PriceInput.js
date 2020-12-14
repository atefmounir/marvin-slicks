import React from 'react';
import PatchEvent, {set,unset} from 'part:@sanity/form-builder/patch-event'                        //in Sanity doc, in "custom input component" section



function createPatchFrom(value){                                                                   //Sanity API
  return PatchEvent.from(value ==='' ? unset() : set(Number(value)))                               //Number method to convert the value from string number type
}

const formatMoney = Intl.NumberFormat('en-EG',{                                      //standard built-in functions in javascript to format money
  style: 'currency',
  currency:'EGP',
}).format

export default function PriceInput({type,value,onChange,inputComponent}) {
  return (
    <div>
      <h2>{type.title}-{value ? formatMoney(value) : ''}</h2>
      <p>{type.description}</p>
      <input
        type={type.name}
        value={value}
        ref={inputComponent}
        onChange={event=>onChange(createPatchFrom(event.target.value))}/>
    </div>
  );
}

PriceInput.focus=function(){
  this._inputElement.focus();                                                                       //from documentation
}


/*
  Notes
  Call onChange with a patch to take a value and give it to Sanity
  Implement a .focus() method, that sets focus on the underlying dom node that represents the input.

*/

