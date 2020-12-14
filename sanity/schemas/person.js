import {MdPerson as person} from "react-icons/md";


export default{
  name: 'person',                                                           //computer name
  title: 'SliceMasters',                                                    //visible title
  type: 'document',
  icon:person,
  fields: [
    {
      name: 'name',
      title: 'Person name',
      type: 'string',
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
      name: 'description',
      title: 'description',
      type: 'text',
      description:'Tell us a bit about this person'
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options:{
        hotspot:true,                                                       //for picture crop
      }
    },
  ],
}

/*
  Notes

*/