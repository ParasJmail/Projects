import React,{useState} from 'react';
import {RiMenu3Line, RiCloseLine } from 'react-icons/ri'
import logo from '../../assets/GPT-3.svg'
import './navbar.css';

const Menu = () => (
  <>
  <p><a href="#home">Home</a></p>
  <p><a href="#wgpt3">what is GPT3</a></p>
  <p><a href="#possibility">openai</a></p>
  <p><a href="#features">CaseStudies</a></p>
  <p><a href="#blogs">Libraries</a></p>
  </>
)


//BEM -> Block Element Modifier
const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);


  return (
    <div className='gpt3__navbar'>
      <div className='gpt3__navbar-links'>
        <div className='gpt3_navbar-links_logo'>
          <img src={logo} alt="logo" />
        </div>
        <div className='gpt3__navbar-links_containers'>
          <p><a href="#home">Home</a></p>
          <p><a href="#wgpt3">what is GPT3</a></p>
          <p><a href="#possibility">openai</a></p>
          <p><a href="#features">CaseStudies</a></p>
          <p><a href="#blogs">Libraries</a></p>
        </div>
      </div>
      <div className="gpt3__navbar-sign">
        <p>Sign in</p>
        <button type='button'>Sign Up</button>
      </div>
      <div className='gpt3__navbar-menu'>
        {toggleMenu
        ? <RiCloseLine color='#fff' size = {24} onClick={() => setToggleMenu(false)}/>
        : <RiMenu3Line color='#fff' size = {27} onClick={() => setToggleMenu(true)}/>
        }
        {
          toggleMenu && (
            <div className='gpt3__navbar-menu_containers scale-up-center'>
              <div className='gpt3__navbar-menu_containers-links'>
                  <Menu />
                  <div className="gpt3__navbar-menu-containers-links-sign">
                    <p>Sign in</p>
                    <button type='button'>Sign Up</button>
                  </div>
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Navbar
