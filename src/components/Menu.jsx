import { useEffect, useState } from "react"
import { api } from "../data"

export const Menu = (props) => {
    const id = props.match.params.id
    const [recipeNumbers, setRecipeNumbers] = useState([])
    const [recipes, setRecipes] = useState([])
    const [allRecipes, setAllRecipes] = useState([])
    const [newRecipe, setNewRecipe] = useState({})
    const [menu, setMenu] = useState({})
    const [errorMessage, setErrorMessage] = useState("")
    let weekRecipes
    
    useEffect(() => {
        api.get("/recipe_week_join_tables")
        .then(({ data }) => {
            weekRecipes = data.filter(({ menu_id }) => menu_id == id)
            console.log("recipe numbers")
            console.log(weekRecipes)
            setRecipeNumbers(weekRecipes)
        })
        .catch(({ message }) => setErrorMessage(`oops, something went wrong: ${message}`))
        
        api.get("/recipes")
        .then(({ data }) => {
            setAllRecipes(data)
            console.log("all recipes")
            console.log(data)
        })
        
        api.get(`/menus/${id}`)
        .then(({ data }) => {
            setMenu(data)
        })
    }, [])
    
    useEffect(() => {
        if (recipeNumbers.length > 0 && allRecipes.length > 0) {
            const matchedRecipes = []
            allRecipes.forEach(recipe => {
                recipeNumbers.forEach(match => {
                    if (recipe.id === match.recipe_id) {
                        matchedRecipes.push(recipe)
                    }
                })
            })
            console.log("matched recipes")
            console.log(matchedRecipes)
            setRecipes(matchedRecipes)
        }
    }, [recipeNumbers, allRecipes])
    
    const addRecipe = (event) => {
        event.preventDefault()
        api.post('/recipe_week_join_tables', {
            menu_id: Number(id),
            recipe_id: Number(newRecipe)
        })
        let recipesCopy = [...recipes]
        const recipeToAdd = allRecipes.filter(recipe => recipe.id === Number(newRecipe) )
        console.log("recipe to add")
        console.log(recipeToAdd)
        recipesCopy.push(recipeToAdd[0])
        console.log(recipesCopy)
        setRecipes(recipesCopy)
        setNewRecipe({})
    }
    
    const updateNewRecipe = (event) => {
        setNewRecipe(event.target.value)
    }
    
    return (
        <>
            <h1>Week of {menu.week}</h1>
            {recipes.map(({title, ingredients, instructions, nutritional_info, classification, id}) => {
                return (
                    <div key={id}>
                        <h2 id={id}>{title}</h2>
                        <ul>
                            <li>Ingredients: {ingredients}</li>
                            <li>Instructions: {instructions}</li>
                            <li>Nutritional Info: {nutritional_info}</li>
                            <li>Classification: {classification}</li>
                        </ul>
                    </div>
                )
            })}
            <form onSubmit={addRecipe}>
                <select name="recipe" id="recipe" value={newRecipe} onChange={updateNewRecipe}>
                    <option></option>
                    {allRecipes.map((recipe) => {
                        return (
                            <option key={recipe.id} value={recipe.id}>{recipe.title}</option>
                        )
                    })}
                </select>
                <button type="submit">Add Recipe</button>
            </form>
        </>
    )
}