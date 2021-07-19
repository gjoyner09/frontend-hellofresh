import { useState } from "react"
import { useHistory } from "react-router-dom"
import { api } from '../../data'

export const SignIn = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const history = useHistory()

  // sends username, email, password, and password_confirmation to the backend /auth/sign_up route
  const signIn = async (e) => {
    e.preventDefault()

    // send the post request to the API
    try {
      const { data } = await api.post("/auth/sign_in", {
        email,
        password,
      })

      // if success:
        // save the JWT to local storage
        localStorage.setItem('jwt', data.jwt)
        // redirect to home page
        history.push("/")
    } catch (error) {
        console.log("Error")
    }
  }

  return (
    <form onSubmit={signIn}>
        <label htmlFor="email">Email:</label>
        <input
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            id="email"
        />
        <br></br>
        <label htmlFor="password">Password:</label>
        <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            id="password"
        />
        <br></br>
        <button type="submit">Sign In</button>
    </form>
  )
}