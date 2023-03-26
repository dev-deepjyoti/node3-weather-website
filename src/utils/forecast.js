//------------------------------------------------------------------
const request=require('postman-request')

const forecast = (latitude, longitude, callback)=>{

    const url='http://api.weatherstack.com/current?access_key=96730834f199fd510cd1e055f5fd42e9&query='+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)+''
  
    request({url, json:true},(error, {body})=>{
  
      if (error){
        callback('Unable to connect to weather service!',undefined)
      } else if(body.error){
  
        callback('Error Code: '+body.error.code +', '+'Error message: '+body.error.type+'. '+error.info,undefined)
      }
      else {
        callback(undefined, body.current.weather_descriptions +'. It is currently '+ body.current.temperature+' degrees out. It feels like '+body.current.feelslike +' degrees out.')
      }
    })
  
  }

  module.exports= forecast