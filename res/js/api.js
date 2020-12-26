let searchButton = document.querySelector("#search")
let userDiet = "high-protein"
let result = "protein"

//Add an event listener to the button that runs the function sendApiRequest when it is clicked
searchButton.addEventListener("click", ()=>{
    console.log("button pressed")
    sendApiRequest()
})


//An asynchronous function to fetch data from the API.
async function sendApiRequest(){
    let APP_ID = "ccbf3e9f"
    let API_KEY = "3e705fd220bb76220d7de25e5505df03"
    
    let response = await fetch(`https://api.edamam.com/search?app_id=${APP_ID}&app_key=${API_KEY}&q=${result}`);
    // &diet=${userDiet}
    console.log(response)
    let data = await response.json()
    console.log(data)
    useApiData(data)
}


//function that does something with the data received from the API. The name of the function should be customized to whatever you are doing with the data
function useApiData(data){
    document.getElementById("content").style["display"] = "block";
    document.querySelector("#content").innerHTML = `
    <div class="card" style="width: 18rem;">
        <img src="${data.hits[0].recipe.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${data.hits[0].recipe.label.substring(0, 30)}</h5>
            <p class="card-text">Source: ${data.hits[0].recipe.source} ${data.hits[0].recipe.calories} calories</p>
            <a href="${data.hits[0].recipe.url}" class="btn btn-primary">Check it Out!</a>
        </div>
    </div>
    <div class="card" style="width: 18rem;">
        <img src="${data.hits[1].recipe.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${data.hits[1].recipe.label.substring(0,30)}...</h5>
            <p class="card-text">Source: ${data.hits[1].recipe.source} ${data.hits[1].recipe.calories} calories</p>
            <a href="${data.hits[1].recipe.url}" class="btn btn-primary">Check it Out!</a>
        </div>
    </div>
    <div class="card" style="width: 18rem;">
        <img src="${data.hits[2].recipe.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${data.hits[2].recipe.label.substring(0,30)}...</h5>
            <p class="card-text">Source: ${data.hits[2].recipe.source} ${data.hits[2].recipe.calories} calories</p>
            <a href="${data.hits[2].recipe.url}" class="btn btn-primary">Check it Out!</a>
        </div>
    </div>
    <div class="card" style="width: 18rem;">
        <img src="${data.hits[3].recipe.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${data.hits[3].recipe.label.substring(0,30)}...</h5>
            <p class="card-text">Source: ${data.hits[3].recipe.source} ${data.hits[3].recipe.calories} calories</p>
            <a href="${data.hits[3].recipe.url}" class="btn btn-primary">Check it Out!</a>
        </div>
    </div> 
    <div class="card" style="width: 18rem;">
        <img src="${data.hits[4].recipe.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${data.hits[4].recipe.label.substring(0,30)}...</h5>
            <p class="card-text">Source: ${data.hits[4].recipe.source} ${data.hits[4].recipe.calories} calories</p>
            <a href="${data.hits[4].recipe.url}" class="btn btn-primary">Check it Out!</a>
        </div>
    </div>
    <div class="card" style="width: 18rem;">
        <img src="${data.hits[5].recipe.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${data.hits[5].recipe.label.substring(0,30)}...</h5>
            <p class="card-text">Source: ${data.hits[5].recipe.source} ${data.hits[5].recipe.calories} calories</p>
            <a href="${data.hits[5].recipe.url}" class="btn btn-primary">Check it Out!</a>
        </div>
    </div>
    <div class="card" style="width: 18rem;">
        <img src="${data.hits[6].recipe.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${data.hits[6].recipe.label.substring(0,30)}...</h5>
            <p class="card-text">Source: ${data.hits[6].recipe.source} ${data.hits[6].recipe.calories} calories</p>
            <a href="${data.hits[6].recipe.url}" class="btn btn-primary">Check it Out!</a>
        </div>
    </div>
    <div class="card" style="width: 18rem;">
        <img src="${data.hits[7].recipe.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${data.hits[7].recipe.label.substring(0,30)}...</h5>
            <p class="card-text">Source: ${data.hits[7].recipe.source} ${data.hits[7].recipe.calories} calories</p>
            <a href="${data.hits[7].recipe.url}" class="btn btn-primary">Check it Out!</a>
        </div>
    </div>
    <div class="card" style="width: 18rem;">
        <img src="${data.hits[8].recipe.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${data.hits[8].recipe.label.substring(0,30)}...</h5>
            <p class="card-text">Source: ${data.hits[8].recipe.source} ${data.hits[8].recipe.calories} calories</p>
            <a href="${data.hits[8].recipe.url}" class="btn btn-primary">Check it Out!</a>
        </div>
    </div>
    <div class="card" style="width: 18rem;">
        <img src="${data.hits[9].recipe.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${data.hits[9].recipe.label.substring(0,30)}...</h5>
            <p class="card-text">Source: ${data.hits[9].recipe.source} ${data.hits[9].recipe.calories} calories</p>
            <a href="${data.hits[9].recipe.url}" class="btn btn-primary">Check it Out!</a>
        </div>
    </div>
`
}

