import { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { api } from '../../data'

export const SignUp = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")
  const [passwordConfirmationMatches, setPasswordConfirmationMatches] = useState(true)

  // when password changes, or passwordConfirmation changes, compare the two
  // If equal, set passwordConfirmationMatches to true, else set to false
  useEffect(() => {
    setPasswordConfirmationMatches(password === passwordConfirmation)
  }, [password, passwordConfirmation])

  const history = useHistory()

  /**
   *  form is invalid if
   * - email is invalid
   * - password is invalid
   * - password confirmation doesn't match password
   * - username is missing
   *  */
  const formInvalid = !passwordConfirmationMatches

  // sends username, email, password, and password_confirmation to the backend /auth/sign_up route
  const signUp = async (e) => {
    e.preventDefault()

    // send the post request to the API
    try {
      const { data } = await api.post("/auth/sign_up", {
        email,
        password,
        password_confirmation: passwordConfirmation
      })

      // if success:
        // save the JWT to local storage
        localStorage.setItem('jwt', data.jwt)
        // redirect to home page
        history.push("/")
    } catch {
        console.log("Error")
    }
  }

  return (
    <form onSubmit={signUp}>
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
        <label htmlFor="passwordConfirmation">Confirm password:</label>
        <input
            type="text"
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            value={passwordConfirmation}
            id="passwordConfirmation"
        />
        <br></br>
        <button type="submit">Sign Up</button>
    </form>
  )
}