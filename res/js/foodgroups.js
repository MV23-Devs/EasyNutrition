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
ingLink.addEventListener("click", () => {
    let ingString = document.getElementById("ingredientField").value;
    let ings = ingString.split(" ");
    let ingAppend = "&ingr=1%20";
    for(let i=0; i<ings.length; i++){
        ingAppend += String(ings[i]);
        ingAppend += "%20";
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
    document.getElementById("content").style["display"] = "block";
    document.querySelector("#content").innerHTML = `
        <div class="card" style="width: 18rem;">
            <img src="${data.totalDaily.FAT}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${data.totalDaily.FAT.label}</h5>
                <p class="card-text">${String(data.totalDaily.FAT.quantity).substring(0, 5)}% daily value</p>
            </div>
        </div>
        <div class="card" style="width: 18rem;">
            <img src="${data.totalDaily.FIBTG}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${data.totalDaily.FIBTG.label}</h5>
                <p class="card-text">${String(data.totalDaily.FIBTG.quantity).substring(0, 5)}% daily value</p>
            </div>
        </div>
        <div class="card" style="width: 18rem;">
            <img src="${data.totalDaily.CHOCDF}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${data.totalDaily.CHOCDF.label}</h5>
                <p class="card-text">${String(data.totalDaily.CHOCDF.quantity).substring(0, 3)}% daily value</p>
            </div>
        </div>
        <div class="card" style="width: 18rem;">
            <img src="${data.totalDaily.CHOLE}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${data.totalDaily.CHOLE.label}</h5>
                <p class="card-text">${String(data.totalDaily.CHOLE.quantity).substring(0, 5)}% daily value</p>
            </div>
        </div>
        <div class="card" style="width: 18rem;">
            <img src="${data.totalDaily.PROCNT}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${data.totalDaily.PROCNT.label}</h5>
                <p class="card-text">${String(data.totalDaily.PROCNT.quantity).substring(0, 5)}% daily value</p>
            </div>
        </div>
        <div class="card" style="width: 18rem;">
            <img src="data:image/jpeg;base64,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" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${data.totalDaily.NA.label}</h5>
                <p class="card-text">${String(data.totalDaily.NA.quantity).substring(0, 5)}% daily value</p>
            </div>
        </div>
    `
}

let myLink = document.getElementById('submitSelection');
myLink.onclick = function () {
    let mealInp = []
    let groups = ["protein", "grain", "dairy", "vegetables", "fruits"]
    for (let i = 0; i < groups.length; i++) {
        for (let j = 1; j < 4; j++) {
            if (document.getElementById(String(groups[i]) + String(j)).checked) {
                mealInp.push(document.getElementById(String(groups[i]) + String(j)).value);
            }
        }
    }

    score.protein = parseFloat(document.getElementById(String("proteinNumber")).value);
    score.grain = parseFloat(document.getElementById(String("grainNumber")).value);
    score.dairy = parseFloat(document.getElementById(String("dairyNumber")).value);
    score.vegetables = parseFloat(document.getElementById(String("vegetablesNumber")).value);
    score.fruits = parseFloat(document.getElementById(String("fruitsNumber")).value);


    const getMax = object => {
        return Object.keys(object).filter(x => {
            return object[x] == Math.min.apply(null,
                Object.values(object));
        });
    };


    console.log(getMax(score))

    let result = checkMissing(mealInp);
    $("#needs").empty();
    for (let i = 0; i < result.length; i++) {
        let ul = document.getElementById("needs");
        let li = document.createElement("li");
        li.appendChild(document.createTextNode(result[i]));
        ul.appendChild(li);
    }
    if (result.length > 0) {
        document.getElementById("displayText").innerHTML = "You need to include some of the following food groups in your next meal: ";
    } else {
        document.getElementById("displayText").innerHTML = "Well done, all the food groups are present in your meal!";
    }
    document.getElementById("continueButtonDiv").innerHTML = "<p>Checkout more recipes here:</p><a href='#search'>Continue to Recipes</a>";
    document.getElementById("results").style["display"] = "block";
    return false;
}

let allergies = []


let allergyButton = document.getElementById("submitAllergySelection");

allergyButton.onclick = function () {
    console.log("buttonclicked")
    allergies = [];

    for (i = 1; i < 9; i++) {

        if (document.getElementById(String("allergy" + i)).checked) {
            allergies.push((document.getElementById(String("allergy" + i)).value).toLowerCase());
        }
    }

    console.log("Allergies = " + allergies);
    return false;
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