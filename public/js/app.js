console.log('Client side javascript file is loaded!')

// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })


const weatherForm = document.querySelector('form')
const searchElement=document.querySelector('input')

const message1Text=document.querySelector('#message-1')
const message2Text=document.querySelector('#message-2')


const getWeather = (location)=>{

    message1Text.textContent=''
    message2Text.textContent=''



    fetch('/weather?address='+location).then((response)=>{
response.json().then((data)=>{
    if(data.error){
        
        console.log(data.error)
        message1Text.textContent=data.error
        message2Text.textContent=''
    }else{
        message1Text.textContent=''
        message2Text.textContent=''

        message1Text.textContent=data.location
        message2Text.textContent=data.forecast

        console.log(data.location)
        console.log(data.forecast)
    }
})
})
}

weatherForm.addEventListener('submit',(e)=>{
   e.preventDefault()

   const location=searchElement.value
    getWeather(location)

})