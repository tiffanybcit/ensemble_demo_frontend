import React from "react"
import "../styles/Navbar.css"

// ==================
// NAV BAR
// ==================
const Navbar = () => {
    const [scrolled,setScrolled]=React.useState(false);

    let navbarClasses=['navbar'];
    if(scrolled){
        navbarClasses.push('scrolled');
    }
    return (
        <header className={navbarClasses.join(' ')}>

            <h1>KBIT x Nemesis Dashboard</h1>
            <nav className="navigation">
            </nav>
    
        </header>
      )
};
export default Navbar