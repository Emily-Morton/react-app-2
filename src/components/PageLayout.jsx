import { NavLink, Outlet } from "react-router";



function PageLayout() {
  return (
    <>
    <header>
      <h1>Hello World</h1>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        <NavLink to="/faqs">FAQs</NavLink>
      </nav>
    </header>
    <main>
      <Outlet />
    </main>
    <footer>
      <p>&copy 2025</p>
    </footer>
    </>
  )
}

export default PageLayout