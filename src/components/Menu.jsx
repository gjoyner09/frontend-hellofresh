import { useEffect, useState } from "react"
import { api } from "../data"

export const Menu = (props) => {
    const id = props.match.params.id
    const [recipeNumbers, setRecipeNumbers] = useState([])
    const [recipes, setRecipes] = useState([])
    const [menu, setMenu] = useState({})
    const [errorMessage, setErrorMessage] = useState("")
    let weekRecipes
    
    useEffect(() => {
        api.get("/recipe_week_join_tables")
        .then(({ data }) => {
            weekRecipes = data.filter(({ menu_id }) => menu_id == id)
            setRecipeNumbers(weekRecipes)
        })
        .catch(({ message }) => setErrorMessage(`oops, something went wrong: ${message}`))
        
        api.get(`/menus/${id}`)
        .then(({ data }) => {
            setMenu(data)
        })
    }, [])
    
    useEffect(() => {
        recipeNumbers && recipeNumbers.forEach(rec => {
            api.get(`/recipes/${rec.recipe_id}`)
                .then(({ data }) => {
                    let recipesCopy = [...recipes]
                    recipesCopy.push(data)
                    setRecipes(recipesCopy)
                })
        })
    }, [recipeNumbers])
    
    return (
        <>
            <h1>Week of {menu.week}</h1>
            {recipes.map(({title, ingredients, instructions, nutritional_info, classification, id}) => {
                return (
                    <>
                        <h2 id={id}>{title}</h2>
                        <ul>
                            <li>Ingredients: {ingredients}</li>
                            <li>Instructions: {instructions}</li>
                            <li>Nutritional Info: {nutritional_info}</li>
                            <li>Classification: {classification}</li>
                        </ul>
                    </>
                )
            })}
        </>
    )
}