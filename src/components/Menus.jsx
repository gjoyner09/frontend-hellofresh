import { useEffect, useState } from "react"
import { api } from "../data"
import { Link } from "react-router-dom"

export const Menus = () => {
    const [menus, setMenus] = useState([])
    const [errorMessage, setErrorMessage] = useState("")
    const [week, setWeek] = useState("")
    
    const addMenu = async (event) => {
        event.preventDefault()
        
        try {
            const { data } = await api.post("/menus", { week })
            setWeek("")
            const menusClone = [...menus]
            menusClone.push({ week: data.week })
            setMenus(menusClone)
        } catch ({ message }) {
            setErrorMessage(`oops, something went wrong: ${message}`)
        }
    }
    
    useEffect(() => {
        api.get("/menus")
        .then(({ data }) => {
            setMenus(data)
        })
        .catch(({ message }) => setErrorMessage(`oops, something went wrong: ${message}`))
    }, [])
    
    return (
        <>
            <h1>Menus</h1>
            {menus.map(({week, id}) => {
                return (
                    <>
                        <Link key={id} to={`/menu/${id}`}>Week of {week}</Link>
                        <br></br>
                    </>
                )
            })}
            <br></br>
            <form onSubmit={addMenu}>
                <input type="text" onChange={(e) => setWeek(e.target.value)} value={week} id="week" label="Week" />
                <label htmlFor="week">Week (YYYY-MM-DD format)</label>
                <br></br>
                <button type="submit">Add menu</button>
            </form>
        </>
    )
}