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

let values = {
    "fat": 0,
    "fiber": 0,
    "carbs": 0,
    "cholesterol": 0,
    "protein": 0,
    "sodium": 0
};

let keys = null;
let lowest = null;
let lowestKey = null;

let num_items = 12;

$("#numberItems").change(() => {
    num_items = $("#numberItems").val()
})

let ingLink = document.getElementById('submitIngredients');
ingLink.addEventListener("click", (e) => {
    e.preventDefault()
    values = {
        "fat": 0,
        "fiber": 0,
        "carbs": 0,
        "cholesterol": 0,
        "protein": 0,
        "sodium": 0
    };
    let ingString = document.getElementById("ingredientField").value;
    let ings = ingString.split(/\n/);
    for(let i=0; i<ings.length; i++){
        let splitIngs = []
        console.log(ings[i])
        ings[i].split(" ").forEach(element => splitIngs.push(element));
        let ingAppend = "&ingr=1";
        for(let i=0; i<splitIngs.length; i++){
            ingAppend += "%20";
            ingAppend += String(splitIngs[i]);
        }
        
        sendIngredientsApiRequest(ingAppend);
    }
})

async function sendIngredientsApiRequest(ingredients){
    let APP_ID = "904f282d"
    let API_KEY = "4b89602f05b17c72ede36c0d13e34c71"
    
    let url = `https://api.edamam.com/api/nutrition-data?app_id=${APP_ID}&app_key=${API_KEY}${ingredients}`;

    let response = await fetch(url);
    console.log(response)
    let data = await response.json()
    incrementIngredientAPIData(data)
}

function incrementIngredientAPIData(data) {
    values.fat += data.totalDaily.FAT.quantity,
    values.fiber += data.totalDaily.FIBTG.quantity,
    values.carbs += data.totalDaily.CHOCDF.quantity,
    values.cholesterol += data.totalDaily.CHOLE.quantity,
    values.protein += data.totalDaily.PROCNT.quantity,
    values.sodium += data.totalDaily.NA.quantity,

    keys = Object.keys(values);
    lowest = values[keys[0]];
    lowestKey = keys[0];
    for(let i=0; i<keys.length; i++){
        if(values[keys[i]] < lowest){
            lowest = values[keys[i]];
            lowestKey = keys[i];
        }
    }
}

function useIngredientApiData(data){
    sendRecipeApiRequest(lowestKey);
    let message = "Looks like you need some more " + lowestKey + "!";

    document.getElementById("ingcontent").style["display"] = "block";
    document.querySelector("#ingcontent").innerHTML = `
        <h1 class="center">Nutrional Breakdown</h1>
        <div class="card-body-small">
            <h5 class="card-title">${data.totalDaily.FAT.label}</h5>
            <p class="card-text">${String(data.totalDaily.FAT.quantity).substring(0, 5)}% daily value</p>
        </div>
        <div class="card-body-small">
            <h5 class="card-title">${data.totalDaily.FIBTG.label}</h5>
            <p class="card-text">${String(data.totalDaily.FIBTG.quantity).substring(0, 5)}% daily value</p>
        </div>
        <div class="card-body-small">
            <h5 class="card-title">${data.totalDaily.CHOCDF.label}</h5>
            <p class="card-text">${String(data.totalDaily.CHOCDF.quantity).substring(0, 3)}% daily value</p>
        </div>
        <div class="card-body-small">
            <h5 class="card-title">${data.totalDaily.CHOLE.label}</h5>
            <p class="card-text">${String(data.totalDaily.CHOLE.quantity).substring(0, 5)}% daily value</p>
        </div>
        <div class="card-body-small">
            <h5 class="card-title">${data.totalDaily.PROCNT.label}</h5>
            <p class="card-text">${String(data.totalDaily.PROCNT.quantity).substring(0, 5)}% daily value</p>
        </div>
        <div class="card-body-small">
            <h5 class="card-title">${data.totalDaily.NA.label}</h5>
            <p class="card-text">${String(data.totalDaily.NA.quantity).substring(0, 5)}% daily value</p>
        </div>
        <br>
        <h4 id= "resultMessage">${message}</h4>
    `
}



// let allergies = []


// let allergyButton = document.getElementById("submitAllergySelection");

// allergyButton.onclick = function () {
//     allergies = [];

//     for (i = 1; i < 9; i++) {

//         if (document.getElementById(String("allergy" + i)).checked) {
//             allergies.push((document.getElementById(String("allergy" + i)).value).toLowerCase());
//         }
//     }

//     console.log("Allergies = " + allergies);
//     return false;
// }

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
    let APP_ID = "353e9f54"
    let API_KEY = "edbfc920d338b67422c4f4943b277bc4"

    
    let url = `https://api.edamam.com/search?app_id=${APP_ID}&app_key=${API_KEY}&q=${query}&to=${num_items}`
    console.log("recipe:  " + url)

    let response = await fetch(url);
    let data = await response.json()
    useRecipeApiData(data)
}

//recipe search content
function useRecipeApiData(data){
    document.getElementById("content").style["display"] = "block";
    document.getElementById("rline").style["display"] = "block";
    document.getElementById("rtitle").style["display"] = "block";

    document.getElementById("rtitle").scrollIntoView();
    
    let ul = document.getElementById("content");
    $("#content").empty();
    let li = null;
    let card = null;
    let img = null;
    let body = null;
    let title = null;
    let text1 = null;
    let br = null;
    let text2 = null;
    let link = null;

    let healthlist = null;

    for(let i = 0; i < num_items; i++) {
        li = document.createElement("li");
        card = document.createElement('div')
        card.setAttribute("class", "card");
        // card.style["width"] = "18rem";
        img = document.createElement("img")
        img.setAttribute("src", data.hits[i].recipe.image);
        img.setAttribute("class", "cardImg");
        body = document.createElement("div")
        body.setAttribute("class", "card-body")
        title = document.createElement("h5")
        title.setAttribute("class", "card-title")
        title.innerHTML = data.hits[i].recipe.label.substring(0, 25)
        text1 = document.createElement("p")
        text1.setAttribute("class", "card-text")
        text1.innerHTML = "Source: " + String(data.hits[i].recipe.label.substring(0,20))
        // br = document.createElement("br")

        if(data.hits[i].recipe.healthLabels.length > 0) {
            healthlist = document.createElement("ul")
            for(let j = 0; j < data.hits[i].recipe.healthLabels.length; j++) {
                if(j > 2) {
                    break;
                }
                let li = document.createElement("li");
                let text = document.createElement("h6");
                text.setAttribute("class", "healthLabel");
                text.innerHTML = data.hits[i].recipe.healthLabels[j];
                li.appendChild(text);
                healthlist.appendChild(li);
            }
        }

        text2 = document.createElement("p")
        text2.setAttribute("class", "card-text")
        text2.innerHTML = String(data.hits[i].recipe.calories.toString().substring(0, 3)) + " calories"
        link = document.createElement("a")
        link.setAttribute("class", "btn btn-primary")
        link.setAttribute("href", data.hits[i].recipe.url)
        link.innerHTML = "Check it Out";
        body.appendChild(title);
        body.appendChild(text1);
        if(data.hits[i].recipe.healthLabels.length > 0) {
            body.appendChild(healthlist);
        }
        body.appendChild(text2);
        body.appendChild(link);
        card.appendChild(img)
        card.appendChild(body)
        ul.appendChild(card);
    }
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