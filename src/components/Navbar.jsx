import {
    Link,
    useLocation
  } from "react-router-dom"
  
  
  const navLinks = [
    {
      label: "Home",
      value: "/"
    },
    {
      label: "Menus",
      value: "/menus"
    },
    {
      label: "Recipes",
      value: "/recipes"
    },
    {
      label: "Sign in",
      value: "/signin"
    },
    {
      label: "Sign up",
      value: "/signup"
    }
  ]
  
  export const Navbar = () => {
    const { pathname } = useLocation()
  
    return (
      <nav position="sticky">
          <h1>MealHub</h1>
            {navLinks.map(({ label, value }) => (
                <>
                    <Link key={value} label={label} value={value} to={value}>{label}</Link>
                    <br></br>
                </>
            ))}
        </nav>
    )
  }