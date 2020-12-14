exports.handler=async (event,context) => {
  console.log(event)

  return{
    statusCode:200,
    body:'Hello'
  }
}



/*
  Notes
  build serverless functions with javascript using Netlify
*/