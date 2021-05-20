const path = require('path')
const hbs = require('hbs')
//Calling an express
const express = require('express')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast') 

const app = express()
const port = process.env.PORT||3000



//Define path for the express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


//Setup handlebars engine and views location
//app.set allows us to set a value for a given express
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)


//Setup static directory to serve
app.use(express.static(publicDirectoryPath))
//render function for adding dynamic content
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Milan Jhaldiyal'
    })//here in argument providing the hbs file name and 2nd argument is the value we pass
})


app.get('/about',(req,res)=>{
    res.render('about',{
        title : 'About',
        body:'Hey!...I am an Computer Science Engineer...Specialist in backend services',
        name : 'Milan Jhaldiyal'
    })
})



app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        body : 'Help the needy',
        name : 'Milan Jhaldiyal'
    })
})


app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide an address'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location} = {})=>{
        if(error){
            return res.send({error})
        }
       forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })
    })
})

//Setting up 404 pages * is used for setting the unmatch page
app.get('*',(req,res)=>{
    res.render('web_error',{
        title : 'Error Page',
        name : 'Milan Jhaldiyal',
        body:'Error!page not found '
    })
})
app.listen(port,()=>{
    console.log('Server is up on port '+port)
})