import { useEffect, useState } from "react"
import { api } from "../data"

class AllRecipes {
    static all() {
      return api.get('/recipes').then(resp => resp.data);
    }
  }
  
export default AllRecipes;

export const Recipes = () => {
    const [recipes, setRecipes] = useState([])
    const [errorMessage, setErrorMessage] = useState("")
    const [title, setTitle] = useState("")
    const [ingredients, setIngredients] = useState("")
    const [instructions, setInstructions] = useState("")
    const [nutritional_info, setNutritionalInfo] = useState("")
    const [classification, setClassification] = useState("")
    
    useEffect(() => {
        api.get("/recipes")
            .then(({ data }) => {
                setRecipes(data)
            })
            .catch(({ message }) => setErrorMessage(`oops, something went wrong: ${message}`))
    }, [])
    
    const addRecipe = async (event) => {
        event.preventDefault()
        try {
          // send a post request to add the new card to the backend
          const { data } = await api.post("/recipes", {
            title,
            ingredients,
            instructions,
            nutritional_info,
            classification
          })
    
          setTitle("")
          setIngredients("")
          setInstructions("")
          setNutritionalInfo("")
          setClassification("")
    
          // update the component state with the new card
          // make a clone of cards from state
          const recipesClone = [...recipes]
          // add the new card
          recipesClone.push({
            title: data.title,
            ingredients: data.ingredients,
            instructions: data.instructions,
            nutritional_info: data.nutritional_info,
            classification: data.classification,
            id: data.id
          })
          // set it as the new state
          setRecipes(recipesClone)
        } catch ({ message }) {
          setErrorMessage(`oops, something went wrong: ${message}`)
        }
      }
    
    return (
        <>
            <h1>Recipes</h1>
            {recipes.map(({id, title, ingredients, instructions, nutritional_info, classification}) => {
                return (
                    <div id={id}>
                        <h1>{title}</h1>
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
                <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} id="title" label="Title" />
                <label htmlFor="title">Title</label>
                <br></br>
                <input type="text" onChange={(e) => setIngredients(e.target.value)} value={ingredients} id="ingredients" label="Ingedients" />
                <label htmlFor="ingredients">Ingredients</label>
                <br></br>
                <input type="text" onChange={(e) => setInstructions(e.target.value)} value={instructions} id="instructions" label="Instructions" />
                <label htmlFor="instructions">Instructions</label>
                <br></br>
                <input type="text" onChange={(e) => setNutritionalInfo(e.target.value)} value={nutritional_info} id="nutritional_info" label="Nutritional Info" />
                <label htmlFor="nutritional_info">Nutritional Info</label>
                <br></br>
                <input type="text" onChange={(e) => setClassification(e.target.value)} value={classification} id="classification" label="Classification" />
                <label htmlFor="classification">Classification</label>
                <br></br>
                <button type="submit">Add recipe</button>
            </form>
        </>
    )
}