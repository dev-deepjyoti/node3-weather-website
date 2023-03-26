const request=require('postman-request')

const geocode = (address, callback)=>{

    const url= 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiZGVlcHNvIiwiYSI6ImNsZmN0N2p2aDNkbXczeHIwZ3B6bnpvY2QifQ.tGbi7SNKsxdklD9o6kUb-Q&limit=1'
  
    request({url, json:true},(error, {body})=>{
  
      if(error){
  
        callback('Unable to connect to location service!',undefined)
  
      } else if(body.features.length===0){
        callback('Unable to find location. Try another search.',undefined)
      }
      else{
  
        callback(undefined,{
           location:body.features[0].place_name,
           latitude:body.features[0].center[1],
          longitude:body.features[0].center[0]
        })
      }
  
    })
  }


module.exports=geocode