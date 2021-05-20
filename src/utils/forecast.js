const request = require('request')

const forecast = (latitude,longitude,callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=ac88980821e6c3f89843f449684a8ca6&query='+latitude+','+longitude+'&units=f'
    request({url:url,json:true},(error,response)=>{
       if(error){
           callback('Unable to connect to the servers',undefined)
       }
       else if(response.body.features === 0){
           callback('Unable to find the desired location',undefined)
       }
       else{
        callback(undefined, response.body.location.name + ' It is currently ' + response.body.current.temperature + ' degress out. There is a ' + response.body.current.weather_descriptions[0])
       }
    })
}
module.exports = forecast
