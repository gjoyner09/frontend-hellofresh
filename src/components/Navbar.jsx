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
  
    return (
      <nav position="sticky">
          <h1>MealHub</h1>
            {navLinks.map(({ label, value }) => (
                <div key={value}>
                    <Link label={label} value={value} to={value}>{label}</Link>
                    <br></br>
                </div>
            ))}
        </nav>
    )
  }