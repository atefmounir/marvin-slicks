import path from 'path'                                                         //from node package. Note, we have used esm module
import fetch from 'isomorphic-fetch'                                            //to use fetch in node file


async function turnPizzasIntoPages({graphql,actions}){
  const pizzaTemplate=path.resolve('./src/templates/Pizza.js')      //get the template
  const {data}=await graphql                                                    //build a query to get all pizzas. it has to run as a function
  (`                                                 
    query {
      pizzas:allSanityPizza {
        nodes {
          name 
          slug{
            current
          }
        }
      }
    }
  `)
  data.pizzas.nodes.forEach(pizza =>{                                           //loop over the query result to get details of each pizza
    actions.createPage(                                                         //create a page. it is a built-in method
      {
        path:`pizza/${pizza.slug.current}`,                                     //give the path = same path as defined when click on single pizza "review PizzaList component"
        component:pizzaTemplate,                                                //page template
        context:{                                                               //define the context to let data be accessed. it will be accessed via "pageContext"
          slug:pizza.slug.current,
        }
      }
    )
  })
}

async function turnToppingsIntoPages({graphql,actions}){
  const toppingsTemplate=path.resolve('./src/pages/pizzas.js')       //we are going to render the result is same pizzas page instead of making new template
  const {data}=await graphql
  (`
    query {
      toppings:allSanityTopping{
        nodes{
         name
          id
        }
      }
    }
  `)
  data.toppings.nodes.forEach(topping =>{
    actions.createPage(
      {
        path:`topping/${topping.name}`,                                          //dynamic page url. it is overriding pizzas page since we define the template like this
        component:toppingsTemplate,
        context:{
          topping:topping.name,
          toppingRegex:`/${topping.name}/i`                                      //i for case insensitive
        }
      }
    )
  })
}

async function turnSliceMastersIntoPages ({graphql,actions}){
  const {data}=await graphql                                                     //query to get all slice masters
  (`                                                   
    query {
      sliceMasters:allSanityPerson{
        totalCount 
        nodes{
          name
          id
          slug{
            current
          }
        }
      }
    }
  `)
  data.sliceMasters.nodes.forEach((sliceMaster)=>{                               //create dynamic page for each slice master
    actions.createPage({
      path:`/sliceMaster/${sliceMaster.slug.current}`,
      component:path.resolve('./src/templates/SliceMaster.js'),
      context:{
        name:sliceMaster.name,
        slug:sliceMaster.slug.current,
      }
    })
  })

  const pageSize=parseInt(process.env.GATSBY_PAGE_SIZE)                          //find the page size. it will comes as string therefore, it needs to be parsed
  const pageCount=Math.ceil(data.sliceMasters.totalCount/pageSize)            //find the count of data per each page

  Array.from({length:pageCount})                                         //create empty array with a length of pageCount. make use of the index
    .forEach((_,i)=>{                                                    //loop over its index to create a dynamic pages
      actions.createPage({                                                  //create dynamic page contains a limited data from a slice masters "pagination"
        path:`slicemasters/${i+1}`,                                             //to avoid starting from i=0
        component:path.resolve('./src/pages/slicemasters.js'),      //pagination will be based on slicemasters page "as a template"
        context:{                                                                //give the context data to be used as variables in page query
          skip:i*pageSize,
          currentPage:i+1,
          pageSize:pageSize,
        },
      })
    })
}

export async function createPages(params){                                       //createPages is Gatsby plugin API which gives access to e.x graphql,actions for creating pages dynamically
  await Promise.all([                                                      //await all promises to be resolved before releasing function
    turnPizzasIntoPages(params),
    turnToppingsIntoPages(params),
    turnSliceMastersIntoPages(params),
  ])
}


async function fetchBeersAndTurnIntoNodes({ actions, createNodeId, createContentDigest }) {
  const res = await fetch('https://sampleapis.com/beers/api/ale')            //api endpoint
  const beers = await res.json()                                                 //turn the result into json

  for (const beer of beers) {                                                    //loop over result
    const nodeContent = JSON.stringify(beer)                                     //create nodeContent. stringify the beer data according to documentation
    const nodeMeta = {                                                           //create nodeMeta which has to be defined according to documentation
      id: createNodeId(`beer-${beer.name}`),
      parent: null,
      children: [],
      internal: {
        type: `Beer`,
        mediaType: `application/json`,
        content: nodeContent,
        contentDigest: createContentDigest(beer)
      }
    }
    actions.createNode({                                                          //create the node
      ...beer,
      ...nodeMeta
    })
  }
}

export async function sourceNodes(params) {                                       //get data from external source into Gatsby Node
  await Promise.all([
    fetchBeersAndTurnIntoNodes(params),
  ])
}