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

let myLink = document.getElementById('submitSelection');
myLink.onclick = function(){
    let mealInp = []
    let groups = ["protein", "grain", "dairy", "vegetables", "fruits"]
    for(let i=0; i < groups.length; i++){
        for(let j=1; j < 4; j++){
            if(document.getElementById(String(groups[i]) + String(j)).checked){
                mealInp.push(document.getElementById(String(groups[i]) + String(j)).value);
            }
        }
    }
    console.log(mealInp)
    let displayMessage = checkMissing(mealInp);
    document.getElementById("displayText").innerHTML = displayMessage;
    document.getElementById("continueButtonDiv").innerHTML = "<p>Checkout more recipes here:</p><a href='recipes.html'>Continue to Recipes</a>";
    return false;
}

//function takes in an array of items in meal and returns a string message with all the missing groups
//need to fetch data from form and then take string output and display it
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
    let counter = 0;
    let message = "You need to include some of the following food groups in your next meal: "
    for(let i = 0; i < keys.length; i++){
        if(groupCheck[keys[i]] == false){
            message += keys[i] + " ";
            counter++;
        }
    }
    if(counter == 0) {
        message = "Well Done, all the food groups are present in your meal!"
    }
    return message;
}

//let mealEx = ["Meat", "Pepper", "Bread", "Milk", "Cheese"];
//console.log(checkMissing(mealEx));

//console.log(document.getElementById("mealSelector"));