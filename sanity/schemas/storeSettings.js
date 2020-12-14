import {MdStore as store} from "react-icons/md";


export default{
  name: 'storeSettings',                                                      //computer name
  title: 'Settings',                                                          //visible title
  type: 'document',
  icon:store,
  fields: [
    {
      name: 'name',
      title: 'Store Name',
      type: 'string',
      description: 'Name of the store'
    },
    {
      name: 'sliceMaster',
      title: 'Slice Master Currently Slicing',
      type: 'array',
      of:[{type: 'reference',to:[{type:'person'}]}],                          //person is in person schema
    },
    {
      name: 'hotSlices',
      title: 'Hot Slices available in the case',
      type: 'array',
      of:[{type: 'reference',to:[{type:'pizza'}]}],                           //pizza is in pizza schema
    }
  ],
}

/*
  Notes
*/