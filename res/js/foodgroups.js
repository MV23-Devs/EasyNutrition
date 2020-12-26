let proteinItems = ["redMeats", "whiteMeats", "fish", "nuts"];
let fruitItems = ["berry", "legumes", "drupes"];
let vegetableItems = ["pepper", "cabbage", "potatoes"];
let grainItems = ["bread", "pasta", "rice"];
let dairyItems = ["milk", "cheese", "ogurt"];

let foodGroups = {
    "Protein": proteinItems,
    "Fruit": fruitItems,
    "Vegetable": vegetableItems,
    "Grain": grainItems,
    "Dairy": dairyItems
};

let score = {
    "Protein": 0,
    "Fruit": 0,
    "Vegetable": 0,
    "Grain": 0,
    "Dairy": 0
};

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
    let groupvalues = [];

    for(let i = 0; i < groups.length; i++) {
        groupvalues.push(
            parseFloat(document.getElementById(String(groups[i] + "Number")).value)
            )
    }

    console.log(groupvalues)
    let result = checkMissing(mealInp);
    $("#needs").empty();
    for (let i = 0; i < result.length; i++) {
        let ul = document.getElementById("needs");
        let li = document.createElement("li");
        li.appendChild(document.createTextNode(result[i]));
        ul.appendChild(li);
    }
    if(result.length > 0) {
        document.getElementById("displayText").innerHTML = "You need to include some of the following food groups in your next meal: ";
    } else {
        document.getElementById("displayText").innerHTML = "Well Done, all the food groups are present in your meal!";
    }
    document.getElementById("continueButtonDiv").innerHTML = "<p>Checkout more recipes here:</p><a href='#search'>Continue to Recipes</a>";
    document.getElementById("results").style["display"] = "block";
    return false;
}

//function takes in an array of items in meal and returns a string message with all the missing groups
//need to fetch data from form and then take string output and display it
function checkMissing(meal) {
    //parameter meal is an array of all items in the meal
    let groupCheck = {
        "Protein": false,
        "Fruit": false,
        "Vegetable": false,
        "Grain": false,
        "Dairy": false
    }
    keys = Object.keys(foodGroups)
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