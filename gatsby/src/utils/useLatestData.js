import {useState,useEffect} from "react";

const gql=String.raw                                                    //trick to formatting graphql structure in editing

                                                                        

export default function useLatestData(){
  const [hotSlices,setHotSlices] =useState()
  const [sliceMasters,setSliceMasters] =useState()

  useEffect(()=>{                                                 //side effect to fetch data when component loads
    fetch(
      process.env.GATSBY_GRAPHQL_ENDPOINT,                              //GATSBY graphql endpoint to get a realtime data. no need for special API
      {
        method: 'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({                                     //body has to be string
          query:gql`
            query{
              StoreSettings(id:"downtown"){
                name
                sliceMaster{
                  name
                  _id
                  image {
                    asset{
                      url
                      metadata{
                        lqip
                      }
                    }
                  }
                }
                hotSlices{
                  name
                  _id
                  image {
                    asset{
                      url
                      metadata{
                        lqip
                      }
                    }
                  }
                }
              }
            }
          `,
        })
      })
      .then(res =>res.json())
      .then(res =>{
        //TODO: CHECK FOR ERRORS

        setHotSlices(res.data.StoreSettings.hotSlices)                 //set the data of hotSlices
        setSliceMasters(res.data.StoreSettings.sliceMaster)            //set the data of sliceMaster
      })
  },[])


  return {
    hotSlices,
    sliceMasters
  }
}

/*
  Notes
  id of StoreSettings are defined in Sanity-->sidebar.js
  StoreSettings query name in capital and got from the use of sanity playground API

*/

