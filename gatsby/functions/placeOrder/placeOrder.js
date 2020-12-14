const nodemailer=require('nodemailer')                             //require nodemailer package



function generateOrderEmail({order,total}){                        //mail template in html includes details about order and total price
  return `
    <div>
      <h2>Your Recent Order for ${total}</h2>
      <p>Please start walking over, we will have your order ready in next 45min.</p>
      <ul>
        ${order.map(item=>`
          <li>
            <img src="${item.thumbnail}" alt="${item.name}"/>
            ${item.size} ${item.name} - ${item.price}
          </li>
        `).join('')}
      </ul>
      <p>Your total is <strong>${total}</strong> due at pickup.</p>
      <style>
        ul {
          list-style: none;
        }
      </style>
    </div>
  `;
}


const transporter=nodemailer.createTransport({            //create transporter
  host: process.env.MAIL_HOST,                                     //we have used Ethereal services to send fake mail
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
})


function wait(ms=0){
  return new Promise((resolve, reject) =>{
    setTimeout(resolve, ms)
  })
}



exports.handler=async(event,context) => {                          //handler function
  await wait(1000)                                             //delay for loading

  const body=JSON.parse(event.body)                                //convert body back into object since it was in string format. response from server "placeOrder"

  if(body.mapleSyrup){                                             //check if honeypot is filled or not
    return{
      statusCode:400,
      body:JSON.stringify({message:'Refused due to honeypot'})
    }
  }

  const requiredFields=['email', 'name', 'order']                  //define array of fields that are coming due to success of place order as a validation

  for(const field of requiredFields){                              //loop over requiredFields to make sure that order contains proper fields
    if(!body[field]){                                              //check values of each field in body object

      return{
        statusCode:400,
        body:JSON.stringify({message:`Ooops! You are missing the ${field} field`})
      }
    }
  }

  if(!body.order.length){                                          //validate that order contains items in it
    return {
      statusCode:400,
      body:JSON.stringify({message:'There are no items in the order!'})
    }
  }


  await transporter.sendMail({
    from: "Slick's Slices <slick@example.com>",
    to:`${body.name} <${body.email}> ,orders@example.com`,
    subject: "New Order",
    html:generateOrderEmail({order:body.order,total:body.total}),
  })

  return{
    statusCode:200,
    body:JSON.stringify({message:'Success'}),
  }
}

