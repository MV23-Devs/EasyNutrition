
let userDiet = "high-protein"
let allergies = []
let mealtype = "Lunch";

//Add an event listener to the button that runs the function sendApiRequest when it is clicked
<<<<<<< HEAD
searchButton.addEventListener("click", ()=>{
    allergies = [];

    for (i = 1; i < 9; i++) {

        if (document.getElementById(String("allergy" + i)).checked) {
            allergies.push((document.getElementById(String("allergy" + i)).value).toLowerCase());
        }
    }

    console.log("Allergies = " + allergies);

    for (i = 1; i < 4; i++) {
        if (document.getElementById(String("meal" + i)).checked) {
            mealtype = document.getElementById(String("meal" + i)).value
        }
    }
    console.log(mealtype)
    console.log(getDiet(score));
    sendApiRequest()
})


//An asynchronous function to fetch data from the API.
async function sendApiRequest(){
    let APP_ID = "ccbf3e9f"
    let API_KEY = "3e705fd220bb76220d7de25e5505df03"
    
    let url = `https://api.edamam.com/search?app_id=${APP_ID}&app_key=${API_KEY}&q=${mealtype}`
=======


>>>>>>> 98c760e... cleaned up website and reoriented focus

//An asynchronous function to fetch data from the API.


function getDiet(score) {
    let diet = "balanced";



    return diet;
}


//function that does something with the data received from the API. The name of the function should be customized to whatever you are doing with the data


