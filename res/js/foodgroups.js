const { Console } = require("console");

let proteinItems = ["Meat", "Plant-Based"];
let fruitItems = ["Berry"];
let vegetableItems = ["Pepper"];
let grainItems = ["Bread"];
let dairyItems = ["Milk", "Cheese"];

let foodGroups = {
    "Protein": proteinItems, 
    "Fruit": fruitItems, 
    "Vegetable": vegetableItems, 
    "Grain": grainItems, 
    "Dairy": dairyItems
};

//let meal = [];
function checkMissing(meal){
    //parameter meal is an array of all items in the meal
    let groupCheck = {
        "Protein": false,
        "Fruit": false,
        "Vegetable": false,
        "Grain": false,
        "Dairy": false
    }
    keys = Object.keys(foodGroups)
    for(let i=0; i < keys.length; i++){
        for(let j=0; j < meal.length; j++){
            if(foodGroups[keys[i]].includes(meal[j])){
                groupCheck[keys[i]] = true;
            }
        }
    }
    return groupCheck;
}

//let mealEx = ["Meat", "Berry", "Pepper", "Bread", "Milk", "Cheese"];
//console.log(checkMissing(mealEx));

console.log(document.getElementById("mealSelector"));