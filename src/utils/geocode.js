const request = require('request')
const geocode = (address,callback)=>{
   const url ="https://api.mapbox.com/geocoding/v5/mapbox.places/"+address+".json?access_token=pk.eyJ1IjoibWlsYW5qaGFsMjMiLCJhIjoiY2tvdmJtYnRkMDFiazJvbGtwc2M0a3Y1biJ9.uOahFJ1HJCZptZ3Ka5lObQ&limit=1"
   request({url:url,json:true},(error,response)=>{
     if(error){
         callback('Unable to connect to the location',undefined)
     }
     else if(response.body.features.length === 0){
         callback('Cant find the desired location ',undefined)
     }
     else{
         callback(undefined,{
             latitude:response.body.features[0].center[1],
             longitude:response.body.features[0].center[0],
             location:response.body.features[0].place_name
         })
     }
   }) 
}
module.exports = geocode
/*const forecast = (latitude,longitude,callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=ac88980821e6c3f89843f449684a8ca6&query='+latitude+','+longitude+'&units=f'
    request({url:url,json:true},(error,response)=>{
       if(error){
           callback('Unable to connect to the servers',undefined)
       }
       else if(response.body.length === 0){
           callback('Unable to find the desired location',undefined)
       }
       else{
           callback(undefined,{
               name:response.body.location.name,
               region:response.body.location.region,
               country:response.body.location.country
           })
       }
    })
}
geocode('delhi',(error,response)=>{
    console.log(error)
    console.log(response)
    forecast(response.latitude,response.longitude,(error,data)=>{
        console.log('ERROR',error)
        console.log(data)
    })
})*/