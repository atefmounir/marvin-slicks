import dotenv from 'dotenv'

dotenv.config({path:'.env'})               //path to .env file




export default{
  siteMetadata:{
    title:`Slicks Slices`,
    siteUrl:`https://gatsby.pizza`,
    description:'The best pizza place in Hamilton',
    twitter:'@slicksSlices'
  },
  plugins:[
    'gatsby-plugin-react-helmet',
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-source-sanity`,
      options: {
        projectId: 'nb1pzur6',                    //from Sanity project page
        dataset:'production',                     //Sanity project page
        watchMode:true,                           //apply realtime changes from Sanity into Gatsby
        token:process.env.GATSBY_SANITY_TOKEN,
      }
    }
  ]
}