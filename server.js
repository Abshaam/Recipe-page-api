// requiring all modules
const express = require("express");
const cors = require("cors");
const PORT = process.env.process || 7000
const { uuid } = require('uuidv4');


// assigning a variable to express
const app = express()


// using middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use (cors(
    {
        origin: 'http://localhost:3000',
        methods: "PUT, POST, DELETE, GET",
       
    }));



// assigning a variable to all recipes
let recipes = []

// controller for getting all recipes
app.get('/fetch', ( req, res) => {

    // this should print out all recipes
    res.status(200).json(recipes);
})

// controller for getting all recipes
app.get('/delay-fetch', ( req, res) => {

    // this should print out all recipes

    setTimeout(() => {
    res.status(200).json(recipes)
    },6000);
})


// controller for adding a recipe
app.post('/add', async (req, res) => {

    // assigs a variable the the text that will be entered in the input field
    const { text } = req.body;

    // run this when a text is entered
    if (text) {
        const newRecipe = {
            id: uuid(),
            text,
            isCompleted: false  
        }

        // add the newRecipe to the recipes with the empty array
        recipes.push(newRecipe)
        res.status(200).json(newRecipe);

    // run this if input field is empty
    } else{
        res.status(400).json({msg: 'Text field must hav a text in it'})
    }
})
   


// controller for deleting a recipe
app.delete('/delete/:id', async (req, res) =>{

    // denotes the id of the recipe grabbed
    const {id} = req.params;

    // this finds a match of the id grabbed with a recipe id in the database
    const findMatch = recipes.find(recipe => recipe.id === id );

    // this returns a new array which does not have the id that has being grabbed thereby deleted
    recipes = recipes.filter(recipe => recipe.id !== id);
    
    // log this when a recipe with similar id is found
    res.status(200).json(findMatch)
   
})

// controller for updating a recipe
app.put('/update/:id', (req, res) =>{

    // denotes the id of the recipe grabbed
    const {id} = req.params;

    // maps through every recipe and run the function which changes the isCompleted to not completed
    recipes = recipes.map(recipe => {
        return recipe.id === id ? {...recipe, isCompleted: !recipe.isCompleted} : {...recipe} 
    });

    
    // this finds the recipe with id which matches with th id grabbed
    const findMatch = recipes.find(recipe => recipe.id === id)
    
    // run this when you find a match
    res.status(200).json(findMatch);

       
   
})

// this is to check the connection to the server
app.listen(PORT, () => {
    console.log(`server running smooth on port ${PORT}`);
})