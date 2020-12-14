const formatter=Intl.NumberFormat('en-EG',{          //Intl.NumberFormat built in function in browser
  style: 'currency',
  currency:'Egp',
}).format


export default function formatMoney(cents) {
  return formatter(cents/10)
}

