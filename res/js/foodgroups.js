let proteinItems = ["redMeats", "whiteMeats", "fish", "nuts"];
let fruitItems = ["berries", "legumes", "drupes"];
let vegetableItems = ["peppers", "cabbage", "potatoes"];
let grainItems = ["bread", "pasta", "rice"];
let dairyItems = ["milk", "cheese", "yogurt"];

let foodGroups = {
    "protein": proteinItems,
    "grain": grainItems,
    "dairy": dairyItems,
    "vegetables": vegetableItems,
    "fruits": fruitItems
};

let score = {
    "protein": 0,
    "grain": 0,
    "dairy": 0,
    "vegetables": 0,
    "fruits": 0
};



let ingLink = document.getElementById('submitIngredients');
ingLink.addEventListener("click", (e) => {
    e.preventDefault()
    let ingString = document.getElementById("ingredientField").value;
    let ings = ingString.split(/\n/);
    let splitIngs = []
    for(let i=0; i<ings.length; i++){
        ings[i].split(" ").forEach(element => splitIngs.push(element));
    }
    console.log(splitIngs)
    let ingAppend = "&ingr=1";
    for(let i=0; i<splitIngs.length; i++){
        ingAppend += "%20";
        ingAppend += String(splitIngs[i]);
    }
    console.log(ingAppend)
    sendIngredientsApiRequest(ingAppend);
})

async function sendIngredientsApiRequest(ingredients){
    let APP_ID = "f45640a8"
    let API_KEY = "1f848ab6dabddf6debc5dcb3cf109073"
    
    let url = `https://api.edamam.com/api/nutrition-data?app_id=${APP_ID}&app_key=${API_KEY}${ingredients}`;

    let response = await fetch(url);
    // &diet=${userDiet}
    let data = await response.json()
    console.log(data)
    useIngredientApiData(data)
}

function useIngredientApiData(data){

    let values = {
        "fat": data.totalDaily.FAT.quantity,
        "fiber": data.totalDaily.FIBTG.quantity,
        "carbs": data.totalDaily.CHOCDF.quantity,
        "cholesterol": data.totalDaily.CHOLE.quantity,
        "protein": data.totalDaily.PROCNT.quantity,
        "sodium": data.totalDaily.NA.quantity
    };
    let keys = Object.keys(values);
    let lowest = values[keys[0]];
    let lowestKey = keys[0];
    for(let i=0; i<keys.length; i++){
        if(values[keys[i]] < lowest){
            lowest = values[keys[i]];
            lowestKey = keys[i];
        }
    }
    sendRecipeApiRequest(lowestKey);
    let message = "Looks like you need some more " + lowestKey + "!";

    document.getElementById("ingcontent").style["display"] = "block";
    document.querySelector("#ingcontent").innerHTML = `
        <div class="card-body">
            <h5 class="card-title">${data.totalDaily.FAT.label}</h5>
            <p class="card-text">${String(data.totalDaily.FAT.quantity).substring(0, 5)}% daily value</p>
        </div>
        <div class="card-body">
            <h5 class="card-title">${data.totalDaily.FIBTG.label}</h5>
            <p class="card-text">${String(data.totalDaily.FIBTG.quantity).substring(0, 5)}% daily value</p>
        </div>
        <div class="card-body">
            <h5 class="card-title">${data.totalDaily.CHOCDF.label}</h5>
            <p class="card-text">${String(data.totalDaily.CHOCDF.quantity).substring(0, 3)}% daily value</p>
        </div>
        <div class="card-body">
            <h5 class="card-title">${data.totalDaily.CHOLE.label}</h5>
            <p class="card-text">${String(data.totalDaily.CHOLE.quantity).substring(0, 5)}% daily value</p>
        </div>
        <div class="card-body">
            <h5 class="card-title">${data.totalDaily.PROCNT.label}</h5>
            <p class="card-text">${String(data.totalDaily.PROCNT.quantity).substring(0, 5)}% daily value</p>
        </div>
        <div class="card-body">
            <h5 class="card-title">${data.totalDaily.NA.label}</h5>
            <p class="card-text">${String(data.totalDaily.NA.quantity).substring(0, 5)}% daily value</p>
        </div>
        <h4>${message}</h4>
    `
}



let allergies = []


let allergyButton = document.getElementById("submitAllergySelection");

allergyButton.onclick = function () {
    allergies = [];

    for (i = 1; i < 9; i++) {

        if (document.getElementById(String("allergy" + i)).checked) {
            allergies.push((document.getElementById(String("allergy" + i)).value).toLowerCase());
        }
    }

    console.log("Allergies = " + allergies);
    return false;
}

let mealtype = "Lunch";
let mealtypeButton = document.getElementById("mealTypeButton")
mealtypeButton.onclick = function () {
    for (i = 1; i < 4; i++) {
        if (document.getElementById(String("meal" + i)).checked) {
            mealtype = document.getElementById(String("meal" + i)).value
        }
    }
    console.log(mealtype)
    return false;
}

// //recipe search eventlistener
// let searchButton = document.querySelector("#search")
// searchButton.addEventListener("click", ()=>{
//     let mealInp = []
//     let groups = ["protein", "grain", "dairy", "vegetables", "fruits"]
//     for (let i = 0; i < groups.length; i++) {
//         for (let j = 1; j < 4; j++) {
//             if (document.getElementById(String(groups[i]) + String(j)).checked) {
//                 mealInp.push(document.getElementById(String(groups[i]) + String(j)).value);
//             }
//         }
//     }
//     let result = checkMissing(mealInp);
//     if(result){
//         sendRecipeApiRequest(result[0])
//     }else{
//         sendRecipeApiRequest("balanced")
//     }
    
// })

//recipe search api call
async function sendRecipeApiRequest(query){
    let APP_ID = "ccbf3e9f"
    let API_KEY = "3e705fd220bb76220d7de25e5505df03"
    
    let url = `https://api.edamam.com/search?app_id=${APP_ID}&app_key=${API_KEY}&q=${query}`
    console.log(url)

    for(let i = 0; i < allergies.length; i++) {
        url += "&Health=" + allergies[i]
    }

    url += "&mealtype=" + mealtype;

    console.log(url)

    let response = await fetch(url);
    // &diet=${userDiet}
    let data = await response.json()
    useRecipeApiData(data)
}

//recipe search content
function useRecipeApiData(data){
    document.getElementById("content").style["display"] = "block";
    document.querySelector("#content").innerHTML = `
    <div class="card" style="width: 18rem;">
        <img src="${data.hits[0].recipe.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${data.hits[0].recipe.label.substring(0, 30)}</h5>
            <p class="card-text">Source: ${data.hits[0].recipe.source} <br>${data.hits[0].recipe.calories.toString().substring(0, 3)} calories</p>
            <a href="${data.hits[0].recipe.url}" class="btn btn-primary">Check it Out!</a>
        </div>
    </div>
    <div class="card" style="width: 18rem;">
        <img src="${data.hits[1].recipe.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${data.hits[1].recipe.label.substring(0,30)}...</h5>
            <p class="card-text">Source: ${data.hits[1].recipe.source}<br> ${data.hits[1].recipe.calories.toString().substring(0, 3)} calories</p>
            <a href="${data.hits[1].recipe.url}" class="btn btn-primary">Check it Out!</a>
        </div>
    </div>
    <div class="card" style="width: 18rem;">
        <img src="${data.hits[2].recipe.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${data.hits[2].recipe.label.substring(0,30)}...</h5>
            <p class="card-text">Source: ${data.hits[2].recipe.source}<br> ${data.hits[2].recipe.calories.toString().substring(0, 3)} calories</p>
            <a href="${data.hits[2].recipe.url}" class="btn btn-primary">Check it Out!</a>
        </div>
    </div>
    <div class="card" style="width: 18rem;">
        <img src="${data.hits[3].recipe.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${data.hits[3].recipe.label.substring(0,30)}...</h5>
            <p class="card-text">Source: ${data.hits[3].recipe.source} <br>${data.hits[3].recipe.calories.toString().substring(0, 3)} calories</p>
            <a href="${data.hits[3].recipe.url}" class="btn btn-primary">Check it Out!</a>
        </div>
    </div> 
    <div class="card" style="width: 18rem;">
        <img src="${data.hits[4].recipe.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${data.hits[4].recipe.label.substring(0,30)}...</h5>
            <p class="card-text">Source: ${data.hits[4].recipe.source} <br>${data.hits[4].recipe.calories.toString().substring(0, 3)} calories</p>
            <a href="${data.hits[4].recipe.url}" class="btn btn-primary">Check it Out!</a>
        </div>
    </div>
    <div class="card" style="width: 18rem;">
        <img src="${data.hits[5].recipe.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${data.hits[5].recipe.label.substring(0,30)}...</h5>
            <p class="card-text">Source: ${data.hits[5].recipe.source} <br>${data.hits[5].recipe.calories.toString().substring(0, 3)} calories</p>
            <a href="${data.hits[5].recipe.url}" class="btn btn-primary">Check it Out!</a>
        </div>
    </div>
    <div class="card" style="width: 18rem;">
        <img src="${data.hits[6].recipe.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${data.hits[6].recipe.label.substring(0,30)}...</h5>
            <p class="card-text">Source: ${data.hits[6].recipe.source} <br>${data.hits[6].recipe.calories.toString().substring(0, 3)} calories</p>
            <a href="${data.hits[6].recipe.url}" class="btn btn-primary">Check it Out!</a>
        </div>
    </div>
    <div class="card" style="width: 18rem;">
        <img src="${data.hits[7].recipe.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${data.hits[7].recipe.label.substring(0,30)}...</h5>
            <p class="card-text">Source: ${data.hits[7].recipe.source}<br> ${data.hits[7].recipe.calories.toString().substring(0, 3)} calories</p>
            <a href="${data.hits[7].recipe.url}" class="btn btn-primary">Check it Out!</a>
        </div>
    </div>
    <div class="card" style="width: 18rem;">
        <img src="${data.hits[8].recipe.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${data.hits[8].recipe.label.substring(0,30)}...</h5>
            <p class="card-text">Source: ${data.hits[8].recipe.source} <br>${data.hits[8].recipe.calories.toString().substring(0, 3)} calories</p>
            <a href="${data.hits[8].recipe.url}" class="btn btn-primary">Check it Out!</a>
        </div>
    </div>
    <div class="card" style="width: 18rem;">
        <img src="${data.hits[9].recipe.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${data.hits[9].recipe.label.substring(0,30)}...</h5>
            
            <p class="card-text">Source: ${data.hits[9].recipe.source} <br> ${data.hits[9].recipe.calories.toString().substring(0, 3)} calories</p>
            <a href="${data.hits[9].recipe.url}" class="btn btn-primary">Check it Out!</a>
        </div>
    </div>
`
}

//function takes in an array of items in meal and returns a string message with all the missing groups
//need to fetch data from form and then take string output and display it
function checkMissing(meal) {
    //parameter meal is an array of all items in the meal
    let groupCheck = {
        "protein": false,
        "fruits": false,
        "vegetables": false,
        "grain": false,
        "dairy": false
    }
    keys = Object.keys(foodGroups);
    for (let i = 0; i < keys.length; i++) {
        for (let j = 0; j < meal.length; j++) {
            if (foodGroups[keys[i]].includes(meal[j])) {
                groupCheck[keys[i]] = true;
            }
        }
    }

    let result = []
    for (let i = 0; i < keys.length; i++) {
        if (groupCheck[keys[i]] == false) {
            result.push(keys[i]);
        }
    }
    return result;
}



//let mealEx = ["Meat", "Pepper", "Bread", "Milk", "Cheese"];
//console.log(checkMissing(mealEx));

//console.log(document.getElementById("mealSelector"));