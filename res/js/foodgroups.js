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

let num_items = 12;

$("#numberItems").change(() => {
    num_items = $("#numberItems").val()
})

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
    sendIngredientsApiRequest(ingAppend);
})

async function sendIngredientsApiRequest(ingredients){
    let APP_ID = "dfd58b53"
    let API_KEY = "84a26f80b28818b6eb7936e961b0b744"
    
    let url = `https://api.edamam.com/api/nutrition-data?app_id=${APP_ID}&app_key=${API_KEY}${ingredients}`;

    let response = await fetch(url);
    let data = await response.json()
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
    let APP_ID = "335d2d4e"
    let API_KEY = "f7af7c59cda169178d23fe815c9ae980"

    
    let url = `https://api.edamam.com/search?app_id=${APP_ID}&app_key=${API_KEY}&q=${query}&to=${num_items}`
    console.log(url)

    // for(let i = 0; i < allergies.length; i++) {
    //     url += "&Health=" + allergies[i]
    // }

    // url += "&mealtype=" + mealtype;

    console.log(url)

    let response = await fetch(url);
    // &diet=${userDiet}
    let data = await response.json()
    console.log(data)
    useRecipeApiData(data)
}

//recipe search content
function useRecipeApiData(data){
    document.getElementById("content").style["display"] = "block";
    document.getElementById("rline").style["display"] = "block";
    document.getElementById("rtitle").style["display"] = "block";

    document.getElementById("rtitle").scrollIntoView();
    
    let ul = document.getElementById("content");
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
        body.appendChild(healthlist);
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