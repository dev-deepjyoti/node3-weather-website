const express= require('express')
const path=require('path')
const hbs=require('hbs')

const geocode=require('./utils/geocode')
const forecast =require('./utils/forecast')

//  console.log(__dirname)
//  console.log(__filename)

const app = express()

//Define path for Express config
const publicDirectoryPath= path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

//Setup handlerbars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath) //changing default views folder of Express js to custom directory.
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

//app.com/home page
 app.get('', (req, res)=>{
     res.render('index',{
        title:'Weather App',
        name: 'Andrew Mead',
        pageName: 'Home Page'
     })
})

app.get('/about',(req, res)=>{
    res.render('about',{
        title:'About Me',
        name:'Deepjyoti Mondal',
        pageName:'About'

    })
})

app.get('/help',(req, res)=>{
    res.render('help',{
        title:'Help Page',
        name:'Andrew Mead',
        helpText:'This is a dynamic help page.',
        pageName:'Help Page'
    })
})

//app.com/weather
app.get('/weather',(req, res)=>{

    const address=req.query.address

    if(!address){
       return res.send({
            error:'No address? You must provide an address.'
        })
    }

    geocode(address,(error, {latitude, longitude, location}={})=> {
        if(error){

            return res.send({error})
        }
      
        forecast(latitude, longitude, (error, forecastData) => {
      
          if(error){
            return res.send({error})
          }
          res.send({
            address,
            location,
            latitude,
            longitude,
             forecast:forecastData
          })
        })
      })
})

app.get('/products',(req,res)=>{
   
    if (!req.query.search){
      return  res.send({
            error:'you must provide a search term.'
        })
    }
   console.log(req.query.search)
    res.send({
        product:[]
    })
})

app.get('/help/*', (req,res)=>{
   res.render('404',{
    title:'404 Help',
    errorText:'Help article not found!',
    name:'Deepjyoti Mondal',
    pageName:'Error Page'
   })

})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        errorText:'Page not found!',
        name:'Deepjyoti Mondal',
        pageName:'404 Page'
    })
})

//server setup
app.listen(3000, ()=>{
    console.log('Server is up on port 3000. Visit localhost:3000 in browser.')
})