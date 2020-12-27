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
let highest = null;
let highestKey = null;

let num_items = 12;

$("#numberItems").change(() => {
    num_items = $("#numberItems").val()
})

let ingLink = document.getElementById('submitIngredients');
$("#submitIngredients").click((e) => {
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
        console.log(splitIngs)
        for(let i=0; i<splitIngs.length; i++){
            ingAppend += "%20";
            ingAppend += String(splitIngs[i]);
        }

        sendIngredientsApiRequest(ingAppend).then((result) => {
            values.fat += result.fat;
            values.fiber += result.fiber;
            values.carbs += result.carbs;
            values.cholesterol += result.cholesterol;
            values.protein += result.protein;
            values.sodium += result.sodium;
            return values
        }).then(values => {
            useIngredientApiData(values)
        })

    }

    
})

async function sendIngredientsApiRequest(ingredients){

    let APP_ID = "2d284351"
    let API_KEY = "113895aadcc040c744bd68d48a2dec19"
    
    let url = `https://api.edamam.com/api/nutrition-data?app_id=${APP_ID}&app_key=${API_KEY}${ingredients}`;

    let response = await fetch(url);
    let data = await response.json();
    let result = {
        "fat": data.totalDaily.FAT.quantity,
        "fiber": data.totalDaily.FIBTG.quantity,
        "carbs": data.totalDaily.CHOCDF.quantity,
        "cholesterol": data.totalDaily.CHOLE.quantity,
        "protein": data.totalDaily.PROCNT.quantity,
        "sodium": data.totalDaily.NA.quantity
    }
    return result;
}

function useIngredientApiData(data){
    keys = Object.keys(values);
    lowest = values[keys[0]];
    lowestKey = keys[0];
    for(let i=0; i<keys.length; i++){
        if(values[keys[i]] < lowest){
            lowest = values[keys[i]];
            lowestKey = keys[i];
        }
    }

    highest = values[keys[0]];
    highestKey = keys[0];
    for(let i=0; i<keys.length; i++){
        if(values[keys[i]] > highest){
            highest = values[keys[i]];
            highestKey = keys[i];
        }
    }

    // Determine the query for the API
    let q = lowestKey;
    let message = (lowestKey.substring(0, 1).toUpperCase() + lowestKey.substring(1)) + " deficiency";

    if(highestKey == "cholesterol") {
        q = "cholesterol"
        message = "High Cholesterol"
    }
    if(highestKey == "sodium") {
        q = "sodium"
        message= "High Sodium"
    }
    if(highestKey == "carb") {
        q = "carb"
        message = "High Carbs"
    }



    sendRecipeApiRequest(q);


    document.getElementById("ingcontent").style["display"] = "block";
    document.querySelector("#ingcontent").innerHTML = `
        <h1 class="center">Nutrional Breakdown</h1>
        <div class="card-body-small">
            <h5 class="card-title">Fat</h5>
            <p class="card-text">${String(data.fat).substring(0, 5)}% daily value</p>
        </div>
        <div class="card-body-small">
            <h5 class="card-title">Fiber</h5>
            <p class="card-text">${String(data.fiber).substring(0, 5)}% daily value</p>
        </div>
        <div class="card-body-small">
            <h5 class="card-title">Carbs</h5>
            <p class="card-text">${String(data.carbs).substring(0, 3)}% daily value</p>
        </div>
        <div class="card-body-small">
            <h5 class="card-title">Cholesterol</h5>
            <p class="card-text">${String(data.cholesterol).substring(0, 5)}% daily value</p>
        </div>
        <div class="card-body-small">
            <h5 class="card-title">Protein</h5>
            <p class="card-text">${String(data.protein).substring(0, 5)}% daily value</p>
        </div>
        <div class="card-body-small">
            <h5 class="card-title">Sodium</h5>
            <p class="card-text">${String(data.sodium).substring(0, 5)}% daily value</p>
        </div>
        <br>
        <h4 id= "resultMessage">${message}</h4>
    `
}

//recipe search api call
async function sendRecipeApiRequest(query){
    let APP_ID = "21953171"
    let API_KEY = "5c7211cc5a2425475adb7aad9566ed54"

    
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
    let card = null;
    let img = null;
    let body = null;
    let title = null;
    let text1 = null;
    let text2 = null;
    let link = null;
    let healthlist = null;

    for(let i = 0; i < num_items; i++) {
        card = document.createElement('div')
        card.setAttribute("class", "card");
        img = document.createElement("img")
        img.setAttribute("src", data.hits[i].recipe.image);
        img.setAttribute("alt", "Image unavailable");
        img.setAttribute("class", "cardImg");
        body = document.createElement("div")
        body.setAttribute("class", "card-body")
        title = document.createElement("h5")
        title.setAttribute("class", "card-title")
        title.innerHTML = data.hits[i].recipe.label.substring(0, 25)
        text1 = document.createElement("p")
        text1.setAttribute("class", "card-text")
        text1.innerHTML = "Source: " + String(data.hits[i].recipe.label.substring(0,20))

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