let searchButton = document.querySelector("#search")

//Add an event listener to the button that runs the function sendApiRequest when it is clicked
searchButton.addEventListener("click", ()=>{
    console.log("button pressed")
    sendApiRequest()
})


//An asynchronous function to fetch data from the API.
async function sendApiRequest(){
    let APP_ID = "ccbf3e9f"
    let API_KEY = "3e705fd220bb76220d7de25e5505df03"
    
    let response = await fetch(`https://api.edamam.com/search?app_id=${APP_ID}&app_key=${API_KEY}&q=pizza`);
    // MAKE SURE TO CHANGE q IN THE FETCH TO A VARIABLE THAT STORES THAT NUTRIENTS THE USER WANTS
    console.log(response)
    let data = await response.json()
    console.log(data)
}


//function that does something with the data received from the API. The name of the function should be customized to whatever you are doing with the data
function useApiData(data){

}

