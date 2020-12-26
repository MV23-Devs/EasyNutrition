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