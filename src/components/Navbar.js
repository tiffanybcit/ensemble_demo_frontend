import React from "react"
import {useEffect} from 'react';
import "../styles/Navbar.css"
//import Logo from "../../assets/images/logo.svg"

const Navbar = () => {
    const [scrolled,setScrolled]=React.useState(false);
    // const handleScroll=() => {
    //     const offset=window.scrollY;
    //     if(offset > 200 ){
    //     setScrolled(true);
    //     }
    //     else{
    //     setScrolled(false);
    //     }
    // }
    // useEffect(() => {
    //     window.addEventListener('scroll',handleScroll)
    // })
    let navbarClasses=['navbar'];
    if(scrolled){
        navbarClasses.push('scrolled');
    }
    return (
        <header className={navbarClasses.join(' ')}>
    
            <div className="logo">
                {/* your logo */}
            </div>
            <h1>KBIT x Nemesis Dashboard</h1>
            <nav className="navigation">
                {/* your navigation */}
            </nav>
    
        </header>
      )
};
export default Navbar